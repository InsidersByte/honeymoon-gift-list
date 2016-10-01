import { createAction } from 'redux-actions';
import { ADD_TO_BASKET, REMOVE_FROM_BASKET, DELETE_FROM_BASKET, EMPTY_BASKET } from '../constants/actionTypes';

export const addToBasket = createAction(ADD_TO_BASKET);
export const removeFromBasket = createAction(REMOVE_FROM_BASKET);
export const deleteFromBasket = createAction(DELETE_FROM_BASKET);
export const emptyBasket = createAction(EMPTY_BASKET);
