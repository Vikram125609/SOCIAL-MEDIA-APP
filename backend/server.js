const app = require('./app');
const mongoose = require('mongoose');
const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})