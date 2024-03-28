const app = getApp();
Page({
  data: {
    title: "",
    content: "",
    category: ["攻略", "美食", "风景", "交通", "住宿", "其他"],
    photoList: [],
    categoryItem: 5,
  },
  onLoad(options) {
    //拿到需要修改的游记信息并渲染在本页面
    console.log(options);
  },

  //图片选择
  onChangeTap(e) {
    this.setData({
      photoList: e.detail.all,
    });
  },
  //游记标题输入获取
  titleInput(e) {
    this.setData({
      title: e.detail.value,
    });
  },
  //游记内容输入获取
  contentInput(e) {
    this.setData({
      content: e.detail.value,
    });
  },

  //游记类型选择
  onCategorySelect(e) {
    this.setData({
      categoryItem: e.detail.key,
    });
  },

  //游记发布
  onDairyPublish() {
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: "请先登录再发表哦~",
        icon: "none",
      });
      return;
    }
    //校验
    if (
      !this.data.title ||
      !this.data.content ||
      this.data.photoList.length == 0
    ) {
      wx.showToast({
        title: "请把标题、内容和图片补充一下",
        icon: "none",
      });
      return;
    } else {
      //游记信息
      const diaryList = {
        title: this.data.title,
        content: this.data.content,
        category: this.data.categoryItem,
        photo: this.data.photoList,
        label: this.data.category[this.data.categoryItem],
        create_by: app.globalData.userInfo.id,
      };
      //发布游记
      wx.request({
        // url: app.globalData.baseUrl + "/diary",
        url: "",
        data: diaryList,
        method: "POST",
        header: {
          "Content-Type": "application/json",
          Authorization: app.globalData.token,
        },
        success: (res) => {
          if (res.statusCode == 200) {
            console.log(res.data);
            wx.showToast({
              title: "上传成功，请等待审核",
              duration: 2000,
            });
            setTimeout(function () {
              //发布成功后返回我的界面
              // wx.switchTab({
              //   url: "/pages/self/self",
              // });
            }, 2000);
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
  //返回上一级界面
  onGoBack() {
    wx.navigateBack({
      delta: 1,
    });
  },
});
