// routes/likeRoutes.js
const express = require('express');
const router = express.Router();
const loveController = require('../controllers/loveController');

router.get('/', loveController.getAllLoves);
router.post('/', loveController.createLove);
router.get('/:id', loveController.getLoveById);
router.delete('/:id', loveController.deleteLove);

module.exports = router;
