"use strict";
// npm start  --- start nodemon
// tsc --watch  ---  auto compile ts to js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const app = (0, express_1.default)();
const server = app.listen('3000', () => {
    console.log(`Express is listening`);
});
const io = new socket_io_1.default.Server(server);
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
        console.log('Send Draw room:  ' + data.room);
        console.log('user send draw:  ' + data.name);
        socket.to(data.socketId).emit("Get Draw", data);
    });
    socket.on("Guess Correct", (data) => {
        console.log("user guss correct and sent to");
        console.log(data.socketId);
        socket.to(data.socketId).emit("Guess Correct", data);
    });
    socket.on("Send Word", (data) => {
        console.log('Send Word');
        console.log('Data--  ' + data);
        socket.to(data.socketId).emit("Get Word", data);
    });
    socket.on("Exit Game", () => {
        io.emit("Exit Game");
    });
});
