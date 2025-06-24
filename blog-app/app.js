require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8001;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Blog = require("./models/blog");
const {
  checkForAuthenticationCoookie,
} = require("./middlewares/authentication");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCoookie("token"));
app.use(express.static(path.resolve("./public")));

//connection
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log(`MongoDb connected at ${PORT}`);
});

//routes
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/user", userRoutes);

app.use("/blog", blogRoutes);

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  /* console.log("REQ.USER --->", req.user); */

  return res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.listen(PORT, () => {
  `Server run on Port ${PORT}`;
});
