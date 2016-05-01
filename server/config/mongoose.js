const mongoose = require('mongoose');
const databaseInitialiser = require('../utilities/databaseInitialiser');

module.exports = (config) => {
    mongoose.connect(config.database);

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error...'));

    db.once('open', () => {
        console.log('db opened');
    });

    databaseInitialiser()
        .catch((err) => {
            console.error(err);
        });
};
