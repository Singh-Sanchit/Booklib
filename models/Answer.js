const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AnswerSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "books"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  upvote: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  downvote: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ]
});

module.exports = Answer = mongoose.model("answers", AnswerSchema);
