// pages/taskbar/taskbar.js
const db = wx.cloud.database({
  env:"poster-7gmqnwnb215c1afc"
})
const jobs = db.collection("jobs")

//下拉刷新是有问题的，解决方法丢这了，因为具体函数还是给你写的
//https://jingyan.baidu.com/article/4ae03de3d862d73efe9e6b48.html

Page({
  data:{
  },
  onLoad: function(){
    var that = this
    jobs.get({
      success: function(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data)
        that.setData({s:res.data})
      }
    })
    jobs.doc("b333e0365fb0d61c00c76d552523eebe").get({
      success: function(res) {
        console.log(res.data)
        that.setdata({tmp: res.data.type})
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