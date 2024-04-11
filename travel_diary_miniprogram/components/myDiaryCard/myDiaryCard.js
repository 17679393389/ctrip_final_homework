// components/myDiaryWaterFlowData/myDiaryWaterFlowData.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    myDiaryList:Object
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
    onDiaryDetail(e){
      // console.log(e)
      const { id } = e.currentTarget.dataset
      wx.navigateTo({
        url: '/pages/diaryDetail/diaryDetail?d_id='+id
      })
    }
  }
})
