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

            return res
                .status(201)
                .json(weddingPartyMember);
        }));

    router
        .route('/:weddingPartyMemberId')

        .get(wrap(function* getWeddingPartyMember(req, res) {
            const weddingProfile = yield WeddingProfile.findOne({});

            const weddingPartyMember = weddingProfile.weddingPartyMembers.id(req.params.weddingPartyMemberId);

            if (!weddingPartyMember) {
                return res
                    .status(404)
                    .send();
            }

            return res.json(weddingPartyMember);
        }))

        .put(wrap(function* updateWeddingPartyMember(req, res) {
            req.checkBody('_id').equals(req.params.weddingPartyMemberId);
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

            const weddingPartyMember = weddingProfile.weddingPartyMembers.id(req.params.weddingPartyMemberId);

            if (!weddingPartyMember) {
                return res
                    .status(404)
                    .send();
            }

            weddingPartyMember.name = req.body.name;
            weddingPartyMember.imageUrl = req.body.imageUrl;
            weddingPartyMember.description = req.body.description;

            yield weddingProfile.save();

            return res.json(weddingPartyMember);
        }))

        .delete(wrap(function* deleteWeddingPartyMember(req, res) {
            const weddingProfile = yield WeddingProfile.findOne({});

            const weddingPartyMember = weddingProfile.weddingPartyMembers.id(req.params.weddingPartyMemberId);

            if (!weddingPartyMember) {
                return res
                    .status(404)
                    .send();
            }

            weddingPartyMember.remove();

            yield weddingProfile.save();

            return res
                .status(204)
                .send();
        }));

    return router;
};
