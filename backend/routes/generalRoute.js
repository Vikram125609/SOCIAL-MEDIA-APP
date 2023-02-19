const express = require('express');
const { allUsers } = require('../controllers/generalController');
const router = express.Router();
router.get("/allusers", allUsers);
module.exports = router;