// npm start  --- start nodemon
// tsc --watch  ---  auto compile ts to js

import express from "express";
import socketIO from "socket.io";

const app = express();
const server = app.listen("3000", () => {
  console.log(`Express is listening`);
});

const io = new socketIO.Server(server);
io.on("connection", (socket) => {
  console.log("user connect socket id : " + socket.id);
  socket.on("Join Room", (data) => {
    console.log("Size room:  " + io.sockets.adapter.rooms.get(data.room)?.size);
    const size = io.sockets.adapter.rooms.get(data.room)?.size;
    if (size && size == 2) {
      socket.emit("Join Room", { isJoin: false });
    } else {
      socket.join(data.room);
      socket.emit("Join Room", { isJoin: true });
    }
  });
  socket.on("Start Game", (data) => {
    console.log("Start game room :" + data.room);
    socket.to(data.room).emit("Start Game", data);
  });
  socket.on("User Log", (data) => {
    console.log("User Log room :" + data.room);
    socket.to(data.room).emit("User Log", data);
  });
  socket.on("Send Draw", (data) => {
    socket.to(data.room).emit("Get Draw", data);
  });
  socket.on("Guess Correct", (data) => {
    socket.to(data.room).emit("Guess Correct", data);
  });
  socket.on("Send Word", (data) => {
    socket.to(data.room).emit("Get Word", data);
  });
  socket.on("Turn Pass", (data) => {
    socket.to(data.room).emit("Turn Pass", data);
  });
  socket.on("Exit Game", (data) => {
    io.in(data.room).emit("Exit Game", data);
    socket.leave(data.room)
  });
});
