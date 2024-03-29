// routes/diaryRoutes.js
const express = require("express");
const router = express.Router();
const diaryController = require("../controllers/diaryController");
const { authMiddleware } = require("../utils/authMiddleware");
const checkTokenExpiration = require("../utils/checkJwtExpiration");

router.get("/", diaryController.getAllDiaries);
router.get("/getDiariesList", diaryController.getDiariesList);
// router.post("/", diaryController.createDiary);
// router.get('/:id', diaryController.getDiaryById);
// router.put("/:id", diaryController.updateDiary);
router.delete("/:id", diaryController.deleteDiary);
router.get("/searchDiaries", diaryController.searchDiaries);
router.post(
  "/newDiary",
  authMiddleware,
  checkTokenExpiration,
  diaryController.newDiary
);
module.exports = router;
