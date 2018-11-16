<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style lang="less">
page {
  //background: #f0f0f0;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  color: #1c2438;
  font-size: 14px;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

.d-space {
  width: 100%;
  height: 10px;
  background: #f5f5f5;
  clear: both;
}
.title-name {
  width: 100%;
  .van-cell {
    font-size: 12px;
  }
}
.s-p-step {
  .inputClass {
    width: 28px;
    height: 25px;
    font-size: 12px;
  }
  .plusClass,
  .minusClass {
    height: 30px;
    width: 32px;
  }
}
.vansub {
  .customClass {
    height: 50px;
  }
  .buttonClass {
    height: 50px;
    line-height: 50px;
  }
}
 .main-title {
    margin: 0 15px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    position: relative;
   
    .right {
       color: #999;
      display: flex;
      font-size: 14px;
      line-height: 45px;
      text-align: right;
      color: #1d3f14;
      position: absolute;
      right: 10rpx;
      top: 0;
      .u-icon {
        height: 20px;
        padding-top: 4rpx;
        font-size: 11px;
      }
    }
  }
</style>
