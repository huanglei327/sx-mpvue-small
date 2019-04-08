<template>
  <view class="loading" v-if="status">
    <view class="dot" :animation="alpha[0]"></view>
    <view class="dot" :animation="alpha[1]"></view>
    <view class="dot" :animation="alpha[2]"></view>
    <view class="dot" :animation="alpha[3]"></view>
    <view class="dot" :animation="alpha[4]"></view>
  </view>
</template>

<script>
export default {
  props: ['status'],
  data() {
    return {
      alpha: [1, 1, 1, 1, 1],
      setTime: '',
      index: 0
    }
  },
  watch: {
    status: function(val) {
      console.log(val)
      if (val === false) {
        clearInterval(this.setTime)
      }
    }
  },
  onLoad: function() {
    var self = this
    var _index = 0
    var _alpha = self.alpha
    var _speed = 500
    self.setTime = setInterval(function() {
      self.index++
      if (self.index >= 4) {
        self.index = 0
      }
      console.log(self.index)
      var an_show = wx.createAnimation({})
      var an_hide = wx.createAnimation({})
      an_show.opacity(1).step({ duration: _speed })
      an_hide.opacity(0).step({ duration: _speed })
      self.alpha.forEach((item, index) => {
        if (index === self.index) {
          self.alpha[index] = an_show
        } else {
          self.alpha[index] = an_hide
        }
      })
    }, _speed)
  }
}
</script>

<style scoped lang="less">
.loading {
  width: 100%;
  position: absolute;
  justify-content: center;
  text-align: center;
  background: white;
  z-index: 1000;
  height: 100vh;

  .dot {
    background-color: black;
    display: inline-block;
    /**圆点大小在这里设置，高宽一致，圆角值为高宽的一半**/
    width: 16rpx;
    height: 16rpx;
    border-radius: 8rpx;
    margin: 0 10rpx;
    opacity: 0;
  }
}
</style>
