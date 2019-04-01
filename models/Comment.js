const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({

  message: {
    type: String,
    required: true
  },

  articleId: {
    type: String,
    required: true
  }
  
})

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;