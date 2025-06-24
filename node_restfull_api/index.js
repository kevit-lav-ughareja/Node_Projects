const express = require("express");

const { connectionMongoDb } = require("./connection");

const { logReqRes } = require("./middlewares");

const userRouter = require("./routes/user");

const app = express();

const PORT = 8000;

//Connections
connectionMongoDb("mongodb://127.0.0.1:27017/Students")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

//MiddleWare
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

//Routes
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});
