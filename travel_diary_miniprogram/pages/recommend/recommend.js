// pages/recommend/recommend.js
const baseUrl = getApp().globalData.baseUrl;
// 定义一个变量来存储定时器的ID
let timeoutId;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shi: {
      id: 1027,
      title: "鸡鸣汤包",
      content: "好多人啊 看樱花了",
      photoList: ["https://img1.baidu.com/it/u=2995584842,1205264119&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1067"],
      avatarUrl:'https://it-recite.oss-cn-shenzhen.aliyuncs.com/2b56fa24d81742f48531e00079e41101.jpg'
    },
    zhu: {
      id: 1028,
      title: "全季酒店（夫子庙店）",
      content: "酒店处于热门景点群附近,处于市中心,但是晚上睡觉很安静,卫生也搞的和很好,就是要提前订购,不然钱包扛不住~",
      photoList: ["https://img0.baidu.com/it/u=582796663,2068182030&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375"],
      username:'哆啦A梦',
      avatarUrl:'https://it-recite.oss-cn-shenzhen.aliyuncs.com/2b56fa24d81742f48531e00079e41101.jpg',
      create_at:'2024-4-12 10:00:00'
    },
    xing: {
      id: 1029,
      title: "南京地铁3号线",
      content: "南京地铁3号线夫子庙站，挺方便的,就是太挤了",
      photoList: ["https://img2.baidu.com/it/u=1904674209,1904267315&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500"],
      avatarUrl:'https://it-recite.oss-cn-shenzhen.aliyuncs.com/2b56fa24d81742f48531e00079e41101.jpg'
    },
    jing: {
      id: 1030,
      title: "鸡鸣寺",
      content: "好多人啊 看樱花了,顺便求个姻缘",
      photoList: ["https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E9%B8%A1%E9%B8%A3%E5%AF%BA.png"],
      avatarUrl:'https://it-recite.oss-cn-shenzhen.aliyuncs.com/2b56fa24d81742f48531e00079e41101.jpg'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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


// searchStrategy 函数，带有防抖功能,搜索攻略
searchStrategy(e) {
  // 清除之前的定时器（如果存在）
  clearTimeout(timeoutId);
  let that =this;
  // 设置一个新的定时器
  timeoutId = setTimeout(() => {
    // 发起搜索请求
    wx.request({
      url: baseUrl + '/diary/searchStrategy',
      data: {
        destination: e.detail.value
      },
      success(res) {
        let j = []; // 风景
        let s = []; // 美食
        let z = []; // 住宿
        let x = []; // 交通
        let qiTa = []; // 其他

        // 遍历搜索结果
        res.data.diaries.forEach(item => {
          item.photoList = item.photo.split(',').map(url => url.trim());
          switch (item.label) {
            case '风景':
              j.push(item);
              break;
            case '美食':
              s.push(item);
              break;
            case '住宿':
              z.push(item);
              break;
            case '交通':
              x.push(item);
              break;
            default:
              qiTa.push(item);
              break;
          }
        });

        // 如果某个分类为空，则将 label 是 "其他" 的赋值过去
        if (j.length === 0) j = qiTa;
        if (s.length === 0) s = qiTa;
        if (z.length === 0) z = qiTa;
        if (x.length === 0) x = qiTa;

        // 接收到响应后更新数据
        that.setData({
          shi: s[0],
          zhu: z[0],
          xing: x[0],
          jing: j[0]
        });
      }
    });
  }, 500); // 设置防抖延迟时间为 500 毫秒
},
//跳转到游记详情页面
onDiaryDetail(e){
  // console.log(e.currentTarget.dataset)
  // const data = JSON.stringify(data)
  let id;
  if('d_id' in e.currentTarget.dataset){
    id = parseInt(e.currentTarget.dataset.d_id)
  }else{
    id = e.currentTarget.dataset.id
  }
  wx.navigateTo({
    url: '/pages/diaryDetail/diaryDetail?d_id='+id
  })
}


})