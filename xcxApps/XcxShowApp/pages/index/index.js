//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    src:""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (e) {
    console.log(e)
    var that=this
    app.globalData.appId=e.ID
    app.sendRequest({
      url: '/api/show/', success: function (res) 
      {
        console.log(res)
        that.setData({src:res[0].indexImage})

      }, fail: function (err) {
        console.log(err)
      }
      
    
  })}
 
})
