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
const server = app.listen("3000", () => {
    console.log(`Express is listening`);
});
const io = new socket_io_1.default.Server(server);
io.on("connection", (socket) => {
    console.log("user connect socket id : " + socket.id);
    socket.on("Join Room", (data) => {
        var _a, _b;
        console.log("Size room:  " + ((_a = io.sockets.adapter.rooms.get(data.room)) === null || _a === void 0 ? void 0 : _a.size));
        const size = (_b = io.sockets.adapter.rooms.get(data.room)) === null || _b === void 0 ? void 0 : _b.size;
        if (size && size == 2) {
            socket.emit("Join Room", { isJoin: false });
        }
        else {
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
        socket.leave(data.room);
    });
});
