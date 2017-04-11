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

export type UserType = {
  +id: number,
  +name: string,
  +email: string,
  +status: 'active' | 'invite_pending' | 'invited',
};

export type UsersType = Array<UserType>;

export type SectionIdType = number;

export type SectionType = {
  +id: SectionIdType,
  +title: string,
  +hidden: boolean,
  +position: number,
};

export type SectionsType = Array<SectionType>;

export type AuthUser = {
  +email: string,
};

export type SectionsStateType = {
  +isLoading: boolean,
  +isSaving: boolean,
  +isDeleting: boolean,
  +sections: SectionsType,
};

export type UsersStateType = {
  +isModalOpen: boolean,
  +isLoading: boolean,
  +isSaving: boolean,
  +isDeleting: boolean,
  +users: UsersType,
};

export type StateType = {
  +auth: {
    +user: AuthUser,
    +isAuthenticated: boolean,
    +saving: boolean,
  },
  +basket: BasketType,
  +giftSet: GiftSetType,
  +notifications: NotificationsType,
  +users: UsersStateType,
};

export type ActionType =
  // Notification Actions
  | { type: 'our-wedding-heroes/notifications/SUCCESS_NOTIFICATION', +payload: { +message: string } }
  | { type: 'our-wedding-heroes/notifications/ERROR_NOTIFICATION', +payload: { +message: string } }
  | { type: 'our-wedding-heroes/notifications/HIDE_NOTIFICATION', +payload: { +id: string } }
  // Basket Actions
  | { type: 'our-wedding-heroes/basket/ADD_TO_BASKET', +payload: GiftType }
  | { type: 'our-wedding-heroes/basket/REMOVE_FROM_BASKET', +payload: GiftType }
  | { type: 'our-wedding-heroes/basket/DELETE_FROM_BASKET', +payload: GiftType }
  | { type: 'our-wedding-heroes/basket/EMPTY_BASKET' }
  // Users Actions
  | { type: 'our-wedding-heroes/users/OPEN_USER_MODAL' }
  | { type: 'our-wedding-heroes/users/CLOSE_USER_MODAL' }
  | { type: 'our-wedding-heroes/users/LOAD_USERS_REQUEST' }
  | { type: 'our-wedding-heroes/users/LOAD_USERS_SUCCESS', +payload: UsersType }
  | { type: 'our-wedding-heroes/users/LOAD_USERS_ERROR' }
  | { type: 'our-wedding-heroes/users/CREATE_USER_REQUEST' }
  | { type: 'our-wedding-heroes/users/CREATE_USER_SUCCESS', +payload: UserType }
  | { type: 'our-wedding-heroes/users/CREATE_USER_ERROR' }
  | { type: 'our-wedding-heroes/users/DELETE_USER_REQUEST', +payload: UserType }
  | { type: 'our-wedding-heroes/users/DELETE_USER_SUCCESS' }
  | { type: 'our-wedding-heroes/users/DELETE_USER_ERROR' }
  | { type: 'our-wedding-heroes/users/CHANGE_PASSWORD_REQUEST' }
  | { type: 'our-wedding-heroes/users/CHANGE_PASSWORD_SUCCESS' }
  | { type: 'our-wedding-heroes/users/CHANGE_PASSWORD_ERROR' }
  // Sections Actions
  | { type: 'our-wedding-heroes/sections/LOAD_SECTIONS_REQUEST' }
  | { type: 'our-wedding-heroes/sections/LOAD_SECTIONS_SUCCESS', +payload: SectionsType }
  | { type: 'our-wedding-heroes/sections/LOAD_SECTIONS_ERROR' }
  | { type: 'our-wedding-heroes/sections/LOAD_SECTION_REQUEST' }
  | { type: 'our-wedding-heroes/sections/LOAD_SECTION_SUCCESS', +payload: SectionType }
  | { type: 'our-wedding-heroes/sections/LOAD_SECTION_ERROR' }
  | { type: 'our-wedding-heroes/sections/CREATE_SECTION_REQUEST' }
  | { type: 'our-wedding-heroes/sections/CREATE_SECTION_SUCCESS', +payload: SectionType }
  | { type: 'our-wedding-heroes/sections/CREATE_SECTION_ERROR' }
  | { type: 'our-wedding-heroes/sections/UPDATE_SECTION_REQUEST' }
  | { type: 'our-wedding-heroes/sections/UPDATE_SECTION_SUCCESS', +payload: SectionType }
  | { type: 'our-wedding-heroes/sections/UPDATE_SECTION_ERROR' }
  | { type: 'our-wedding-heroes/sections/DELETE_SECTION_REQUEST', +payload: SectionType }
  | { type: 'our-wedding-heroes/sections/DELETE_SECTION_SUCCESS' }
  | { type: 'our-wedding-heroes/sections/DELETE_SECTION_ERROR' }
  | { type: 'our-wedding-heroes/sections/MOVE_SECTION', +payload: { sourceId: SectionIdType, targetId: SectionIdType } };

export type StoreType = ReduxStore<StateType, ActionType>;
export type DispatchType = ReduxDispatch<ActionType>;
