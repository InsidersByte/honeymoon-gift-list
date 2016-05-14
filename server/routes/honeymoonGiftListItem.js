const HoneymoonGiftListItem = require('../models/honeymoonGiftListItem');
const wrap = require('../utilities/wrap');
const { integer } = require('../../lib/random');
const { MINIMUM_NUMBER, MAXIMUM_NUMBER } = require('../constants');

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getHoneymoonGiftItems(req, res) {
            const honeymoonGiftList = yield HoneymoonGiftListItem
                .find({})
                .populate('gifts', 'quantity')
                .sort('position')
                .lean()
                .exec();

            for (const honeymoonGiftListItem of honeymoonGiftList) {
                honeymoonGiftListItem.remaining = honeymoonGiftListItem.requested;

                if (!honeymoonGiftListItem.gifts) {
                    continue;
                }

                let bought = 0;

                for (const gift of honeymoonGiftListItem.gifts) {
                    bought += gift.quantity;
                }

                honeymoonGiftListItem.remaining -= bought;
            }

            return res.json(honeymoonGiftList);
        }))

        .post(wrap(function* createHoneymoonGiftItem(req, res) {
            req.checkBody('imageUrl').isURL();
            req.checkBody('name').notEmpty();
            req.checkBody('description').notEmpty();
            req.checkBody('requested').isInt();
            req.checkBody('price').isInt();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            // TODO: Work out the max position and add to it

            const honeymoonGiftItem = new HoneymoonGiftListItem({
                imageUrl: req.body.imageUrl,
                name: req.body.name,
                description: req.body.description,
                requested: req.body.requested,
                price: req.body.price,
            });

            yield honeymoonGiftItem.save();

            return res
                .status(201)
                .json(honeymoonGiftItem);
        }));

    router
        .route('/:id')

        .put(wrap(function* updateHoneymoonGiftItem(req, res) {
            req.checkParams('id').equals(req.body._id); // eslint-disable-line no-underscore-dangle
            req.checkBody('imageUrl').isURL();
            req.checkBody('name').notEmpty();
            req.checkBody('description').notEmpty();
            req.checkBody('requested').isInt();
            req.checkBody('price').isInt();
            req.checkBody('position').isFloat();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const honeymoonGiftItem = yield HoneymoonGiftListItem.findById(req.params.id);

            if (!honeymoonGiftItem) {
                return res
                    .status(404)
                    .send();
            }

            honeymoonGiftItem.imageUrl = req.body.imageUrl;
            honeymoonGiftItem.name = req.body.name;
            honeymoonGiftItem.description = req.body.description;
            honeymoonGiftItem.description = req.body.description;
            honeymoonGiftItem.requested = req.body.requested;
            honeymoonGiftItem.price = req.body.price;
            honeymoonGiftItem.position = req.body.position;

            yield honeymoonGiftItem.save();

            return res.json(honeymoonGiftItem);
        }))

        .delete(wrap(function* deleteHoneymoonGiftItem(req, res) {
            req.checkParams('id').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const honeymoonGiftListItem = yield HoneymoonGiftListItem
                .findOne({ _id: req.params.id })
                .populate('gifts');

            if (!honeymoonGiftListItem) {
                return res
                    .status(404)
                    .send();
            }

            const existingGift = honeymoonGiftListItem.gifts.find(o => o !== null);

            if (existingGift) {
                return res
                    .status(400)
                    .json({ message: 'there is currently a gift that exists for this item' });
            }

            honeymoonGiftListItem.remove();

            yield honeymoonGiftListItem.save();

            return res
                .status(204)
                .send();
        }));

    return router;
};
