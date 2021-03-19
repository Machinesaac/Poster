// pages/menManage/menManage.js
const db = wx.cloud.database({
  env:"poster-7gmqnwnb215c1afc"
})
const jobs = db.collection("jobs")
const records = db.collection("records")
const users = db.collection("users")
const app = getApp()

Page({
  data:{
    id: '',
    infs: [],
    members: [[]],
    test: 0
  },
  onLoad: function(options){
    var job_id = options.id
    var that = this
    records.where({
      id : job_id
    })
      .get({
      success: function(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        var nums_of_members = res.data.length
        var data
        var members = new Array(nums_of_members)
        var i = 0
        console.log(res.data)
        for (i = 0;i < nums_of_members;i++)
        {
          console.log(i)
          console.log(res.data[i]._openid)
          that.data.members.push(res.data[i]._openid)
          // members[i] = res.data[i]._openid
        }
        console.log(that.data.members)
        for (i = 0;i < nums_of_members;i++)
        {
          db.collection("users").where({
            _openid : members[i]
          })
            .get({
            success: function(res) {
              // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
              console.log(res.data[0])
              console.log(that.data.infs)
              var tmp = that.data.infs
              tmp.push(res.data[0])
              console.log("tmp:", tmp)
              that.setData({
                infs: tmp
              })
              console.log("人员数据:",that.data.infs)
            }
          })
        }
        
      }
    })
 
  }
})