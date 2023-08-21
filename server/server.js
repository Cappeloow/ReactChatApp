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
const roomList = [];

io.on("connection", (socket) => {
  console.log(socket.id);

  var test = { id: socket.id };

  socket.on("client_message", (data) => {
    const { room, messageData } = data;
    io.to(room).emit("retrieve_message", messageData);
  });

  socket.on("join_room", (room) => {
    const array = Array.from(socket.rooms);
    roomList.push(room);
    const roomSet = new Set(roomList);
    const roomArray = [...roomSet];
    if (roomArray.includes(room)) {
      console.log("joined", room);
      socket.join(room);
    } else {
      console.log("create", room);
      socket.leave(array[1]);
      socket.join(room);
    }
    io.emit('room_list', (roomArray))


  });

});

server.listen(3000, () => console.log("server is up"));
