export const HOME_ROUTE = '';
export const confirmationPageRoute = (giftSetId) => `confirmation/${giftSetId}`;

export const ADMIN_ROUTE = '/admin';
export const LOGIN_ROUTE = `${ADMIN_ROUTE}/login`;

export const GIFT_SETS_ROUTE = `${ADMIN_ROUTE}/giftSet`;
export const giftSetRoute = (giftSetId) => `${GIFT_SETS_ROUTE}/${giftSetId}`;

export const WEDDING_PARTY_MEMBERS_ROUTE = `${ADMIN_ROUTE}/weddingPartyMember`;
export const CREATE_WEDDING_PARTY_MEMBER_ROUTE = `${WEDDING_PARTY_MEMBERS_ROUTE}/create`;
