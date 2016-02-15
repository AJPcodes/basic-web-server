"use strict";

const express = require('express');
const path = require('path');
const multer = require('multer');

const router = express.Router();

//setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/tmp/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + "." + file.mimetype.split("/")[1])
  }
});
const upload = multer({ storage: storage });

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.post('/contact', upload.array(), (req, res) => {
   require('../controllers/contact.js')(req.body, res);
});

module.exports = router;