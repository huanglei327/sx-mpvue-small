<template>
  <div class="container">
    <div style="width:100%;">
      <van-tabs :active="active" @change="onChange" swipe-threshold="5">
        <van-tab title="全部">全部</van-tab>
        <van-tab title="待付款">
          <div>
            <van-panel title="订单编号：24234242343" use-footer-slot custom-class="panelCust">
              <view>
                <view class="order-content">
                  <view class="o-left">
                    <image src="http://yanxuan.nosdn.127.net/1f67b1970ee20fd572b7202da0ff705d.png"/>
                  </view>
                  <view class="o-center">
                    <view class="o-name">
                      <view class="o-1">内裤女性感雷斯三角无痕冰丝女人透明骚货2342424234</view>
                      <view class="o-2">￥178.99</view>
                    </view>
                    <view class="o-remark color6">
                      <view class="o-1">内裤女性感雷斯三角无痕冰丝</view>
                      <view class="o-2">x 1</view>
                    </view>
                  </view>
                </view>
                 <view class="order-content">
                  <view class="o-left">
                    <image src="http://yanxuan.nosdn.127.net/1f67b1970ee20fd572b7202da0ff705d.png"/>
                  </view>
                  <view class="o-center">
                    <view class="o-name">
                      <view class="o-1">内裤女性感雷斯三角无痕冰丝女人透明骚货2342424234</view>
                      <view class="o-2">￥178.99</view>
                    </view>
                    <view class="o-remark color6">
                      <view class="o-1">内裤女性感雷斯三角无痕冰丝</view>
                      <view class="o-2">x 1</view>
                    </view>
                  </view>
                </view>
                 <view class="order-content">
                  <view class="o-left">
                    <image src="http://yanxuan.nosdn.127.net/1f67b1970ee20fd572b7202da0ff705d.png"/>
                  </view>
                  <view class="o-center">
                    <view class="o-name">
                      <view class="o-1">内裤女性感雷斯三角无痕冰丝女人透明骚货2342424234</view>
                      <view class="o-2">￥178.99</view>
                    </view>
                    <view class="o-remark color6">
                      <view class="o-1">内裤女性感雷斯三角无痕冰丝</view>
                      <view class="o-2">x 1</view>
                    </view>
                  </view>
                </view>
              </view>
              <view slot="footer">
                <view class="o-foot">
                  <view class="o-price">应付:￥176.00</view>
                  <view class="o-btn" >
                    <div class="order-btn">
                      <span>
                        <van-button size="small">取消订单</van-button>
                      </span>
                      <span>
                        <van-button size="small" type="danger">付款</van-button>
                      </span>
                    </div>
                    <!-- <div class="order-btn">
                      <div>
                        <van-button size="small">评价</van-button>
                      </div>
                      <div>
                        <van-button size="small">追踪物流</van-button>
                      </div>
                    </div> -->
                  </view>
                </view>
              </view>
            </van-panel>
          </div>
        </van-tab>
        <van-tab title="待发货">待发货</van-tab>
        <van-tab title="待收货">待收货</van-tab>
        <van-tab title="待评价">待评价</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { GetOderListApi } from '@/utils/http/api.js'
export default {
  data() {
    return {
      msg: '2234',
      active: 1,
      pageNo: 1,
      pageSize: 20,
      orderStatus: 0,
    }
  },
  methods: {
    onChange(event) {
      console.log(event.mp.detail)
    },
    goOrder() {
      const that = this
      const c = res => {
        console.log(res)
      }
      const param = {
        pageNo: that.pageNo,
        pageSize: that.pageSize,
        orderStatus: that.orderStatus
      }
      GetOderListApi(param).then(c)
    }
  },
  mounted() {
    this.goOrder()
  }
}
</script>

<style lang="less">
.order-btn {
  span {
    margin-left: 10px;
  }
}
.order-content {
    width: 100%;
    height: 90px;
    display: flex;
    border-bottom:1px solid #f5f5f5;
    .o-left{
      width: 90px;
      height: 90px;
      image{
        width: 80px;
        height: 80px;
      }
    }
    .o-center{
      padding: 0 15px;
        .o-name{
          min-height:40px;
          padding-top:20rpx;
          padding-bottom: 10rpx;
          display: flex;
          .o-1{
            width: 70%;
            padding: 0 10px;
          }
          .o-2{
            width: 30%;
            text-align: right;
          }
        }
        .o-remark{
          display: flex;
          .o-1{
            width: 70%;
            padding: 0 10px;
            
          }
          .o-2{
            width: 30%;
            text-align: right;
          }
        }
    }
  }
  .o-foot{
    display: flex;
    height: 30px;
    line-height: 30px;
    .o-price{
      width: 40%;
    }
    .o-btn{
      width: 60%;
      text-align: right;
    }
  }
.order-content:last-child{
  border-bottom: 0px;
}
</style>

 