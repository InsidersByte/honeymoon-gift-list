const express = require('express');
const environmentConstants = require('./constants/environment');

const environment = process.env.NODE_ENV || environmentConstants.development;

if (environment === environmentConstants.development) {
    require('dotenv').config({ silent: true }); // eslint-disable-line global-require
}

const app = express();

const config = require('./config/config');

require('./config/express')(app, environment);

require('./config/mongoose')(config);

require('./routes/index')(app, express, config, environment);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
