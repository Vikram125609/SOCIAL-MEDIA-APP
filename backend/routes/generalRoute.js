const express = require('express');
const { allUsers } = require('../controllers/generalController');
const globalAccess = require('../middlewares/auth');
const router = express.Router();
router.get("/allusers" , globalAccess ,allUsers);
module.exports = router;