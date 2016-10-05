const Gift = require('../../models/Gift');
const wrap = require('../../utilities/wrap');
const { integer } = require('../../../lib/random/index');
const { WEDDING_PROFILE_ID, MINIMUM_NUMBER, MAXIMUM_NUMBER } = require('../../constants');

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getGifts(req, res) {
            const gifts = yield Gift
                .forge({ weddingProfileId: WEDDING_PROFILE_ID })
                .fetchAll({ withRelated: ['giftSets'] });

            return res.json(gifts);
        }))

        .post(wrap(function* createGift(req, res) {
            req.checkBody('imageUrl').isURL();
            req.checkBody('name').notEmpty();
            req.checkBody('requested').isInt();
            req.checkBody('price').isInt();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const { name, imageUrl, requested, price } = req.body;

            const max = yield Gift
                .forge({ weddingProfileId: WEDDING_PROFILE_ID })
                .query({ max: 'position' })
                .fetch();

            const maximumPosition = max.get('max') || 0;

            const position = integer(maximumPosition + MINIMUM_NUMBER, maximumPosition + MAXIMUM_NUMBER);

            const gift = new Gift({
                name,
                imageUrl,
                requested,
                price,
                position,
                weddingProfileId: WEDDING_PROFILE_ID,
            });

            yield gift.save();

            return res
                .status(201)
                .json(gift);
        }));

    router
        .route('/:id')

        .put(wrap(function* updateGift(req, res) {
            req.checkParams('id').equals(`${req.body.id}`);
            req.checkBody('imageUrl').isURL();
            req.checkBody('name').notEmpty();
            req.checkBody('requested').isInt();
            req.checkBody('price').isInt();
            req.checkBody('position').isFloat();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const { id } = req.params;

            const gift = yield Gift
                .forge({ id })
                .fetch();

            if (!gift) {
                return res
                    .status(404)
                    .send();
            }

            const { name, imageUrl, requested, price, position } = req.body;

            gift.set({
                name,
                imageUrl,
                requested,
                price,
                position,
            });

            yield gift.save();

            return res.json(gift);
        }))

        .delete(wrap(function* deleteGift(req, res) {
            const { id } = req.params;

            const gift = yield Gift
                .forge({ id })
                .fetch();

            if (!gift) {
                return res
                    .status(404)
                    .send();
            }

            yield gift.destroy();

            return res
                .status(204)
                .send();
        }));

    return router;
};
