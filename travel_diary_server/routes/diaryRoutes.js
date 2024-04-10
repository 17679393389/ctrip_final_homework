// routes/diaryRoutes.js
const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryController');


router.get('/', diaryController.getAllDiaries);
router.get('/getMyNotesList', diaryController.getMyNotesList);
router.get('/getMyNoteDetail', diaryController.getMyNoteDetail);
router.get('/getNoteDetail', diaryController.getNoteDetail);
router.get('/getTotalDiary',diaryController.getTotalDiary);
router.get('/getToBeCheckedDiary',diaryController.getToBeCheckedDiary);
router.post('/', diaryController.createDiary);
router.get('/:id', diaryController.getDiaryById);
router.put('/:id', diaryController.updateDiary);
router.post('/delete', diaryController.deleteDiary);


module.exports = router;
