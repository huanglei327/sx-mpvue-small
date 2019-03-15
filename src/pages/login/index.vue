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
    getNumber(e){
      console.log(e)
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
              console.log(e)
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
              wx.navigateBack({ delta: 1 })
             }
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

