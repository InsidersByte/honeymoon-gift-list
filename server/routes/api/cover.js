const WeddingProfile = require('../../models/weddingProfile');
const wrap = require('../../utilities/wrap');

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getCover(req, res) {
            const weddingProfile = yield WeddingProfile.findOne({});
            return res.json(weddingProfile.cover);
        }))

        .put(wrap(function* updateCover(req, res) {
            req.checkBody('title').notEmpty();
            req.checkBody('imageUrl').isURL();
            req.checkBody('weddingDate').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const weddingProfile = yield WeddingProfile.findOne({});

            weddingProfile.cover.title = req.body.title;
            weddingProfile.cover.imageUrl = req.body.imageUrl;
            weddingProfile.cover.weddingDate = req.body.weddingDate;

            yield weddingProfile.save();

            return res.json(weddingProfile.cover);
        }));

    return router;
};
