const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Article = require("../models/Article")

const CommentSchema = new Schema({

  message: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },

  articleId: {
    type: String,
    required: true
  }

})

CommentSchema.pre("remove", { document: true }, function() {
  console.log("should remove from article comments ");
  Article.findOneAndUpdate({_id: this.articleId}, {$pull: {comments: this._id}}, {new:true}).then(result => {
    console.log(result);

  }).catch(err => {
    console.log(err);
  })
})

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;