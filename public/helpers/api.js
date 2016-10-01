/* @flow */

import request from 'superagent';
import { BASE_URL, GET_METHOD, POST_METHOD, PUT_METHOD, DELETE_METHOD } from '../constants/ApiConstants';

type HttpMethodType =
    | GET_METHOD
    | POST_METHOD
    | PUT_METHOD
    | DELETE_METHOD;

export default class {
    baseUrl = '';

    constructor(baseUrl: string) {
        this.baseUrl = `${BASE_URL}${baseUrl}`;
    }

    get(id?: string): Promise<string> {
        let url = this.baseUrl;

        if (id) {
            url += `/${id}`;
        }

        return this.request(GET_METHOD, url);
    }

    post(data: Object, extraUrl?: string): Promise<string> {
        let url = this.baseUrl;

        if (extraUrl) {
            url += `/${extraUrl}`;
        }

        return this.request(POST_METHOD, url, data);
    }

    put(data: Object, id?: string, extraUrl?: string): Promise<string> {
        let url = this.baseUrl;

        if (id) {
            url += `/${id}`;
        }

        if (extraUrl) {
            url += `/${extraUrl}`;
        }

        return this.request(PUT_METHOD, url, data);
    }

    delete(id: string): Promise<string> {
        return this.request(DELETE_METHOD, `${this.baseUrl}/${id}`);
    }

    request(method: HttpMethodType, url: string, data?: Object) {
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
