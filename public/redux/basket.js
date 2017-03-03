/* @flow */

import { createAction } from 'redux-actions';

const ADD_TO_BASKET = 'our-wedding-heroes/basket/ADD_TO_BASKET';
const REMOVE_FROM_BASKET = 'our-wedding-heroes/basket/REMOVE_FROM_BASKET';
const DELETE_FROM_BASKET = 'our-wedding-heroes/basket/DELETE_FROM_BASKET';
const EMPTY_BASKET = 'our-wedding-heroes/basket/EMPTY_BASKET';

export default function reducer(state = new Map(), action) {
    if (action.type === ADD_TO_BASKET) {
        const { payload: item } = action;
        const { id } = item;

        const existingItem = state.get(id) || { quantity: 0 };
        const updatedItem = { ...existingItem, ...item };
        updatedItem.quantity += 1;

        if (updatedItem.quantity > updatedItem.remaining) {
            updatedItem.quantity = updatedItem.remaining;
        }

        state.set(id, updatedItem);
        return new Map(state);
    }

    if (action.type === REMOVE_FROM_BASKET) {
        const { payload: item } = action;
        const { id } = item;

        const existingItem = state.get(id);

        if (existingItem.quantity <= 1) {
            return state;
        }

        const updatedItem = { ...existingItem, quantity: existingItem.quantity -= 1 };

        state.set(id, updatedItem);
        return new Map(state);
    }

    if (action.type === DELETE_FROM_BASKET) {
        const { payload: item } = action;
        const { id } = item;

        state.delete(id);
        return new Map(state);
    }

    if (action.type === EMPTY_BASKET) {
        return new Map();
    }

    return state;
}

export const addToBasket = createAction(ADD_TO_BASKET);
export const removeFromBasket = createAction(REMOVE_FROM_BASKET);
export const deleteFromBasket = createAction(DELETE_FROM_BASKET);
export const emptyBasket = createAction(EMPTY_BASKET);
