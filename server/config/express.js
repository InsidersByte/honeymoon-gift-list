const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const expressValidator = require('express-validator');
const environmentConstants = require('../constants/environment');

module.exports = (app, environment) => {
    if (environment !== environmentConstants.production) {
        app.use(logger('dev'));
        app.use(errorhandler());
    }

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(expressValidator());

    if (environment === environmentConstants.production) {
        app.use(express.static('./dist'));
    } else {
        const webpack = require('webpack'); // eslint-disable-line global-require
        const webpackMiddleware = require('webpack-dev-middleware'); // eslint-disable-line global-require
        const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line global-require

        const config = require('../../webpack.config.js'); // eslint-disable-line global-require

        const compiler = webpack(config);
        const middleware = webpackMiddleware(compiler, {
            publicPath: config.output.publicPath,
            stats: {
                colors: true,
                hash: false,
                timings: true,
                chunks: false,
                chunkModules: false,
                modules: false,
            },
        });

        app.set('middleware', middleware);
        app.use(middleware);
        app.use(webpackHotMiddleware(compiler));
    }
};
