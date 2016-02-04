//raw node server!
"use strict";
const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const getCal = require('./lib/cal.js');
const PORT = process.env.PORT || 3000;
//used to add a 'body' key to post req objects with form data
const bodyParser = require('body-parser');
//used to handle multi-posts (file uploads)
const multer = require('multer');
const upload = multer({dest: 'tmp/uploads/'});

const app = express();

const appTitle = 'C Allen Dar'
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//local allows you to set global variables usable by the renderer.
//The object will be passed to every render
app.locals.title = "C (Allen) Dar";

app.use(bodyParser.urlencoded({ extended: false}));

//sass setup
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, //used to do either sass or scss
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    date: new Date()

  });
});


//regular form using body parser
app.get('/contact', (req, res) => {
  res.render('contact', {
    date: new Date()
  });
});

app.post('/contact', (req, res) => {
  let userName = req.body.name;;
  res.send(`<h1>Thanks ${userName}</h1>`)
});

//file upload form using multer
app.get('/sendphoto', (req, res) => {
  res.render('sendphoto', {
    date: new Date()
  });
});

app.post('/sendphoto', upload.single('image'), (req, res) => {
    res.send('<h1>Thanks for the Photo</h1>')
});

//playing with query params
app.get('/cal/:year?/:month?/', (req, res) => {
  const output = getCal(req.params.year,req.params.month);

  res.render('calDisplay', {
    calString: output
  });
});

app.get("/hello", (req, res) => {

    console.log(req.query);

    res.writeHead(200, {'Content-Type': 'text/html'});

    const counter = [];
    const msg = "<h1>Hello " + req.query.name + "</h1>";
    msg.split('').forEach((x, i) => {

      setTimeout(() => {
      res.write(x);
      counter.pop();
      }, 300 * i);
      counter.push(i);
    });

    var interval = setInterval(function(){
      if (counter.length === 0) {
      res.end('<p>Done<p>');
      }
    }, 250);
});

app.get("/random/:x/:y", (req, res) => {
    console.log(req.params.x);
    console.log(req.params.y);
    res.send(200, Math.floor(Math.random() * (req.params.y - req.params.x)) + parseInt(req.params.x) + 1);

});

app.get('/secret', (req, res) => {

  res.writeHead(403);
  res.end('Access Denied');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
