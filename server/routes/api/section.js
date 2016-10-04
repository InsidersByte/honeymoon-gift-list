const Section = require('../../models/Section');
const wrap = require('../../utilities/wrap');
const { WEDDING_PROFILE_ID } = require('../../constants');

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getSections(req, res) {
            const sections = yield Section
                .forge({ weddingProfileId: WEDDING_PROFILE_ID })
                .fetchAll();

            return res.json(sections);
        }));

    return router;
};
