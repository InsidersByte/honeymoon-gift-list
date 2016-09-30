const User = require('../../models/User');
const wrap = require('../../utilities/wrap');
const { STATUS, MINIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_MESSAGE } = require('../../constants/user');

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/:token')

        .get(wrap(function* getUser(req, res) {
            const { token } = req.params;

            const user = yield User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() },
            });

            if (!user) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Invitation is invalid or has expired.',
                    });
            }

            return res.json(user);
        }))

        .put(wrap(function* updateUser(req, res) {
            req.checkBody('name').notEmpty();
            req.checkBody('password', MINIMUM_PASSWORD_MESSAGE).isLength({ min: MINIMUM_PASSWORD_LENGTH });
            req.checkBody('confirmPassword').equals(req.body.confirmPassword);

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const { params: { token }, body: { name, password } } = req;

            const user = yield User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() },
            });

            if (!user) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Invitation is invalid or has expired.',
                    });
            }

            user.name = name;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.password = password;
            user.status = STATUS.ACTIVE;

            yield user.save();

            return res.json(user);
        }));

    return router;
};
