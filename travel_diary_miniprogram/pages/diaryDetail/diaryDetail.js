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
    isNotMe: true,
    hasLog: false,
    hasFollowed:false,
    liked:false,
    like:0,

  },

  commentOn:function(){
    wx.navigateTo({
      url: '/pages/comment/comment',
    })

  },

  followMe:function(){
    let that = this;

    if(userInfo){
      //关注
      if(!this.data.hasFollowed){
        wx.request({
          url: baseUrl + 'follow',
          method:'POST',
          data:{
            id:0,
            up_id: this.data.noteDetail.create_by,
            fans_id: userInfo.id
          },
          success(res){
            that.setData({
              hasFollowed:true
            })
          },
          complete(){
          }
        })
      }else{
        wx.request({
          url: baseUrl + 'follow/unfollow',
          method:'POST',
          data:{
            up_id: this.data.noteDetail.create_by,
            fans_id: userInfo.id
          },
          success(res){
            that.setData({
              hasFollowed:false
            })
          },
          complete(){
          }
        })
      }
    }else{
      wx.navigateTo({
        url: '/pages/login/login' // 替换为目标页面的路径
      });
    }


  },

  likeInfo:function() {
    let that = this;
    let liked = this.data.liked;
    if(liked){
      this.setData({
        liked:false,
        like: this.data.like-1
      })

    }else{
      this.setData({
        liked:true,
        like: this.data.like+1
      })
    }

    wx.request({
      url: baseUrl + 'love/updateNoteLikes',
      method: 'POST',
      data:{
        d_id: that.data.query.d_id,
        like_count: that.data.like,
      },
      success(res) {
        // console.log('Like updated successfully!')
       
      },
      complete(){
      }
      
      })

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
        
       const { noteDetail, fansData } = res.data;
        if(userInfo){
            that.setData({
                hasLog: true
              })
          if(noteDetail.create_by == userInfo.id) {
              that.setData({
                isNotMe: false
              })
          }
          else {
            if(fansData.indexOf(userInfo.id)>=0) {
              that.setData({
                hasFollowed:true
              })
          }
        }
      }
       that.setData({
        noteDetail:noteDetail,
        avatarUrl: noteDetail.avatarUrl,
        username: noteDetail.username,
        like: noteDetail.love_count
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
  onShareAppMessage: function (e) {
    if(e.from === 'button') {
        return {
          title: '快来看这篇笔记吧~ 链接：' + this.data.noteDetail.title,
        }
    }
  },
  onShareTimeline: function (e) {
        return {
          title: '快来看这篇笔记吧~ 链接：' + this.data.noteDetail.title,
          imageUrl:this.data.noteDetail.photoList[0]
        }
  }
})