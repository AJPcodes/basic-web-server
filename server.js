//raw node server!
"use strict";
const http = require('http');
//const { PORT } = process.env;

http.createServer((req, res) => {
  console.log(req.url, req.method);
  
  debugger;

  res.writeHead(200, {
   'Content-type': 'text/html' 
  });
  res.end('Herro! Worrd!');
  

}).listen(3000, () => {

  console.log(`Listening on port 3000`);
});
