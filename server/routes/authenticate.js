const jwt = require('jsonwebtoken');
const User = require('../models/user');
const wrap = require('../utilities/wrap');
const uuid = require('uuid');
const Mailer = require('../mail');
const mailer = new Mailer();

module.exports = (app, express, config) => {
    const router = new express.Router();

    router.post('/', wrap(function* authenticate(req, res) {
        req.checkBody('username').isEmail();
        req.checkBody('password').notEmpty();

        const errors = req.validationErrors();

        if (errors) {
            return res
                .status(400)
                .send(errors);
        }

        // mongoose constrains user.name toLowerCase()
        const user = yield User
            .findOne({
                username: req.body.username.toLowerCase(),
            })
            .select('name username password salt')
            .exec();

        if (!user) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Authentication failed.',
                });
        }

        const validPassword = user.comparePassword(req.body.password);

        if (!validPassword) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Authentication failed.',
                });
        }

        const token = jwt.sign(
            {
                name: user.name,
                username: user.username,
            },
            config.secret,
            {
                expiresIn: 86400, // expires in 24 hours
            }
        );

        user.lastLogin = Date.now();
        yield user.save();

        return res.json({
            success: true,
            message: 'Enjoy your token!',
            token,
        });
    }));

    router
        .route('/resetPassword')

        .post(wrap(function* resetPassword(req, res) {
            req.checkBody('username').isEmail();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const user = yield User.findOne({
                username: req.body.username,
            });

            if (!user) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: 'There is no user with that email address.',
                    });
            }

            user.resetPasswordToken = uuid.v4();
            user.resetPasswordExpires = Date.now() + 86400000; // expires in 24 hours

            yield user.save();

            yield mailer.send(
                {
                    to: user.username,
                    subject: 'Reset Password',
                    resetUrl: `http://${req.headers.host}/admin/reset/${user.resetPasswordToken}`,
                },
                'resetPassword'
            );

            return res.json({
                message: `A email has been sent to ${user.username} with further instructions.`,
            });
        }));

    router
        .route('/resetPassword/:token')

        .put(wrap(function* resetPassword(req, res) {
            req.checkBody('token').equals(req.params.token);
            req.checkBody('password').notEmpty();
            req.checkBody('confirmPassword').equals(req.body.password);

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const user = yield User.findOne({
                resetPasswordToken: req.body.token,
                resetPasswordExpires: { $gt: Date.now() },
            });

            if (!user) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Password reset token is invalid or has expired.',
                    });
            }

            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.password = req.body.password;

            yield user.save();

            yield mailer.send(
                {
                    to: user.username,
                    subject: 'Your password has been changed',
                },
                'resetPasswordConfirmation'
            );

            return res.json({
                message: 'Password Reset Successfully!',
            });
        }));

    return router;
};
