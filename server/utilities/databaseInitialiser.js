const WeddingProfile = require('../models/weddingProfile');
const co = require('co');

module.exports = co.wrap(function* initialise() {
    const profileCount = yield WeddingProfile.count({});

    if (profileCount >= 1) {
        return;
    }

    const comingSoonText = 'Coming Soon!';

    const weddingProfile = new WeddingProfile({
        cover: {
            title: 'Our Wedding',
            imageUrl: 'http://www.thejollysailorsouthsea.co.uk/js/plugins/imagemanager/files/Wedding_-_Image_1.jpg',
            weddingDate: Date.now(),
        },
        aboutUs: comingSoonText,
        aboutOurDay: comingSoonText,
        localFlavour: comingSoonText,
        onTheDay: comingSoonText,
        weddingPlaylist: comingSoonText,
        aboutOurHoneymoon: comingSoonText,
        honeymoonGiftList: {
            content: comingSoonText,
            showPaymentMessage: comingSoonText,
            paymentMessage: false,
            showOfflinePaymentMessage: false,
            offlinePaymentMessage: comingSoonText,
            showDisclaimerMessage: false,
            disclaimerMessage: comingSoonText,
        },
        rsvp: comingSoonText,
        weddingPartyMembers: [],
    });

    yield weddingProfile.save();

    console.log('Database Initialised!');
});
