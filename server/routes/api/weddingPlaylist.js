const WeddingProfile = require('../../models/weddingProfile');
const wrap = require('../../utilities/wrap');

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getWeddingPlaylist(req, res) {
            const weddingProfile = yield WeddingProfile.findOne({});
            return res.json(weddingProfile.weddingPlaylist || '');
        }))

        .put(wrap(function* updateWeddingPlaylist(req, res) {
            req.checkBody('weddingPlaylist').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const weddingProfile = yield WeddingProfile.findOne({});

            weddingProfile.weddingPlaylist = req.body.weddingPlaylist;

            yield weddingProfile.save();

            return res.json(weddingProfile.weddingPlaylist);
        }));

    return router;
};
