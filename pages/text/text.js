const db = wx.cloud.database({
  env:"poster-7gmqnwnb215c1afc"
})
const app = getApp()

Page({
  data: {
    array: ['问卷调查', '行为实验', '脑电实验', '眼动实验'],
    index1: 0,
    index: '问卷调查',


    type:'',
    name:'',
    ask:'',
    duration:'',
    payment:'',
    loc:'',
    time:'',
    ps:'',
  },
  onLoad: function(){
    console.log(app.globalData.userdata)
    if(app.globalData.userdata.length != 0){
      let data = app.globalData.userdata[0]
      this.setData({
        name: data.name
      })
    }
  },

  getType: function(e){
    this.setData({
        type: e.detail.value
    })
  },
  getName: function(e){
    this.setData({
      name: e.detail.value
    })
  },
  getAsk: function(e){
    this.setData({
      ask: e.detail.value
    })
  },
  getDuration: function(e){
    this.setData({
      duration: e.detail.value
    })
  },
  getPayment: function(e){
    this.setData({
      payment: e.detail.value
    })
  },
  getLoc: function(e){
    this.setData({
      loc: e.detail.value
    })
  },
  getTime: function(e){
    this.setData({
      time: e.detail.value
    })
  },
  getPs: function(e){
    this.setData({
      ps: e.detail.value
    })
  },


  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: this.data.array[e.detail.value]
    })
    console.log(this.data.index)
  },
  publish: function(){
    var mid = new Array();
    mid[0] = this.data.type;
    mid[1] = this.data.name;
    mid[2] = this.data.ask
    mid[3] = this.data.duration;
    mid[4] = this.data.payment
    mid[5] = this.data.loc;
    mid[6] = this.data.time;

    for(var i = 0; i < 7;i++){
      if(mid[i] == ''){
        wx:wx.showToast({
          title: '有未填写信息',
          icon:'none'
        })
        return false
      }
    }

    db.collection('jobs').add({
      data: {
        index: this.data.index,
        type:this.data.type,
        name:this.data.name,
        ask:this.data.ask,
        duration:this.data.duration,
        payment:this.data.payment,
        loc:this.data.loc,
        time:this.data.time,
        ps:this.data.ps,
      },
      success: function(res) {
        console.log(res)
        wx.showToast({
          title: '发送成功',
        })
      }
    })
  
  }
})