// miniprogram/pages/admin/menu/item/item.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus:[],   //所有菜单
    index:0,  //菜单选择器下标
    items:[]  //菜单对应的所有单品
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this;
      //获取所有菜单
      db.collection("menu").get({
        success:function(res){
          //设置菜单
          that.setData({
            menus:res.data
          })
          //根据第一个菜单获取单品列表
          db.collection("foods").where({
            menuId: res.data[0]._id
          }).get({
            success: function (res1) {
              that.setData({
                items: res1.data
              })
            }
          })
        }
      })
  },

  //选择器改变
  bindPickerChange:function(e){
      var that=this
      //获取index对应的menuid
      console.log(this.data.menus[e.detail.value]._id)
      //设置index,更新选择器选中项
      this.setData({
        index: e.detail.value
      })
      //根据menuid获取对应的单品列表
      db.collection('foods').where({
        menuId: this.data.menus[e.detail.value]._id
      }).get({
        success:function(res){
          that.setData({
            items:res.data
          })
        },
        fail:function(res){
          wx.showToast({
            title: '获取单品列表失败',
          })
        }
      })
  },
  //跳转到添加单品页面
  addItem:function(){
      wx.navigateTo({
        url: 'additem/additem',
      })
  },

  //修改单品信息
  editItem:function(e){
    console.log("editItem:" + e.currentTarget.dataset.itemid)
      wx.navigateTo({
        url: 'detail/detail?itemId='+e.currentTarget.dataset.itemid,
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