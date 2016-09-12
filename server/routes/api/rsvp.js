const WeddingProfile = require('../../models/weddingProfile');
const wrap = require('../../utilities/wrap');

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getRsvp(req, res) {
            const weddingProfile = yield WeddingProfile.findOne({});
            return res.json(weddingProfile.rsvp || '');
        }))

        .put(wrap(function* updateRsvp(req, res) {
            req.checkBody('rsvp').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const weddingProfile = yield WeddingProfile.findOne({});

            weddingProfile.rsvp = req.body.rsvp;

            yield weddingProfile.save();

            return res.json(weddingProfile.rsvp);
        }));

    return router;
};
