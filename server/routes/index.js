const environmentConstants = require('../constants/environment');
const path = require('path');
const api = require('./api');

module.exports = (app, express, config, environment) => {
    const apiRoutes = api(app, express, config);

    app.use('/api', apiRoutes);

    if (environment === environmentConstants.PRODUCTION) {
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../../', 'dist/index.html'));
        });
    } else {
        const middleware = app.get('middleware');

        app.get('*', (req, res) => {
            res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../../', 'build/index.html')));
            res.end();
        });
    }
};
