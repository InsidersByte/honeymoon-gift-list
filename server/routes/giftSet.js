const GiftSet = require('../models/giftSet');
const wrap = require('../utilities/wrap');

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getGiftSets(req, res) {
            const giftSets = yield GiftSet
                .find({})
                .populate('gifts')
                .populate('giver')
                .sort('-createdAt');

            return res.json(giftSets);
        }));

    router
        .route('/:giftSetId')

        .get(wrap(function* getGiftSet(req, res) {
            const giftSet = yield GiftSet
                .findById(req.params.giftSetId)
                .populate({
                    path: 'gifts',
                    populate: { path: 'honeymoonGiftListItem', model: 'HoneymoonGiftListItem' },
                })
                .populate('giver');

            if (!giftSet) {
                return res
                    .status(404)
                    .send();
            }

            return res.json(giftSet);
        }))

        .delete(wrap(function* deleteGiftSet(req, res) {
            const giftSet = yield GiftSet
                .findById(req.params.giftSetId)
                .populate('gifts');

            if (!giftSet) {
                return res
                    .status(404)
                    .send();
            }

            for (const gift of giftSet.gifts) {
                yield gift.remove();
            }

            yield giftSet.remove();

            return res
                .status(204)
                .send();
        }));

    router
        .route('/:giftSetId/paid')

        .put(wrap(function* markGiftSetAsPaid(req, res) {
            req.checkParams('id').equals(req.params.id);

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const giftSet = yield GiftSet
                .findById(req.params.giftSetId);

            if (!giftSet) {
                return res
                    .status(404)
                    .send();
            }

            giftSet.paid = true;

            yield giftSet.save();

            return res.json(giftSet);
        }));

    router
        .route('/:giftSetId/detailsSent')

        .put(wrap(function* markGiftSetAsDetailsSent(req, res) {
            req.checkParams('id').equals(req.params.id);

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const giftSet = yield GiftSet
                .findById(req.params.giftSetId);

            if (!giftSet) {
                return res
                    .status(404)
                    .send();
            }

            giftSet.detailsSent = true;

            yield giftSet.save();

            return res.json(giftSet);
        }));

    return router;
};
