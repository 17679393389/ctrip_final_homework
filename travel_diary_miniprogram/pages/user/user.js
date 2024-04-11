// pages/user/user.js
const baseUrl = getApp().globalData.baseUrl
let userInfo = getApp().globalData.userInfo
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 6,
    total: 0,
    myDiaryList:[],
    user_id:0, //谁的主页
    username:'用户',//谁的主页
    avatarUrl:'',
    gender:'',
    tips:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      user_id:options.user_id,
      username:options.username,
      avatarUrl:options.avatarUrl,
      gender:options.gender,
      tips:options.tips
    })
    wx.setNavigationBarTitle({
      title: this.data.username+'的主页'
    })

    //获取用户发布成功的游记
    this.getUserDiariesList();
  },
 getUserDiariesList(){
  let that = this
  wx.request({
    url: baseUrl+'/diary/getUserDiaries',
    data:{
      openid:this.data.user_id,
      page:this.data.page,
      pageSize:8
    },success(res){
      // console.log(res.data)
      that.setData({
        myDiaryList: that.data.myDiaryList.concat(res.data.diaries),
        total: res.data.totalCount
      })
    }
  })
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
    // console.log("触发了刷新")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log('上拉刷新')
    if (this.data.page * this.data.pageSize >= this.data.total) {
      return wx.showToast({
        title: '游记到底啦~',
        icon: 'none'
      })
    }
    this.setData({
      page: this.data.page + 1
    })
    this.getUserDiariesList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})