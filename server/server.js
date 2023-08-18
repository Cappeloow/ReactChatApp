const express = require("express");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const { log } = require("console");
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const userList = [];

io.on("connection", (socket) => {
  console.log(socket.id);

  var test = { id: socket.id };

  socket.on("client_message", (data) => {
    const { room, messageData } = data;
    io.to(room).emit("retrieve_message", messageData);
  });

  socket.on("join_room", (room) => {
    const array = Array.from(socket.rooms);
    socket.leave(array[1]); // set[1] {"12fsdfsdg3g423", "lobby"}
    socket.join(room);
  });
});

server.listen(3000, () => console.log("server is up"));
