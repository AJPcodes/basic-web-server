//raw node server!
"use strict";
const http = require('http');
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/hello") {
    res.writeHead(200, {
     'Content-type': 'text/html' 
    });
    const counter = []; 
    const msg = "<h1>Don't you miss dial-up?!</h1>";
    msg.split('').forEach((x, i) => {
      
      setTimeout(() => {  
      res.write(x);
      counter.pop();
      }, 300 * i);
      counter.push(i);
    });

    var myVar = setInterval(function(){ 
      if (counter.length === 0) {
      res.end('<p>Delay!<p>');
      }
    }, 250);
    
  } else if (req.url === "/random") {
    res.end(Math.random().toString());
  } else {
    res.writeHead(403);
    res.end('Access Denied!');
  }
  

}).listen(3000, () => {
  console.log(`Listening on port ${PORT}`);
});
