const CryptoJS = require("crypto-js");
//密码加密
const passWordEncryption = function passWordEncryption(password) {
  let orginalPassword = password;
  let hashedPassword = CryptoJS.SHA256(orginalPassword).toString();
  return hashedPassword;
};
module.exports = passWordEncryption;
