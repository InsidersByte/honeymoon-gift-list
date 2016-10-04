import * as TYPES from '../constants/actionTypes';

export default function basketReducer(state = new Map(), action) {
    if (action.type === TYPES.ADD_TO_BASKET) {
        const { payload: item } = action;
        const { id } = item;

        const existingItem = state.get(id) || { quantity: 0 };
        const updatedItem = Object.assign({}, existingItem, item);
        updatedItem.quantity += 1;

        if (updatedItem.quantity > updatedItem.remaining) {
            updatedItem.quantity = updatedItem.remaining;
        }

        state.set(id, updatedItem);
        return new Map(state);
    }

    return state;
}
