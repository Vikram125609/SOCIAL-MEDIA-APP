const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
router.use("/api/user/v1", userRoute);
router.use("/api/auth/v1", authRoute);
module.exports = router;