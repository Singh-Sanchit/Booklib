const express = require("express");
const passport = require("passport");
const path = require("path");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    if (req.user.type == "admin") {
      res.redirect("/admin");
    } else {
      res.redirect("/dashboard");
    }
  }
);

router.get("/verify", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send(undefined);
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
