const WeddingProfile = require('../models/weddingProfile');
const wrap = require('../utilities/wrap');

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getWeddingPartyMembers(req, res) {
            const weddingProfile = yield WeddingProfile.findOne({});
            return res.json(weddingProfile.weddingPartyMembers);
        }))

        .post(wrap(function* createWeddingPartyMember(req, res) {
            req.checkBody('name').notEmpty();
            req.checkBody('imageUrl').isURL();
            req.checkBody('description').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const weddingProfile = yield WeddingProfile.findOne({});

            const weddingPartyMember = weddingProfile.weddingPartyMembers.create({
                name: req.body.name,
                imageUrl: req.body.imageUrl,
                description: req.body.description,
            });

            weddingProfile.weddingPartyMembers.push(weddingPartyMember);

            yield weddingProfile.save();

            return res.json(weddingPartyMember);
        }));

    router
        .route('/:weddingPartyMemberId')

        .put(wrap(function* updateWeddingPartyMember(/* req, res */) {
            throw new Error('not yet implemented');
        }))

        .delete(wrap(function* deleteWeddingPartyMember(/* req, res */) {
            throw new Error('not yet implemented');
        }));

    return router;
};
