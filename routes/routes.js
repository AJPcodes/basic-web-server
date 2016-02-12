"use strict";

const express = require('express');
const path = require('path');
const multer = require('multer');

const getCal = require('../lib/cal.js');

const router = express.Router();

//setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/tmp/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + "." + file.mimetype.split("/")[1])
  }
});
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  require('../lib/news.js')((data) => {
    res.render('index', {
     date: new Date(),
      topStory: data[0]
    });
  });
});

router.get('/reddit', (req, res) => {
  require('../lib/redditRoll.js')(res);
});

//regular form using body parser
router.get('/contact', (req, res) => {
  res.render('contact', {
    date: new Date()
  });
});

router.post('/contact', upload.array(), (req, res) => {
   require('../lib/contact.js')(req.body, res);
});

//playing with query params
router.get('/cal/:year?/:month?/', (req, res) => {
  const output = getCal(req.params.year,req.params.month);

  res.render('calDisplay', {
    calString: output
  });
});

router.get("/hello", (req, res) => {

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

});


router.get("/random/:x/:y", (req, res) => {
    console.log(req.params.x);
    console.log(req.params.y);
    res.send(200, Math.floor(Math.random() * (req.params.y - req.params.x)) + parseInt(req.params.x) + 1);

});

router.get('/secret', (req, res) => {

  res.writeHead(403);
  res.end('Access Denied');
});


module.exports = router;