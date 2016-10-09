const Section = require('../../models/Section');
const wrap = require('../../utilities/wrap');
const { integer } = require('../../../lib/random');
const { WEDDING_PROFILE_ID, MINIMUM_NUMBER, MAXIMUM_NUMBER } = require('../../constants');

module.exports = ({ express, secure }) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getSections(req, res) {
            const sections = yield Section
                .forge({ weddingProfileId: WEDDING_PROFILE_ID })
                .fetchAll();

            return res.json(sections);
        }))

        .post(secure, wrap(function* createSection(req, res) {
            req.checkBody('title').notEmpty();
            req.checkBody('content').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const { title, content } = req.body;

            const max = yield Section
                .forge({ weddingProfileId: WEDDING_PROFILE_ID })
                .query({ max: 'position' })
                .fetch();

            const maximumPosition = max.get('max') || 0;

            const position = integer(maximumPosition + MINIMUM_NUMBER, maximumPosition + MAXIMUM_NUMBER);

            const section = new Section({
                title,
                content,
                position,
                weddingProfileId: WEDDING_PROFILE_ID,
            });

            yield section.save();

            return res
                .status(201)
                .json(section);
        }));

    router
        .route('/:id')

        .get(wrap(function* getSection(req, res) {
            const { id } = req.params;

            const section = yield Section
                .forge({ id })
                .fetch();

            if (!section) {
                return res
                    .status(404)
                    .send();
            }

            return res.json(section);
        }))

        .put(secure, wrap(function* updateSection(req, res) {
            req.checkParams('id').equals(`${req.body.id}`);
            req.checkBody('title').notEmpty();
            req.checkBody('content').notEmpty();
            req.checkBody('hidden').isBoolean();
            req.checkBody('position').isFloat();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const { id } = req.params;

            const section = yield Section
                .forge({ id })
                .fetch();

            if (!section) {
                return res
                    .status(404)
                    .send();
            }

            const { title, content, hidden, position } = req.body;

            section.set({
                title,
                content,
                hidden,
                position,
            });

            yield section.save();

            return res.json(section);
        }))

        .delete(secure, wrap(function* deleteSection(req, res) {
            const { id } = req.params;

            const section = yield Section
                .forge({ id })
                .fetch();

            if (!section) {
                return res
                    .status(404)
                    .send();
            }

            yield section.destroy();

            return res
                .status(204)
                .send();
        }));

    return router;
};
