//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    brands: [{ "title": "宝马", "images": "http://wx.qlogo.cn/mmopen/vi_32/8jmRFQppiaEbM2uF4BxFtN5ccxFRdiclIHkjbkZdMM6YJibrZhd9PQL166WmWemm4YnC1N2iaHeicibclDBjoMatK00g/0" }]

    ,
    logo: "",
    title: "",
    phone: "",
    location: "",

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    app.sendRequest({
      url: '/api/carsapp/', success: function (res) {
        console.log(res)
        that.setData({
          title: res[0].title,
          phone: res[0].phone,
          location: res[0].location,
          logo: res[0].logo

        })
        app.setphoneandtitle (res[0].phone,res[0].title)
        

      }, fail: function (err) {
        console.log(err)
      }



    })
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
  carsclick:function(e)
  {
    let dataset = e.currentTarget.dataset;
    let id=dataset.id
    app.turnToPage('/pages/car/car?id='+id,false)

  }

})
