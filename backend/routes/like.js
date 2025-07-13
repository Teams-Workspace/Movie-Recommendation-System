const express = require('express');
const router = express.Router();
const { verifyToken } = require('../config/JWTconfig');
const { getLikes, addLike, removeLike } = require('../controllers/LikeController');

router.get('/', verifyToken, getLikes);

// @route POST /api/likes
router.post('/', verifyToken, addLike);

// @route PUT /api/likes
router.put('/', verifyToken, removeLike);

module.exports = router;
