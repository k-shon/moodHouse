//app.js

App({
  //全局数据
  globalData:{
    openid:'',  //用户唯一ID
    userInfo:null,  //用户信息
    auth:{   //授权状态
      'scope.userInfo':false
    },
    isLogin:false  //登录状态
  },
  onLaunch: function () {
    var that = this;
    //云开发初始化
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    //初始化数据库
    const db = wx.cloud.database();
    //获取本地的openid
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        console.log("本地openid：",res);
        if(res.data!=""){
          that.globalData.openid = res.data;
          that.globalData.isLogin = true;
          //根据openid从数据库获取用户信息
          db.collection("user").where({
            openid:res.data
          }).get({
            success:function(res){
              console.log("yonghu:", res.data[0].userInfo)
              that.globalData.userInfo = res.data[0].userInfo
            }
          })
        }
      },
    })
  }
})
