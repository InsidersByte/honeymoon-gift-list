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

        const user = yield User
            .findOne({
                username: req.body.username,
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

        const token = jwt.sign({
            name: user.name,
            username: user.username,
        }, config.secret, {
            expiresIn: 86400, // expires in 24 hours
        });

        user.lastLogin = Date.now();
        yield user.save();

        return res.json({
            success: true,
            message: 'Enjoy your token!',
            token,
        });
    }));

    router.post('/resetPassword', wrap(function* resetPassword(req, res) {
        req.checkBody('username').isEmail();

        const user = yield User
            .findOne({
                username: req.body.username,
            })
            .select('name username password salt')
            .exec();

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

    return router;
};
