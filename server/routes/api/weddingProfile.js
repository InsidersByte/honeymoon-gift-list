const WeddingProfile = require('../../models/WeddingProfile');
const wrap = require('../../utilities/wrap');

module.exports = ({ express, secure }) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getWeddingProfile(req, res) {
            const weddingProfile = yield WeddingProfile
                .forge({})
                .fetch();

            return res.json(weddingProfile);
        }))

        .put(secure, wrap(function* updateWeddingProfile(req, res) {
            req.checkBody('coverTitle').notEmpty();
            req.checkBody('coverImageUrl').isURL();
            req.checkBody('weddingDate').isDate();
            req.checkBody('giftListContent').notEmpty();
            req.sanitizeBody('showPaymentMessage').toBoolean();
            req.sanitizeBody('showDisclaimerMessage').toBoolean();

            const errors = req.validationErrors();

            if (errors) {
                return res
                    .status(400)
                    .send(errors);
            }

            const weddingProfile = yield WeddingProfile
                .forge({})
                .fetch();

            if (!weddingProfile) {
                return res
                    .status(404)
                    .send();
            }

            const {
                coverTitle, coverImageUrl, weddingDate, giftListContent, showPaymentMessage, paymentMessage, showDisclaimerMessage, disclaimerMessage,
            } = req.body;

            weddingProfile.set({
                coverTitle, coverImageUrl, weddingDate, giftListContent, showPaymentMessage, paymentMessage, showDisclaimerMessage, disclaimerMessage,
            });

            yield weddingProfile.save();

            return res.json(weddingProfile);
        }));

    return router;
};
