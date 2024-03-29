// index.js
const baseUrl = getApp().globalData.baseUrl;
const defaultAvatarUrl =
  "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";

Page({
  data: {
    follow_count: 0,
    fans_count: 0,
    love_count: 0,
    motto: "Hello World",
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: "",
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse("getUserProfile"),
    canIUseNicknameComp: wx.canIUse("input.type.nickname"),
  },
  onLoad() {
    this.getFollowFansLove();
  },
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onChooseAvatar(e) {
    console.log(e);
    const { avatarUrl } = e.detail;
    const { nickName } = this.data.userInfo;
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    });
  },
  onInputChange(e) {
    console.log(e);
    const nickName = e.detail.value;
    const { avatarUrl } = this.data.userInfo;
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    });
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
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
  },
  //发布游记
  publishNewDiary() {
    wx.navigateTo({
      url: "/pages/diaryPublish/diaryPublish",
    });
  },
});
