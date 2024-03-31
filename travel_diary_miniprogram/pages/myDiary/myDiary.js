// travel_diary_miniprogram/pages/myDiary/myDiary.js
const baseUrl = getApp().globalData.baseUrl
const userInfo = getApp().globalData.userInfo
Page({

  // 页面的初始数据
  data: {
    islogged:true,
    user_id: userInfo.id,
    noteList: [] ,// 游记列表数据
    emptyDes:"还未添加游记，快去发布吧~",
    page:1,
    pageSize:6,
    total:0,
    isLoading:false
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // console.log(options)
    

  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {

  },

  // 生命周期函数--监听页面显示
  onShow: function () {
    this.showNotesList()

  },

  // 生命周期函数--监听页面隐藏
  onHide: function () {

  },

  // 生命周期函数--监听页面卸载
  onUnload: function () {

  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    this.setData({
      page:1,
      noteList:[],
      total:0
    })

    this.showNotesList(()=>{
      wx.stopPullDownRefresh()
    })
  
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    if(this.data.page * this.data.pageSize >= this.data.total){
      return wx.showToast({
        title: '游记到底啦~',
        icon:'none'
      })
    }
    if(this.data.isLoading) return
    this.setData({
      page:this.data.page+1
    })
    this.showNotesList()
  },

  // 用户点击右上角分享
  onShareAppMessage: function () {

  },

  //展示游记列表
  showNotesList(pr){
    //登录态
    let that = this;

    //未登录
    if(!userInfo) {
      this.setData({
        islogged:false,
        emptyDes:'您尚未登录，点击登录获取更多权益',
        noteList:[]
      })

      return
    }
    
    this.setData({
      isLoading:true
    })
    wx.showLoading({
      title:'数据加载中...',
    })

    //登录后
    wx.request({
      url: baseUrl + 'diary/getMyNotesList',
      method: 'GET',
      data:{
        _page:that.data.page,
        _limit:that.data.pageSize,
        user_id:that.data.user_id
      },
      success(res) {
        // console.log(res)
        let code = res.statusCode;
        const { noteList, totalPages } = res.data;
        
        if(code == 200) {
          // console.log(noteList.length)
          that.setData({
            noteList: that.data.noteList.concat(noteList),
            total:totalPages
          });

        }
      },
      complete(){
        //隐藏loading效果
        wx.hideLoading()
        that.setData({ isLoading:false})
        pr && pr()
      }
      
      })


  },

  navigateToPostNote: function() {
    wx.navigateTo({
      url: '/pages/diaryPost/diaryPost' // 替换为目标页面的路径
    });
  },

  navigateToLogin: function() {
    wx.navigateTo({
      url: '/pages/login/login' // 替换为目标页面的路径
    });
  },

  navigateToEdit: function(e) {
    let d_id = e.target.dataset.did;

    wx.navigateTo({
      url: '/pages/diaryPublish/diaryPubish?d_id='+d_id // 替换为目标页面的路径
    });
  },

navigateToCheckedDetail: function(e) {
  let d_id = e.target.dataset.did;

    wx.navigateTo({
      url: '/pages/checkedDetail/checkedDetail?d_id='+d_id 
    });
},

navigateToDiaryDetail: function(e) {
  let d_id = e.target.dataset.did;

    wx.navigateTo({
      url: '/pages/diaryDetail/diaryDetail?d_id='+d_id 
    });
},

  /**
     * 处理touchstart事件
     */
    handleTouchStart(e) {
      this.startX = e.touches[0].pageX
  },

  /**
   * 处理touchend事件
   */
  handleTouchEnd(e) {
      if (e.changedTouches[0].pageX < this.startX && e.changedTouches[0].pageX - this.startX <= -30) {
          this.showDeleteButton(e)
      } else if (e.changedTouches[0].pageX > this.startX && e.changedTouches[0].pageX - this.startX < 30) {
          this.showDeleteButton(e)
      } else {
          this.hideDeleteButton(e)
      }
  },
  /**
     * 显示删除按钮
     */
    showDeleteButton: function (e) {
      let index = e.currentTarget.dataset.index;
      this.data.xmove[index] = -65;
  },

  /**
   * 隐藏删除按钮
   */
  hideDeleteButton: function (e) {
      let index = e.currentTarget.dataset.index;
      this.data.xmove[index] = 0;
  },

  /**
   * 设置movable-view位移
   */
 

  /**
   * 处理movable-view移动事件
   */
  handleMovableChange: function (e) {
      if (e.detail.source === 'friction') {
          if (e.detail.x < -30) {
              this.showDeleteButton(e)
          } else {
              this.hideDeleteButton(e)
          }
      } else if (e.detail.source === 'out-of-bounds' && e.detail.x === 0) {
          this.hideDeleteButton(e)
      }
  },
})