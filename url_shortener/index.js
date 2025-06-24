const express = require("express");
const path = require("path");
const app = express();
const PORT = 8001;
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restricTo } = require("./middleware/auth");

const { connectionMongoDb } = require("./connection");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectionMongoDb("mongodb://127.0.0.1:27017/short-url")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
app.use("/url", restricTo(["NORMAL"]), urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});
