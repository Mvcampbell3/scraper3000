const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models")

module.exports = function(app) {
  app.get("/scrape", (req, res) => {

    axios.get("https://www.newscientist.com/subject/space/").then(response => {
      const $ = cheerio.load(response.data);

      let num = $("div.card__content").length - 1;

      $("div.card__content").each(function(i, one) {
        let result = {};

        result.title = $(one).find("h2").text();
        result.link = $(one).find("a").attr("href");
        result.space = true;

        db.Article.findOneAndUpdate(
          { title: result.title }, result, { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
          function(err, answer) {
            if (err) {
              console.log(err)
            } else {
              // console.log(answer);
            }
          }
        )
        console.log(i)
        if (i === num) {
          res.redirect("/articles");
        }
      })
    });
  });

  app.get("/articles", (req, res) => {
    db.Article.find({}).then(articles => {
      res.render("articles", { data: articles })
    }).catch(err => {
      if (err) {
        console.log(err);
        res.json({ error: err })
      }
    })
  })

  app.get("/removeArticles", (req, res) => {
    db.Article.remove({}).then(result => {
      res.redirect("/")
    }).catch(err => {
      console.log(err);
      res.json({ error: err });
    })
  })

  app.post("/comment/:id", (req,res) => {
    let artId = req.params.id;
    let sendObj = {
      message: req.body.message,
      articleId: artId
    }
    db.Comment.create(sendObj).then(dbComment => {
      return db.Article.findByIdAndUpdate({_id:artId}, {$push: {comments: dbComment._id}}, {new: true})
    }).then(dbArticle => {
      res.json(dbArticle)
    }).catch(err => {
      res.json({error:err})
    })
  })

}