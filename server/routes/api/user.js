const uuid = require('uuid');
const User = require('../../models/user');
const wrap = require('../../utilities/wrap');
const { STATUS, MINIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_MESSAGE } = require('../../constants/user');
const Mailer = require('../../mail/index');
const { ONE_DAY_MS } = require('../../constants');

const mailer = new Mailer();

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getUsers(req, res) {
            const users = yield User.find({});
            return res.json(users);
        }))

        .post(wrap(function* createUser(req, res) {
            req.checkBody('username').isEmail();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            let user;
            const existingUser = yield User.findOne({ username: req.body.username.toLowerCase() });

            if (existingUser) {
                if (existingUser.status !== STATUS.INVITED && existingUser.status !== STATUS.INVITE_PENDING) {
                    return res
                        .status(400)
                        .json({ message: 'This user has already registered.' });
                }

                user = existingUser;
            } else {
                user = new User();

                // mongoose UserSchema calls .toLowerCase() on user.name
                user.username = req.body.username;
                user.password = uuid.v4;
                user.status = STATUS.INVITED;

                try {
                    yield user.save();
                } catch (error) {
                    if (error.code === 11000) {
                        return res
                            .status(400)
                            .json({ message: 'A user with that username already exists.' });
                    }

                    throw error;
                }
            }

            try {
                user.resetPasswordToken = uuid.v4();
                user.resetPasswordExpires = Date.now() + (ONE_DAY_MS * 14);

                yield user.save();

                const { user: { name } } = req;

                yield mailer.send(
                    {
                        to: user.username,
                        subject: `${name} has invited you to join Our Wedding Heroes`,
                        signUpUrl: `http://${req.headers.host}/admin/signup/${user.resetPasswordToken}`,
                        inviter: req.user,
                        invitee: user,
                    },
                    'inviteUser'
                );
            } catch (error) {
                user.status = STATUS.INVITE_PENDING;
                yield user.save();
                throw error;
            }

            if (user.status === STATUS.INVITE_PENDING) {
                user.status = STATUS.INVITED;
                yield user.save();
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
            req.checkBody('newPassword', MINIMUM_PASSWORD_MESSAGE).isLength({ min: MINIMUM_PASSWORD_LENGTH });
            req.checkBody('confirmPassword').equals(req.body.confirmPassword);

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

            return res.json({ message: 'Password Changed Successfully!' });
        }));

    router
        .route('/:userId')

        .delete(wrap(function* deleteUser(req, res) {
            const user = yield User.findById(req.params.userId);

            if (!user) {
                return res
                    .status(404)
                    .send();
            }

            if (user.username === req.user.username) {
                return res
                    .status(400)
                    .json({ message: 'You cannot delete yourself!' });
            }

            yield user.remove();

            return res
                .status(204)
                .send();
        }));

    return router;
};
