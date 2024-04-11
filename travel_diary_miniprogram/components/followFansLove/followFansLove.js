// components/followFansLove/followFansLove.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    follow_count:'',
    fans_count:'',
    love_count:''
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getFollowList(){
      console.log('获取关注列表,flag=1代表获取关注用户的列表')
      wx.navigateTo({
        url: '/pages/userList/userList?flag=1',
      })
    },
    getFansList(){
      console.log('获取粉丝列表，flag=2')
      wx.navigateTo({
        url: '/pages/userList/userList?flag=2',
      })
    }

  }
})
