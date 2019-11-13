const axios = require('axios');
var jwt = require('jsonwebtoken');
const secret = 'd7bffd5d-1ef6-4ce0-bd71-a79d503863da';
const token_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJMSUQtMTAwIiwibmFtZSI6Ikpob24gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJhdXRob3JpdGllcyI6WyJVU0VSIl19.cw8LYIJrN5d4HXL5GF7BIF1rcBZ2FxKmMyi9LzXVPT8';
const prefix = "Bearer";
const baseURL = "http://35.189.252.94/"
const private_header = prefix + ' ' + token_key;

var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("body-parser").json());

app.get('/public', function (req, res, next) {
    url = baseURL + 'public';

    return axios.get(url).then((response) => {
        console.log(response);
        res.json(response.data)
    }, (error) => {
        console.log(error);
    });
})

app.get('/private', function (req, res, next) {
    my_url = baseURL + 'public';

    return axios({
        method: 'get',
        url: my_url,
        headers: { "Authorization": private_header }
    }).then((response) => {
        console.log(response);
        res.json(response.data)

    }, (error) => {
        console.log(error);
    });


})

app.get('/actuator/health', function (req, res, next) {
    url = baseURL + 'actuator/health';

    return axios.get(url).then((response) => {
        console.log(response);
        res.json(response.data)

    }, (error) => {
        console.log(error);
    });


})

app.get('/token', function (req, res, next) {
    const my_token = jwt.sign({
        'sub': 'LID-100',
        'name': 'Jhon Doe',
        'iat': 1516239022,
        'authorities': [
            "USER"
        ]
    }, secret);
    console.log(my_token);
    res.json(my_token);

})

app.post('/private/entity', function (req, res, next) {
    my_url = baseURL + 'private/entity';
    console.log(private_header);
    console.log(req)
    console.log(req.body)
    // console.log(req.header)
    // console.log(req.params)
    // console.log(req.headers)
    // console.log(req.query.body)
    // console.log(req)


    const options = {
        headers: {
            'Authorization': private_header,
            'Content-Type': 'application/json'
        }
    };

    // const body = {
    //     loginId: 'LID-159',
    //     tenant: 'tim',
    //     name: 'Marco Molfetta'
    // }

    const body = req.body;



    axios.post(my_url, body, options).then((response) => {
        console.log(response);
        res.json(response.data)

    }, (error) => {
        console.log(error.response);
    });



});

app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
})