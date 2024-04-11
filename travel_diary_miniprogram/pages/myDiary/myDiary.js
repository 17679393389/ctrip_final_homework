// travel_diary_miniprogram/pages/myDiary/myDiary.js
const baseUrl = getApp().globalData.baseUrl;
let userInfo = getApp().globalData.userInfo;
Page({
  // 页面的初始数据
  data: {
<<<<<<< HEAD
    status: 1,
=======
    follow_count: 0,
    fans_count: 0,
    love_count: 0,
>>>>>>> 0032790bd54e3f6006b6c1437fb4638e68ba5901
    islogged: true,
    user_id: !userInfo ? '' : userInfo.id,
    noteList: [], // 游记列表数据
    emptyDes: "还未添加游记，快去发布吧~",
    page: 1,
    pageSize: 6,
    total: 0,
    isLoading: false,
<<<<<<< HEAD
    tab: "1",
    
=======
    tab: '1'
>>>>>>> 0032790bd54e3f6006b6c1437fb4638e68ba5901
  },

  onNavButtonTap: function () {
    wx.navigateTo({
      url: "/pages/diaryPublish/diaryPublish", // 替换为目标页面的路径
    });
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
<<<<<<< HEAD
    console.log(options)


    if (!userInfo) {
      //未登录
      this.navigateToLogin();
=======
    // console.log(options)
    // this.showNotesList()
    if (!userInfo) { //未登录
      this.navigateToLogin()
    } else {
      //获取点赞关注粉丝数据
      this.getFollowFansLove();
>>>>>>> 0032790bd54e3f6006b6c1437fb4638e68ba5901
    }


    // this.setData({user_id:userInfo.id})
  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {},

  // 生命周期函数--监听页面显示
  onShow: function () {
    userInfo = getApp().globalData.userInfo
    if (userInfo) {
<<<<<<< HEAD
      this.setData({ user_id: userInfo.id });
      
      if(this.data.status === 1){
        this.setData({ 
          page: 1,
          pageSize: 6,
          total: 0,
          isLoading: false,
          status:0 
        });
      }
      
=======
      this.setData({
        user_id: userInfo.id
      })
    }
    if (userInfo) {
>>>>>>> 0032790bd54e3f6006b6c1437fb4638e68ba5901
      this.showNotesList();
      //获取点赞关注粉丝数据
      this.getFollowFansLove();
    }
  },

  // 生命周期函数--监听页面隐藏
  onHide: function () {},

  // 生命周期函数--监听页面卸载
  onUnload: function () {},

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    this.setData({
      page: 1,
      noteList: [],
      total: 0
    })

    this.showNotesList(() => {
      wx.stopPullDownRefresh()
    })

  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    if (this.data.page * this.data.pageSize >= this.data.total) {
    if (this.data.page * this.data.pageSize >= this.data.total) {
      return wx.showToast({
        title: '游记到底啦~',
        icon: 'none'
      })
    }
    if (this.data.isLoading) return
    this.setData({
      page: this.data.page + 1
    })
    this.showNotesList()
  },

  // 用户点击右上角分享
  onShareAppMessage: function () {},

  //展示游记列表
  showNotesList(pr) {
  showNotesList(pr) {
    //登录态
    let that = this;

    //未登录
    // if(!userInfo) {
    //   this.setData({
    //     islogged:false,
    //     emptyDes:'您尚未登录，点击登录获取更多权益',
    //     noteList:[]
    //   })

    //   return
    // }


    this.setData({
      isLoading: true
    })
    wx.showLoading({
      title: '数据加载中...',
    })

    //登录后
    wx.request({
      url: baseUrl + '/diary/getMyNotesList',
      method: 'GET',
      data: {
        _page: that.data.page,
        _limit: that.data.pageSize,
        user_id: that.data.user_id,
        status: that.data.tab,
      },
      success(res) {
        // console.log(res)
        let code = res.statusCode;
        const {
          noteList,
          totalPages
        } = res.data;

        if (code == 200) {
          // console.log(noteList.length)
          if (that.data.noteList.length === 0) {
            if (that.data.tab === '2') {
              that.setData({
                emptyDes: '没有游记需要待审核~'
              })
            } else if (that.data.tab === '3') {
              that.setData({
                emptyDes: '没有游记审核未通过~'
              })
            } else {
              that.setData({
                emptyDes: "还未添加游记，快去发布吧~"
              })
            }
          }

<<<<<<< HEAD
          if(that.data.status === 0){
            that.setData({
              noteList:[],
              status:1
            })
          }
=======
>>>>>>> 0032790bd54e3f6006b6c1437fb4638e68ba5901

          that.setData({
            noteList: that.data.noteList.concat(noteList),
            total: totalPages
          });
        }
      },
      complete() {
      complete() {
        //隐藏loading效果
        wx.hideLoading()
        that.setData({
          isLoading: false
        })
        pr && pr()
      }

    })


  },

  changeTabs: function (res) {
  changeTabs: function (res) {
    this.setData({
      page: 1,
      pageSize: 6,
      pageSize: 6,
      tab: res.detail.activeKey,
      noteList: [],
      total: 0,
      isLoading: false
    })
    this.showNotesList()
  },

  //删除游记
  deleteNoteItem(e) {
  deleteNoteItem(e) {
    const d_id = e.target.dataset.did;
    let that = this;

    wx.showModal({
      title: "提示",
      content: "确定删除该游记吗？",
      confirmColor: "#f16765",
      success(res) {
        if (res.confirm) {
          wx.request({
            url: baseUrl + '/diary/delete',
            method: 'POST',
            data: {
              d_id: d_id
            },
            success(res) {
              // console.log('删除成功！')
              let notes = that.data.noteList;
              notes = notes.filter((x) => x.id !== d_id);
              that.setData({
                noteList: notes
              })
            }
          })
        }
      },
      complete() {

      }
    })



  },

  navigateToPostNote: function () {
  navigateToPostNote: function () {
    wx.navigateTo({
      url: '/pages/diaryPublish/diaryPublish' // 替换为目标页面的路径
    });
  },

  navigateToLogin: function () {
  navigateToLogin: function () {
    wx.navigateTo({
      url: "/pages/login/login", // 替换为目标页面的路径
    });
  },

  navigateToEdit: function (e) {
  navigateToEdit: function (e) {
    let d_id = e.target.dataset.did;

    wx.navigateTo({
      url: "/pages/diaryPublish/diaryPublish?d_id=" + d_id, // 替换为目标页面的路径
    });
  },

  navigateToCheckedDetail: function (e) {
    let d_id = e.target.dataset.did;
  navigateToCheckedDetail: function (e) {
    let d_id = e.target.dataset.did;

    wx.navigateTo({
      url: '/pages/checkedDetail/checkedDetail?d_id=' + d_id
    });
  },
  },

  navigateToDiaryDetail: function (e) {
    let d_id = e.target.dataset.did;
  navigateToDiaryDetail: function (e) {
    let d_id = e.target.dataset.did;

    wx.navigateTo({
      url: '/pages/diaryDetail/diaryDetail?d_id=' + d_id
    });
  },
  //获取用户的点赞数、粉丝数 和 关注人数
  getFollowFansLove() {
    let that = this;
    wx.request({
      url: baseUrl + "/user/getUserStats",
      method: "GET",
      data: {
        author_id: getApp().globalData.userInfo.id,
      },
      header: {
        Authorization: getApp().globalData.token,
      },
      success(res) {
        getApp().listenForNewToken(res);
        // console.log(res)
        that.setData({
          love_count: res.data.likeCount,
          follow_count: res.data.followingCount,
          fans_count: res.data.followersCount,
        });
      },
    });
  }

