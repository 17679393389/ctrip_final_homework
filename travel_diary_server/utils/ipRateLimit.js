// ipRateLimit.js

const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// 创建一个限制每个 IP 地址每分钟最多发起 20 个请求的限制器
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 分钟
  max: 20, // 每个 IP 地址每分钟最多 20 个请求
  message: '请求过于频繁，请稍后再试！',
});

// 应用限制器到所有请求
app.use(limiter);

module.exports = app;
