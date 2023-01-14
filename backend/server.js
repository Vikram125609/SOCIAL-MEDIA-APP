const dotenv = require('dotenv').config({ path: "./config.env" })
const app = require('./app');
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Database Connected Successfully !!')).catch((error) => console.log(error));

const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})