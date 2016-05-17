const Giver = require('../models/giver');
const GiftSet = require('../models/giftSet');
const Gift = require('../models/gift');
const User = require('../models/user');
const HoneymoonGiftListItem = require('../models/honeymoonGiftListItem');
const wrap = require('../utilities/wrap');
const Mailer = require('../mail');
const mailer = new Mailer();
const { PAYMENT_METHODS } = require('../../lib/constants');
const { generatePaypalMeLink } = require('../../lib/paypal');

module.exports = (app, express, config) => {
    const router = new express.Router();

    router
        .route('/')

        .post(wrap(function* createGift(req, res) {
            req.checkBody('giver').notEmpty();
            req.checkBody('giver.forename').notEmpty();
            req.checkBody('giver.surname').notEmpty();
            req.checkBody('giver.email').isEmail();
            req.checkBody('giver.phoneNumber').notEmpty();
            req.checkBody('giver.paymentMethod').isIn([PAYMENT_METHODS.PAYPAL, PAYMENT_METHODS.BANK_TRANSFER]);
            req.checkBody('items').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const { giver: giverData, items: itemsData } = req.body;
            const { paymentMethod } = giverData;

            let giver = yield Giver.findOne({ email: giverData.email });

            if (!giver) {
                giver = new Giver(giverData);

                yield giver.save();
            }

            const giftSet = yield GiftSet.create({
                giver: giver._id, // eslint-disable-line no-underscore-dangle
                paymentMethod,
            });

            giver.giftSets.push(giftSet._id); // eslint-disable-line no-underscore-dangle
            yield giver.save();

            for (const item of itemsData) {
                const honeymoonGiftListItem = yield HoneymoonGiftListItem.findById(item._id); // eslint-disable-line no-underscore-dangle

                const gift = new Gift({
                    quantity: item.quantity,
                    price: honeymoonGiftListItem.price,
                    honeymoonGiftListItem: item._id, // eslint-disable-line no-underscore-dangle
                    giftSet: giftSet._id, // eslint-disable-line no-underscore-dangle
                });

                yield gift.save();

                honeymoonGiftListItem.gifts.push(gift._id); // eslint-disable-line no-underscore-dangle
                yield honeymoonGiftListItem.save();

                giftSet.gifts.push(gift);
            }

            yield giftSet.save();

            yield giftSet
                .populate({
                    path: 'gifts',
                    populate: { path: 'honeymoonGiftListItem', model: 'HoneymoonGiftListItem' },
                })
                .execPopulate();

            const paypalLink = generatePaypalMeLink({ username: config.paypalMeUsername, amount: giftSet.total });

            yield mailer.send({ to: giver.email, subject: 'Gift Confirmation', giftSet, PAYMENT_METHODS, paypalLink }, 'confirmation');

            const users = yield User.find({}, 'username');
            const userEmails = users.map(user => user.username);

            yield mailer
                .send({
                    to: userEmails,
                    subject: 'Woop we just got a gift!',
                    text: `${giver.forename} ${giver.surname} has just confirmed a gift set worth £${giftSet.total}!`,
                });

            giftSet.emailSent = true;

            yield giftSet.save();

            return res.json(giftSet);
        }));

    router
        .route('/:id')

        .get(wrap(function* getGift(req, res) {
            const { id } = req.params;

            const giftSet = yield GiftSet
                .findById(id)
                .populate({
                    path: 'gifts',
                });

            if (!giftSet) {
                return res
                    .status(404)
                    .send();
            }

            const paypalLink = generatePaypalMeLink({ username: config.paypalMeUsername, amount: giftSet.total });
            const giftSetWithPaypalLink = Object.assign(giftSet.toJSON(), { paypalLink });

            return res.json(giftSetWithPaypalLink);
        }));

    return router;
};
