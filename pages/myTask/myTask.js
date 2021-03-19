// pages/taskbar/taskbar.js
const db = wx.cloud.database({
  env:"poster-7gmqnwnb215c1afc"
})
const jobs = db.collection("jobs")
const app = getApp()

Page({
  data:{
  },
  onLoad: function(){
    var that = this
    jobs.where({
      _openid : app.globalData.openid
    })
      .get({
      success: function(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data)
        that.setData({s:res.data})
      }
    })
 
  },
  bindtoman: function(){
    var id = this.data.id
    wx.navigateTo({
      url: '../menManage/menManage?id='+id
    })
  }
})