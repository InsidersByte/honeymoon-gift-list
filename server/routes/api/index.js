const expressJwt = require('express-jwt');
const setup = require('./setup');
const signUp = require('./signUp');
const authenticate = require('./authenticate');
const weddingProfile = require('./weddingProfile');
const user = require('./user');
const gift = require('./gift');
const giftSet = require('./giftSet');
const weddingPartyMember = require('./weddingPartyMember');
const section = require('./section');

module.exports = (app, express, config) => {
    const router = new express.Router();

    // TODO: Secure the routes that need securing

    router.use('/setup', setup(app, express, config));
    router.use('/signUp', signUp(app, express, config));
    router.use('/authenticate', authenticate(app, express, config));
    router.use('/weddingProfile', weddingProfile(app, express, config));
    router.use('/section', section(app, express, config));
    router.use('/gift', gift(app, express, config));
    router.use('/giftSet', giftSet(app, express, config));

    router.use(expressJwt({
        secret: config.secret,
    }));

    router.use('/user', user(app, express, config));
    router.use('/weddingPartyMember', weddingPartyMember(app, express, config));

    router.all('/*', (req, res) =>
        res.sendStatus(404)
    );

    return router;
};
