const express = require('express')
const app = express()

const hostname = '127.0.0.1';
const port = 3000;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.listen(3000, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
})

