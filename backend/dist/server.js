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
// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: true }));
const server = app.listen('3000', () => {
    console.log(`Express is listening`);
});
const io = new socket_io_1.default.Server(server);
io.on('connection', () => {
    console.log('connect');
});
