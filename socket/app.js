const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log('A user connected with this socket id', socket.id);
});

module.exports = server;