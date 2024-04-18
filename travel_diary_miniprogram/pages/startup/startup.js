// startup.js
Page({
  data:{
    screenHeight:750
  },
  onLoad: function() {
    wx.getSystemInfo({
      success: e => {
        //获取整个页面的高度
          this.data.screenHeight = e.screenHeight;
        }
       },
  )
    // 设置启动页持续时间为 3 秒后跳转到首页
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/home/home'
      });
    }, 3000); // 3000 毫秒 = 3 秒
  }
});
