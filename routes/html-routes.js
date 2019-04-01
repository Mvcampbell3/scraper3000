const db = require("../models")

module.exports = function(app) {
  app.get("/", (req,res) => {
    res.render("index");
  })

  app.get("/article/:id", (req,res) => {
    let id = req.params.id;
    // db.Article.findById(id, (err,result) => {
    //   res.render("comment", {article:result});
    // })
    db.Article.findById(id).populate("comments").then(dbArticle => {
      console.log(dbArticle)
      res.render("comment", {article:dbArticle})
    })
  })
}