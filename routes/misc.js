"use strict";

const express = require('express');
const router = express.Router();

router.get("/hello", require('../controllers/hello.js'));

router.get('/reddit', (req, res) => {
  require('../controllers/redditRoll.js')(res);
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