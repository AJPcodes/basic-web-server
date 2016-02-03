//raw node server!
"use strict";
const app = require('express')();
const getCal = require('./lib/cal.js');
const PORT = process.env.PORT || 3000;

app.set('view engine', 'jade');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Appity Appy App',
    date: new Date()

  });
});

app.get('/cal/:year?/:month?/', (req, res) => {

  res.send(getCal(req.params.year,req.params.month ));

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
