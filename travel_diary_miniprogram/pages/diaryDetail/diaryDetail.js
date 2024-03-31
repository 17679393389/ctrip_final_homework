// travel_diary_miniprogram/pages/diaryDetail/diaryDetail.js
const baseUrl = getApp().globalData.baseUrl
const userInfo = getApp().globalData.userInfo
Page({

  // 页面的初始数据
  data: {
    query:[],
    noteDetail:[],
    avatarUrl:'',
    username:'',
    isNotMe:false


  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({
      query: options
    })

  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {

  },

  // 生命周期函数--监听页面显示
  onShow: function () {
    console.log(this.data.query)
    let that = this;

    wx.request({
      url: baseUrl + 'diary/getNoteDetail',
      method: 'GET',
      data:{
        d_id: that.data.query.d_id
      },
      success(res) {
       const { noteDetail } = res.data;

       if(noteDetail.create_by == userInfo.id) {
         that.data.isNotMe = true;
       }

       that.setData({
         noteDetail:noteDetail,
         avatarUrl: that.data.isNotMe ? userInfo.avatarUrl:noteDetail.avatarUrl,
         username: that.data.isNotMe ? userInfo.username:noteDetail.username
       })
      
      },
      complete(){
      }
      
      })

  },

  // 生命周期函数--监听页面隐藏
  onHide: function () {

  },

  // 生命周期函数--监听页面卸载
  onUnload: function () {

  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {

  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {

  },

  // 用户点击右上角分享
  onShareAppMessage: function () {

  }
})