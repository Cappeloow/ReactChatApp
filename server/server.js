const express = require('express');
const http = require('http');
const app = express();
const {Server} = require('socket.io');
const cors = require('cors');
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  // const userList = [];


  io.on("connection", (socket)=>{
    console.log(socket.id);

    const test = {id: socket.id};

    socket.on("set_username", (data) => {
      console.log(data);
      const newTest = {...test, username: data}
      io.emit("display_username", data)
      // userList.push(newTest);
      // console.log(userList);
      socket.emit("room_list", newTest)
    })


  })

  server.listen(3000, () => console.log("server is up"));