const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection
  .on('connected', () => {
    console.log(`Mongoose connection open on ${process.env.DATABASE}`);
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

var User = new mongoose.model('User', UserSchema, 'User');

app.post('/user', (req, res) => {
  //console.log(JSON.stringify(req.body));
  
  var myUser = new User({
    firstName: req.body.firstname,
    lastName: req.body.lastname
  });
  myUser.save( (err, myUser) => {
    if(err)
      return console.error(err);
  });

  res.send('Data receive :' + JSON.stringify(req.body));
});
