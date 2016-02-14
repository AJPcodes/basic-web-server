"use strict"
const _ = require('lodash');

module.exports = (req, res) => {
  let uppedVals = _.mapValues(req.body, (val) => val.toUpperCase());

  //a mixed type schema
  const Upper = require('../models/upper');
  let obj = new Upper(uppedVals);
  console.log(obj);

  obj.save((err, result) => {
    if (err) throw err;
    res.send(result);
  });

}