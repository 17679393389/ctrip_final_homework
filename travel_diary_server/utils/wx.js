const { appid, appsecret } = require("../config");
const axios = require("axios");
wxURL = "https://api.weixin.qq.com/sns/jscode2session";
const getOpenid = async (code) => {
  const res = await axios.get(
    wxURL +
      `?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`
  );
  console.log("获取到的openid及session_key", res.data);
  return res.data;
};

module.exports = getOpenid;
