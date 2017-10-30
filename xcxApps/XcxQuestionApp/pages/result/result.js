//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
    ,
    left: Math.floor(Math.random() * (20 - 5)) + 5,
  right: Math.floor(Math.random() * (20 - 7)) + 7
  },
  
  onLoad: function () {

   
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '我是左脑'+this.data.left+"岁右脑"+this.data.right+"岁，你也快来试试吧",
      path: '/page/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
