const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const env = require('dotenv').config();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '/index.html')));

mongoose.connect(process.env.DATABASE, {useMongoClient: true});
mongoose.Promise = global.Promise;
mongoose.connection
  .on('connected', () => {
    console.log(`Mongoose connection open on ${process.env.DATABASE}`);
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  })

app.post('/user', function (req, res) {
    res.send('Data receive :' + JSON.stringify(req.body));
});
