const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  content: [
    {
      title: {
        type: String
      },
      body: {
        type: String
      }
    }
  ],
  count: [
    {
      user: {
        type: Schema.Types.ObjectId
      }
    }
  ],
  active: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Book = mongoose.model("books", BookSchema);
