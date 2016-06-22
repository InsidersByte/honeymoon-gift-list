const User = require('../models/user');
const wrap = require('../utilities/wrap');

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getUsers(req, res) {
            const users = yield User.find({});
            return res.json(users);
        }))

        .post(wrap(function* createUser(req, res) {
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
            } catch (error) {
                if (error.code === 11000) {
                    return res
                        .status(400)
                        .json({ success: false, message: 'A user with that username already exists.' });
                }
            }

            return res
                .status(201)
                .json(user);
        }));

    router
        .route('/password')

        .put(wrap(function* resetPassword(req, res) {
            req.checkBody('username').notEmpty();
            req.checkBody('currentPassword').notEmpty();
            req.checkBody('newPassword').notEmpty().equals(req.body.confirmPassword);

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            if (req.user.username !== req.body.username) {
                return res.status(401).send();
            }

            const user = yield User
                .findOne({
                    username: req.body.username,
                })
                .select('name username password salt')
                .exec();

            if (!user) {
                return res
                    .status(404)
                    .send();
            }

            const validPassword = user.comparePassword(req.body.currentPassword);

            if (!validPassword) {
                return res
                    .status(400)
                    .json({ message: 'Your password is incorrect.' });
            }

            user.password = req.body.newPassword;

            yield user.save();

            return res.json({
                message: 'Password Changed Successfully!',
            });
        }));

    router
        .route('/:userId')

        .delete(wrap(function* deleteUser(req, res) {
            yield User.remove({ _id: req.params.userId });

            return res
                .status(204)
                .send();
        }));

    return router;
};
