const WeddingProfile = require('../../models/weddingProfile');
const wrap = require('../../utilities/wrap');

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getLocalFlavour(req, res) {
            const weddingProfile = yield WeddingProfile.findOne({});
            return res.json(weddingProfile.localFlavour);
        }))

        .put(wrap(function* updateLocalFlavour(req, res) {
            req.checkBody('localFlavour').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const weddingProfile = yield WeddingProfile.findOne({});

            weddingProfile.localFlavour = req.body.localFlavour;

            yield weddingProfile.save();

            return res.json(weddingProfile.localFlavour);
        }));

    return router;
};
