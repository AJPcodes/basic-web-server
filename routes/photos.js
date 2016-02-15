"use strict";

const photosCtrl = require('../controllers/photos.js');
const express = require('express');
const path = require('path');
const multer = require('multer');

//setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '/tmp', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + "." + file.mimetype.split("/")[1])
  }
});
const upload = multer({ storage: storage });
const router = express.Router();

//file upload form using multer
router.get('/sendphoto', photosCtrl.get);

router.post('/sendphoto', upload.single('image'), photosCtrl.post);

module.exports = router;