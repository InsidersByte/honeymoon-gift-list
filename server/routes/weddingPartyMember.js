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

        .post(wrap(function* createWeddingPartyMember(/* req, res */) {
            throw new Error('not yet implemented');
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
