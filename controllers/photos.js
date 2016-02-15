"use strict";

const _ = require('lodash');
const fs = require('fs');
const imgur = require('imgur');
const path = require('path');
const ImgurLink = require('../models/imgurLink.js');

module.exports.get = (req, res) => {
  res.render('sendphoto', {
    date: new Date()
  });
};

module.exports.post = (req, res) => {

  console.log('trying to post photo');

  let filename = req.file.filename;
  let filepath = path.join(__dirname, '..', 'tmp', 'uploads', filename);
  let link = "";

  if (req.file) {
    imgur.uploadFile(filepath)
    .then(function (json) {
        link = json.data.link;

        let obj = new ImgurLink({url: link});

        obj.save((err, result) => {
          if (err) throw err;

          res.send(`<h1>Thanks for the Photo</h1><img src="${obj.url}">`)
          console.log('delete', filepath);
          fs.unlinkSync(filepath);
        });

        // db.collection('images').insertOne({ imgurl: link }, (err, result) => {
        //   if (err) throw err;
        //   res.send(`<h1>Thanks for the Photo</h1><img src="${link}">`)
        //   fs.unlinkSync(filepath);
        // });

    })
    .catch(function (err) {
        console.error(err.message);
    });
  }
};

