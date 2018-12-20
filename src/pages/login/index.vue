<template>
  <div>
    <div class="d-title">登陆</div>
    
    <button
      open-type="getUserInfo"
      @getuserinfo="bindGetUserInfo"
      class="btn-login"
    ><div
      class="denglu"
      @click="wxLogin"
    >
      <div class="left">
        <image src="../../static/images/weixin.png" />
      </div>
      <div class="right">微信登陆</div>

    </div></button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "123"
      //canIUse: wx.canIUse("button.open-type.getUserInfo")
    };
  },
  mounted() {
    // wx.getSetting({
    //   success: function(res) {
    //     if (res.authSetting["scope.userInfo"]) {
    //       wx.getUserInfo({
    //         success: function(res) {
    //           console.log(res.userInfo);
    //           //用户已经授权过
    //           console.log("用户已经授权过");
    //         }
    //       });
    //     } else {
    //       console.log("用户还未授权过");
    //     }
    //   }
    // });
  },
  methods: {
    wxLogin() {
      this.$common.userLogin();
    },
    bindGetUserInfo(e) {
      const that =this
      var code = wx.login({
        success(res) {
          if (res.code) {
            var code = res.code;
            if (e.mp.detail.rawData) {
              //用户按了允许授权按钮
              console.log("用户按了允许授权按钮");
              
              let obj = e.mp.detail;
              const param = {
                jsCode: code,
                userInfo: obj.userInfo,
                signature: obj.signature,
                errMsg: obj.errMsg,
                encryptedData: obj.encryptedData,
                rawData: obj.rawData,
                iv: obj.iv
              };
              that.$common.getWxLogin(param);
             } 
            // else {
            //   //用户按了拒绝按钮
            //   //用户按了拒绝按钮
            //   wx.showModal({
            //     title: "警告通知",
            //     content:
            //       "您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。",
            //     success: function(res) {
            //       if (res.confirm) {
            //         wx.openSetting({
            //           success: res => {
            //             if (res.authSetting["scope.userInfo"]) {
            //               ////如果用户重新同意了授权登录
            //               console.log(res);
            //               console.log('e',e)
            //             }
            //           }
            //         });
            //       }
            //     }
            //   });
            // }
          }
        },fail:function(res){
          console.log(fail)
        }
      });
    }
  }
};
</script>
<style lang="less">
.d-title {
  height: 30vh;
  line-height: 30vh;
  text-align: center;
  font-size: 20px;
}
.btn-login{
     background: #0bb908;
     background:#0bb908;
color:white;
border-radius:50px;
width:80%;

  }
.denglu {
  width: 80%;
  height: 55px;
  line-height: 55px;
  margin: 0 auto;
  background: #0bb908;
  border-radius: 50px;
  color: white;
  display: flex;
  
  .left {
    width: 40%;
    text-align: right;
    padding-top: 10px;
  }
  .right {
    padding-left: 10px;
  }
  image {
    width: 30px;
    height: 30px;
  }
}
</style>

