// miniprogram/pages/admin/menu/menu.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      menu:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const that = this
      //获取菜单及菜单下的所有food
      db.collection("menu").get({
        success:function(res){
          console.log("从数据库获取菜单成功:"+res.data)
          that.setData({
            menu:res.data
          })
        }
      })
  },

  //跳转到添加菜单页面
  addMenu:function(){
    wx.navigateTo({
      url: 'addmenu/addmenu',
    })
  },
  //跳转到编辑页面
  editMenu:function(e){
    //获取data-menuid的值作为id参数
    wx.navigateTo({
      url: 'editmenu/editmenu?menuId=' + e.currentTarget.dataset.menuid,
    })
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