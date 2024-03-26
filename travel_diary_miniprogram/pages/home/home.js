// pages/index/index.js
const baseUrl = getApp().globalData.baseUrl
Page({
  data: {
    page: 1, //当前分页
    pageSize: 8, //每次刷新获取10条游记
    totalPage: 0, //总页数
    reachedEnd: false, // 是否到达最后一页的标志变量
    diaries: [],
    curClass: '1' //当前类别
  },
  onLoad: function () {
    // console.log(getApp().globalData.baseUrl)
    this.getDiaryList()
    // console.log(this.data.totalPage)
  },
  //下拉刷新处理函数
  onReachBottom() {
    if (!this.data.reachedEnd) { // 判断是否到达最后一页
      const curPage = this.data.page + 1;
      this.setData({
        page: curPage
      }, () => {
        this.getDiaryList();
        wx.showNavigationBarLoading(); // 显示加载动画
      });
    }
  },
  //按照当前页面获取游记列表
  getDiaryList() {
    console.log("开始获取数据")
    let that = this
    
    wx.request({
      url: baseUrl + '/diary/getDiariesList',
      data: {
        page: this.data.page,
        pageSize: this.data.pageSize,
        category: this.data.curClass
      },
      method: 'GET',
      success(res) {
        console.log(res.data.diaries)
        that.setData({
          totalPage: res.data.totalPages,
          diaries: res.data.diaries
        })
        if (that.data.page === that.data.totalPage) {
          that.setData({
            reachedEnd: true // 设置 reachedEnd 为 true，表示到达最后一页
          });
        }
        // console.log(that.data)
        wx.lin.renderWaterFlow(res.data.diaries, true, () => {
          console.log('渲染成功')
          console.log("隐藏加载动画")
          wx.hideNavigationBarLoading(); // 隐藏加载动画
        })
      },
      complete() {}
    })
  },
  //按照分类查看游记
  changeTabs(res) {
    // console.log(parseInt(res.detail.activeKey))
    this.setData({curClass: res.detail.activeKey})
    this.getDiaryList()
  },
  //搜索游记
  searchDiaries(req){
    // console.log('触发搜索')
    // console.log(req.detail.value)
    let that = this
    wx.request({
      url: baseUrl + '/diary/searchDiaries',
      method:'GET',
      data:{
        page:this.data.page,
        pageSize:this.data.pageSize,
        keyword: req.detail.value
      },
      success(res){
        // console.log(res)
        that.setData({
          diaries:res.data.diaries,
          totalPage:res.data.totalPages
        })
        wx.lin.renderWaterFlow(res.data.diaries, true, () => {
          console.log('渲染成功')
          console.log("隐藏加载动画")
          wx.hideNavigationBarLoading(); // 隐藏加载动画
        })
      }
    })
  }
})