export const HOME_ROUTE = '';
export const confirmationPageRoute = (giftSetId) => `confirmation/${giftSetId}`;

export const ADMIN_ROUTE = '/admin';
export const LOGIN_ROUTE = `${ADMIN_ROUTE}/login`;
export const GIFT_SETS_ROUTE = `${ADMIN_ROUTE}/giftSet`;
export const giftSetRoute = (giftSetId) => `${GIFT_SETS_ROUTE}/${giftSetId}`;
