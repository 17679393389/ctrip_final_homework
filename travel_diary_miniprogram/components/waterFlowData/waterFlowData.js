Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:Object
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
    //跳转到游记详情页面
    onDiary(e){
      // console.log(e.currentTarget.dataset.diary.id)
      // const data = JSON.stringify(data)
      wx.navigateTo({
        url: '/pages/diaryDetail/diaryDetail?d_id='+e.currentTarget.dataset.diary.id
      })
    }
  }
})