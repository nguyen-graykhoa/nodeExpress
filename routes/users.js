const express = require("express");
const router = express.Router();

// set up for using cookie
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const MAXAGE = 1000 * 60 * 60 * 24 * 7;

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post("/sign_in", (req, res) => {
  const username = req.body.username;
  res.cookie("username", username, { maxAge: new Date(MAXAGE) });
  res.redirect("/clucks");
});

router.post("/sign_out", (req, res) => {
  res.clearCookie("username");
  res.redirect("/clucks");
});

module.exports = router;
