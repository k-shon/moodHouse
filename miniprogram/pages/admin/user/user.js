// miniprogram/pages/admin/user/user.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adminUser:{},  //管理员
    normalUser:{}, //普通用户
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //先清空数据
    that.setData({
      adminUser:{},
      normalUser:{}
    })
    //查询管理员，即role=1
    db.collection("user").where({
      role:1
    }).get({
      success:function(res){
        console.log("管理员：",res)
        that.setData({
          adminUser:res.data
        })
      }
    })
    //查询普通用户 ，即role=0
    db.collection("user").where({
      role:0
    }).get({
      success: function (res) {
        console.log("普通用户：", res)
        that.setData({
          normalUser: res.data
        })
      }
    })
  },

  //删除用户
  deleteUser: function (e) {
    var  that= this;
    var openid = e.currentTarget.dataset.openid;
    console.log("用户Id：" + openid)
    db.collection("user").where({
      openid: openid
    }).get({
      success: function (res) {
        //根据_id删除
        db.collection("user").doc(res.data[0]._id).remove({
          success: function () {
            console.log("删除用户成功")
            //刷新页面 
            that.onLoad();
          }
        })
      }
    })
  },

  //添加管理员
  addAdmin: function (e) {
    var that = this;
    var openid = e.currentTarget.dataset.openid;
    console.log("添加管理员Id：" + openid)
    db.collection("user").where({
      openid: openid
    }).get({
      success: function (res) {
        //根据_id添加 
        db.collection("user").doc(res.data[0]._id).update({
          data: {
            role: 1
          },
          success: function () {
            console.log("添加管理员成功")
            //刷新页面 
            that.onLoad();
          }
        })
      }
    })
  },

  //取消管理员
  cancelAdmin:function(e){
    var that = this
    var openid  = e.currentTarget.dataset.openid;
    console.log("取消的管理员Id："+openid)
    db.collection("user").where({
      openid: openid
    }).get({
      success: function (res) {
        //根据_id更新
        db.collection("user").doc(res.data[0]._id).update({
          data:{
            role:0
          },
          success:function(){
            console.log("取消管理员成功")
            //刷新页面 
            that.onLoad();
          }
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