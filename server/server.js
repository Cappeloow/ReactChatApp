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

  // socket.on("set_username", (data) => {
  //   console.log(data);
  //   io.emit("display_username", data);
  //   //   const newTest = { ...test, username: data };
  //   //   userList.push(newTest);
  //   //   console.log(userList);
  //   //   io.emit("room_list", userList);
  // });

  socket.on("client_message", (data) => {
    const { room, messageData } = data;
    io.to(room).emit("retrieve_message", messageData);
  });

  socket.on("join_room", (room) => {
    console.log("funkar?", socket.rooms[1]);
    const array = Array.from(socket.rooms);
    console.log("sätt ett meddelande", array[1]);
    socket.leave(array[1]); // set[1] {"12fsdfsdg3g423", "lobby"}
    socket.join(room);
    console.log("efter att joina", socket.rooms);
    console.log(io.sockets.adapter.rooms);
  });
});

// io.sockets.on("client_message", (data) => {
//   console.log("work?");
// });

server.listen(3000, () => console.log("server is up"));
