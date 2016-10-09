const uuid = require('uuid');
const User = require('../../models/User');
const wrap = require('../../utilities/wrap');
const { STATUS, MINIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_MESSAGE } = require('../../constants/user');
const Mailer = require('../../mail');
const { ONE_DAY_MS } = require('../../constants');

const mailer = new Mailer();

module.exports = ({ express }) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getUsers(req, res) {
            const users = yield User.fetchAll();
            return res.json(users);
        }))

        .post(wrap(function* createUser(req, res) {
            req.checkBody('email').isEmail();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const { email } = req.body;

            let user;
            const existingUser = yield User
                .forge({ email })
                .fetch();

            if (existingUser) {
                const status = existingUser.get('status');

                if (status !== STATUS.INVITED && status !== STATUS.INVITE_PENDING) {
                    return res
                        .status(400)
                        .json({ message: 'This user has already registered.' });
                }

                user = existingUser;
            } else {
                user = new User({
                    email,
                    password: uuid.v4(),
                    status: STATUS.INVITED,
                });

                yield user.save();
            }

            try {
                const resetPasswordToken = uuid.v4();

                user.set({
                    resetPasswordToken,
                    resetPasswordExpires: Date.now() + (ONE_DAY_MS * 14),
                });

                yield user.save();

                const { name } = req.user;

                yield mailer.send(
                    {
                        to: email,
                        subject: `${name} has invited you to join Our Wedding Heroes`,
                        signUpUrl: `http://${req.headers.host}/admin/signup/${resetPasswordToken}`,
                        inviter: req.user,
                        invitee: user.toJSON(),
                    },
                    'inviteUser'
                );
            } catch (error) {
                user.set({ status: STATUS.INVITE_PENDING });
                yield user.save();
                throw error;
            }

            if (user.get('status') === STATUS.INVITE_PENDING) {
                user.set({ status: STATUS.INVITED });
                yield user.save();
            }

            return res
                .status(201)
                .json(user);
        }));

    router
        .route('/password')

        .put(wrap(function* changePassword(req, res) {
            req.checkBody('currentPassword').notEmpty();
            req.checkBody('newPassword', MINIMUM_PASSWORD_MESSAGE).isLength({ min: MINIMUM_PASSWORD_LENGTH });
            req.checkBody('confirmPassword').equals(req.body.confirmPassword);

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const { email } = req.user;

            const user = yield User
                .forge({ email })
                .fetch();

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

            user.set({ password: req.body.newPassword });

            yield user.save();

            return res.json({ message: 'Password Changed Successfully!' });
        }));

    router
        .route('/:id')

        .delete(wrap(function* deleteUser(req, res) {
            const { id } = req.params;

            const user = yield User
                .forge({ id })
                .fetch();

            if (!user) {
                return res
                    .status(404)
                    .send();
            }

            if (user.get('email') === req.user.email) {
                return res
                    .status(400)
                    .json({ message: 'You cannot delete yourself!' });
            }

            yield user.destroy();

            return res
                .status(204)
                .send();
        }));

    return router;
};
