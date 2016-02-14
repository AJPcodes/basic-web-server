"use strict";
const request = require('request');


module.exports.api = (req, res) => {
  const url = 'https://api.forecast.io/forecast/0fb98484d16d29ca7f11edb292c8f77c/37.8267,-122.423';
  request.get(url, (err, apiRes, body) =>  {
    if (err) throw err;

    res.header('Access-Control-Allow-Origin', '*');
    res.send(JSON.parse(body));
  });

};