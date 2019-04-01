const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  space: {
    type: Boolean, 
    required: true,
    default: false
  },

  baseball: {
    type: Boolean,
    required: true,
    default: false
  } 

});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;