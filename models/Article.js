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

  summary: {
    type: String,
    required: true,
    default: "This article has no summary"
  },

  imgUrl: {
    type: String,
    required: true,
    default: "There is not img src url"
  },

  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],

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