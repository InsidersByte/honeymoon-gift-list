const express = require('express');
const values = require('object.values');
const environmentConstants = require('./constants/environment');

if (!Object.values) {
    values.shim();
}

const environment = process.env.NODE_ENV || environmentConstants.DEVELOPMENT;
process.env.NODE_ENV = environment;

require('dotenv').config({ silent: true });

const app = express();

const config = require('./config');

require('./config/express')({ app, environment });
require('./routes')({ app, express, config, environment });

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`); // eslint-disable-line no-console
});
