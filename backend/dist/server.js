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
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: true }));
const server = app.listen('3000', () => {
    console.log(`Express is listening`);
});
const io = new socket_io_1.default.Server(server);
io.on("connection", (socket) => {
    console.log("connect");
    socket.on("Start Game", (data) => {
        console.log("player join ");
        console.log(data.name);
        socket.broadcast.emit("Start Game", {
            name: data.name,
        });
    });
    socket.on("User Log", (data) => {
        socket.broadcast.emit("User Log", data);
    });
    socket.on("Send Draw", (data) => {
        console.log('get draw from..');
        console.log(data.name);
        console.log(socket.id);
        socket.broadcast.emit("Get Draw", data);
    });
});
