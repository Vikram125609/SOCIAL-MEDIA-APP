const { default: axios } = require('axios');
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const { notify } = require('./Api/Api');

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log('Connected', socket.id);
    socket.join(`${socket.handshake.query.user_id}`)
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push(socket.handshake.query.user_id);
    }
    // Here the io.emit is required because i want to notify all the users without refresh that I am online
    io.emit('connectedUsers', users);
    socket.on('getAgainAllConnectedUsers', () => {
        const users = [];
        for (let [id, socket] of io.of("/").sockets) {
            users.push(socket.handshake.query.user_id);
        }
        socket.emit('connectedUsers', users);
    });
    socket.on('profileView', async (data) => {
        const notifications = await notify(data);
        if (notifications?.data?.code === 201) {
            return;
        }
        socket.to(`${data?.viewed_id}`).emit('viewed', notifications?.data?.data);
    });
    socket.on('privateMessage', ({ message, room_id, user_id }) => {
        socket.to(`${room_id}`).emit('broadCast', { message: message, room_id: room_id, user_id: user_id });
    })
    socket.on('disconnect', () => {
        // Here the io.emit is required because i want to notify all the users without refresh that I got offline
        console.log('Disconnected');
        const users = [];
        for (let [id, socket] of io.of("/").sockets) {
            users.push(socket.handshake.query.user_id);
        }
        io.emit('connectedUsers', users);
    })
});

module.exports = server;