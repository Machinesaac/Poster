const db = wx.cloud.database({
  env:"poster-7gmqnwnb215c1afc"
})
const jobs = db.collection("jobs")
const records = db.collection("records")
const app = getApp()

Page({
  data: {
    id: '',
    s:[],
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
  },
  onConfirm: function(event) {
    var that = this
    records.where({
      _openid : app.globalData.openid,
      id: this.data.id
    })
    .get({
      success: function(res) {
        var length = res.data.length
        console.log("length:",length)
        if (length != 0) {
          wx.showToast({
            title: '你已接受过了',
          })
        }
        else{
          db.collection("records").add({
            data: {
              id: that.data.id,
              // _openid: app.globalData.openid,
              status: 1
            },
            success: function(res) {
              console.log(res)
              wx.showToast({
                title: '接受成功',
              })
            }
          })

        }
      }
    })
    
  },
  tomenManage: function(event){
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../menManage/menManage?id='+id
    })
  }
})