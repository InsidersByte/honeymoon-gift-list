export const HOME_ROUTE = '';
export const confirmationPageRoute = giftSetId => `confirmation/${giftSetId}`;
export const BASKET_ROUTE = 'basket';
export const GIVER_ROUTE = 'giver';

export const ADMIN_ROUTE = '/admin';
export const LOGIN_ROUTE = `${ADMIN_ROUTE}/login`;

export const COVER_ROUTE = `${ADMIN_ROUTE}/cover`;
export const ABOUT_US_ROUTE = `${ADMIN_ROUTE}/aboutUs`;
export const RSVP_ROUTE = `${ADMIN_ROUTE}/rsvp`;
export const ABOUT_OUR_DAY_ROUTE = `${ADMIN_ROUTE}/aboutOurDay`;
export const LOCAL_FLAVOUR_ROUTE = `${ADMIN_ROUTE}/localFlavour`;
export const ON_THE_DAY_ROUTE = `${ADMIN_ROUTE}/onTheDay`;
export const WEDDING_PLAYLIST_ROUTE = `${ADMIN_ROUTE}/weddingPlaylist`;
export const ABOUT_OUR_HONEYMOON_ROUTE = `${ADMIN_ROUTE}/aboutOurHoneymoon`;
export const HONEYMOON_GIFT_LIST_ROUTE = `${ADMIN_ROUTE}/honeymoonGiftList`;
export const HONEYMOON_GIFT_LIST_ITEM_ROUTE = `${ADMIN_ROUTE}/honeymoonGiftListItem`;
export const USERS_ROUTE = `${ADMIN_ROUTE}/users`;

export const GIFT_SETS_ROUTE = `${ADMIN_ROUTE}/giftSet`;
export const giftSetRoute = giftSetId => `${GIFT_SETS_ROUTE}/${giftSetId}`;

export const WEDDING_PARTY_MEMBERS_ROUTE = `${ADMIN_ROUTE}/weddingPartyMember`;
export const CREATE_WEDDING_PARTY_MEMBER_ROUTE = `${WEDDING_PARTY_MEMBERS_ROUTE}/create`;
export const updateWeddingPartyMemberRoute = memberId => `${WEDDING_PARTY_MEMBERS_ROUTE}/${memberId}`;
