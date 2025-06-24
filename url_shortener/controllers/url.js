const shortid = require("shortid");
const URL = require("../models/url");

async function handleCreateShortUrl(req, res) {
  console.log("handleCreateShortUrl called");
  const shortID = shortid();
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitedHistory: [],
    createdBy: req.user._id,
  });
  console.log(`Short URL created: http://localhost:8001/url/${shortID}`);

  return res.render("home", { id: shortID });
  /* return res.status(201).json({ id: shortID }); */
}
async function handleGetUrlFromShortUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitedHistory: { timestamp: Date.now() },
      },
    }
  );
  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  res.redirect(entry.redirectUrl);
}
async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  });
}

module.exports = {
  handleCreateShortUrl,
  handleAnalytics,
  handleGetUrlFromShortUrl,
};
