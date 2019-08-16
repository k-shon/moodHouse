// miniprogram/pages/admin/variety/variety.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    varietys:[
      {name:'糖度',item:[
        {
          id:Math.random*10000,
          name:"无糖"
        },
        {
          id: Math.random * 10000,
          name:"少糖"
        },
        {
          id: Math.random * 10000,
          name: "常规"
        },
        {
          id: Math.random * 10000,
          name: "半糖"
        },
        {
          id: Math.random * 10000,
          name: "多糖"
        },
      ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  //添加更多
  addMore: function (e) {
    var variety = {
      name: '',
      item: {
        id: Math.random * 10000,
        name: ''
      }
    };
    this.setData({
      varietys: this.data.varietys.concat(variety)
    })
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