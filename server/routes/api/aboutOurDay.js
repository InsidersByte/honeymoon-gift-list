const WeddingProfile = require('../../models/weddingProfile');
const wrap = require('../../utilities/wrap');

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getAboutOurDay(req, res) {
            const weddingProfile = yield WeddingProfile.findOne({});
            return res.json(weddingProfile.aboutOurDay);
        }))

        .put(wrap(function* updateAboutOurDay(req, res) {
            req.checkBody('aboutOurDay').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const weddingProfile = yield WeddingProfile.findOne({});

            weddingProfile.aboutOurDay = req.body.aboutOurDay;

            yield weddingProfile.save();

            return res.json(weddingProfile.aboutOurDay);
        }));

    return router;
};
