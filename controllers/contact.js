"use strict";
const mongoose = require('mongoose');

module.exports = function(body, res) {

  // console.log('trying to save contact info');

  const Contact = require('../models/contact');

  const obj = new Contact({
    name: body.name,
    email: body.email,
    message: body.message
  });

  obj.save((err, newObj) => {
    if (err) throw err;
    let userName = obj.name;
    res.send(`<h1>Thanks ${userName}</h1>`);
  })

  // mongodb driver syntax
  // db.collection('contact').insertOne(obj, (err, result) => {
  //   if (err) throw err;
  // });

};