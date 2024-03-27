// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const userController = require("../controllers/userController");

// 需要验证身份的路由使用 authMiddleware 中间件
router.get('/getUserStats', userController.getUserStats);
router.get('/', authMiddleware, userController.getAllUsers);
router.post('/', authMiddleware, userController.createUser);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);
router.post("/login", userController.loginUser);
router.post("/register", userController.createUser);

module.exports = router;
