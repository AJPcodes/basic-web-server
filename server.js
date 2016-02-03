//raw node server!
"use strict";
const app = require('express')();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'jade');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Appity Appy App',
    date: new Date()

  });
});

app.get('/cal/:year?/:month?/', (req, res) => {

  let yearArg = req.params.year;
  let monthArg = req.params.month;

  let args = [yearArg, monthArg];

  if (monthArg === undefined) {
    args = [yearArg];
  }

  if (yearArg === undefined) {
    let today = new Date();
    args = [today.getFullYear(), today.getMonth() + 1];
  }

  const validate = require('node-cal/lib/validateArgs').validate;
  const getMonth = require('node-cal/lib/month').getMonth;
  const getYear = require('node-cal/lib/year').getYear;
  const validatedArgs = validate(args);


  if (validatedArgs){
     yearArg = validatedArgs[0];
      monthArg = validatedArgs[1];


 
    if (yearArg && monthArg) {
      let output = getMonth(yearArg, monthArg);
      res.send("<pre>" + output + "</pre>");
    }

    else if (yearArg && !monthArg) {
      let output = getYear(yearArg);
      res.send("<pre>" + output + "</pre>");
    }
  }

  else {
    res.send("Invalid parameters: <br> Try again useing cal/YYYY/MM");
  }
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
