const co = require('co');

module.exports = (generatorFunction) => {
    const promise = co.wrap(generatorFunction);

    return (req, res, next) => promise(req, res, next).catch(next);
};
