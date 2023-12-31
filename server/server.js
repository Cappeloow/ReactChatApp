const express = require("express");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let userList = [];

app.get("/getUsers", (req, res) => {
  res.json(userList);
});

let roomList = [];

io.on("connection", (socket) => {
  console.log("User has connected with id:", socket.id);

  socket.on("username_input", (username) => {
    socket.username = username;
    userList.push(username);
  });

  socket.on("client_typing", (data) => {
    const { room, username, isMeTyping } = data;
    io.to(room).emit("they_typing", username, isMeTyping);
  });

  socket.on("client_message", (data) => {
    const { room, messageData } = data;
    io.to(room).emit("retrieve_message", messageData);
  });

  socket.on("join_room", (room) => {
    let existingRoom = roomList.find((r) => r.name === room);

    roomList.forEach((r) => {
      if (r.participants.includes(socket.username) && r.name !== room) {
        r.participants = r.participants.filter((id) => id !== socket.username);

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

    if (socket.username) {
      if (existingRoom) {
        socket.leaveAll();
        socket.join(room);
        existingRoom.participants.push(socket.username);
        console.log(socket.username, "joined", room);
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
    }

    roomList.forEach((r) => {
      const updatedParticipantList = new Set(r.participants);
      const participantsArray = Array.from(updatedParticipantList);
      r.participants = participantsArray;
    });

    console.log(roomList);
    io.emit("room_list", roomList);
  });

  socket.on("disconnect", (reason) => {
    // Removes the disconnected user from userList
    userList = userList.filter((user) => user !== socket.username);
    console.log(`${socket.username} has disconnected due to ${reason}`);

    // Filters and updates the roomList to not include the disconnected user
    roomList.map((room) => {
      room.participants = room.participants.filter(
        (user) => user !== socket.username
      );
    });

    // Emits the new updated roomList to other clients
    io.emit("updated_room_list", roomList);
  });
});

server.listen(3000, () => console.log("Server is up"));
