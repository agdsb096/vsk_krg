// REQUIRE
const http = require('http');
const fs = require('fs');
const { stringify } = require('querystring');

// CONFIG
const config = {
    host: '127.0.0.1',
    port: '3030',
};

// DATE
function getDate() {
    const date = Date(Date.now());
    return date.toString();
};
console.log(getDate());

// DB
const db = {
    client_number: JSON.parse(fs.readFileSync('db/client_number.json')),
    employer_number: JSON.parse(fs.readFileSync('db/employer_number.json')),
    order: JSON.parse(fs.readFileSync('db/order.json')),
    position: JSON.parse(fs.readFileSync('db/position.json')),
    user: JSON.parse(fs.readFileSync('db/user.json'))
};
console.log(db);

// SERVER
const server = http.createServer((request, response) => {
    console.log(request.method, request.url);
    var result;
    if (request.method == 'GET') {
        if (request.url == '/') {
            result = fs.readFileSync('dist/index.html', 'utf-8');
        } else if (request.url == '/style.css') {
            result = fs.readFileSync('dist/style.css', 'utf-8');
        } else if (request.url == '/script.js') {
            result = fs.readFileSync('dist/script.js', 'utf-8');
        } else if (request.url == '/favicon.ico') {
            result = fs.readFileSync('dist/favicon.ico', 'utf-8');
        } else {
            result = 'ERROR 404! NOT FOUND PAGE.\n'
        }
        response.end(result);
    } else if (request.method == 'POST') {
        var data = '';
        request.on('data', (hash) => {
           data += hash; 
        });
        request.on('end', () => {
            data = JSON.parse(data);
            if (data != undefined) {
                console.log(data);
            } else {
                response.end();
            }
        });
    } else if (request.method == 'OPTIONS') {
        response.end();
    } else {
        response.end();
    }
});
server.listen(config.port, config.host, () => {
    console.log('Server start listening', config.host + ':' + config.port);
});

