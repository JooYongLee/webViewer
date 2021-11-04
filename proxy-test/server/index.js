// import {createRquire} from "module"
// import { createRquire } from "module"
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

import {bigstr} from "./bigstream.js"
// app.get('/socket', (req, res) => {
//     // console.log(req, "===")
//     console.log("visited")
//   res.sendFile(__dirname + '/index.html');
// });

app.get('/', (req, res) => {
    // res.sendFile({msg:"test"})
    res.send({msg:"test"})
    // res.sendFile(__dirname + '/index.html');
  });



io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("receive", (msg)=>{
    console.log(msg)
  })
  socket.on("message", (msg)=>{
    console.log("complete")
    socket.emit("message", 
    bigstr
    )
  })
socket.on("disconnect", msg => {
    console.log("disconnected")
})
});

const PORT = 3005
server.listen(PORT, () => {
  console.log('listening on *:', PORT);
});