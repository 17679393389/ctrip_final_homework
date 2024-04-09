const app = getApp();
const baseUrl = getApp().globalData.baseUrl;
Page({
  data: {
    username: "",
    password: "",
    userInfo: {},
    hasUserInfo: false,
  },
  usernameInput(e) {
    this.setData({
      username: e.detail.value,
    });
  },
  passwordInput(e) {
    this.setData({
      password: e.detail.value,
    });
  },

  //用户账号密码登录
  handleLogin() {
    //校验
    if (this.data.username == "" || this.data.password == "") {
      wx.showToast({
        title: "用户名和密码不能为空",
        icon: "none",
      });
      return;
    } else if (
      this.data.password.length < 8 ||
      this.data.password.length > 16
    ) {
      wx.showToast({
        title: "密码应该为8-16位",
        icon: "none",
      });
      return;
    } else {
      const userInfo = {
        username: this.data.username,
        password: this.data.password,
      };
      wx.request({
        url: baseUrl + "/user/login",
        data: userInfo,
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        success: (res) => {
          if (res.statusCode == 200) {
            app.globalData.userInfo = res.data.user;
            app.globalData.token = res.data.token;
            wx.setStorageSync("userInfo", JSON.stringify(res.data.user));
            wx.setStorageSync("token", res.data.token);
            wx.switchTab({
              url: "/pages/home/home",
            });
          } else {
            wx.showToast({
              title: res.data.message,
              icon: "none",
              duration: 2000,
            });
          }
        },
        fail: (res) => {
          wx.showToast({
            title: res.data.error,
            icon: "none",
            duration: 2000,
          });
        },
      });
    }
  },

  //用户授权登录
  wxLogin() {
    wx.request({
      url: baseUrl + "/user/login_wx",
      data: {
        openid: wx.getStorageSync("openid"),
      },
      header: {
        "content-type": "application/json",
      },
      method: "POST",
      success: function (res) {
        //可以把openid保存到本地缓存，方便以后调用
        wx.setStorageSync("openid", res.data.id);
        if (res.statusCode == 200) {
          app.globalData.userInfo = res.data.user;
          app.globalData.token = res.data.token;
          wx.setStorageSync("userInfo", JSON.stringify(res.data.user));
          wx.setStorageSync("token", res.data.token);
          wx.switchTab({
            url: "/pages/home/home",
          });
        } else {
          wx.showToast({
            title: res.data.message,
            icon: "none",
            duration: 2000,
          });
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
  },
  //注册界面
  toRegister() {
    wx.navigateTo({
      url: "/pages/register/register",
    });
  },
});
