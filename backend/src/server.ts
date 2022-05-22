// npm start  --- start nodemon
// tsc --watch  ---  auto compile ts to js

import express, { Request } from "express";
import bodyParser from "body-parser";
import socket from 'socket.io';

const app = express();

// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: true }));

 const server=app.listen('3000', () => {
 console.log(`Express is listening`);
});
const io =  new socket.Server(server);
io.on('connection',()=>{
    console.log('connect')
})
