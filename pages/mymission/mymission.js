// pages/taskbar/taskbar.js
const db = wx.cloud.database({
  env:"poster-7gmqnwnb215c1afc"
})
const jobs = db.collection("jobs")
const records = db.collection("records")
const app = getApp()

Page({
  data:{
    s:[],
  },
  onLoad: function(){
    var that = this
    records.where({
      _openid : app.globalData.openid
    }).get({
      success: function(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data[0].id)
        db.collection("jobs").where({
          _id : res.data[0].id
        }).get({
          success: function(res) {
            // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
            console.log(res.data)
            that.setData({s:res.data})
          }
        })
      }
    })
  },
  toDetails: function(event){
    console.log(event)
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../expdetail/expdetail?id='+id
    })
  }
})