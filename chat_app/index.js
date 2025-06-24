const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
app.use(express.static(path.resolve("./public")));
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  return res.sendFile(path.resolve("./public/index.html"));
});

io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

server.listen(9000, () => {
  console.log(`Server started at PORT:9000`);
});
