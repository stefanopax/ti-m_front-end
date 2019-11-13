const axios = require('axios');
// const fetch = require("node-fetch");

// const secret = "d7bffd5d-1ef6-4ce0-bd71-a79d503863da";
// const header = {
//     "alg": "HS256",
//     "typ": "JWT"
// };
// let payload;

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
        console.log(response);
        return response.data;

    }, (error) => {
        console.log(error);
    });
}


// async function getDataAxios() {
//     const requestOptions = {
//         metod: "GET",
//         headers: {
//             "Content-Type": " application/json",
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Headers": "Origin"
//         }
//     }

//     const response =
//         fetch("http://localhost:80/", requestOptions).then(function (res) { console.log(res.json) })

// }

// function public_call() {



//     getDataAxios('/');




// }

