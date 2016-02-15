"use strict";

let mongoose = require('mongoose');

const ImgurLink = mongoose.model('imgur-links', mongoose.Schema({
    url: String
  }));

module.exports = ImgurLink;