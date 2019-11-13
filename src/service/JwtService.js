const axios = require('axios');

const baseURL = "http://104.198.79.199:8080/"

export const jwtService = {
    public_call,
};

function public_call() {
    const url = baseURL + 'public';
    const headers = {
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Headers": "Origin"
            'Access-Control-Allow-Origin': null
        }
    }

    return axios.get(url, headers).then((response) => {
        return response.data;

    }, (error) => {
    });
}