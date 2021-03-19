//index.js
//获取应用实例
const db = wx.cloud.database({
  env:"poster-7gmqnwnb215c1afc"
})
const app = getApp()
const users = db.collection("users")

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
  
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
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
