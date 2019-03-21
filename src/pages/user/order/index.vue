<template>
  <div>
    <div class="o-l-m">
      <div class="o-l-t">
        <van-tabs :active="active" @change="onChange" swipe-threshold="5" color="#fa6d87">
          <van-tab title="全部"></van-tab>
          <van-tab title="待付款"></van-tab>
          <van-tab title="待发货"></van-tab>
          <van-tab title="待收货"></van-tab>
          <van-tab title="待评价"></van-tab>
        </van-tabs>
      </div>
      <div class="o-l-c">
        <!-- <order-list :status='status'></order-list> -->
        <view v-show="status.isTrue">
          <view v-show="status.orList.length>0">
            <view v-for="(ditem,dindex) in status.orList" :key="dindex">
              <van-panel :title="'订单编号：'+ditem.orderSn" use-footer-slot custom-class="panelCust">
                <view>
                  <view
                    class="order-content"
                    v-for="(item,index) in ditem.orderGoodsList"
                    :key="index"
                    @click="goOrderDetails(ditem)"
                  >
                    <view class="o-left">
                      <image :src="item.listPicUrl"/>
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
                    <view class="o-price">应付:￥{{ditem.actualPrice}}</view>
                    <view class="o-btn">
                      <div class="order-btn" v-if="ditem.orderStatus===0">
                        <span>
                          <van-button size="small">取消订单</van-button>
                        </span>
                        <span>
                          <van-button
                            size="small"
                            type="danger"
                            @click="GetGenerateOrder(ditem.id)"
                          >付 款</van-button>
                        </span>
                      </div>
                      <div class="order-btn" v-else>
                        <span>
                          <van-button size="small">评价</van-button>
                        </span>
                        <span>
                          <van-button size="small" @click="goRefund(ditem.id)">退款</van-button>
                        </span>
                      </div>
                    </view>
                  </view>
                </view>
              </van-panel>
            </view>
          </view>
          <view v-if="status.orList.length<=0">
            <icon-info name="order"></icon-info>
          </view>
          <view v-else>
            <view v-show="foots.isTrue">
              <list-foot :foots="foots"></list-foot>
            </view>
          </view>
        </view>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GetOderListApi,
  GetGenerateOrderApi,
  GoRefundApi
} from "@/utils/http/api.js";

import orderList from "../../../components/order.vue";
import listFoot from "../../../components/listfoot.vue";
import iconInfo from "../../../components/iconinfo.vue";

export default {
  data() {
    return {
      msg: "2234",
      active: 1,
      pageNo: 1,
      pageSize: 20,
      orderStatus: 0,
      status: {
        orList: [],
        isTrue: false
      },
      isPaging: false,
      foots: {
        type: 1, //1加载   2到底
        isTrue: false
      },
      obj: {}
    };
  },
  components: {
    orderList,
    listFoot,
    iconInfo
  },
  methods: {
    onChange(event) {
      this.active = event.mp.detail.index;
      this.status.isTrue = false;
      //每次切换加载第一页
      this.pageNo = 1;
      this.isPaging = false;
      this.goOrder(event.mp.detail.title);
    },
    goOrderDetails(item){
      console.log(item)
      this.$common.openWin('/pages/user/odetails/main?orderId='+item.id)
    },
    goRefund(orderId) {
      const that = this;
      const c = res => {
        console.log(res);
      };
      const param = {
        orderId: orderId
      };
      GoRefundApi(param).then(c);
    },
    GetGenerateOrder(orderId) {
      const that = this;
      const c = res => {
        let param = {
          timeStamp: res.timeStamp,
          paySign: res.paySign,
          package: res.package,
          nonceStr: res.nonceStr,
          signType: res.signType
        };
        that.$common.GoPay(param);
      };
      const param = {
        orderId: orderId
      };
      GetGenerateOrderApi(param).then(c);
    },
    goOrder(value) {
      const that = this;
      const c = res => {
        //如果返回数据小于一页得条数 就禁止上拉加载
        if (res.data.length < that.pageSize) {
          that.foots = {
            type: 2,
            isTrue: true
          };
        } else {
          that.foots = {
            type: 1,
            isTrue: true
          };
        }
        //
        if (!that.isPaging) {
          that.status.orList = res.data;
        } else {
          res.data.forEach(item => {
            that.status.orList.push(item);
          });
        }
        that.status.isTrue = true;
      };
      let param = {
        pageNo: that.pageNo,
        pageSize: that.pageSize,
        orderStatus: that.orderStatus
      };
      if (value) {
        param = {
          pageNo: 1,
          pageSize: that.pageSize,
          orderStatus: that.getStatus(value)
        };
      }
      GetOderListApi(param).then(c);
    },
    getStatus(value) {
      var temp = 0;
      switch (value) {
        case "待付款":
          temp = 0;
          break;
        case "待发货":
          temp = 201;
          break;
        case "待收货":
          temp = 300;
          break;
        case "待评价":
          temp = 301;
          break;
        case "全部":
          temp = "";
          break;
      }
      return temp;
    },
    getIndexById(value) {
      var id = 0;
      switch (value + "") {
        case "0":
          id = 1;
          break;
        case "201":
          id = 2;
          break;
        case "300":
          id = 3;
          break;
        case "301":
          id = 4;
          break;
      }
      return id;
    },
    _getRegisterInfo() {
      const that = this;

      that.pageNo++;
      that.isPaging = true;
      that.goOrder();
    }
  },
  onReachBottom: function() {
    //执行上拉执行的功能
    if (this.foots.type === 1) {
      this._getRegisterInfo();
    }
  },
  // 停止下拉刷新
  async onPullDownRefresh() {
    // to doing..
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },
  mounted() {
    this.obj = this.$common.getUrlPages();
    this.active = this.getIndexById(this.getStatus(this.obj.type));
    this.goOrder(this.obj.type);
  }
};
</script>

<style lang='less'>
.o-l-m {
  width: 100%;
  position: relative;
  .o-l-t {
    height: 44px;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 100;
  }
  .o-l-c {
    width: 100%;
    z-index: 99;
    margin-top: 44px;
  }
}
.order-list {
  position: relative;
  top: 0;
}
.order-btn {
  span {
    margin-left: 10px;
  }
}
.order-content {
  width: 100%;
  height: 90px;
  display: flex;
  border-bottom: 1px solid #f5f5f5;
  .o-left {
    width: 90px;
    height: 90px;
    image {
      width: 80px;
      height: 80px;
    }
  }
  .o-center {
    padding-right: 15px;
    width: 100%;
    .o-name {
      min-height: 40px;
      padding-top: 20rpx;
      padding-bottom: 10rpx;
      display: flex;
      .o-1 {
        width: 70%;
        padding: 0 10px;
      }
      .o-2 {
        width: 30%;
        text-align: right;
      }
    }
    .o-remark {
      display: flex;
      .o-1 {
        width: 70%;
        padding: 0 10px;
      }
      .o-2 {
        width: 30%;
        text-align: right;
      }
    }
  }
}
.o-foot {
  display: flex;
  height: 30px;
  line-height: 30px;
  .o-price {
    width: 40%;
  }
  .o-btn {
    width: 60%;
    text-align: right;
  }
}
.order-content:last-child {
  border-bottom: 0px;
}
.order-reamrk {
  text-align: center;
  font-size: 12px;
  padding-top: 10px;
}
</style>

 