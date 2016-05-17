const expressJwt = require('express-jwt');

module.exports = (app, express, config) => {
    const router = new express.Router();

    router.use('/setup', require('./setup')(app, express, config)); // eslint-disable-line global-require
    router.use('/authenticate', require('./authenticate')(app, express, config)); // eslint-disable-line global-require
    router.use('/weddingProfile', require('./weddingProfile')(app, express)); // eslint-disable-line global-require
    router.use('/gift', require('./gift')(app, express, config)); // eslint-disable-line global-require

    router.use(expressJwt({
        secret: config.secret,
    }));

    router.use('/user', require('./user')(app, express)); // eslint-disable-line global-require
    router.use('/landing', require('./landing')(app, express)); // eslint-disable-line global-require
    router.use('/cover', require('./cover')(app, express)); // eslint-disable-line global-require
    router.use('/aboutUs', require('./aboutUs')(app, express)); // eslint-disable-line global-require
    router.use('/aboutOurDay', require('./aboutOurDay')(app, express)); // eslint-disable-line global-require
    router.use('/localFlavour', require('./localFlavour')(app, express)); // eslint-disable-line global-require
    router.use('/onTheDay', require('./onTheDay')(app, express)); // eslint-disable-line global-require
    router.use('/weddingPlaylist', require('./weddingPlaylist')(app, express)); // eslint-disable-line global-require
    router.use('/aboutOurHoneymoon', require('./aboutOurHoneymoon')(app, express)); // eslint-disable-line global-require
    router.use('/honeymoonGiftList', require('./honeymoonGiftList')(app, express)); // eslint-disable-line global-require
    router.use('/honeymoonGiftListItem', require('./honeymoonGiftListItem')(app, express)); // eslint-disable-line global-require
    router.use('/rsvp', require('./rsvp')(app, express)); // eslint-disable-line global-require
    router.use('/giftSet', require('./giftSet')(app, express)); // eslint-disable-line global-require
    router.use('/weddingPartyMember', require('./weddingPartyMember')(app, express)); // eslint-disable-line global-require

    router.all('/*', (req, res) =>
        res.sendStatus(404)
    );

    return router;
};
