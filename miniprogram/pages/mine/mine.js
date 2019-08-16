//index.js
//获取应用实例
const app = getApp()
//初始化数据库
const db = wx.cloud.database();
Page({
  data: {
    isLogin:false,  //是否登录
    openid: '',  //用户唯一标识
    userInfo: '',  //用户信息
    role:0,   //0普通用户，1管理员 
    isAdmin:false  //是否为管理员
  },
  //后台管理
  admin:function(){
      wx.navigateTo({
        url: '../admin/admin',
      })
  },
  //获取用户授权信息
  getUserInfo: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                isLogin: true,
                userInfo: res.userInfo,
              })
            },
            fail:function(res){
              console.log("用户拒绝授权",res)
            },
            complete:function(){
              console.log("用户授权信息：", that.data.userInfo)
              if (that.data.userInfo != '') {   //获取用户信息成功 
                console.log("存储信息到数据库user表")
                //调用云登录
                wx.cloud.callFunction({
                  name: 'login',
                  success: function (res) {
                    console.log("调用云登录成功，openid:", res.result.openid)
                    //给自己加管理员
                    if (res.result.openid =="oewgD0Reoi9oCL2JqnP-4mkcaCGg"){
                      that.setData({
                        role:1,
                        isAdmin:true
                      })
                    }
                    //设置信息
                    that.setData({
                      openid: res.result.openid
                    })
                    //根据openid判断用户是否已存在
                    db.collection("user").where({
                      openid: res.result.openid
                    }).get({
                      success: function (res2) {
                        if (res2.data.length > 0) {
                          console.log("用户在数据库中已存在", res2);
                          //更新用户信息
                          db.collection("user").where({
                            openid: res.result.openid
                          }).update({
                            data: {
                              userInfo: that.data.userInfo
                            },
                            success: function () {
                              console.log("更新数据库中的用户信息")
                            }
                          })
                        } else {  //用户不存在
                          //将openid和用户信息存储到数据库
                          db.collection("user").add({
                            data: {
                              openid: res.result.openid,
                              userInfo: that.data.userInfo,
                              role:that.data.role  //0代表普通用户，1代表管理员
                            },
                            success: function (res) {
                              console.log("用户信息成功存储到数据库")
                            }
                          })
                        }
                      }
                    })
                    //将openid存储到本地 
                    wx.setStorage({
                      key: 'openid',
                      data: res.result.openid
                    })
                  }
                })
              } else {
                console.log("获取用户授权信息失败")
              }
            }
          })
        }
      }
    })
  },

  // 事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //清理登录缓存 
  clearCache:function(){
    //清理所有缓存 
    wx.clearStorage();
    //将全局信息清空
    app.globalData.openid == '';
    app.globalData.isLogin=false;
    app.globalData.userInfo='';
    //清空本页面信息并刷新本页面
    this.setData({
      isLogin: false,  //是否登录
      openid: '',  //用户唯一标识
      userInfo: '',  //用户信息
    })
    this.onLoad();
    //跳转到首页
    wx.switchTab({
      url: '../index/index',
    })
  },
  onLoad: function () {
    var that = this;
    if(app.globalData.openid!=''){
      console.log("本地openid存在")
      that.setData({
        isLogin: app.globalData.isLogin,
        userInfo: app.globalData.userInfo
      })
      //给自己加管理员
      if (app.globalData.openid == "oewgD0Reoi9oCL2JqnP-4mkcaCGg") {
        that.setData({
          isAdmin: true
        })
      }
    }
  }
})