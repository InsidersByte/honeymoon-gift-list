import api from '../api';

export const CALL_API = Symbol('Call API');

export default () => next => async (action) => {
    const callAPI = action && action[CALL_API];

    if (typeof callAPI === 'undefined') {
        next(action);
        return;
    }

    const { data, endpoint, method, types, authenticated, onSuccess, afterSuccess, suppressGlobalError = false, onError } = callAPI;
    const [requestType, successType, errorType] = types;

    next({ type: requestType });

    try {
        const payload = await api({ data, endpoint, method, authenticated });

        if (onSuccess) {
            onSuccess(next, payload);
        }

        next({
            payload,
            type: successType,
        });

        if (afterSuccess) {
            afterSuccess(next, payload);
        }
    } catch (error) {
        const payload = {
            error: true,
            suppressGlobalError,
            payload: error,
            type: errorType,
        };

        if (onError) {
            onError(next, payload);
        } else {
            next(payload);
        }
    }
};
