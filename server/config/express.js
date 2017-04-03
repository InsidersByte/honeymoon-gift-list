const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const environmentConstants = require('../constants/environment');
const paths = require('../../config/paths');

module.exports = ({ app, environment }) => {
  if (environment !== environmentConstants.PRODUCTION) {
    app.use(require('morgan')('dev')); // eslint-disable-line global-require, import/no-extraneous-dependencies
    app.use(require('errorhandler')()); // eslint-disable-line global-require, import/no-extraneous-dependencies
  }

  app.disable('x-powered-by');
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(expressValidator());

  if (environment === environmentConstants.PRODUCTION) {
    app.use(express.static(paths.appBuild));
  } else {
    const webpack = require('webpack'); // eslint-disable-line global-require, import/no-extraneous-dependencies
    const webpackMiddleware = require('webpack-dev-middleware'); // eslint-disable-line global-require, import/no-extraneous-dependencies
    const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line global-require, import/no-extraneous-dependencies
    const config = require('../../config/webpack.config.dev.js'); // eslint-disable-line global-require, import/no-extraneous-dependencies

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
