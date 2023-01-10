const express = require('express');
const { getOtp, getUser } = require('../controllers/userController');
const router = express.Router();
router.get("/getOtp", getOtp);
router.get("/getUser", getUser);
module.exports = router;