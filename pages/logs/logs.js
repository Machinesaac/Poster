//logs.js
const db = wx.cloud.database({
  env:"poster-7gmqnwnb215c1afc"
})
const app = getApp()
const users = db.collection("users")

Page({
  data: {
    user_info:{
      name: '',
      phonenumber: '',
      schoolnumber: '',
      from: ''//这是学院，不是学校
    }
  },
  onLoad: function () {
    users.where({
      _openid: app.globalData.openid
    }).get({
      success: res =>{
        console.log(res.data)
        this.setData({
          user_info: res.data[0]
        })
      }
    })
    console.log(app.globalData.userInfo)
    this.setData({
      logs: app.globalData.userInfo
    })
  },
  getName: function(res){
    this.setData({
      [`user_info.name`]:res.detail.value
    })
    console.log(this.data.logs.name)
  },
  getSchool: function(res){
    this.setData({
      [`user_info.from`]:res.detail.value
    })
  },
  getSch_num: function(res){
    this.setData({
      [`user_info.schoolnumber`]: res.detail.value
    })
  },
  getPhone: function(res){
    this.setData({
      [`user_info.phonenumber`]: res.detail.value
    })
  },
  tosave: function(){
    let logs = this.data.user_info
    let id = logs._id
    users.doc(id).update({
      data:{
        from: logs.from,
        name: logs.name,
        phonenumber: logs.phonenumber,
        schoolnumber: logs.schoolnumber
      },
      success: res=>{
        console.log(res)
        wx.showToast({
          title: '保存完成',
        })
        app.globalData.user_detail = logs
      },
      fail: res=>{
        console.log(res)
      }
    })
  }
})
