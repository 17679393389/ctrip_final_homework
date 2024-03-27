const app = getApp();
const baseUrl = getApp().globalData.baseUrl;
Page({
  data: {
    hello: "Hi, 给自己设置个形象吧~",
    username: "酸甜土豆丝",
    password: "",
    avatarUrl: "/images/avatar.jpg",
    gender: "1",
    male: "../../images/男已选中.png",
    female: "../../images/女未选中.png",
  },
  genderSelect(e) {
    console.log(e);
    if (e.detail.key == "1") {
      this.setData({
        gender: e.detail.key,
        female: "../../images/女未选中.png",
        male: "../../images/男已选中.png",
      });
    } else if (e.detail.key == "0") {
      this.setData({
        gender: e.detail.key,
        female: "../../images/女已选中.png",
        male: "../../images/男未选中.png",
      });
    }
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
  handleRegister() {
    //校验
    if (this.data.password == "") {
      wx.showToast({
        title: "密码不能为空",
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
        avatarUrl: this.data.avatarUrl,
        gender: this.data.gender,
      };
      console.log(userInfo);
      wx.request({
        url: baseUrl + "/user/register",
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
          console.log(res);
          wx.showToast({
            title: res.data.error,
            icon: "none",
            duration: 2000,
          });
        },
      });
    }
  },
});
