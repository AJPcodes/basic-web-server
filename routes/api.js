"use strict";

const express = require('express');
const _ = require('lodash');
const path = require('path');

const router = express.Router();
const news = require('../controllers/news.js');
const weather = require('../controllers/weather.js');
const uppers = require('../controllers/uppers.js');


router.get('/api', (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*');
  res.send({'hello': 'world'});
});

//example of recieving JSON as a post request
//use postman to test this
router.post('/api', uppers);

router.get('/api/weather', weather.api);

router.get('/api/news', news.api);

module.exports = router;