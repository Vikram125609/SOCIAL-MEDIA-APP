const express = require('express');
const app = express();
const indexRoute = require('./routes/indexRoute');
app.use('/',indexRoute);
module.exports = app;