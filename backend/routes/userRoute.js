const express = require('express');
const { followUser, allFollower } = require('../controllers/userController');
const router = express.Router();
router.post("/follow/:id", followUser);
router.get("/allFollower", allFollower);
module.exports = router;