const app = getApp();
Page({
  data: {
    title: "",
    content: "",
    category: ["攻略", "美食", "风景", "交通", "住宿", "其他"],
    photoList: [],
    categoryItem: 5,
    status: 0, //记录是新发布状态还是编辑状态 默认新发布,
    diary: null, //记录编辑的游记信息
  },
  onLoad(options) {
    //判断是新发布还是编辑
    if (options && "d_id" in options) {
      //拿到需要编辑的游记信息并渲染在本页面
      this.setData({
        status: 1, //记录是编辑状态
      });
      this.getDiaryInfo(options.d_id);
    }
  },

  //图片选择
  onChangeTap(e) {
    this.setData({
      photoList: e.detail.all,
    });
  },

  //图片上传
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
      //上传图片
      const validUrls = this.onUploadImage();
      let photo = validUrls.join(",");
      //游记信息
      //把图片数组转换为,分割的字符串
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
          app.listenForNewToken(res);
          if (res.statusCode == 200) {
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
  //获取编辑信息
  getDiaryInfo(diaryId) {
    let that = this;
    wx.request({
      url: app.globalData.baseUrl + "/diary/" + diaryId,
      method: "GET",
      header: {
        "Content-Type": "application/json",
        Authorization: wx.getStorageSync("token"),
      },
      success: (res) => {
        if (res.statusCode == 200) {
          //监听token状态
          app.listenForNewToken(res);
          let label = that.data.category.indexOf(res.data.label);
          if (label == -1) {
            label = 5;
          }
          that.setData({
            title: res.data.title,
            content: res.data.content,
            categoryItem: label,
            photoList: res.data.photo.split(","),
            diary: res.data,
          });
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
          wx.showToast({
            title: res.data.error,
            icon: "none",
            duration: 2000,
          });
        }
      },
    });
  },
});
