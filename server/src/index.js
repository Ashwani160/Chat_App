import express from "express";
import http from "http";
import {Server} from "socket.io";
import app from "./app.js";
import initSocket from "./config/socket.js";


const PORT=process.env.PORT || 5000;

const server=http.createServer(app);

const io=new Server(server, {
    cors:{
        origin:"*",
    },
});
initSocket(io);

server.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})