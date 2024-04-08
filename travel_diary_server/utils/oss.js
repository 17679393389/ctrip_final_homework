const OSS = require("ali-oss");
const express = require("express");
const router = express.Router();
const MpUploadOssHelper = require("./uploadOssHelper.js");
const client = new OSS({
  region: "oss-cn-shenzhen",
  // endpoint: "oss-cn-shenzhen.aliyuncs.com",
  accessKeyId: "LTAI4G5xAX6SzvEfafyBvyKe", // 设置环境变量OSS_ACCESS_KEY_ID。
  accessKeySecret: "H42Ll5TnTLDpQVlKq9bI9c9ENshJyb", // 设置环境变量OSS_ACCESS_KEY_SECRET。
  authorizationV4: true,
  // 存储空间名称。
  bucket: "it-recite",
});

//获取签名等信息
const getSignature = (req, res) => {
  const mpHelper = new MpUploadOssHelper({
    // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。
    accessKeyId: "LTAI4G5xAX6SzvEfafyBvyKe",
    accessKeySecret: "H42Ll5TnTLDpQVlKq9bI9c9ENshJyb",
    // 限制参数的生效时间，单位为小时，默认值为1。
    timeout: 1,
    // 限制上传文件大小，单位为MB，默认值为10。
    maxSize: 10,
  });

  // 生成参数。
  const params = mpHelper.createUploadParams();

  res.json(params);
};

//配置路由
router.get("/getPostObjectParams", getSignature);
module.exports = router;
