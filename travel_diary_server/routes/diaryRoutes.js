// routes/diaryRoutes.js
const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryController');


router.get('/', diaryController.getAllDiaries);
router.get('/getMyNotesList', diaryController.getMyNotesList);
router.post('/', diaryController.createDiary);
router.get('/:id', diaryController.getDiaryById);
router.put('/:id', diaryController.updateDiary);
router.delete('/:id', diaryController.deleteDiary);


module.exports = router;
