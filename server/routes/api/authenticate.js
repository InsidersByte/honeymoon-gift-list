const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const wrap = require('../../utilities/wrap');
const Mailer = require('../../mail/index');
const { ONE_DAY_MS } = require('../../constants');
const { MINIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_MESSAGE } = require('../../constants/user');

const mailer = new Mailer();

module.exports = (app, express, config) => {
    const router = new express.Router();

    router.post('/', wrap(function* authenticate(req, res) {
        req.checkBody('email').isEmail();
        req.checkBody('password').notEmpty();

        const errors = req.validationErrors();

        if (errors) {
            return res
                .status(400)
                .send(errors);
        }

        const { email, password } = req.body;

        const user = yield User
            .forge({ email })
            .fetch();

        if (!user) {
            return res
                .status(400)
                .json({ message: 'Authentication failed.' });
        }

        const validPassword = user.comparePassword(password);

        if (!validPassword) {
            return res
                .status(400)
                .json({ message: 'Authentication failed.' });
        }

        const token = jwt.sign(
            {
                name: user.get('name'),
                email: user.get('email'),
            },
            config.secret,
            {
                expiresIn: ONE_DAY_MS,
            }
        );

        return res.json({ token });
    }));

    router
        .route('/resetPassword')

        .post(wrap(function* resetPassword(req, res) {
            req.checkBody('email').isEmail();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const { email } = req.body;

            const user = yield User
                .forge({ email })
                .fetch();

            if (!user) {
                // Send 200 with reset password so that people can't guess the email address
                return res.json({ message: `A email has been sent to ${email} with further instructions.` });
            }

            const resetPasswordToken = uuid.v4();

            user.set({
                resetPasswordToken,
                resetPasswordExpires: Date.now() + ONE_DAY_MS,
            });

            yield user.save();

            yield mailer.send(
                {
                    to: email,
                    subject: 'Reset Password',
                    resetUrl: `http://${req.headers.host}/admin/reset/${resetPasswordToken}`,
                },
                'resetPassword'
            );

            return res.json({ message: `A email has been sent to ${email} with further instructions.` });
        }));

    router
        .route('/resetPassword/:token')

        .put(wrap(function* resetPassword(req, res) {
            req.checkBody('token').equals(req.params.token);
            req.checkBody('password', MINIMUM_PASSWORD_MESSAGE).isLength({ min: MINIMUM_PASSWORD_LENGTH });
            req.checkBody('confirmPassword').equals(req.body.confirmPassword);

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const { token, password } = req.body;

            const user = yield User
                .forge({ resetPasswordToken: token })
                .where('reset_password_expires', '>', Date.now())
                .fetch();

            if (!user) {
                return res
                    .status(400)
                    .json({ message: 'Password reset token is invalid or has expired.' });
            }

            user.set({
                resetPasswordToken: null,
                resetPasswordExpires: null,
                password,
            });

            yield user.save();

            yield mailer.send(
                {
                    to: user.get('email'),
                    subject: 'Your password has been changed',
                },
                'resetPasswordConfirmation'
            );

            return res.json({ message: 'Password Reset Successfully!' });
        }));

    return router;
};
