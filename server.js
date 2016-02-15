"use strict";
// const MongoClient = require('mongodb').MongoClient;


const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
//used to add a 'body' key to post req objects with form data
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
//environmental variables (declared on heroku)
const MONGODB_HOST = process.env.MONGODB_HOST || 'localhost';
const MONGODB_PORT = process.env.MONGODB_PORT || '27017';
const MONGODB_USER = process.env.MONGODB_USER || '';
const MONGODB_PASS = process.env.MONGODB_PASS || '';
const MONGODB_NAME = process.env.MONGODB_NAME || 'mainFrame';
const MONGODB_URL_PREFIX = MONGODB_USER
  ? `${MONGODB_USER}:${MONGODB_PASS}@`
  : '';


//mongodb://<dbuser>:<dbpassword>@ds035485.mongolab.com:35485/basic-node-server
const MONGODB_URL = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}`;
console.log('MONGODB_URL', MONGODB_URL);
const routes = require('./routes/');




mongoose.connect(MONGODB_URL);
let db = mongoose.connection;
//used to handle multi-posts (file uploads)

const app = express();


// uncomment to setup multer without file-rename/extensions
// var upload = multer({ dest: 'tmp/uploads' })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//local allows you to set global variables usable by the renderer.
//The object will be passed to every render
app.locals.title = "C (Allen) Dar";

//app middleare for all post request (hits all routes)
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(routes);




//sass setup
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, //used to do either sass or scss
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));


db.once('open', () => {

  // console.log('Mongo Open');

  // if (err) throw err;
  // db = database;

  app.listen(PORT, () => {
    console.log(`Node.js server started. Listening on port ${PORT}`);
  });

});

