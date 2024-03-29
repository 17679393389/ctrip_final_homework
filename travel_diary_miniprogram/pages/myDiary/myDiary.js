// pages/myDiary/myDiary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myDiaryList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMyPublishedDiaries()
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
  //获取当前用户发布的所有的游记，按时间顺序
  getMyPublishedDiaries(){
    let that = this
    wx.request({
      url: getApp().globalData.baseUrl + '/diary/getUserDiaries',
      data:{
        page:1,
        pageSize:8,
        openid:'o4VqY5sJfSWnl92Btl0YXphUdafQ'
      },
      header:{
        Authorization:getApp().globalData.token
      },
      method:"GET",
      success(res){
        // console.log(res.data)
        that.setData({myDiaryList:res.data.diaries})
      }
    })
  }
})