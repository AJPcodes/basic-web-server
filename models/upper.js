"use strict";

let mongoose = require('mongoose');

const Upper = mongoose.model('uppers', mongoose.Schema({
}, {strict: false}));


module.exports = Upper;