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
    default: "There is nothing to see here"
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
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }

});

ArticleSchema.pre("remove", function() {
  console.log("removing");
})

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;