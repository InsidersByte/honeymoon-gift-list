const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiftSchema = new Schema(
    {
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        honeymoonGiftListItem: { type: Schema.Types.ObjectId, ref: 'HoneymoonGiftListItem' },
        giftSet: { type: Schema.Types.ObjectId, ref: 'GiftSet' },
    },
    {
        toJSON: {
            virtuals: true,
        },
    });

GiftSchema.pre('remove', function preRemove(next) {
    const giftSetPromise = this.model('GiftSet').update(
        { gifts: this._id }, // eslint-disable-line no-underscore-dangle
        { $pull: { gifts: this._id } }, // eslint-disable-line no-underscore-dangle
        { multi: true }
    );

    const honeymoonGiftListItemPromise = this.model('HoneymoonGiftListItem').update(
        { gifts: this._id }, // eslint-disable-line no-underscore-dangle
        { $pull: { gifts: this._id } }, // eslint-disable-line no-underscore-dangle
        { multi: true }
    );

    Promise
        .all([giftSetPromise, honeymoonGiftListItemPromise])
        .then(next);
});

GiftSchema
    .virtual('total')
    .get(function calculateTotal() {
        return this.quantity * this.price;
    });

module.exports = mongoose.model('Gift', GiftSchema);
