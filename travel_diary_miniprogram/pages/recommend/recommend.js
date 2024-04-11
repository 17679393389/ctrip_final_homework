// pages/recommend/recommend.js
const baseUrl = getApp().globalData.baseUrl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shi:{id: 1, title: "鸡鸣汤包", content: "好多人啊 看樱花了", photoList: ["https://img1.baidu.com/it/u=2995584842,1205264119&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1067"]},
    zhu:{id: 1, title: "全季酒店（夫子庙店）", content: "好多人啊 看樱花了", photoList: ["https://img0.baidu.com/it/u=582796663,2068182030&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375"]},
    xing:{id: 1, title: "南京地铁3号线", content: "好多人啊 看樱花了", photoList: ["https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E9%B8%A1%E9%B8%A3%E5%AF%BA.png"]},
    jing:{id: 1, title: "鸡鸣寺", content: "好多人啊 看樱花了", photoList: ["https://img2.baidu.com/it/u=1904674209,1904267315&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500"]}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  //获取目的地的旅游攻略
  searchStrategy(e){
    // console.log(e.detail.value)
    wx.request({
      url: baseUrl + '/diary/searchStrategy',
    })
  }


})