"use strict"
var cheerio = require('cheerio');
var _ = require('lodash');
var request = require('request');

module.exports = function(res) {
  console.log('news module reached');
  const url = 'http://www.reddit.com/';

  request.get(url, (err, urlRes, body) =>  {
    if (err) throw err;

    const $ = cheerio.load(urlRes.body);

    let linksArray = $('#siteTable a.title');

    for (let i = 0; i < linksArray.length; i++) {
      console.log(linksArray[i]);
      $(linksArray[i]).attr('href', 'https://media.giphy.com/media/G0GGsdLyUKhfa/giphy.gif');
      $(linksArray[i]).attr('target', 'blank');

    }

    res.send($.html());
  })


};