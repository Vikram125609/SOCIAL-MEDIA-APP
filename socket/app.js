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
    console.log('Connected', socket.id);
    socket.on('sendMessage', (data) => {
        console.log(data);
        socket.broadcast.emit('broadCast', data);
    });
    socket.on('disconnect', () => {
        console.log('Disconnected');
    })
});

module.exports = server;