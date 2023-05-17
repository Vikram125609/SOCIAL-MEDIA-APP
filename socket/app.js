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
    console.log('Connected', socket.handshake.query.user_id);
    socket.join(`${socket.handshake.query.user_id}`)
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push(socket.handshake.query.user_id);
    }
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
    socket.on('privateMessage', ({ message, friend_id, user_id }) => {
        socket.to(`${friend_id}`).emit('broadCast', { message: message, friend_id: friend_id, user_id: user_id });
    });
    socket.on('video:call', (data) => {
        const { to } = data;
        socket.to(`${to}`).emit('incomming:video:call', data);
    });
    socket.on('video:call:accepted', ({ from, to, ans }) => {
        socket.to(`${to}`).emit('video:call:accepted', { from: from, ans: ans });
    });
    socket.on('disconnect', () => {
        console.log('Disconnected');
        const users = [];
        for (let [id, socket] of io.of("/").sockets) {
            users.push(socket.handshake.query.user_id);
        }
        io.emit('connectedUsers', users);
    })
});

module.exports = server;