const mongoose = require('mongoose')
const socketServer = require('./app');
require('dotenv').config()

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
});

process.on('exit', (code) => {
    if (code != 0) {
        console.log(`Restart the server 🔥 🔥 🔥`)
    }
});

const port = 3002 || process.env.PORT;
socketServer.listen(port, () => {
    console.log(`Server is running at ${port}`)
})
