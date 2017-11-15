// pages/caritems/caritems.js

const app = getApp()
Page({


  /**
   * 页面的初始数据
   */
  data: {sort:["默认排序","从高到低","从低到高"],
  sortindex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.sendRequest({
      url: '/api/cars/', success: function (res) {
        console.log(res)
        that.setData({
          cars: res

        })

      }, fail: function (err) {
        console.log(err)
      }



    })
  },
  sort:function(e)
  {
   var  data = {}
   var index= this.data.sortindex
   if (index == 2) {
     data = {}
     index = 0

   }
   if (index == 1) {
     data = { "index": "down" }
     index++
   }
  

    if (index == 0) {
      data = { "index": "up" }
      index++

    }
    
   
    var that = this;
    app.sendRequest({
      data:data,
      url: '/api/cars/', success: function (res) {
        console.log(res)
        that.setData({
          cars: res

        })

      }, fail: function (err) {
        console.log(err)
      }



    })

    this.setData({ sortindex:index
    
    })
  },
  makephone: function (e) {
    let dataset = e.currentTarget.dataset;
    let phone = dataset.phone
    app.makePhoneCall(phone, null)
  },
  carsitem:function(e)
  {
    let dataset = e.currentTarget.dataset;
    let id = dataset.id
    app.turnToPage('/pages/car/car?id=' + id, false)

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