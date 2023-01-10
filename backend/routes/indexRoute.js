const express = require('express');
const router = express.Router();
const userRoute = require('./userRoute');
router.use("/api/user/v1",userRoute);
module.exports = router;