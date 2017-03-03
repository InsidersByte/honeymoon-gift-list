import uuid from 'uuid';
import reducer, * as actions from './notifications';

describe('notifications', () => {
    beforeEach(() => {
        uuid.v4 = jest.fn(() => 999999999)
            .mockImplementationOnce(() => 1)
            .mockImplementationOnce(() => 2)
            .mockImplementationOnce(() => 3)
            .mockImplementationOnce(() => 4)
            .mockImplementationOnce(() => 5)
            .mockImplementationOnce(() => 6)
            .mockImplementationOnce(() => 7);
    });

    describe('actions', () => {
        it('should have a success action creator', () => {
            const notification = { message: 'hello' };

            const expectedAction = {
                type: 'our-wedding-heroes/notifications/SUCCESS_NOTIFICATION',
                payload: notification,
            };

            expect(actions.success(notification)).toEqual(expectedAction);
        });

        it('should have a error action creator', () => {
            const notification = { message: 'hello' };

            const expectedAction = {
                type: 'our-wedding-heroes/notifications/ERROR_NOTIFICATION',
                payload: notification,
            };

            expect(actions.error(notification)).toEqual(expectedAction);
        });

        it('should have a hide notification action creator', () => {
            const notification = { message: 'hello' };

            const expectedAction = {
                type: 'our-wedding-heroes/notifications/HIDE_NOTIFICATION',
                payload: notification,
            };

            expect(actions.hideNotification(notification)).toEqual(expectedAction);
        });
    });

    describe('reducer', () => {
        it('should return the initial state', () => {
            expect(reducer(undefined, {})).toEqual([]);
        });

        it('should handle SUCCESS_NOTIFICATION', () => {
            let expectedState = [{ id: 1, message: 'hello', level: 'success', position: 'bl', show: true }];

            expect(reducer(undefined, { type: 'our-wedding-heroes/notifications/SUCCESS_NOTIFICATION', payload: { message: 'hello' } }))
                .toEqual(expectedState);

            expectedState = [
                { id: 1, message: 'hello', level: 'success', position: 'bl', show: true },
                { id: 2, message: 'world', level: 'success', position: 'bl', show: true },
            ];
            const initialState = [{ id: 1, message: 'hello', level: 'success', position: 'bl', show: true }];

            expect(reducer(initialState, { type: 'our-wedding-heroes/notifications/SUCCESS_NOTIFICATION', payload: { message: 'world' } }))
                .toEqual(expectedState);
        });

        it('should handle ERROR_NOTIFICATION', () => {
            let expectedState = [{ id: 1, message: 'world', level: 'error', position: 'bl', show: true }];

            expect(reducer(undefined, { type: 'our-wedding-heroes/notifications/ERROR_NOTIFICATION', payload: { message: 'world' } }))
                .toEqual(expectedState);

            expectedState = [
                { id: 1, message: 'hello', level: 'error', position: 'bl', show: true },
                { id: 2, message: 'world', level: 'error', position: 'bl', show: true },
            ];
            const initialState = [{ id: 1, message: 'hello', level: 'error', position: 'bl', show: true }];

            expect(reducer(initialState, { type: 'our-wedding-heroes/notifications/ERROR_NOTIFICATION', payload: { message: 'world' } }))
                .toEqual(expectedState);
        });

        it('should handle HIDE_NOTIFICATION', () => {
            let expectedState = [{ id: 1, message: 'hello', level: 'error', position: 'bl', show: false }];
            let initialState = [{ id: 1, message: 'hello', level: 'error', position: 'bl', show: true }];

            expect(reducer(initialState, { type: 'our-wedding-heroes/notifications/HIDE_NOTIFICATION', payload: { id: 1 } }))
                .toEqual(expectedState);

            expectedState = [{ id: 1, message: 'hello', level: 'error', position: 'bl', show: true }];
            initialState = [{ id: 1, message: 'hello', level: 'error', position: 'bl', show: true }];

            expect(reducer(initialState, { type: 'our-wedding-heroes/notifications/HIDE_NOTIFICATION', payload: { id: 2 } }))
                .toEqual(expectedState);
        });

        it('should handle error', () => {
            let expectedState = [{ id: 1, message: 'hello', level: 'error', position: 'bl', show: true }];

            expect(reducer([], { error: {}, payload: { message: 'hello' } }))
                .toEqual(expectedState);

            expectedState = [{ id: 2, message: 'hello', level: 'error', position: 'bl', show: true }];

            expect(reducer([], { error: {}, payload: { message: 'hello', response: {} } }))
                .toEqual(expectedState);

            expectedState = [{ id: 3, message: 'hello', level: 'error', position: 'bl', show: true }];

            expect(reducer([], { error: {}, payload: { message: 'world', response: { body: { message: 'hello' } } } }))
                .toEqual(expectedState);

            expectedState = [{ id: 4, message: 'hello', level: 'error', position: 'bl', show: true }];

            expect(reducer([], { error: {}, payload: { message: 'world', response: { body: { message: 'hello', errors: [] } } } }))
                .toEqual(expectedState);

            expectedState = [{ id: 5, message: 'hello', level: 'error', position: 'bl', show: true }];

            expect(reducer([], { error: {}, payload: { message: 'world', response: { body: { errors: [{ message: 'hello' }] } } } }))
                .toEqual(expectedState);

            expectedState = [
                { id: 6, message: 'hello', level: 'error', position: 'bl', show: true },
                { id: 7, message: 'world', level: 'error', position: 'bl', show: true },
            ];

            expect(reducer([], { error: {}, payload: { message: 'error', response: { body: { errors: [{ message: 'hello' }, { message: 'world' }] } } } }))
                .toEqual(expectedState);
        });

        it('should suppress error if suppressGlobalError is set', () => {
            expect(reducer([], { error: { message: 'error' }, suppressGlobalError: true }))
                .toEqual([]);
        });
    });
});
