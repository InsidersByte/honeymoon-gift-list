const expressJwt = require('express-jwt');
const setup = require('./setup');
const signUp = require('./signUp');
const authenticate = require('./authenticate');
const weddingProfile = require('./weddingProfile');
const gift = require('./gift');
const user = require('./user');
const honeymoonGiftList = require('./honeymoonGiftList');
const honeymoonGiftListItem = require('./honeymoonGiftListItem');
const giftSet = require('./giftSet');
const weddingPartyMember = require('./weddingPartyMember');

module.exports = (app, express, config) => {
    const router = new express.Router();

    router.use('/setup', setup(app, express, config));
    router.use('/signUp', signUp(app, express, config));
    router.use('/authenticate', authenticate(app, express, config));
    router.use('/weddingProfile', weddingProfile(app, express));
    router.use('/gift', gift(app, express, config));

    router.use(expressJwt({
        secret: config.secret,
    }));

    router.use('/user', user(app, express));
    router.use('/honeymoonGiftList', honeymoonGiftList(app, express));
    router.use('/honeymoonGiftListItem', honeymoonGiftListItem(app, express));
    router.use('/giftSet', giftSet(app, express));
    router.use('/weddingPartyMember', weddingPartyMember(app, express));

    router.all('/*', (req, res) =>
        res.sendStatus(404)
    );

    return router;
};
