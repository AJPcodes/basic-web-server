"use strict";
var cheerio = require('cheerio');
var _ = require('lodash');
var request = require('request');
let mongoose = require('mongoose');

const News = require('../models/news');

const getNews = function(callback) {

  News.findOne().sort('-_id').exec((err, doc) => {
    if (err) throw err;
    const FifteenMin = 15 * 60 * 1000;
    if (doc) {
    // console.log(doc._id.getTimestamp());
    const diff = (new Date() - doc._id.getTimestamp()) - FifteenMin;
    }

    if (doc && diff < 0) {
      callback(doc.top);
    } else {
      const url = 'http://cnn.com';

      request.get(url, (err, response, html) => {
        if (err) throw err;

        const news = [];
        const $ = cheerio.load(html);

        const $bannerText = $('.banner-text');

          let bannerUrl = $bannerText.closest('a').attr('href');
          if (bannerUrl.split("")[0] === "/") {
            bannerUrl = "http://www.cnn.com" + bannerUrl;
          }

        news.push({
          title: $bannerText.text(),
          url: bannerUrl
        });

        const $cdHeadline = $('.cd__headline');

        _.range(1, 12).forEach(i => {
          const $headline = $cdHeadline.eq(i);

          // console.log('headline', $headline);
          // console.log('links:', $headline.find('a'));
          let linkUrl = $headline.find('a').attr('href');
          // console.log($headline.text());
          // console.log(linkUrl);
          if (linkUrl && linkUrl.split("")[0] === "/") {
            linkUrl = "http://www.cnn.com" + linkUrl;
          }

          news.push({
            title: $headline.text(),
            url: linkUrl
          });
        });

        const obj = new News({top: news});

        obj.save((err, result) => {
          if (err) throw err;
          callback(result.top);
        });
      });
    }
  })
};


module.exports = {

  homePage: function(req, res) {
    getNews((data) => {
      res.render('index', {
       date: new Date(),
        topStory: data[0]
      });
    });

  },

  api: function(req, res) {
    getNews((data) => {res.send(data)})
  }

} //end module exports

// module.exports = function(res) {
//   console.log('news module reached');
//   const url = 'http://www.cnn.com/';

//   request.get(url, (err, urlRes) =>  {
//     if (err) throw err;

//     const $ = cheerio.load(urlRes.body);
//     let news = [];

//     for (let i=0; i<12; i++) {
//       let linkUrl = $($('.cd__headline a')[i]).attr('href');
//       if (linkUrl.split("")[0] === "/") {
//         linkUrl = "http://www.cnn.com" + linkUrl;
//       }
//       let article = {
//         title: $('.cd__headline a span.cd__headline-text')[i].children[0].data,
//         url: linkUrl
//       }
//       news.push(article);
//     }

//     res.send(news);
//   })