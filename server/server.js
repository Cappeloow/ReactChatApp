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
  console.log("User has connected with id:", socket.id);

  socket.on("username_input", (username) => {
    socket.username = username;
  });

  socket.on("client_message", (data) => {
    const { room, messageData } = data;
    io.to(room).emit("retrieve_message", messageData);
  });

  socket.on("join_room", (room) => {
    let existingRoom = roomList.find((r) => r.name === room);

    roomList.forEach((r) => {
      //här tar vi bort usern från förra rummet den var i
      if (r.participants.includes(socket.username) && r.name !== room) {
        r.participants = r.participants.filter((id) => id !== socket.username);
        // ta bort hela rummet om det inte finns någon där!
        if (r.participants.length === 0 && r.name !== "lobby") {
          const indexToRemove = roomList.findIndex(
            (room) => room.name === r.name
          );
          if (indexToRemove !== -1) {
            roomList.splice(indexToRemove, 1);
          }
        }
      }
    });

    console.log("the name of the socket:", socket.username);
    if (existingRoom) {
      socket.leaveAll();
      socket.join(room);
      existingRoom.participants.push(socket.username);
      console.log("Joined", room);
    } else {
      socket.leaveAll();
      socket.join(room);
      const newRoom = {
        name: room,
        participants: [socket.username],
      };
      roomList.push(newRoom);
      console.log("Created", newRoom);
    }

    roomList.forEach((r) => {
      const updatedParticipantList = new Set(r.participants);
      const participantsArray = Array.from(updatedParticipantList);
      r.participants = participantsArray;
    });

    console.log(roomList);
    io.emit("room_list", roomList);
  });
});

server.listen(3000, () => console.log("Server is up"));
