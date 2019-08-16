// miniprogram/pages/admin/menu/addmenu/addmenu.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //创建菜单
  submit:function(res){
    //获取表单中名为name的input
    let name = res.detail.value.name;
    if(name.length>5){  //如果菜单名长度超过5个，就不提交
      wx.showToast({
        title: '长度要小于5',
      })
    }else{
      //将菜单名上传至数据库
      db.collection('menu').add({
        data: {
          name: name,   //菜单名
          count: 0   //单品数量
        },
        success: function (res) {
          wx.showToast({
            title: "创建菜单'" + name + "'成功",
          })
          wx.navigateTo({
            url: '../menu',
          })
        },
        fail: function (res) {
          wx.showToast({
            title: '创建菜单失败:' + res.data,
          })
        }
      })
    }
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