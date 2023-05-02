const express = require('express');
const { allUsers, notify, notifications, profileViewCount } = require('../controllers/generalController');
const globalAccess = require('../middlewares/auth');
const router = express.Router();
router.get("/allusers", globalAccess, allUsers);
router.post('/notify/:id', notify);
router.get('/notifications', globalAccess, notifications);
router.get('/profileViewCount', globalAccess, profileViewCount);
module.exports = router;