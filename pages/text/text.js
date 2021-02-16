const db = wx.cloud.database({
  env:"poster-7gmqnwnb215c1afc"
})

Page({
  data: {
    array: ['问卷调查', '行为实验', '脑电实验', '眼动实验'],
    index: 0
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
      index: e.detail.value
    })
  },
  publish: function(){
    db.collection('jobs').add({
      data: {
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
      }
    })
  
  }
})