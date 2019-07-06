const express = require("express");
const router = express.Router();

// Load Models
const Book = require("../../models/Book");

// @route   GET api/books
// @desc    Get all books
// @access  Public
router.get("/", (req, res) => {
  Book.find()
    .sort({ date: -1 })
    .then(books => res.json(books))
    .catch(err => res.status(404).json(err));
});

// @route   GET api/books/:id
// @desc    Get a specific book
// @access  Public
router.get("/:id", (req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ message: "No Book Found" }));
});

// @route   POST api/books
// @desc    Add a new book
// @access  Public
router.post("/", (req, res) => {
  const newBook = new Book({
    name: req.body.name,
    status: req.body.status || 0,
    description: req.body.description,
    image: req.body.image
  });

  newBook
    .save()
    .then(book => res.json(book))
    .catch(err => res.status(400).json({ message: "Error saving book" }));
});

// @route   POST api/books/upvote/:id
// @desc    Add a upvote for a book
// @access  Public
router.post("/upvote/:id", (req, res) => {
  Book.findById(req.params.id).then(book => {
    // Check if book exists
    if (!book) {
      return res.status(404).json({ notfound: "Book not found" });
    }
    // Check if user has already upvoted or not
    if (
      book.count.filter(item => item.user.toString() === req.body.userid)
        .length > 0
    ) {
      return res
        .status(400)
        .json({ alreadyliked: "User already upvoted this topic" });
    }
    // Add user id to count array
    book.count.unshift({ user: req.body.userid });

    // Save it
    book.save().then(book => res.json(book));
  });
});

// @route   PATCH api/books/:id
// @desc    Edit status,active and other info of book -> by admin
// @access  Public
router.patch("/:id", (req, res) => {
  Book.findById(req.params.id).then(book => {
    if (req.body.name) book.name = req.body.name;
    if (req.body.description) book.description = req.body.description;
    if (req.body.image) book.image = req.body.image;
    if (req.body.active) book.active = req.body.active;

    book.save().then(book => res.json(book));
  });
});
module.exports = router;
