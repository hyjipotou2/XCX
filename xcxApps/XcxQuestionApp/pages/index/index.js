//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    index:0,
    imgUrls: [
      '../../images/timg1.jpg',
      '../../images/timg1.jpg',
      '../../images/timg1.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    test: [
      {
        "title": "1.现在你的桌面上是",
        "selectA": "A. 一塌糊涂",
        "selectB": "B. 整洁有序"
      },
      {
        "title": "2. 你哪个领域更棒：",
        "selectA": "A. 代数",
        "selectB": "B. 几何"
      },
      {
        "title": "3. 你经常发现自己白日梦？",
        "selectA": " A. 是呀是呀",
        "selectB": " B. 不常那样"
      },
      {
        "title": "4. 哪个更符合你的信念？",
        "selectA": " A. 明确的是非对错",
        "selectB": "B. 是对是错视情况"
      },
      {
        "title": "5. 当别人对你倾诉烦恼的时候，你更关注：",
        "selectA": "A. 他们怎么样表达",
        "selectB": "B. 他们在表达什么"
      },
      {
        "title": "6. 你的灵感往往在哪个时候产生：",
        "selectA": "A. 坐着的时候",
        "selectB": "B. 躺着的时候"
      },
      {
        "title": "7. 你更容易记住：",
        "selectA": "A. 名字",
        "selectB": " B. 面孔"
      },
      {
        "title": "8. 你在表达的时候：",
        "selectA": "A. 仔细斟酌",
        "selectB": "B. 用很多手势"
      },
      {
        "title": "9. 做出重要决定的时候更多基于：",
        "selectA": "A. 直觉",
        "selectB": "B. 逻辑"
      },
      {
        "title": "10. 您更多地与哪个打交道：",
        "selectA": "A. 计算",
        "selectB": "B. 音乐"
      }
    ]
  },
  //事件处理函数
  next:function(e)
  {console.log(e)
    if (this.data.index < this.data.test.length-1)
    {
      this.setData({ index: this.data.index+1})

    }
    else
    {
      wx.navigateTo({
        url: '../result/result'
      })


    }

  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that=this;
    app.sendRequest({url: '/api/question/', success: function (res) {
      console.log(res)
      var images=new Array()
      images.push(res[0].image1)
      images.push(res[0].image2)
      images.push(res[0].image3)
      that.setData({imgUrls:images})

    }, fail: function (err) {
      console.log(err)
    }
    })
  },
  
})
