const WeddingProfile = require('../models/weddingProfile');
const co = require('co');

module.exports = (app, express) => {
    const router = new express.Router();

    router.route('/')
        .get(co.wrap(function* getRsvp(req, res, next) {
            try {
                const weddingProfile = yield WeddingProfile.findOne({});

                return res.json(weddingProfile.rsvp || '');
            } catch (error) {
                next(error);
            }
        }))

        .put(co.wrap(function* updateRsvp(req, res, next) {
            try {
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
            } catch (error) {
                next(error);
            }
        }));

    return router;
};