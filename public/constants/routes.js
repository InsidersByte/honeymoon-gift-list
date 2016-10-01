export const HOME_ROUTE = '';
export const confirmationPageRoute = giftSetId => `confirmation/${giftSetId}`;
export const BASKET_ROUTE = 'basket';
export const GIVER_ROUTE = 'giver';

export const ADMIN_ROUTE = '/admin';
export const LOGIN_ROUTE = `${ADMIN_ROUTE}/login`;
export const SETUP_ROUTE = `${ADMIN_ROUTE}/setup`;
export const PROFILE_ROUTE = `${ADMIN_ROUTE}/profile`;

export const COVER_ROUTE = `${ADMIN_ROUTE}/cover`;
export const HONEYMOON_GIFT_LIST_ITEM_ROUTE = `${ADMIN_ROUTE}/honeymoonGiftListItem`;
export const USERS_ROUTE = `${ADMIN_ROUTE}/users`;

export const GIFT_SETS_ROUTE = `${ADMIN_ROUTE}/giftSet`;
export const giftSetRoute = giftSetId => `${GIFT_SETS_ROUTE}/${giftSetId}`;

export const WEDDING_PARTY_MEMBERS_ROUTE = `${ADMIN_ROUTE}/weddingPartyMember`;
export const CREATE_WEDDING_PARTY_MEMBER_ROUTE = `${WEDDING_PARTY_MEMBERS_ROUTE}/create`;
export const updateWeddingPartyMemberRoute = memberId => `${WEDDING_PARTY_MEMBERS_ROUTE}/${memberId}`;
