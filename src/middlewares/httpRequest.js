import fetch from 'isomorphic-fetch';

const placeHttpRequest = (url, method, body, authHeaders) => {

    let options = {
        method,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            ...authHeaders
        }
    };

    if (method !== 'get' && body) {
        options = {
            ...options,
            body: JSON.stringify(body)
        };
    }

    return fetch(url, options)
        .then(response =>
            response.json().then(json => {
                //const camelisedJson = humps.camelizeKeys(json || {});

                if (!response.ok) {
                    return Promise.reject(json);
                }

                return json;
            })
        );
};

export const GET = 'HTTP_GET';
export const POST = 'HTTP_POST';
export const PUT = 'HTTP_PUT';


export default getAuthHeaders => store => next => action => {
    let method;

    switch (action.type) {
        case GET:
            method = 'get';
            break;
        case POST:
            method = 'post';
            break;
        case PUT:
            method = 'put';
            break;
        default:
            return next(action);
    }

    const { url, success, body, failure } = action;

    if (typeof url !== 'string') {
        throw new Error('Specify a string endpoint URL.');

    }

    if (typeof success !== 'function') {
        throw new Error('No success callback defined');
    }

    if (typeof failure !== 'function') {
        throw new Error('No failure callback defined');
    }

    let authHeaders = getAuthHeaders();

    return placeHttpRequest(url, method, body, authHeaders)
        .then(success, failure);
};