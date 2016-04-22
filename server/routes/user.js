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
            req.checkBody('password').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const user = new User();

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

            return res.json(user);
        }));


    router
        .route('/:userId')

        .put((wrap(function* updateUser(req, res) {
            req.checkBody('id').equals(req.params.id);
            req.checkBody('name').notEmpty();
            req.checkBody('username').isEmail();
            req.checkBody('password').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const user = yield User.findById(req.body._id); // eslint-disable-line no-underscore-dangle

            if (!user) {
                return res
                    .status(404)
                    .send();
            }

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

            return res.json(user);
        })))

        .delete(wrap(function* deleteUser(req, res) {
            yield User.remove({ _id: req.params.userId });

            return res
                .status(204)
                .send();
        }));

    return router;
};
