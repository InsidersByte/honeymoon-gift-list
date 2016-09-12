const WeddingProfile = require('../../models/weddingProfile');
const wrap = require('../../utilities/wrap');

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getWeddingProfile(req, res) {
            const weddingProfile = yield WeddingProfile.findOne({});
            return res.json(weddingProfile.aboutOurHoneymoon);
        }))

        .put(wrap(function* getWeddingProfile(req, res) {
            req.checkBody('aboutOurHoneymoon').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const weddingProfile = yield WeddingProfile.findOne({});

            weddingProfile.aboutOurHoneymoon = req.body.aboutOurHoneymoon;

            yield weddingProfile.save();

            return res.json(weddingProfile.aboutOurHoneymoon);
        }));

    return router;
};
