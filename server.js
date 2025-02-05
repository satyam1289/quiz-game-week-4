const http = require('http');
const fs = require('fs');
const path = require('path');

const app = http.createServer(function (req, res) {
    let newfile = '';

    if (req.url === '/') {
        newfile = path.join(__dirname, 'public', 'index.html');
        server(newfile, 'text/html', res);
    } else if (req.url === '/questions') {
        newfile = path.join(__dirname, 'questions.json');
        server(newfile, 'application/json', res);
    } else if (req.url === '/style.css') {
        newfile= path.join(__dirname, 'public', 'style.css');
        server(newfile, 'text/css', res);
    } else if (req.url === '/script.js') {
        newfile = path.join(__dirname, 'public', 'script.js');
        server(newfile, 'text/javascript', res);
    } else {
        res.writeHead(404);
        res.end('Oops! Page not found.');
    }
});

function server(filePath, contentType, res) {
    fs.readFile(filePath, function (error, data) {
        if (error) {
            console.log('Error loading file:', filePath);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h2>Something went wrong!</h2>');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

app.listen(3500, function () {
    console.log('Server is running');
});