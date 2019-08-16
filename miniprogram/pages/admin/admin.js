// miniprogram/pages/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids:[
      { name: '菜单管理', imgurl: '../../images/home.png', navurl:'menu/menu'},
      { name: '单品管理', imgurl: '../../images/home.png', navurl: 'item/item' },
      { name: '广告管理', imgurl: '../../images/home.png', navurl: 'advertise/advertise'},
      { name: '用户管理', imgurl: '../../images/home.png', navurl: 'user/user' },
      { name: '种类设置', imgurl: '../../images/home.png', navurl: 'variety/variety' },
    ],
    image:''
  },

  //选择图片 
  chooseImage:function(){
    console.log("上传图片")
    let that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        //返回选定的图片路径
        let imagePath = res.tempFilePaths[0];
        let name = imagePath.name + Math.random() * 100;
        console.log("图片路径："+imagePath)
        console.log("图片name：" + name)
        that.setData({
          image: imagePath
        })
        wx.showLoading({
          title: '上传中',
        });
        //云存储
        wx.cloud.uploadFile({
          cloudPath:'testImage.jpg',
          filePath: imagePath,
          success:function(res){
            //存储成功后，上传信息到数据库
            let fileId = res.fileID  //获取图片唯一id
            console.log("图片fileId：" + fileId)
            const db = wx.cloud.database({
              env:'kshon-test'
            });
            db.collection("foods").add({
              data:{
                name:name,
                imagePath:imagePath,
                menuId:1111111
              },
              success: function () {
                wx.showToast({
                  title: '图片存储成功',
                  'icon': 'none',
                  duration: 3000
                })
              },
              fail: function () {
                wx.showToast({
                  title: '图片存储失败',
                  'icon': 'none',
                  duration: 3000
                })
              }
            })
          },
          fail: function () {
            wx.showToast({
              title: '图片云存储失败',
              'icon': 'none',
              duration: 3000
            })
          },
        })
      },
      fail: function () {
        wx.showToast({
          title: '图片上传失败',
          'icon': 'none',
          duration: 3000
        })
      },
      complete:function(){
        wx.hideLoading()
      }
    })
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