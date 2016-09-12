const WeddingProfile = require('../../models/weddingProfile');
const wrap = require('../../utilities/wrap');

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getOnTheDay(req, res) {
            const weddingProfile = yield WeddingProfile.findOne({});
            return res.json(weddingProfile.onTheDay);
        }))

        .put(wrap(function* updateOnTheDay(req, res) {
            req.checkBody('onTheDay').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const weddingProfile = yield WeddingProfile.findOne({});

            weddingProfile.onTheDay = req.body.onTheDay;

            yield weddingProfile.save();

            return res.json(weddingProfile.onTheDay);
        }));

    return router;
};
