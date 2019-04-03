const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models")

module.exports = function(app) {

  app.get("/scrape", (req, res) => {
    axios.get("https://www.space.com/news").then(response => {
      const $ = cheerio.load(response.data);
      let num = $("article.search-result").length - 1;

      let stories = $("article.search-result");

      let promiseArry = [];

      stories.each((i, el) => {

        let title = $(el).children().find("h3").text();
        let summary = $(el).children().find("p.synopsis").text();
        let link = $(el).parent().attr("href");
        // let img = $(el).children().find("img").attr("data-src");
        let img = $(el).children().find("img").attr("data-srcset");

        let imgSplit = img.split(", ")
        let rightArr = imgSplit[2];
        let soon = rightArr.toString().split(" ");

        let article = {
          title: title,
          link: link,
          summary: summary,
          space: true,
          imgUrl: soon[0].toString()
        }


        console.log(article);

        promiseArry.push(db.Article.findOneAndUpdate(
          { title: title }, article, { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
          function(err, answer) {
            if (err) {
              console.log(err)
            } else {
              // console.log(answer);
              if (i === num) {
                console.log("finished");
              }
            }
          }
        ));
        

      });

      Promise.all(promiseArry).then(promiseResult => {
        console.log(promiseResult);
        res.redirect("/");
      }).catch(promiseError => {
        console.log(promiseError)
        res.json({ error: promiseError })
      })

    })
  })

  app.get("/removeArticles", (req, res) => {
    db.Article.deleteMany({}).then(result => {
      res.redirect("/")
    }).catch(err => {
      console.log(err);
      res.json({ error: err });
    })
  })

  app.post("/comment/:id", (req, res) => {
    let artId = req.params.id;

    let sendObj = {
      message: req.body.message,
      username: req.body.username,
      articleId: artId
    }

    db.Comment.create(sendObj).then(dbComment => {
      return db.Article.findByIdAndUpdate({ _id: artId }, { $push: { comments: dbComment._id } }, { new: true })
    }).then(dbArticle => {
      console.log("sent comment to database " + sendObj)
      res.json(dbArticle)
    }).catch(err => {
      res.json({ error: err })
    })
  })

  app.delete("/article/:id", (req, res) => {
    // Wanted to use hooks but findOneAndUpdate does not set hooks
    let deleteId = req.params.id
    db.Comment.deleteMany({ articleId: deleteId }).then(result => {
      console.log(result);
      db.Article.deleteOne({ _id: deleteId }).then(deleted => {
        console.log(deleted);
        res.json({ delete: deleted });
      }).catch(err => {
        res.json({ error: err })
      })
    }).catch(err => {
      res.json({ error: err });
    })
  })

  app.delete("/comment/:id", (req, res) => {
    let commentId = req.params.id;
    db.Comment.findOne({ _id: commentId }).then(result => {
      res.json({ deleted: result })
      result.remove().then().catch(err => {
        console.log(err);
      });
    }).catch(err => {
      res.json({ error: err })
    })
  })

}