// pages/userList/userList.js
const baseUrl = getApp().globalData.baseUrl
let userInfo = getApp().globalData.userInfo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options && 'flag' in options){
      if(options.flag == 1){ //获取关注的用户列表
        wx.setNavigationBarTitle({
          title: '我的关注'
        })
        let that = this
        wx.request({
          url: baseUrl+'/follow/getFollowAndFansListByUserId',
          data:{
            user_id:userInfo.id,
            flag:options.flag
          },
          success(res){
            console.log(res)
            that.setData({
              user_list:res.data
            })
          }
        })
      }else if(options.flag == 2){ //获取粉丝用户列表
        wx.setNavigationBarTitle({
          title: '我的粉丝'
        })
        let that = this
        wx.request({
          url: baseUrl+'/follow/getFollowAndFansListByUserId',
          data:{
            user_id:userInfo.id,
            flag:options.flag
          },
          success(res){
            // console.log(res)
            that.setData({
              user_list:res.data
            })
          }
        })
      } 
    }
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
  //点击跳转到用户的主页
  goToUserHomePage(e){
    console.log(e)
    const { id, username, avatarurl, gender, tips } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/user/user?user_id=${id}&username=${username}&avatarUrl=${avatarurl}&gender=${gender}&tips=${tips}`,
    })
  }
})