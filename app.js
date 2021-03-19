//app.js
App({
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        this.globalData.openid = res.result.openid
        console.log('openid: ', this.globalData.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  
  // 判断用户受否首次登陆，若首次则录入信息
  onSaveUserInf: function(){
    const db = wx.cloud.database({
      env:"poster-7gmqnwnb215c1afc"
    })
    const users = db.collection("users")
    var data = 0
    var that = this

    users.where({
      _openid : this.globalData.openid
    })
    .get({
      success: function(res) {
        that.globalData.userdata = res.data
        data = res.data.length
        console.log("length:",data)
        console.log(res.data)
        if (data == 0) {
          console.log("[!]无当前用户信息，正在添加...")
          db.collection("users").add({
            data: {
              _openid: that.globalData.openid,
              phonenumber: '',
              schoolnumber: '',
              name: '',
              from:''
            },
            success: function(res) {
              console.log("[+]添加成功")
            }
          })
        } else {
          console.log("[!]用户信息已存在")
          console.log(this.globalData.userdata)
        }
      }
    })
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 云服务
    wx.cloud.init({
      //环境ID
      env: 'poster-7gmqnwnb215c1afc',
      traceUser: true,
    })

    // 获取用户openid
    this.onGetOpenid()
    // 判断用户受否首次登陆，若首次则录入信息
    this.onSaveUserInf()

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userdata:'',
  }
})