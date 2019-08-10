import axios from 'axios'

/*
 * @params {object} request
 *
 * apiCaller() to call the API endpoint
 * using axios module.
 * */

export function apiCaller (request) {
    let method = request.method;
    let url = request.url;
    let body = request.body;
    let params = request.query;

    const options = {
        method,
        data: JSON.stringify(body),
        url,
        params
    };

    options.headers = {
        'Content-Type': 'application/json'
    }

    return axios(options)
        .then((response)=>{
            return response.data
        }).catch((error)=>{
            throw error.response.data
        })
}
