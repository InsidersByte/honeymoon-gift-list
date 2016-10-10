const WeddingPartyMember = require('../../models/WeddingPartyMember');
const wrap = require('../../utilities/wrap');
const { integer } = require('../../../lib/random');
const { WEDDING_PROFILE_ID, MINIMUM_NUMBER, MAXIMUM_NUMBER } = require('../../constants');

module.exports = ({ express, secure }) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getWeddingPartyMembers(req, res) {
            const weddingPartyMembers = yield WeddingPartyMember
                .forge({ weddingProfileId: WEDDING_PROFILE_ID })
                .fetchAll();

            return res.json(weddingPartyMembers);
        }))

        .post(secure, wrap(function* createWeddingPartyMember(req, res) {
            req.checkBody('name').notEmpty();
            req.checkBody('title').notEmpty();
            req.checkBody('imageUrl').isURL();
            req.checkBody('description').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const { name, title, imageUrl, description } = req.body;

            const max = yield WeddingPartyMember
                .forge({ weddingProfileId: WEDDING_PROFILE_ID })
                .query({ max: 'position' })
                .fetch();

            const maximumPosition = max.get('max') || 0;

            const position = integer(maximumPosition + MINIMUM_NUMBER, maximumPosition + MAXIMUM_NUMBER);

            const weddingPartyMember = new WeddingPartyMember({
                name,
                title,
                imageUrl,
                description,
                position,
                weddingProfileId: WEDDING_PROFILE_ID,
            });

            yield weddingPartyMember.save();

            return res
                .status(201)
                .json(weddingPartyMember);
        }));

    router
        .route('/:id')

        .get(secure, wrap(function* getWeddingPartyMember(req, res) {
            const { id } = req.params;

            const weddingPartyMember = yield WeddingPartyMember
                .forge({ id })
                .fetch();

            if (!weddingPartyMember) {
                return res
                    .status(404)
                    .send();
            }

            return res.json(weddingPartyMember);
        }))

        .put(secure, wrap(function* updateWeddingPartyMember(req, res) {
            req.checkBody('id').equals(req.params.id);
            req.checkBody('name').notEmpty();
            req.checkBody('title').notEmpty();
            req.checkBody('imageUrl').isURL();
            req.checkBody('description').notEmpty();
            req.checkBody('position').isFloat();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const { id } = req.params;

            const weddingPartyMember = yield WeddingPartyMember
                .forge({ id })
                .fetch();

            if (!weddingPartyMember) {
                return res
                    .status(404)
                    .send();
            }

            const { name, title, imageUrl, description, position } = req.body;

            weddingPartyMember.set({
                name,
                title,
                imageUrl,
                description,
                position,
            });

            yield weddingPartyMember.save();

            return res.json(weddingPartyMember);
        }))

        .delete(secure, wrap(function* deleteWeddingPartyMember(req, res) {
            const { id } = req.params;

            const weddingPartyMember = yield WeddingPartyMember
                .forge({ id })
                .fetch();

            if (!weddingPartyMember) {
                return res
                    .status(404)
                    .send();
            }

            yield weddingPartyMember.destroy();

            return res
                .status(204)
                .send();
        }));

    return router;
};
