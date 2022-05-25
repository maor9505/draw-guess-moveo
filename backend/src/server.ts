// npm start  --- start nodemon
// tsc --watch  ---  auto compile ts to js

import express from "express";
import socketIO from 'socket.io';

const app = express();
 const server=app.listen('3000', () => {
 console.log(`Express is listening`);
});


const io = new socketIO.Server(server);
io.on("connection", (socket) => {
  console.log(" new user connect");
  socket.on("Start Game", (data) => {
    //socket.join(data.room);
    socket.broadcast.emit("Start Game", data);
  });
    socket.on("User Log", (data) => {
      socket.broadcast.emit("User Log", data);
    });
    socket.on("Send Draw", (data) => {
        console.log('Send Draw room:  '+ data.room)
        console.log('user send draw:  '+ data.name)
      socket.to(data.socketId).emit("Get Draw", data);
    });
      socket.on("Guess Correct", (data) => {
        console.log("user guss correct and sent to");
        console.log(data.socketId)
        socket.to(data.socketId).emit("Guess Correct", data);
      });
      socket.on("Send Word", (data) => {
        console.log('Send Word')
        console.log('Data--  '+data)
        socket.to(data.socketId).emit("Get Word", data);
      });
      socket.on("Exit Game", () => {
        io.emit("Exit Game");
        io.close();
      });
});



