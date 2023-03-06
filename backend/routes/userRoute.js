const express = require('express');
const { followUser, allFollower, me } = require('../controllers/userController');
// const globalAccess = require('../middlewares/auth');
const { upload } = require('../middlewares/multer');
const router = express.Router();
router.post("/follow/:id", followUser);
router.get("/allFollower", allFollower);
router.get("/me/:id", me);
module.exports = router;