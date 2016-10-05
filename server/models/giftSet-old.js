const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GiftSetSchema = new Schema(
    {
        paid: { type: Boolean, default: false },
        emailSent: { type: Boolean, default: false },
        detailsSent: { type: Boolean, default: false },
        gifts: [{ type: Schema.Types.ObjectId, ref: 'Gift' }],
        giver: { type: Schema.Types.ObjectId, ref: 'Giver' },
        paymentMethod: { type: Schema.Types.String, required: true },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    });

GiftSetSchema.pre('remove', function preRemove(next) {
    this.model('Giver').update(
        { giftSets: this.id },
        { $pull: { giftSets: this.id } },
        { multi: true },
        next
    );
});

GiftSetSchema
    .virtual('total')
    .get(function calculateTotal() {
        if (this.populated('gifts') === undefined) {
            // gifts have not been populated so cannot calculate the total
            return undefined;
        }

        let total = 0;

        for (const gift of this.gifts) {
            total += gift.total;
        }

        return total;
    });

module.exports = mongoose.model('GiftSet', GiftSetSchema);
