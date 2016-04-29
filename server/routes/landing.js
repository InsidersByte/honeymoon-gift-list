const GiftSet = require('../models/giftSet');
const User = require('../models/user');
const wrap = require('../utilities/wrap');

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getLanding(req, res) {
            const user = yield User.findOne({ username: req.user.username });
            const giftSetCount = yield GiftSet.count({ createdAt: { $gt: user.lastLogin } });
            return res.json({ giftSetCount });
        }));

    return router;
};
