const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { restricTo } = require("../middleware/auth");

router.get("/", restricTo(["NORMAL", "admin"]), async (req, res) => {
  const allurls = await URL.find({ createdBy: req.user._id });
  console.log("Fetched URLs:", allurls);
  return res.render("home", {
    urls: allurls,
  });
});

router.get("/admin/urls", restricTo(["admin"]), async (req, res) => {
  const allurls = await URL.find({});
  console.log("Fetched URLs:", allurls);
  return res.render("home", {
    urls: allurls,
  });
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login");
});
module.exports = router;
