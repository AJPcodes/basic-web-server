"use strict";

const express = require('express');
const _ = require('lodash');
const fs = require('fs');
const imgur = require('imgur');
const path = require('path');
const multer = require('multer');

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
const router = express.Router();

//file upload form using multer
router.get('/sendphoto', (req, res) => {
  res.render('sendphoto', {
    date: new Date()
  });
});

router.post('/sendphoto', upload.single('image'), (req, res) => {

    let filename = req.file.filename;
    let filepath = path.join(__dirname, 'tmp', 'uploads', filename);
    let link = "";

    if (req.file) {
      imgur.uploadFile(filepath)
      .then(function (json) {
          link = json.data.link;

          db.collection('images').insertOne({ imgurl: link }, (err, result) => {
            if (err) throw err;
            res.send(`<h1>Thanks for the Photo</h1><img src="${link}">`)
            fs.unlinkSync(filepath);
          });
          //delete the uploaded file from local storage

      })
      .catch(function (err) {
          console.error(err.message);
      });
    }

});

module.exports = router;