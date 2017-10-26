var appInstance = getApp();
var WxParse = require('../../components/wxParse/wxParse.js');
var util = require('../../utils/util.js');

// pages/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  contactnum:'',
  contactman: '',
  contactloc: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    appInstance.sendRequest({
      url: '/api/show/', success: function (res) {
        console.log(res)
        that.setData({ contactnum: res[0].contactNumber,
          contactman: res[0].contactMan,
          contactloc: res[0].contactLocation })

      }, fail: function (err) {
        console.log(err)
      }


    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  

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
  call:function()
  {
    var that=this;
    wx.makePhoneCall({
    phoneNumber: that.data.contactnum,
  })

  }
,
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