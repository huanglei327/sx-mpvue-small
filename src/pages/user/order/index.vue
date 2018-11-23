<template>
  <div class="container">
    <div style="width:100%;">
      <van-tabs :active="active" @change="onChange" swipe-threshold="5">
        <van-tab title="全部">全部</van-tab>
        <van-tab title="待付款">
          <div>
            <van-panel title="订单编号：24234242343" use-footer-slot>
              <view>
                <view class="order-content">
                  <view class="o-left">
                    <image src="http://yanxuan.nosdn.127.net/1f67b1970ee20fd572b7202da0ff705d.png"/>
                  </view>
                  <view class="o-center">
                    <view class="o-name">内裤女性感雷斯三角无痕冰丝女人透明骚货2342424234</view>
                    <view>qwqeqeqweqweq</view>
                  </view>
                  <view class="o-right">
                    <div>31.99</div>
                    <div>*1</div>
                  </view>
                </view>
              </view>
              <view slot="footer">
                <van-row>
                  <van-col span="10">应付:￥176.00</van-col>
                  <van-col span="14">
                    <div class="order-btn">
                      <div>
                        <van-button size="small">取消订单</van-button>
                      </div>
                      <div>
                        <van-button size="small">付款52:46</van-button>
                      </div>
                    </div>
                    <div class="order-btn">
                      <div>
                        <van-button size="small">评价</van-button>
                      </div>
                      <div>
                        <van-button size="small">追踪物流</van-button>
                      </div>
                    </div>
                  </van-col>
                </van-row>
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
      orderStatus: 0
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
    //this.goOrder()
  }
}
</script>

<style lang="less">
.order-btn {
  display: flex;
  view {
    margin-right: 10px;
  }
}
.order-content {
    width: 100%;
    height: 90px;
    display: flex;
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
        }
    }
    .o-right{
      width: 80px;
      height: 40px;
      line-height: 40px;
    }
  }
</style>

 