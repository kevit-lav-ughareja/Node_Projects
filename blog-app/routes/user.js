const { Router } = require("express");
const User = require("../models/usre");
const { clearCookie } = require("cookie-parser");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenarateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (e) {
    return res.render("signin", {
      error: "Invalid UserName And Password",
    });
  }
});

router.post("/signup", async (req, res) => {
  const { fullName, password, email } = req.body;
  if (!fullName || !email || !password) {
    return res.render("signup", {
      error: "All fields are required.",
      data: { fullName, email },
    });
  }
  /* console.log("Request body:", req.body); */

  await User.create({
    fullName,
    password,
    email,
  });

  return res.redirect("/");
});

module.exports = router;
