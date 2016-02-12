"use strict";

let mongoose = require('mongoose');

const Contact = mongoose.model('Contact', mongoose.Schema({
  name: String,
  email: String,
  message: String
}));

module.exports = Contact;