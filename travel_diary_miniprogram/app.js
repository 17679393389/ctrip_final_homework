// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: {"id":1, "avatarUrl":'https://it-recite.oss-cn-shenzhen.aliyuncs.com/2b56fa24d81742f48531e00079e41101.jpg',"username":'哆啦A梦'},
    baseUrl: "http://localhost:3000/"
  }
})
