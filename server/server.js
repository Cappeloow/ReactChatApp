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

  socket.on("set_username", (data) => {
    console.log(data);
    io.emit("display_username", data);
    //   const newTest = { ...test, username: data };
    //   userList.push(newTest);
    //   console.log(userList);
    //   io.emit("room_list", userList);
  });

  socket.on("client_message", (data) => {
    console.log("Received client_message event");
    console.log("check", data);
    io.emit("retrieve_message", data.message);
  });

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(io.sockets.adapter.rooms);
  });
});

// io.sockets.on("client_message", (data) => {
//   console.log("work?");
// });

server.listen(3000, () => console.log("server is up"));
