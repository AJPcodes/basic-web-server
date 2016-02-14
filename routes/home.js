"use strict";

const express = require('express');
const path = require('path');

const router = express.Router();
const news = require('../controllers/news.js');
const cal = require('../controllers/cal.js');
router.get('/', news.homePage);

//regular form using body parser

//playing with query params
router.get('/cal/:year?/:month?/', cal.getCal);

module.exports = router;