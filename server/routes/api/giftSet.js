const GiftSet = require('../../models/GiftSet');
const Giver = require('../../models/Giver');
const User = require('../../models/User');
const wrap = require('../../utilities/wrap');
const Mailer = require('../../mail/index');
const { PAYMENT_METHODS } = require('../../../lib/constants/index');
const { generatePaypalMeLink } = require('../../../lib/paypal/index');

const mailer = new Mailer();

module.exports = ({ express, config, secure }) => {
    const router = new express.Router();

    router
        .route('/')

        .get(secure, wrap(function* getGiftSets(req, res) {
            const giftSets = yield GiftSet
                .forge()
                .orderBy('created_at', 'DESC')
                .fetchAll({ withRelated: ['gifts', 'giver'] });

            return res.json(giftSets);
        }))

        .post(wrap(function* createGiftSet(req, res) {
            req.checkBody('giver').notEmpty();
            req.checkBody('giver.forename').notEmpty();
            req.checkBody('giver.surname').notEmpty();
            req.checkBody('giver.email').isEmail();
            req.checkBody('giver.phoneNumber').notEmpty();
            req.checkBody('giver.paymentMethod').isIn([PAYMENT_METHODS.PAYPAL, PAYMENT_METHODS.BANK_TRANSFER]);
            req.checkBody('basket').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const { giver: { forename, surname, email, phoneNumber, paymentMethod }, basket } = req.body;

            let giver = yield Giver
                .forge({ email })
                .fetch();

            if (!giver) {
                giver = yield Giver
                    .forge({ forename, surname, email, phoneNumber })
                    .save();
            }

            const giverId = giver.get('id');
            const giftIds = basket.map(({ id, quantity, price }) => ({ gift_id: id, quantity, price }));

            const giftSet = yield GiftSet
                .forge({ giverId, paymentMethod })
                .save();

            yield giftSet
                .gifts()
                .attach(giftIds);

            yield giftSet.refresh({ withRelated: ['gifts'] });

            const paypalLink = generatePaypalMeLink({ username: config.paypalMeUsername, amount: giftSet.get('total') });

            yield mailer.send({ to: giver.get('email'), subject: 'Gift Confirmation', giftSet: giftSet.toJSON(), PAYMENT_METHODS, paypalLink }, 'confirmation');

            const users = yield User.fetchAll();

            const userEmails = users.map(user => user.get('email'));

            yield mailer.send({ to: userEmails, subject: 'Woop we just got a gift!', giver: giver.toJSON(), giftSet: giftSet.toJSON() }, 'adminConfirmation');

            giftSet.set({ emailSent: true });

            yield giftSet.save();

            return res
                .status(201)
                .json(giftSet);
        }));

    router
        .route('/:id')

        .get(wrap(function* getGiftSet(req, res) {
            const { id } = req.params;

            const giftSet = yield GiftSet
                .forge({ id })
                .fetch({ withRelated: ['gifts', 'giver'] });

            if (!giftSet) {
                return res
                    .status(404)
                    .send();
            }

            const paypalLink = generatePaypalMeLink({ username: config.paypalMeUsername, amount: giftSet.get('total') });
            const giftSetWithPaypalLink = Object.assign({}, giftSet.toJSON(), { paypalLink });

            return res.json(giftSetWithPaypalLink);
        }))

        .delete(secure, wrap(function* deleteGiftSet(req, res) {
            const { id } = req.params;

            const giftSet = yield GiftSet
                .forge({ id })
                .fetch({ withRelated: ['gifts'] });

            if (!giftSet) {
                return res
                    .status(404)
                    .send();
            }

            const paid = giftSet.get('paid');

            if (paid) {
                return res
                    .status(400)
                    .send({ message: 'A Gift Set marked as paid cannot be deleted' });
            }

            const gifts = giftSet.related('gifts');
            const giftIds = gifts.map(o => o.get('id'));
            yield giftSet.gifts().detach(giftIds);
            yield giftSet.destroy();

            return res
                .status(204)
                .send();
        }));

    router
        .route('/:id/paid')

        .put(secure, wrap(function* markAsPaid(req, res) {
            const { id } = req.params;

            const giftSet = yield GiftSet
                .forge({ id })
                .fetch({ withRelated: ['gifts', 'giver'] });

            if (!giftSet) {
                return res
                    .status(404)
                    .send();
            }

            giftSet.set({ paid: true });

            yield giftSet.save();

            return res
                .status(200)
                .json(giftSet);
        }));

    router
        .route('/:id/detailsSent')

        .put(secure, wrap(function* markAsDetailsSent(req, res) {
            const { id } = req.params;

            const giftSet = yield GiftSet
                .forge({ id })
                .fetch({ withRelated: ['gifts', 'giver'] });

            if (!giftSet) {
                return res
                    .status(404)
                    .send();
            }

            giftSet.set({ paymentDetailsSent: true });

            yield giftSet.save();

            return res
                .status(200)
                .send(giftSet);
        }));

    return router;
};
