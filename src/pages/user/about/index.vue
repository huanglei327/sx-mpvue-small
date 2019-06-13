<template>
  <div>
    <!-- <van-cell-group>
      <van-cell title="公司名称"
                value="惠(汇)韩参茸" />
      <van-cell title="电话"
                value="0752-7210339" />
      <van-cell title="手机"
                value="13059501888" />
      <van-cell title="微信号"
                value="wxid_w6hbg4lxk2i821" />
      <van-cell title="地址"
                value="wxid_w6hbg4lxk2i821" />
    </van-cell-group> -->
    <div class="ab-list">
      <div class="ab-content">
        <div class="ab-left">公司名称</div>
        <div class="ab-right">惠(汇)韩参茸</div>
      </div>
      <div class="ab-content">
        <div class="ab-left">电话号码</div>
        <div class="ab-right">0752-7210339</div>
      </div>
      <div class="ab-content">
        <div class="ab-left">手机号码</div>
        <div class="ab-right">13059501888</div>
        <div class="ab-right-r price-color">
          <van-icon name="phone" />
        </div>
      </div>
      <div class="ab-content">
        <div class="ab-left">微信号码</div>
        <div class="ab-right">wxid_w6hbg4lxk2i821</div>
      </div>
      <div class="ab-content">
        <div class="ab-left">店铺地址</div>
        <div class="ab-right"
             @click="$common.openWin('/pages/user/addmap/main')">广东省惠州市城区环湖三路18号广东省惠州市城区环湖三路18号(方直广场)</div>
        <div class="ab-right-r price-color">
          <van-icon name="location" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      aboutList: [{
        text: '公司名称:',
        value: '惠(汇)韩参茸'
      }, {
        text: '电话号码:',
        value: '0752-7210339'
      }, {
        text: '手机号码:',
        value: '13059501888'
      }, {
        text: '微信号码:',
        value: 'wxid_w6hbg4lxk2i821'
      }, {
        text: '店铺地址:',
        value: '广东省惠州市城区环湖三路18号(方直广场)广东省惠州市城区环湖三路18号(方直广场)'
      }]
    }
  }
}
</script>

<style lang="less">
.ab-list {
  font-size: 28rpx;
  padding: 0 16rpx;
  background: white;

  .ab-content {
    position: relative;
    display: flex;
    padding: 15rpx 0;
    .ab-left {
      width: 160rpx;
    }
    .ab-right {
      flex: 1;
    }
    .ab-right-r {
      width: 60rpx;
      text-align: right;
      padding-top: 5rpx;
    }
  }
  .ab-content::after {
    content: ""; // 必须
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 0.5rpx;
    background-color: #f2f2f2;
  }
}
</style>

