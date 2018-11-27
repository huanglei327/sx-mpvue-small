<template>
  <div>
    <view v-show="status.orList.length<=0">
      <div class="nullCart">
        <image src="../../../static/images/nullorder.png" />
        <div>购物车还是空的哦~</div>
        <div>
        </div>
      </div>
    </view>
    <view v-show="status.orList.length>0">
      <view v-for="(ditem,dindex) in status.orList" :key="dindex">
        <van-panel :title="'订单编号：'+ditem.orderSn" use-footer-slot custom-class="panelCust">
          <view>
            <view class="order-content" v-for="(item,index) in ditem.orderGoodsList" :key="index">
              <view class="o-left">
                <image :src="item.listPicUrl" />
              </view>
              <view class="o-center">
                <view class="o-name">
                  <view class="o-1">{{item.goodsName}}</view>
                  <view class="o-2">￥{{item.retailPrice}}</view>
                </view>
                <view class="o-remark color6">
                  <view class="o-1">{{item.goodsSpecifitionNameValue}}</view>
                  <view class="o-2">x {{item.number}}</view>
                </view>
              </view>
            </view>
          </view>
          <view slot="footer">
            <view class="o-foot">
              <view class="o-price">应付:￥176.00</view>
              <view class="o-btn">
                <div class="order-btn" v-if="ditem.orderStatus===0">
                  <span>
                    <van-button size="small">取消订单</van-button>
                  </span>
                  <span>
                    <van-button size="small" type="danger">付款</van-button>
                  </span>
                </div>
                <div class="order-btn" v-else>
                  <div>
                    <van-button size="small">评价</van-button>
                  </div>
                  <div>
                    <van-button size="small">追踪物流</van-button>
                  </div>
                </div>
              </view>
            </view>
          </view>
        </van-panel>
      </view>
    </view>
  </div>
</template>

<script>
import { GetOderListApi } from '@/utils/http/api.js'
export default {
  props: ['status'],
  data() {
    return {
      orList: []
    }
  },
  created() {},
  methods: {}
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
