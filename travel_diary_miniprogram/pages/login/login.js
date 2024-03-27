const app = getApp();
const baseUrl = getApp().globalData.baseUrl;
Page({
  data: {
    username: "",
    password: "",
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

  //用户登录注册
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
          console.log(res);
          if (res.statusCode == 200) {
            app.globalData.userInfo = res.data;
            wx.setStorageSync("userInfo", JSON.stringify(res.data));
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
  toRegister() {
    wx.navigateTo({
      url: "/pages/register/register",
    });
  },
});
