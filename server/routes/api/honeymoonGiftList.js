const WeddingProfile = require('../../models/weddingProfile');
const wrap = require('../../utilities/wrap');

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getHoneymoonGiftList(req, res) {
            const weddingProfile = yield WeddingProfile.findOne({});
            return res.json(weddingProfile.honeymoonGiftList);
        }))

        .put(wrap(function* updateHoneymoonGiftList(req, res) {
            req.checkBody('content').notEmpty();
            req.sanitizeBody('showPaymentMessage').toBoolean();
            req.sanitizeBody('showDisclaimerMessage').toBoolean();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const weddingProfile = yield WeddingProfile.findOne({});

            weddingProfile.honeymoonGiftList.content = req.body.content;
            weddingProfile.honeymoonGiftList.showPaymentMessage = req.body.showPaymentMessage;
            weddingProfile.honeymoonGiftList.paymentMessage = req.body.paymentMessage;
            weddingProfile.honeymoonGiftList.showDisclaimerMessage = req.body.showDisclaimerMessage;
            weddingProfile.honeymoonGiftList.disclaimerMessage = req.body.disclaimerMessage;

            yield weddingProfile.save();

            return res.json(weddingProfile.honeymoonGiftList);
        }));

    return router;
};
