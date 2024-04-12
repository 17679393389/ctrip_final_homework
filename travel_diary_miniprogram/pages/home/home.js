// pages/index/index.js
const baseUrl = getApp().globalData.baseUrl;
//协同过滤算法给用户推荐他喜欢的游记,目前项目的用户太少只有两个人,所以此功能暂时注释
// 引入 Redis 模块,用户浏览记录存储在 Redis 中，每个用户的浏览记录以哈希表的形式存储，键为用户ID，值为浏览过的游记ID的集合
// const redis = require("redis");
// const client = redis.createClient(); // 创建 Redis 客户端
Page({
  data: {
    page: 1, //当前分页
    pageSize: 8, //每次刷新获取10条游记
    totalPage: 0, //总页数
    reachedEnd: false, // 是否到达最后一页的标志变量
    diaries: [],
    curClass: "1", //当前类别
    isRefresh: false, //不重新刷新页面
  },
  onLoad: function () {
    // console.log(getApp().globalData.baseUrl)
    this.getDiaryList();
    // console.log(this.data.totalPage)
  },
  //下拉刷新处理函数
  onReachBottom() {
    console.log("触底了");
    if (!this.data.reachedEnd) {
      // 判断是否到达最后一页
      const curPage = this.data.page + 1;
      this.setData(
        {
          page: curPage,
        },
        () => {
          this.getDiaryList();
          wx.showNavigationBarLoading(); // 显示加载动画
        }
      );
    }
  },
  //按照当前页面获取游记列表
  getDiaryList() {
    console.log("开始获取数据");
    let that = this;
    wx.request({
      url: baseUrl + "/diary/getDiariesList",
      data: {
        page: this.data.page,
        pageSize: this.data.pageSize,
        category: this.data.curClass,
      },
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      success(res) {
        // console.log(res.data.diaries)
        that.setData({
          totalPage: res.data.totalPages,
          diaries: res.data.diaries,
        });
        if (that.data.page === that.data.totalPage) {
          that.setData({
            reachedEnd: true, // 设置 reachedEnd 为 true，表示到达最后一页
          });
        }
        // console.log(that.data)
        wx.lin.renderWaterFlow(that.data.diaries, that.data.isRefresh, () => {
          console.log("渲染成功");
          // console.log("隐藏加载动画")
          // console.log(that.data.diaries[0]);
          // console.log(that.data.isRefresh);
          wx.hideNavigationBarLoading(); // 隐藏加载动画
          that.setData({ isRefresh: false });
        });
      },
      complete() {},
    });
  },
  //按照分类查看游记
  changeTabs(res) {
    // console.log(this.data.isRefresh);
    //新分类页面数重置为1、列表为空、是否触底false、是否刷新页面true
    this.setData({
      isRefresh: true,
      reachedEnd: false,
      page: 1,
      diaries: [],
      curClass: res.detail.activeKey,
    });
    // console.log(this.data.isRefresh);
    this.getDiaryList();
    // this.setData({isRefresh:false})
  },
  //搜索游记
  searchDiaries(req) {
    //新分类页面数重置为1、列表为空、是否触底false、是否刷新页面true
    this.setData({ isRefresh: true, reachedEnd: false, page: 1, diaries: [] });
    // console.log('触发搜索')
    // console.log(req.detail.value)
    let that = this;
    wx.request({
      url: baseUrl + "/diary/searchDiaries",
      method: "GET",
      data: {
        page: this.data.page,
        pageSize: this.data.pageSize,
        keyword: req.detail.value,
      },
      success(res) {
        // console.log(res)
        that.setData({
          diaries: res.data.diaries,
          totalPage: res.data.totalPages,
        });
        wx.lin.renderWaterFlow(res.data.diaries, that.data.isRefresh, () => {
          // console.log("渲染成功");
          // console.log("隐藏加载动画");
          wx.hideNavigationBarLoading(); // 隐藏加载动画
          that.setData({ isRefresh: false });
        });
      },
    });
  },
  // 计算用户之间的相似度
// function calculateUserSimilarity(userId1, userId2, callback) {
//   // 获取用户的浏览记录
//   client.hgetall(userId1, (err, user1Data) => {
//       if (err) {
//           callback(err, null);
//           return;
//       }
//       client.hgetall(userId2, (err, user2Data) => {
//           if (err) {
//               callback(err, null);
//               return;
//           }
          
//           // 计算两个用户的浏览交集
//           const intersection = Object.keys(user1Data).filter(key => user2Data[key]);

//           // 计算相似度，这里简单起见，使用 Jaccard 系数
//           const similarity = intersection.length / (Object.keys(user1Data).length + Object.keys(user2Data).length - intersection.length);

//           // 将相似度作为回调函数的参数返回
//           callback(null, similarity);
//       });
//   });
// },

// // 为用户推荐游记
// function recommendDiariesForUser(userId, callback) {
//   // 获取所有用户的列表
//   client.keys('*', (err, keys) => {
//       if (err) {
//           callback(err, null);
//           return;
//       }

//       // 过滤掉当前用户自己
//       const otherUsers = keys.filter(key => key !== userId);

//       // 计算当前用户与其他用户的相似度
//       const similarities = [];
//       otherUsers.forEach(otherUserId => {
//           calculateUserSimilarity(userId, otherUserId, (err, similarity) => {
//               if (err) {
//                   callback(err, null);
//                   return;
//               }
//               similarities.push({ userId: otherUserId, similarity });
//               // 当所有用户的相似度都计算完毕时，进行推荐
//               if (similarities.length === otherUsers.length) {
//                   // 将用户按相似度降序排序
//                   similarities.sort((a, b) => b.similarity - a.similarity);
                  
//                   // 从相似度最高的用户中获取他们浏览过的游记，作为推荐结果
//                   const recommendedDiaries = [];
//                   const maxUsersToConsider = 3; // 只考虑相似度最高的前三个用户
//                   let usersConsidered = 0;
//                   similarities.forEach(({ userId, similarity }) => {
//                       if (usersConsidered >= maxUsersToConsider) {
//                           return;
//                       }
//                       client.hgetall(userId, (err, userData) => {
//                           if (err) {
//                               callback(err, null);
//                               return;
//                           }
//                           // 获取该用户浏览过的游记并添加到推荐列表中
//                           recommendedDiaries.push(...Object.keys(userData));
//                           usersConsidered++;
//                           if (usersConsidered === maxUsersToConsider) {
//                               callback(null, recommendedDiaries);
//                           }
//                       });
//                   });
//               }
//           });
//       });
//   });
// },
// // 示例：为用户 user1 推荐游记
// recommendDiariesForUser('user1', (err, recommendedDiaries) => {
//   if (err) {
//       console.error('推荐游记时发生错误：', err);
//       return;
//   }
//   console.log('推荐给用户 user1 的游记：', recommendedDiaries);
// })
});
