const dotenv = require('dotenv').config()
const app = require('./app');
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
});


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Database Connected Successfully !!')).catch((error) => console.log(error));

const port = 3001 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})