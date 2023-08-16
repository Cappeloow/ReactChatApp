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


  io.on("connection", (socket)=>{
    console.log(socket.id);

    socket.on("send_username", (data) => {
      console.log(data);
      
      io.emit("display_user", data)
    })

  })

  server.listen(3000, () => console.log("server is up"));