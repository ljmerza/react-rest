import 'whatwg-fetch';

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.response) {
        return response.response;
    }

    throw response.error;
}

/**
 * Requests a URL, returning a promise
 * @param  {string} url The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object} The response data
 */
export default function request(url, options) {
    return fetch(url, options)
        .then(parseJSON)
        .then(checkStatus);
}