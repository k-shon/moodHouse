// miniprogram/pages/admin/menu/item/additem/additem.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: [],   //所有菜单
    index: 0,  //菜单选择器下标
    items: [],  //菜单对应的所有单品
    imgurl:'', //上传的图片
    isUpload:0, //判断图片是否上传成功，0不成功，1成功
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    //获取所有菜单
    db.collection('menu').get({
      success: function (res) {
        console.log(res.data)
        that.setData({
          menus: res.data
        })
      }
    })
  },

  //提交表单
  submit:function(e){
    var that= this;
    var menuId = this.data.menus[this.data.index]._id;
      var name = e.detail.value.name;
    var price = e.detail.value.price;
    db.collection("foods").add({
      data:{
        name: name,
        price: price,
        menuId: menuId,
        imgurl: this.data.imgurl
      },
      success:function(res){
        //此菜单中的count数量+1
        db.collection("menu").doc(menuId).get({
          success:function(res){
            db.collection("menu").doc(menuId).update({
              data:{
                count:res.data.count+1
              }
            })
          }
        })
      },
      fail:function(res){
        wx.showToast({
          title: '添加失败：'+res.data,
        })
      }
    })
    //跳转
    wx.redirectTo({
      url: '../item',
    })
  },

  //选择图片 
  chooseImage:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // 显示图片
        that.setData({
          imgurl: res.tempFilePaths[0],
          isUpload: 1
        })
        //存储图片
        let timestamp = (new Date()).valueOf();
        wx.cloud.uploadFile({
          cloudPath: timestamp + ".jpg",
          filePath: res.tempFilePaths[0],
          success: function (res1) {
            console.log("上传图片：" + res1.fileID)
          },
          fail: function(){
            wx.showToast({
              title: '选择图片失败',
            })
          }
        })
      }
    })
  },

  //选择器改变
  bindPickerChange: function (e) {
    var that = this
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
      success: function (res) {
        that.setData({
          items: res.data
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '获取单品列表失败',
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