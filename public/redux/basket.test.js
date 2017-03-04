import reducer, * as actions from './basket';

describe('basket', () => {
    describe('actions', () => {
        it('should create an action to add an item to the basket', () => {
            const item = { id: 1 };

            const expectedAction = {
                type: 'our-wedding-heroes/basket/ADD_TO_BASKET',
                payload: item,
            };

            expect(actions.addToBasket(item)).toEqual(expectedAction);
        });

        it('should create an action to remove an item from the basket', () => {
            const item = { id: 1 };

            const expectedAction = {
                type: 'our-wedding-heroes/basket/REMOVE_FROM_BASKET',
                payload: item,
            };

            expect(actions.removeFromBasket(item)).toEqual(expectedAction);
        });

        it('should create an action to delete an item from the basket', () => {
            const item = { id: 1 };

            const expectedAction = {
                type: 'our-wedding-heroes/basket/DELETE_FROM_BASKET',
                payload: item,
            };

            expect(actions.deleteFromBasket(item)).toEqual(expectedAction);
        });

        it('should create an action to empty the basket', () => {
            const expectedAction = {
                type: 'our-wedding-heroes/basket/EMPTY_BASKET',
            };

            expect(actions.emptyBasket()).toEqual(expectedAction);
        });
    });

    describe('reducer', () => {
        it('should return the initial state', () => {
            expect(reducer(undefined, {})).toEqual(new Map());
        });

        it('should handle ADD_TO_BASKET', () => {
            const expectedState = new Map();
            expectedState.set(1, { id: 1, quantity: 1 });

            expect(reducer(new Map(), { type: 'our-wedding-heroes/basket/ADD_TO_BASKET', payload: { id: 1 } }))
                .toEqual(expectedState);

            const initialState = new Map();
            initialState.set(1, { id: 1, quantity: 1 });

            expectedState.clear();
            expectedState.set(1, { id: 1, quantity: 2 });

            expect(reducer(initialState, { type: 'our-wedding-heroes/basket/ADD_TO_BASKET', payload: { id: 1 } }))
                .toEqual(expectedState);

            initialState.clear();
            initialState.set(1, { id: 1, quantity: 1, remaining: 1 });

            expectedState.clear();
            expectedState.set(1, { id: 1, quantity: 1, remaining: 1 });

            expect(reducer(initialState, { type: 'our-wedding-heroes/basket/ADD_TO_BASKET', payload: { id: 1 } }))
                .toEqual(expectedState);
        });

        it('should handle REMOVE_FROM_BASKET', () => {
            const initialState = new Map();
            initialState.set(1, { id: 1, quantity: 1 });

            const expectedState = new Map();
            expectedState.set(1, { id: 1, quantity: 1 });

            expect(reducer(initialState, { type: 'our-wedding-heroes/basket/REMOVE_FROM_BASKET', payload: { id: 1 } }))
                .toEqual(expectedState);

            initialState.clear();
            initialState.set(1, { id: 1, quantity: 2 });

            expectedState.clear();
            expectedState.set(1, { id: 1, quantity: 1 });

            expect(reducer(initialState, { type: 'our-wedding-heroes/basket/REMOVE_FROM_BASKET', payload: { id: 1 } }))
                .toEqual(expectedState);

            initialState.clear();

            expect(() => reducer(initialState, { type: 'our-wedding-heroes/basket/REMOVE_FROM_BASKET', payload: { id: 1 } }))
                .toThrowError('Cannot find item with id: \'1\'');
        });

        it('should handle DELETE_FROM_BASKET', () => {
            const initialState = new Map();
            initialState.set(1, { id: 1, quantity: 1 });

            const expectedState = new Map();

            expect(reducer(initialState, { type: 'our-wedding-heroes/basket/DELETE_FROM_BASKET', payload: { id: 1 } }))
                .toEqual(expectedState);

            initialState.clear();
            expectedState.clear();

            expect(reducer(initialState, { type: 'our-wedding-heroes/basket/DELETE_FROM_BASKET', payload: { id: 1 } }))
                .toEqual(expectedState);
        });

        it('should handle EMPTY_BASKET', () => {
            const initialState = new Map();
            initialState.set(1, { id: 1, quantity: 1 });

            const expectedState = new Map();

            expect(reducer(initialState, { type: 'our-wedding-heroes/basket/EMPTY_BASKET', payload: { id: 1 } }))
                .toEqual(expectedState);
        });
    });
});
