// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../utils/authMiddleware");
const checkTokenExpiration = require("../utils/checkJwtExpiration");
const userController = require("../controllers/userController");
router.get("/storeUserDiaryView",userController.storeUserDiaryView);
router.get("/getAllUser", userController.getAllUsers);
router.get("/searchUser", userController.searchUser);
// 需要验证身份的路由使用 authMiddleware 中间件
router.get(
  "/getUserStats",
  authMiddleware,
  checkTokenExpiration,
  userController.getUserStats
);
router.get("/:id", authMiddleware, userController.getUserById);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.post("/login", userController.loginUser);
router.post("/login_wx", userController.loginWithWx);
router.post("/register", userController.createUser);
router.post("/get_openid", userController.getUserIdentifier);
module.exports = router;
