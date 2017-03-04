/* @flow */

import { createAction } from 'redux-actions';
import type { BasketType, ActionType } from '../types';

const ADD_TO_BASKET = 'our-wedding-heroes/basket/ADD_TO_BASKET';
const REMOVE_FROM_BASKET = 'our-wedding-heroes/basket/REMOVE_FROM_BASKET';
const DELETE_FROM_BASKET = 'our-wedding-heroes/basket/DELETE_FROM_BASKET';
const EMPTY_BASKET = 'our-wedding-heroes/basket/EMPTY_BASKET';

export default function reducer(state: BasketType = new Map(), action: ActionType): BasketType {
    switch (action.type) {
        case ADD_TO_BASKET: {
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

        case REMOVE_FROM_BASKET: {
            const { payload: item } = action;
            const { id } = item;

            const existingItem = state.get(id);

            if (!existingItem) {
                throw new Error(`Cannot find item with id: '${id}'`);
            }

            if (existingItem.quantity <= 1) {
                return state;
            }

            const updatedItem = { ...existingItem, quantity: existingItem.quantity -= 1 };

            state.set(id, updatedItem);
            return new Map(state);
        }

        case DELETE_FROM_BASKET: {
            state.delete(action.payload.id);
            return new Map(state);
        }

        case EMPTY_BASKET:
            return new Map();

        default:
            return state;
    }
}

export const addToBasket = createAction(ADD_TO_BASKET);
export const removeFromBasket = createAction(REMOVE_FROM_BASKET);
export const deleteFromBasket = createAction(DELETE_FROM_BASKET);

export const emptyBasket = (): ActionType => ({
    type: EMPTY_BASKET,
});
