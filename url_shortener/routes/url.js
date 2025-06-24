const express = require("express");
const router = express.Router();
const {
  handleCreateShortUrl,
  handleAnalytics,
  handleGetUrlFromShortUrl,
} = require("../controllers/url");

router.post("/", handleCreateShortUrl);
router.get("/analytics/:shortId", handleAnalytics);
router.get("/:shortId", handleGetUrlFromShortUrl);

module.exports = router;
