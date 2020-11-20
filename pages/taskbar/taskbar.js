const db = wx.cloud.database()
const jobs = db.collection('jobs')

Page({
  data:{
    set: db.collection('todos').get({
      success: function(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data)
      }
    })
  }
})