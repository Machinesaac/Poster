const db = wx.cloud.database({
  env:"poster-7gmqnwnb215c1afc"
})
const jobs = db.collection("jobs")

Page({
  data: {

  },
  onLoad: function (options) {
    var id = options.id
    var that = this
    this.setData({
      id: id,
      
    })
    jobs.doc(id).get({
      success: function(res) {
        console.log(res.data)
        that.setData({s: res.data})
      }
    })
  }
})