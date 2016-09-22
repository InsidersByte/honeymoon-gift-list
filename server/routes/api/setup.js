const User = require('../../models/user');
const wrap = require('../../utilities/wrap');
const { STATUS, MINIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_MESSAGE } = require('../../constants/user');

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
            req.checkBody('password', MINIMUM_PASSWORD_MESSAGE).isLength({ min: MINIMUM_PASSWORD_LENGTH });
            req.checkBody('confirmPassword').equals(req.body.confirmPassword);

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
            user.status = STATUS.ACTIVE;

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
