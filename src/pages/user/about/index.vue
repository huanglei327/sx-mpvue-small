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
      <div class="ab-content"
           @click="callPhoneA">
        <div class="ab-left">电话号码</div>
        <div class="ab-right">0752-7210339</div>
      </div>
      <div class="ab-content"
           @click="callPhone">
        <div class="ab-left">手机号码</div>
        <div class="ab-right">13059501888</div>
        <div class="ab-right-r price-color">
          <van-icon name="phone" />
        </div>
      </div>
      <div class="ab-content">
        <div class="ab-left">微信号码</div>
        <div class="ab-right">wxid_w6hbg4lxk2i821</div>
        <div class="ab-right-r price-color"
             @click="copywex">
          复制
        </div>
      </div>
      <div class="ab-content"
           @click="showMap">
        <div class="ab-left">店铺地址</div>
        <div class="ab-right">广东省惠州市城区环湖三路18号广东省惠州市城区环湖三路18号(方直广场)</div>
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
  },
  methods: {
    showMap () {
      wx.getLocation({//获取当前经纬度
        type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息  
        success: function (res) {
          wx.openLocation({//​使用微信内置地图查看位置。
            latitude: 23.066199,//要去的纬度-地址
            longitude: 114.429833,//要去的经度-地址
            name: "惠州市惠城区方直广场",
            address: '惠州市惠城区方直广场'
          })
        }
      })
    },
    copywex () {
      const that = this
      wx.setClipboardData({
        data: 'wxid_w6hbg4lxk2i821',
        success (res) {
          wx.getClipboardData({
            success (res) {
              that.$toast.success('复制成功');
            }
          })
        }
      })
    },
    callPhone (phoneNum) {
      wx.makePhoneCall({
        phoneNumber: '13059501888' //仅为示例，并非真实的电话号码
      })
    },
    callPhoneA (phoneNum) {
      wx.makePhoneCall({
        phoneNumber: '0752-7210339' //仅为示例，并非真实的电话号码
      })
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
    padding: 25rpx 0;
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

