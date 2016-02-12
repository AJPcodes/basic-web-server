"use strict";
// const MongoClient = require('mongodb').MongoClient;


const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
//used to add a 'body' key to post req objects with form data
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const routes = require('./routes/routes.js');
const api = require('./routes/api.js');
const photos = require('./routes/photos.js');

//mongoDB url (in this case local) and the name of the project
const MONGODB_URL = 'mongodb://localhost:27017/mainFrame';
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
app.use(api);
app.use(photos);




//sass setup
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, //used to do either sass or scss
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));


db.once('open', () => {

  console.log('Mongo Open');

  //if (err) throw err;
  //db = database;

  app.listen(PORT, () => {
    console.log(`Node.js server started. Listening on port ${PORT}`);
  });

});

