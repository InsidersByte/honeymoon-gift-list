const express = require('express');
const mongoose = require('mongoose');

const environment = process.env.NODE_ENV || 'development';

const app = express();

const config = require('./config/config');

mongoose.connect(config.database);

require('./config/express')(app, environment);

require('./config/proxy')(app, environment);

app.listen(config.port, () => {
    console.log('Server running on port ' + config.port); // eslint-disable-line no-console
});
