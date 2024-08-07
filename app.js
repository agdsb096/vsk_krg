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
    var d = new Date(Date.now()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    
    var result = [day, month, year].join('-');
    result += ' ' + d.toString().split(' ')[4];
    return result;
};
console.log(getDate());

// DB
const db = {
    number: JSON.parse(fs.readFileSync('db/number.json')),
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
            response.writeHead(200, {'Content-Type': 'text/html'})
            result = fs.readFileSync('dist/index.html', 'utf-8');
        } else if (request.url == '/style.css') {
            response.writeHead(200, {'Content-Type': 'text/css'})
            result = fs.readFileSync('dist/style.css', 'utf-8');
        } else if (request.url == '/script.js') {
            response.writeHead(200, {'Content-Type': 'application/javascript'})
            result = fs.readFileSync('dist/script.js', 'utf-8');
        } else if (request.url == '/favicon.ico') {
            response.writeHead(200, {'Content-Type': 'image/x-icon'})
            result = fs.readFileSync('dist/favicon.ico');
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
                if (data.method == 'start') {
                    result = JSON.stringify(db);
                    response.end(result);
                }
                else if (data.method == 'order') {
                    result = JSON.stringify({"email": "hey@mail.com", "password": "101010"});
                    response.end(result);
                }
                else {
                    response.end();
                }
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

