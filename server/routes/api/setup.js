const User = require('../../models/User');
const wrap = require('../../utilities/wrap');
const { STATUS, MINIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_MESSAGE } = require('../../constants/user');

function* isSetup() {
  const validStatuses = [STATUS.ACTIVE];

  let count = yield User.where('status', 'in', validStatuses).count('id');

  count = parseInt(count, 10);

  return {
    status: !!count,
  };
}

module.exports = ({ express }) => {
  const router = new express.Router();

  router
    .route('/')
    .get(
      wrap(function* getSetup(req, res) {
        const setup = yield isSetup();
        return res.json(setup);
      })
    )
    .post(
      wrap(function* createUser(req, res) {
        const setup = yield isSetup();

        if (setup.status) {
          return res.status(400).send({ message: 'Setup has already been completed.' });
        }

        req.checkBody('name').notEmpty();
        req.checkBody('email').isEmail();
        req.checkBody('password', MINIMUM_PASSWORD_MESSAGE).isLength({ min: MINIMUM_PASSWORD_LENGTH });
        req.checkBody('confirmPassword').equals(req.body.confirmPassword);

        const errors = req.validationErrors();

        if (errors) {
          return res.status(400).send(errors);
        }

        const { name, email, password } = req.body;

        const user = new User({ name, email, password, status: STATUS.ACTIVE });

        yield user.save();

        return res.status(201).json(user);
      })
    );

  return router;
};
