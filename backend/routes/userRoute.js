const express = require('express');
const { followUser, allFollower, profile , me } = require('../controllers/userController');
const globalAccess = require('../middlewares/auth');
// const globalAccess = require('../middlewares/auth');
const { upload } = require('../middlewares/multer');
const router = express.Router();
router.post("/follow/:id", globalAccess, followUser);
router.get("/allFollower", globalAccess, allFollower);
router.get("/me/:id", globalAccess, me);
router.get("/profile/:id", globalAccess, profile)
module.exports = router;