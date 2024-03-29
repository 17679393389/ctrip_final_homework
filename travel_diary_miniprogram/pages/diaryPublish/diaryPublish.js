const app = getApp();
Page({
  data: {
    title: "",
    content: "",
    category: ["攻略", "美食", "风景", "交通", "住宿", "其他"],
    photoList: [],
    categoryItem: 5,
    status: 0, //记录是新发布状态还是编辑状态 默认新发布
  },
  onLoad(options) {
    // options.d_id = "14";
    //判断是新发布还是编辑
    if (options && "d_id" in options) {
      //拿到需要编辑的游记信息并渲染在本页面
      this.setData({
        status: 1, //记录是编辑状态
      });
      const diaryId = options.d_id;
      wx.request({
        url: "",
        method: "POST",
        data: diaryId,
        header: {
          "Content-Type": "application/json",
          Authorization: wx.getStorageSync("token"),
        },
        success: (res) => {},
      });
    }
    console.log("游记发布", options, this.data.status);
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
    if (wx.getStorageSync("userInfo") == null) {
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
      //把图片数组转换为,分割的字符串
      const photo = this.data.photoList.join(",");
      const diary = {
        title: this.data.title,
        content: this.data.content,
        category: this.data.categoryItem,
        photo: photo,
        label: this.data.category[this.data.categoryItem],
        create_by: JSON.parse(wx.getStorageSync("userInfo")).id,
      };
      //发布游记
      const status = this.data.status;
      if (status == 1) {
        diary.id = options.d_id;
      }
      wx.request({
        url: app.globalData.baseUrl + "/diary/newDiary",
        data: { status: status, diary },
        method: "POST",
        header: {
          "Content-Type": "application/json",
          Authorization: wx.getStorageSync("token"),
        },
        success: (res) => {
          //监听token状态
          getApp().listenForNewToken(res);
          if (res.statusCode == 200) {
            console.log(res.data);
            wx.showToast({
              title: "上传成功，请等待审核",
              icon: "none",
              duration: 2000,
            });
            setTimeout(function () {
              //发布成功后返回我的界面;
              wx.switchTab({
                url: "/pages/index/index",
              });
            }, 2000);
          } else if (res.statusCode == 401) {
            wx.showToast({
              title: "请先登录再发表哦~",
              icon: "none",
            });
            //用户状态过期或未登录清除缓存和全局变量
            wx.removeStorageSync("token");
            wx.removeStorageSync("userInfo");
            app.globalData.token = "";
            app.globalData.userInfo = null;
          } else {
            console.log(res.data);
            wx.showToast({
              title: res.data.error,
              icon: "none",
              duration: 2000,
            });
          }
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
