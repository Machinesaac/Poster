//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '叔叔我啊',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toPublish: function() {
    wx.navigateTo({
      url: '../text/text',
    })
  },
  toTaskbar: function() {
    wx.navigateTo({
      url: '../taskbar/taskbar',
    })
  }
})
