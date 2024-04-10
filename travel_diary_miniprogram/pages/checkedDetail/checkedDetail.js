// pages/checkedDetail/checkedDetail.js
const baseUrl = getApp().globalData.baseUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:[],
    noteDetail:[],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      query: options
    })

    // console.log(this.data.query)
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
    // console.log(this.data.query)
    let that = this;

    wx.request({
      url: baseUrl + 'diary/getMyNoteDetail',
      method: 'GET',
      data:{
        d_id: that.data.query.d_id
      },
      success(res) {
       const { noteDetail } = res.data;

       that.setData({
         noteDetail:noteDetail
       })

        
      },
      complete(){
      }
      
      })
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

  navigateToEdit: function() {
    
    wx.navigateTo({
      url: '/pages/diaryPublish/diaryPubish?d_id='+this.data.query.d_id // 替换为目标页面的路径
    });
    
  }

})