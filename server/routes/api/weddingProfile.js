const WeddingProfile = require('../../models/WeddingProfile');
// const HoneymoonGiftListItem = require('../../models/honeymoonGiftListItem');
const wrap = require('../../utilities/wrap');

module.exports = (app, express) => {
    const router = new express.Router();

    router
        .route('/')

        .get(wrap(function* getWeddingProfile(req, res) {
            const weddingProfile = yield WeddingProfile
                .forge({})
                .fetch();

            return res.json(weddingProfile);
        }))

        .put(wrap(function* updateWeddingProfile(req, res) {
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

        // .get(wrap(function* getWeddingProfile(req, res) {
        //     const weddingProfile = yield WeddingProfile.findOne({}).lean();
        //
        //     if (!weddingProfile) {
        //         return res.status(404).send();
        //     }
        //
        //     const weddingPartyMembers = weddingProfile.weddingPartyMembers || [];
        //     weddingProfile.weddingPartyMembers = weddingPartyMembers.sort((a, b) => a.position - b.position);
        //
        //     const honeymoonGiftList = yield HoneymoonGiftListItem
        //         .find({})
        //         .populate('gifts', 'quantity')
        //         .sort('position')
        //         .lean()
        //         .exec();
        //
        //     for (const honeymoonGiftListItem of honeymoonGiftList) {
        //         honeymoonGiftListItem.remaining = honeymoonGiftListItem.requested;
        //
        //         if (!honeymoonGiftListItem.gifts) {
        //             continue;
        //         }
        //
        //         let bought = 0;
        //
        //         for (const gift of honeymoonGiftListItem.gifts) {
        //             bought += gift.quantity;
        //         }
        //
        //         honeymoonGiftListItem.remaining -= bought > honeymoonGiftListItem.remaining ? honeymoonGiftListItem.remaining : bought;
        //     }
        //
        //     weddingProfile.honeymoonGiftListItems = honeymoonGiftList;
        //
        //     return res.json(weddingProfile);
        // }));

    return router;
};
