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
        socket.broadcast.emit('broadCast', data);
    });
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push(socket.handshake.query.user_id);
    }
    socket.emit('connectedUsers', users);;
    socket.on('getAgainAllConnectedUsers', () => {
        const users = [];
        for (let [id, socket] of io.of("/").sockets) {
            users.push(socket.handshake.query.user_id);
        }
        socket.emit('connectedUsers', users);
    })
    socket.on('disconnect', () => {
        console.log('Disconnected');
    })
});

module.exports = server;