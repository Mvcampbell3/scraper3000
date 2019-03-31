const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const db = require("../models")

module.exports = function(app) {
  app.get("/scrape", (req, res) => {
    axios.get("https://www.newscientist.com/subject/space/").then(response => {
      const $ = cheerio.load(response.data);

      let result = {};
      $("div.card__content").each(function(i, one) {
        result.title = $(one).find("h2").text();
        result.link = $(one).find("a").attr("href");

        db.Article.find({title:result.title}).then(there =>{
          if (!there) {
            db.Article.create(result).then(dbArticle => {
              console.log(dbArticle);
            }).catch(err => console.log(err));
          } else {
            console.log("already in db");
            saved++
          }
        }).catch(err => console.log(err))
      });
      res.json({
        received: true
      })
    })
  })


}