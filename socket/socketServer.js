const mongoose = require('mongoose')
const socketServer = require('./app');
require('dotenv').config({ path: "./config.env" })

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
});

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Database Connected Successfully !!')).catch((error) => console.log(error));

const port = 3002 || process.env.PORT;
socketServer.listen(port, () => {
    console.log(`Server is running at ${port}`)
})
