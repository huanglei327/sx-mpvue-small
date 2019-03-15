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
@import './common/css/index.less';
page {
  background: #efefef;
}
.coloe3 {
  color: #333;
}
.color6 {
  color: #666;
  font-size: 12px
}
.color9 {
  color: #999;
}
.ec-color {
  color: #ececec;
}
.ef-color {
  color: #efefef;
}
.price-color {
  color: #fa6d87;
}
.s-price{
  color: #fa6d87;
  font-size: 16px;
}
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  color: @3-color;
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
  background: #efefef;
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
    height: 27px;
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
    height: 46px;
    line-height: 46px;
  }
  .customClass{
    height: 45px;
  }
}
.main-title {
  margin: 0 15px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  position: relative;

  .right {
    display: flex;
    font-size: 14px;
    line-height: 45px;
    text-align: right;
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
.order-title{
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  position: relative;

  .right {
    display: flex;
    font-size: 14px;
    line-height: 45px;
    text-align: right;
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
.cart-vantag {
  width: 100%;
  height: 45px;
  line-height: 45px;
  //font-size: 12px;
}
.cart-sub {
  display: flex;
  padding: 0 15px;
}
.panelCust{
  margin: 5px 0;
}
.nullCart {
  text-align: center;
  width: 100%;
  image {
    width: 80%;
    height: 300px;
  }
  view {
    height: 30px;
    line-height: 30px;
  }
}
</style>
