const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weddingPartyMember = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    position: { type: Number, required: true, index: { unique: true } },
});

const WeddingProfileSchema = new Schema({
    cover: {
        title: { type: String, required: true },
        imageUrl: { type: String, required: true },
        weddingDate: { type: Date, required: true },
    },
    aboutUs: { type: String, required: true },
    aboutOurDay: { type: String, required: true },
    localFlavour: { type: String, required: true },
    onTheDay: { type: String, required: true },
    weddingPlaylist: { type: String, required: true },
    aboutOurHoneymoon: { type: String, required: true },
    honeymoonGiftList: {
        content: { type: String, required: true },
        showOfflinePaymentMessage: { type: Boolean, required: true },
        offlinePaymentMessage: { type: String },
        showDisclaimerMessage: { type: Boolean, required: true },
        disclaimerMessage: { type: String },
    },
    rsvp: { type: String, required: true },
    weddingPartyMembers: [weddingPartyMember],
});

module.exports = mongoose.model('WeddingProfile', WeddingProfileSchema);
