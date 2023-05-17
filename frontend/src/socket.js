import { io } from 'socket.io-client';

const URL = 'http://192.168.1.23:3002';

export const socket = io(URL, {
    autoConnect: false,
    query: `user_id=${localStorage.getItem('_id')}`
});

socket.onAny((event, ...args) => {
    console.log(event, args);
});