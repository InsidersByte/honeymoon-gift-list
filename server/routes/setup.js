const User = require('../models/user');
const wrap = require('../utilities/wrap');

module.exports = (app, express) => {
    const router = new express.Router();

    router.route('/')
        .post(wrap(function* createUser(req, res) {
            const userCount = yield User.count({});

            if (userCount >= 1) {
                return res
                    .status(400)
                    .send({ success: false, message: 'Setup has already been run' });
            }

            req.checkBody('name').notEmpty();
            req.checkBody('username').isEmail();
            req.checkBody('password').notEmpty().equals(req.body.confirmPassword);

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const user = new User();

            // mongoose UserSchema calls .toLowerCase() on user.name
            user.name = req.body.name;
            user.username = req.body.username;
            user.password = req.body.password;

            try {
                yield user.save();
            } catch (err) {
                if (err.code === 11000) {
                    return res
                        .status(400)
                        .json({ success: false, message: 'A user with that username already exists.' });
                }

                return res
                    .status(400)
                    .send(err);
            }

            return res.json({ message: 'User created!' });
        }));

    return router;
};
