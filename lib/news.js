"use strict"
var cheerio = require('cheerio');
// var _ = require('lodash');
var request = require('request');

module.exports = function(res) {
  console.log('news module reached');
  const url = 'http://www.cnn.com/';

  request.get(url, (err, urlRes) =>  {
    if (err) throw err;

    const $ = cheerio.load(urlRes.body);
    let news = [];

    for (let i=0; i<12; i++) {
      let linkUrl = $($('.cd__headline a')[i]).attr('href');
      if (linkUrl.split("")[0] === "/") {
        linkUrl = "http://www.cnn.com" + linkUrl;
      }
      let article = {
        title: $('.cd__headline a span.cd__headline-text')[i].children[0].data,
        url: linkUrl
      }
      news.push(article);
    }

    res.send(news);
  })

};