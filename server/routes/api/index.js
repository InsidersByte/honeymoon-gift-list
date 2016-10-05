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

module.exports = ({ express, config }) => {
    const router = new express.Router();

    const secure = expressJwt({ secret: config.secret });

    router.use('/setup', setup({ express, config }));
    router.use('/signUp', signUp({ express, config }));
    router.use('/authenticate', authenticate({ express, config }));
    router.use('/weddingProfile', weddingProfile({ express, config, secure }));
    router.use('/section', section({ express, config, secure }));
    router.use('/gift', gift({ express, config, secure }));
    router.use('/giftSet', giftSet({ express, config, secure }));

    router.use(secure);

    router.use('/user', user({ express, config }));
    router.use('/weddingPartyMember', weddingPartyMember({ express, config }));

    router.all('/*', (req, res) =>
        res.sendStatus(404)
    );

    return router;
};
