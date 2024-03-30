const app = getApp();
const baseUrl = getApp().globalData.baseUrl;
Page({
  data: {
    hello: "Hi, 给自己设置个形象吧~",
    username: "酸甜土豆丝",
    password: "",
    avatarUrl:
      "https://img2.baidu.com/it/u=1304049920,4025284449&fm=253&fmt=auto?w=800&h=800",
    gender: "1",
    male: "../../images/男已选中.png",
    female: "../../images/女未选中.png",
    uploadImg: 0, //记录上传图片的状态
    genderOp: 0, //记录性别选择
  },
  //选择头像
  onChooseAvatar() {
    const that = this;
    wx.chooseMessageFile({
      count: 1,
      type: "image",
      success(res) {
        that.setData({
          avatarUrl: res.tempFiles[0].path,
          uploadImg: 1,
        });
      },
      fail(res) {
        wx.showToast({
          title: res,
          duration: 2000,
        });
        console.log(res);
      },
    });
  },
  //头像上传
  onUploadImage() {
    const aliyunURL = "https://it-recite.oss-cn-shenzhen.aliyuncs.com";
    //遍历图片数组，上传图片
    const validImage = this.data.photoList.map((item) => {
      //提取图片名称
      const file = item;
      const fileName = file.match(/([^\/]+)(\?.*)?$/)[1];
      wx.uploadFile({
        url: aliyunURL,
        filePath: item, //本地图片临时地址
        name: "file", // 必须填file。
        formData: {
          key: "diary/" + fileName, //存储在阿里云的路径
          policy: wx.getStorageSync("policy"),
          OSSAccessKeyId: wx.getStorageSync("OSSAccessKeyId"),
          signature: wx.getStorageSync("signature"),
        },
      });
      return aliyunURL + "/diary/" + fileName;
    });
    return validImage;
  },

  //性别选择
  genderSelect(e) {
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
    this.setData({
      genderOp: 1,
    });
  },
  //用户名输入
  usernameInput(e) {
    this.setData({
      username: e.detail.value,
    });
  },
  //密码输入
  passwordInput(e) {
    this.setData({
      password: e.detail.value,
    });
  },
  //注册
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
      const that = this;
      wx.getUserProfile({
        desc: "展示用户信息",
        success: function (res) {
          const userInfo = {
            username: that.data.username,
            nickname: res.userInfo.nickName,
            password: that.data.password,
            avatarUrl: that.data.avatarUrl,
            gender: that.data.gender,
            openid: wx.getStorageSync("openid"),
          };
          //判断是否需要换头像
          if (that.data.uploadImg == 0) {
            userInfo.avatarUrl = res.userInfo.avatarUrl;
          } else {
            const validUrls = that.onUploadImage();
            userInfo.avatarUrl = validUrls[0];
          }
          console.log("用户头像", userInfo.avatarUrl);
          //判断是否需要换性别
          if (that.data.genderOp == 0) {
            userInfo.gender = res.userInfo.gender;
          }
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
                app.globalData.token = res.data.token;
                wx.setStorageSync("userInfo", JSON.stringify(res.data));
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
              console.log(res);
              wx.showToast({
                title: res.data.error,
                icon: "none",
                duration: 2000,
              });
            },
          });
        },
        fail: function (res) {
          wx.showToast({
            title: "获取用户信息失败，请重试",
            icon: "none",
            duration: 2000,
          });
        },
      });
    }
  },
});
