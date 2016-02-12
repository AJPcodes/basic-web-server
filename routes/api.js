"use strict";

const express = require('express');
const _ = require('lodash');
const request = require('request');
const path = require('path');

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


module.exports = router;