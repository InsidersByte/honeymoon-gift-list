import request from 'superagent';
import loginStore from '../stores/LoginStore';
import { BASE_URL, GET_METHOD, POST_METHOD, PUT_METHOD, DELETE_METHOD } from '../constants/ApiConstants';
import loginActions from '../actions/LoginActions';

export default class {
    constructor(baseUrl) {
        this.baseUrl = `${BASE_URL}${baseUrl}`;
    }

    get(id) {
        let url = this.baseUrl;

        if (id) {
            url += `/${id}`;
        }

        return this.request(GET_METHOD, url);
    }

    post(data, extraUrl) {
        let url = this.baseUrl;

        if (extraUrl) {
            url += `/${extraUrl}`;
        }

        return this.request(POST_METHOD, url, data);
    }

    put(data, id, extraUrl) {
        let url = this.baseUrl;

        if (id) {
            url += `/${id}`;
        }

        if (extraUrl) {
            url += `/${extraUrl}`;
        }

        return this.request(PUT_METHOD, url, data);
    }

    delete(id) {
        return this.request(DELETE_METHOD, `${this.baseUrl}/${id}`);
    }

    request(method, url, data) {
        const req = request(method, url);
        const { isLoggedIn, jwt } = loginStore.getState();

        if (isLoggedIn) {
            req.set('Authorization', `Bearer ${jwt}`);
        }

        if (data) {
            req.send(data);
        }

        return new Promise((resolve, reject) => {
            req.end((error, response) => {
                if (error) {
                    if (error.status === 401) {
                        loginActions.logoutUser();
                    }

                    return reject(error);
                }

                return resolve(response.body ? response.body : response.text);
            });
        });
    }
}
