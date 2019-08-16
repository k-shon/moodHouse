// miniprogram/pages/admin/menu/editmenu/editmenu.js
const db =  wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',  //菜单名 
    menuId:'' //菜单id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this;
      //获取上一个页面传过来的menuId
    var menuId = options.menuId;
      //根据id查询菜单
    db.collection('menu').doc(menuId).get({
        success:function(res){
          that.setData({
            name:res.data.name,
            menuId:menuId
          })
        }
      })
  },

  //保存修改的菜单
  submit:function(e){
      var name = e.detail.value.name;
      db.collection('menu').doc(this.data.menuId).update({
        data:{
          name:name
        },
        success:function(res){
          wx.showToast({
            title: '修改成功',
            duration:2000
          })
          //跳转到admin页面
          wx.redirectTo({
            url: '../menu',
          })
        }
      })
  },
  //删除此菜单
  delete:function(){
    db.collection("menu").doc(this.data.menuId).remove({
      success:function(res){
        wx.showToast({
          title: '删除成功 ',
        })
        wx.redirectTo({
          url: '../menu',
        })
      }
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