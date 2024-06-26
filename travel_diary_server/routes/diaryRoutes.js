// routes/diaryRoutes.js
const express = require("express");
const router = express.Router();
const diaryController = require("../controllers/diaryController");
const { authMiddleware } = require("../utils/authMiddleware");
const checkTokenExpiration = require("../utils/checkJwtExpiration");
router.get('/getRecommendedDiaries',diaryController.getRecommendedDiaries);
router.get('/searchStrategy',diaryController.searchStrategy);
router.post("/delete", diaryController.deleteDiary);
router.get("/getMyNotesList", diaryController.getMyNotesList);
router.get("/getMyNoteDetail", diaryController.getMyNoteDetail);
router.get("/getNoteDetail", diaryController.getNoteDetail);
router.get("/getTotalDiary", diaryController.getTotalDiary);
router.get("/getToBeCheckedDiary", diaryController.getToBeCheckedDiary);
router.get("/getDiaryByStatus", diaryController.getDiaryByStatus);
router.get(
  "/getUserDiaries",
  // authMiddleware,
  // checkTokenExpiration,
  diaryController.getUserDiaries
);
router.get("/", diaryController.getAllDiaries);
router.get("/getDiariesList", diaryController.getDiariesList);
router.get("/searchDiaries", diaryController.searchDiaries);
router.get("/getDeletedDiaries", diaryController.getDeletedDiaries);
router.get("/searchDeletedDiaries", diaryController.searchDeletedDiaries);
router.get("/getDiaryVerify", diaryController.getDiaryVerify);
// router.post("/", diaryController.createDiary);
router.get(
  "/:id",
  authMiddleware,
  checkTokenExpiration,
  diaryController.getDiaryById
);
// router.put("/:id", diaryController.updateDiary);
// router.delete("/:id", diaryController.deleteDiary);
router.post(
  "/newDiary",
  authMiddleware,
  checkTokenExpiration,
  diaryController.newDiary
);
router.post("/updateDiaryStatus", diaryController.updateDiaryStatus);

module.exports = router;
