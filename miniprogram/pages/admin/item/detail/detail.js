// miniprogram/pages/admin/menu/item/detatil/detail.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: [],   //所有菜单
    index: 0,  //菜单选择器下标
    imgurl: '', //上传的图片
    name:'',    //菜单名
    price:'', //价格
    itemId:''   //当前单品id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
    
      //获取上个页面传来的单品id
    var itemId = options.itemId;
    that.setData({
      itemId:itemId
    })
      //根据id获取单品信息
      db.collection("foods").doc(itemId).get({
        success:function(res){
          that.setData({
            imgurl: res.data.imgurl,
            name: res.data.name,
            price: res.data.price
          })
          //获取所有菜单
          db.collection('menu').get({
            success: function (res1) {
              that.setData({
                menus: res1.data
              })
              //根据menuId获取当前菜单下标
              for(var m in res1.data){
                if(res1.data[m]._id==res.data.menuId){
                  console.log("当前下表 ："+m)
                  that.setData({
                    index:m
                  })
                  break;
                }
              }
            }
          })     
        },
        fail:function(res){
          wx.showToast({
            title: '获取单品失败，请返回',
          })
        }
      })
  },
  //选择图片 
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        //存储图片
        let timestamp = (new Date()).valueOf();
        wx.cloud.uploadFile({
          cloudPath: timestamp + ".jpg",
          filePath: res.tempFilePaths[0],
          success: function (res1) {
            console.log("上传图片：" + res1.fileID)
            // 显示图片
            that.setData({
              imgurl: res1.fileID,
              isUpload: 1
            })
          },
          fail: function () {
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
  //提交表单
  submit: function (e) {
    var that = this;
    var menuId = this.data.menus[this.data.index]._id;
    var name = e.detail.value.name;
    var price = e.detail.value.price;
    db.collection("foods").doc(this.data.itemId).update({
      data: {
        name: name,
        price: price,
        menuId: menuId,
        imgurl: this.data.imgurl
      },
      success: function (res) {
        wx.redirectTo({
          url: '../item',
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '添加失败：' + res.data,
        })
      }
    })
  },
  //删除此单品
  delete:function(){
    var menuId = this.data.menus[this.data.index]._id;
    db.collection("foods").doc(this.data.itemId).remove({
      success:function(res){
        //对应菜单的count-1
        db.collection("menu").doc(menuId).get({
          success: function (res1) {
            db.collection("menu").doc(menuId).update({
              data: {
                count: res1.data.count -1
              }
            })
            wx.showToast({
              title: '删除成功 ',
            })
            wx.redirectTo({
              url: '../item',
            })
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