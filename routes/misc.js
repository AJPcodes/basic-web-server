"use strict";

const express = require('express');
const router = express.Router();

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