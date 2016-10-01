/* @flow */

import request from 'superagent';

import { BASE_API_URL } from '../constants/api';
import { TOKEN } from '../constants/storageKeys';

function createRequest({ endpoint, method, authenticated }: { endpoint: string, method: string, authenticated: boolean }): any {
    const url = `${BASE_API_URL}${endpoint}`;
    const req = request(method, url);

    if (authenticated) {
        const token = localStorage.getItem(TOKEN) || null;

        if (token) {
            req.set('Authorization', `Bearer ${token}`);
        } else {
            throw new Error('No token saved!');
        }
    }

    return req;
}

function createResult(req: any): Promise<any> {
    return new Promise((resolve, reject) => {
        req.end((error, response) => {
            if (error) {
                return reject(error);
            }

            return resolve(response.body ? response.body : response.text);
        });
    });
}

export default (
    { endpoint, method, data, authenticated = false }: { endpoint: string, method: string, data: any, authenticated: boolean }
): Promise<any> => {
    const req = createRequest({ endpoint, method, authenticated });

    if (data) {
        req.send(data);
    }

    return createResult(req);
};
