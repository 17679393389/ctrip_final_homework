// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
    const baseUrl = this.globalData.baseUrl;
    // 登录
    wx.login({
      success(res) {
        if (res.code) {
          const code = res.code;
          wx.request({
            url: baseUrl + "/user/get_openid",
            data: {
              code: code,
            },
            header: {
              "content-type": "application/json",
            },
            method: "POST",
            success: function (res) {
              //可以把openid保存到本地缓存，方便以后调用
              wx.setStorageSync("openid", res.data.openid);
            },
            fail: function (error) {
              console.log(error);
            },
          });
        } else {
          console.log("获取用户登录态失败，请重试");
        }
      },
      fail: function (error) {
        wx.showToast({
          title: error.data.error,
          icon: "none",
          duration: 2000,
        });
      },
    });
    this.checkLogin();
  },
  globalData: {
    userInfo: null,
    baseUrl: "http://localhost:3000",
    token: "",
  },
  // 登录检测：token
  checkLogin() {
    console.log("app launched", wx.getStorageSync("token"));
    //全局变量或缓存中存在token，直接赋值，否则重新登录
    var token = this.globalData.token;
    if (!token) {
      token = wx.getStorageSync("token");
      if (token) {
        this.globalData.token = token;
      } else {
        wx.clearStorageSync();
        wx.showToast(
          {
            title: "请登录",
            icon: "none",
          },
          2000
        );
      }
    }
  },
});
