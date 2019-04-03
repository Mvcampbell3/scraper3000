const db = require("../models")

module.exports = function(app) {
  app.get("/", (req,res) => {
    db.Article.find({}).then(result => {
      res.render("index", {data: result});

    }).catch(err => {
      res.json({error: err});
    })
  })

  app.get("/article/:id", (req,res) => {
    let id = req.params.id;
    db.Article.findById(id).populate("comments").then(dbArticle => {
      res.render("comment", {article:dbArticle})
    })
  })
}