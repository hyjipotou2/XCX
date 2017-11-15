const app = getApp()
// pages/car/ca r.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  let id=options.id
  let that=this;
  app.sendRequest({
    url: '/api/cars/'+id+"/", success: function (res) {
      console.log(res)
      that.setData({
        car: res

      })

    }, fail: function (err) {
      console.log(err)
    }

  



  })

  app.sendRequest({
    url: '/api/carsapp/', success: function (res) {
      console.log(res)
      that.setData({
        title: res[0].title,
        phone: res[0].phone,
        location: res[0].location,
        logo: res[0].logo

      })



    }, fail: function (err) {
      console.log(err)
    }})


  

  },
makephone:function(e)
{
  let dataset = e.currentTarget.dataset;
  let phone = dataset.phone
  app.makePhoneCall(phone,null)
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})