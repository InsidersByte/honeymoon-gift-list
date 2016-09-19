const User = require('../../models/user');
const wrap = require('../../utilities/wrap');
const { STATUS } = require('../../constants/user');

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
        }));

    return router;
};
