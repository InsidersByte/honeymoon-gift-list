/* @flow */

import request from 'superagent';
import { BASE_API_URL, HTTP_METHODS } from '../constants/api';

export default class {
    baseUrl = '';

    constructor(baseUrl: string) {
        this.baseUrl = `${BASE_API_URL}${baseUrl}`;
    }

    get(id?: string): Promise<string> {
        let url = this.baseUrl;

        if (id) {
            url += `/${id}`;
        }

        return this.request(HTTP_METHODS.GET_METHOD, url);
    }

    post(data: Object, extraUrl?: string): Promise<string> {
        let url = this.baseUrl;

        if (extraUrl) {
            url += `/${extraUrl}`;
        }

        return this.request(HTTP_METHODS.POST_METHOD, url, data);
    }

    put(data: Object, id?: string, extraUrl?: string): Promise<string> {
        let url = this.baseUrl;

        if (id) {
            url += `/${id}`;
        }

        if (extraUrl) {
            url += `/${extraUrl}`;
        }

        return this.request(HTTP_METHODS.PUT_METHOD, url, data);
    }

    delete(id: string): Promise<string> {
        return this.request(HTTP_METHODS.DELETE_METHOD, `${this.baseUrl}/${id}`);
    }

    request(method: string, url: string, data?: Object) {
        const req = request(method, url);
        const { isLoggedIn, jwt } = {};

        if (isLoggedIn) {
            req.set('Authorization', `Bearer ${jwt}`);
        }

        if (data) {
            req.send(data);
        }

        return new Promise((resolve, reject) => {
            req.end((error, response) => {
                if (error) {
                    return reject(error);
                }

                return resolve(response.body ? response.body : response.text);
            });
        });
    }
}
