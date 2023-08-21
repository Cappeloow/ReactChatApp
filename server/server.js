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

  socket.on("client_message", (data) => {
    const { room, messageData } = data;
    io.to(room).emit("retrieve_message", messageData);
  });

  socket.on("join_room", (room) => {
    let existingRoom = roomList.find((r) => r.name === room);

    if (existingRoom) {
      socket.leaveAll(); // Leave all existing rooms
      socket.join(room);
      existingRoom.participants.push(socket.id);
      console.log("Joined", room);
    } else {
      socket.leaveAll();
      socket.join(room);
      const newRoom = {
        name: room,
        participants: [socket.id],
      };
      roomList.push(newRoom);
      console.log("Created", newRoom);
    }
    console.log(roomList);
    io.emit("room_list", (roomList)); // Sending room names to clients
  });
});

server.listen(3000, () => console.log("Server is up"));
