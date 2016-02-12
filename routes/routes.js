"use strict";

const express = require('express');
const _ = require('lodash');
const fs = require('fs');
const imgur = require('imgur');
const request = require('request');
const path = require('path');
const getCal = require('../lib/cal.js');
const multer = require('multer');

//setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/tmp/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + "." + file.mimetype.split("/")[1])
  }
})
const upload = multer({ storage: storage })
const router = express.Router();

router.get('/', (req, res) => {

  require('../lib/news.js')((data) => {
    res.render('index', {
     date: new Date(),
      topStory: data[0]
    });
  });
});

router.get('/api', (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*');
  res.send({'hello': 'world'});
});

//example of recieving JSON as a post request
//use postman to test this
router.post('/api', (req, res) => {
  let uppedVals = _.mapValues(req.body, (val) => val.toUpperCase());

  //a mixed type schema
  const Upper = require('../models/upper');
  let obj = new Upper(uppedVals);
  console.log(obj);

  obj.save((err, result) => {
    if (err) throw err;
    res.send(result);
  });

});

router.get('/api/weather', (req, res) => {
  const url = 'https://api.forecast.io/forecast/0fb98484d16d29ca7f11edb292c8f77c/37.8267,-122.423';
  request.get(url, (err, apiRes, body) =>  {
    if (err) throw err;
    res.header('Access-Control-Allow-Origin', '*');
    res.send(JSON.parse(body));
  });
});

router.get('/api/news', (req, res) => {
  require('../lib/news.js')((data) => {res.send(data)});
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

//file upload form using multer
router.get('/sendphoto', (req, res) => {
  res.render('sendphoto', {
    date: new Date()
  });
});

router.post('/sendphoto', upload.single('image'), (req, res) => {

    let filename = req.file.filename;
    let filepath = path.join(__dirname, 'tmp', 'uploads', filename);
    let link = "";

    if (req.file) {
      imgur.uploadFile(filepath)
      .then(function (json) {
          link = json.data.link;

          db.collection('images').insertOne({ imgurl: link }, (err, result) => {
            if (err) throw err;
            res.send(`<h1>Thanks for the Photo</h1><img src="${link}">`)
            fs.unlinkSync(filepath);
          });
          //delete the uploaded file from local storage

      })
      .catch(function (err) {
          console.error(err.message);
      });
    }

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