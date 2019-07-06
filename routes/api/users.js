const express = require("express");
const router = express.Router();

// Load Models
const User = require("../../models/User");

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get("/", (req, res) => {
  User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
