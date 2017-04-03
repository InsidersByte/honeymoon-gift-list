/* @flow */

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';

export type ItemType = {
    +id: number,
    +name: string,
    +imageUrl: string,
    +price: number,
    +quantity: number,
    +remaining: number,
    +total: number,
};

export type BasketType = Map<number, ItemType>;

export type GiftType = {
    +id: number,
    +remaining: number,
};

export type GiftSetType = {
    +paymentMethod: string,
    +paypalLink: string,
};

export type NotificationLevelType = 'success' | 'error';

export type NotificationType = {
    +id: string,
    +message: string,
    +position: 'bl',
    +show: boolean,
    +level: NotificationLevelType,
};

export type NotificationsType = Array<NotificationType>;

export type StateType = {
    +basket: BasketType,
    +giftSet: GiftSetType,
    +notifications: NotificationsType,
};

export type ActionType =
    { type: 'our-wedding-heroes/notifications/SUCCESS_NOTIFICATION', +payload: { +message: string } } |
    { type: 'our-wedding-heroes/notifications/ERROR_NOTIFICATION', +payload: { +message: string } } |
    { type: 'our-wedding-heroes/notifications/HIDE_NOTIFICATION', +payload: { +id: string } } |

    { type: 'our-wedding-heroes/basket/ADD_TO_BASKET', +payload: GiftType } |
    { type: 'our-wedding-heroes/basket/REMOVE_FROM_BASKET', +payload: GiftType } |
    { type: 'our-wedding-heroes/basket/DELETE_FROM_BASKET', +payload: GiftType } |
    { type: 'our-wedding-heroes/basket/EMPTY_BASKET' }
;

export type StoreType = ReduxStore<StateType, ActionType>;
export type DispatchType = ReduxDispatch<ActionType>;
