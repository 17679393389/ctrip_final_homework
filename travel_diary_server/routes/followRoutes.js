// routes/followRoutes.js
const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');

router.get('/', followController.getAllFollows);
router.post('/', followController.createFollow);
router.get('/:id', followController.getFollowById);
router.delete('/:id', followController.deleteFollow);

module.exports = router;
