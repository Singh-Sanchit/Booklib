const express = require("express");
const router = express.Router();

// Load Models
const Book = require("../../models/Book");
const Answer = require("../../models/Answer");
const User = require("../../models/User");

// @route   GET api/answers
// @desc    Get all answers
// @access  Public
router.get("/", (req, res) => {
  Answer.find()
    .populate("user", ["firstName", "lastName"])
    .sort({ date: -1 })
    .then(answers => res.json(answers))
    .catch(err => res.status(404).json(err));
});

// @route   GET api/answers/:id - book id
// @desc    Get a specific book answers
// @access  Public
router.get("/:id", (req, res) => {
  Book.find({ book: req.params.id })
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ message: "No Book Found" }));
});

// @route   POST api/answers
// @desc    Add a new answer
// @access  Public
router.post("/", (req, res) => {
  const newAnswer = new Answer({
    book: req.body.bookid,
    user: req.body.userid,
    title: req.body.title,
    body: req.body.body
  });

  newAnswer.save().then(answer => res.json(answer));
});

// @route   POST api/answers/upvote/:id
// @desc    Upvote an answer
// @access  Public
router.post("/upvote/:id", (req, res) => {
  Answer.findById(req.params.id).then(answer => {
    // Check if answer exists
    if (!answer) {
      return res.status(404).json({ notfound: "Answer not found" });
    }
    // Check if user has already upvoted or not
    if (
      answer.upvote.filter(item => item.user.toString() === req.body.userid)
        .length > 0
    ) {
      return res
        .status(400)
        .json({ alreadyUpvoted: "User already upvoted this answer" });
    } else if (
      answer.downvote.filter(item => item.user.toString() === req.body.userid)
        .length > 0
    ) {
      // Get removeIndex of vote
      const removeIndex = answer.downvote
        .map(item => item.user.toString())
        .indexOf(req.params.id);

      answer.downvote.splice(removeIndex, 1);

      // Save it
      answer.save().then(answer => res.json(answer));
    } else {
      // Add user id to upvoted array
      answer.upvote.unshift({ user: req.body.userid });

      // Save it
      answer.save().then(answer => res.json(answer));
    }
  });
});

// @route   POST api/answers/downvote/:id
// @desc    Downvote an answer
// @access  Public
router.post("/downvote/:id", (req, res) => {
  Answer.findById(req.params.id).then(answer => {
    // Check if user has already Upvoted the answer or not
    if (
      answer.upvote.filter(item => item.user.toString() === req.body.userid)
        .length > 0
    ) {
      // Get removeIndex of post
      const removeIndex = answer.upvote
        .map(item => item.user.toString())
        .indexOf(req.params.id);

      answer.upvote.splice(removeIndex, 1);

      // Save it
      answer.save().then(answer => res.json(answer));
    } else if (
      answer.downvote.filter(item => item.user.toString() === req.body.userid)
        .length > 0
    ) {
      return res
        .status(400)
        .json({ alreadyDownvoted: "User already downvoted this answer" });
    } else {
      // Add user id to downvoted array
      answer.downvote.unshift({ user: req.body.userid });

      // Save it
      answer.save().then(answer => res.json(answer));
    }
  });
});

module.exports = router;
