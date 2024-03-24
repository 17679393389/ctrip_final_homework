// pages/index/index.js
Page({
  data: {
    diaries: [
      {
        title: '旅行日记标题1',
        image: '/images/waterFlowTest.png',
        img_height:"",
        user: {
          avatar: '/images/avatar1.jpg',
          nickname: 'sl'
        },
        likeCount: 10
      },
      {
        title: '旅行日记标题3',
        image: '/images/waterFlowTest2.png',
        user: {
          avatar: '/images/avatar2.jpg',
          nickname: 'sl'
        },
        likeCount: 8
      },
      {
        title: '旅行日记标题4',
        image: '/images/waterFlowTest3.png',
        user: {
          avatar: '/images/avatar2.jpg',
          nickname: 'sl'
        },
        likeCount: 8
      },
      {
        title: '旅行日记标题2',
        image: '/images/waterFlowTest4.png',
        user: {
          avatar: '/images/avatar2.jpg',
          nickname: 'sl'
        },
        likeCount: 8
      }
    ],
    cardHeights: [] // 保存每个卡片的高度
  },
  onLoad: function() {
    // 获取图片信息并动态计算每个卡片的高度
    Promise.all(this.data.diaries.map(diary => this.getImageInfo(diary.image)))
      .then(imageInfos => {
        const cardHeights = imageInfos.map(info => {
        console.log(info.height,info.width)
          return 350 * info.height / info.width; // 根据图片的宽高比例动态计算高度
        });
        console.log(cardHeights)
        // 将计算好的卡片高度应用到每个日记对象的 img_height 属性上
        this.data.diaries.forEach((diary, index) => {
          diary.img_height = cardHeights[index];
        });
      })
      .catch(error => {
        console.error('获取图片信息失败', error);
      });
      wx.lin.renderWaterFlow(this.data.diaries, false ,()=>{
        console.log('渲染成功')
      })
  },
  getImageInfo: function(url) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: url,
        success: resolve,
        fail: reject
      });
    });
  }
})
