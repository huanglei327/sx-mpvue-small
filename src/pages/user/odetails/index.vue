<template>
  <div class="container">
    <div class="c-address">
      <van-cell-group>
        <van-cell icon="location">
          <div slot="title">
            <div v-if="orderInfo">
              <div>收货人 : {{orderInfo.consignee}} {{orderInfo.mobile}}</div>
              <div
                class="c-add-ils color6"
              >收货地址：{{orderInfo.province + orderInfo.city+ orderInfo.district + orderInfo.address}}</div>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="d-space"></div>
    <div class="order-list">
      <div class="o-content2">
        <div class="left">订单状态 :</div>
        <div class="right s-price">{{orderInfo.orderStatusText}}</div>
      </div>
      <div class="o-content">
        <div class="left">订单编号 :</div>
        <div class="right">{{orderInfo.orderSn}}</div>
      </div>
      <div class="o-content">
        <div class="left">下单时间 :</div>
        <div class="right">{{orderInfo.addTime}}</div>
      </div>
      <div class="o-b-list" v-if="btnState == 1">
        <span>
          <van-button size="small" @click="cancelOrder(orderInfo.id)">取消订单</van-button>
        </span>
        <span>
          <van-button size="small" type="danger" @click="GetGenerateOrder(orderInfo.id)">付 款</van-button>
        </span>
      </div>
    </div>
    <div class="d-space"></div>
    <div style="width:100%;">
      <div class="shop-cart" v-for="(item,index) in orderGoods" :key="index">
        <div style="padding:10px 15px 0 15px;">
          <div class="shop-row">
            <div class="s-r-image">
              <image :src="item.listPicUrl"/>
            </div>
            <div class="s-r-content">
              <div class="s-r-name">{{item.goodsName}}</div>
              <div>
                <span class="s-r-remark">{{item.goodsSpecifitionNameValue}}</span>
              </div>
              <div class="s-p-n">
                <div class="s-p-p">￥{{item.retailPrice}}</div>
                <div class="s-p-step">
                  <van-stepper
                    :value="item.number"
                    integer="true"
                    input-class="inputClass"
                    minus-class="minusClass"
                    plus-class="plusClass"
                    step="1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-space"></div>
      </div>
    </div>
    <div class="order-list">
      <div class="o-content">
        <div class="left">支付方式 :</div>
        <div class="right">微信</div>
      </div>
      <div class="o-content">
        <div class="left">商品合计 :</div>
        <div class="right">{{orderInfo.goodsPrice}}</div>
      </div>
      <div class="o-content">
        <div class="left">运费 :</div>
        <div class="right">0.00</div>
      </div>
      <div class="o-content2 o-c-s s-price">
        <div class="left">实付 :</div>
        <div class="right">{{orderInfo.actualPrice}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetOrderDeatilsApi,GetGenerateOrderApi,cancelOrderApi } from "@/utils/http/api.js";
export default {
  data() {
    return {
      query: {},
      orderInfo: {},
      orderGoods: [],
      btnState: 0
    };
  },
  mounted() {
    this.query = this.$common.getUrlPages();
    if (this.query) {
      this.GetOrderDeatils(this.query.orderId);
    }
  },
  methods: {
    GetOrderDeatils(orderId) {
      const that = this;
      const c = res => {
        that.orderInfo = res.orderInfo;
        that.orderGoods = res.orderGoods;
        if (res.orderInfo.orderStatus == "0") {
          that.btnState = 1;
        }
      };
      const param = {
        orderId: orderId
      };
      GetOrderDeatilsApi(param).then(c);
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
    cancelOrder(orderId){
      const that = this 
      const c= res=>{
        wx.showToast({
          title: '订单取消成功',
          icon: 'warn',
          duration: 2000
        })
      }
      const param = {
        orderId : orderId
      }
      cancelOrderApi(param).then(c)
    }
  }
};
</script>

 <style lang="less">
.c-address {
  width: 100%;
  .c-add-ils {
    line-height: 20px;
    padding-top: 5px;
  }
}
.order-list {
  background: white;
  padding: 10px 0;
  width: 100%;
  .o-c-s {
    border-top: 1px solid #f5f5f5;
    padding: 5px 0;
  }
  .o-c-z {
    font-size: 14px;
    border-bottom: 1px solid #f5f5f5;
  }
  .o-b-list{
    text-align: right;
    margin-right: 15px;
    border-top:1px solid #f5f5f5;
    padding-top: 5px;
    margin-top:5px;
    span {
      margin-left: 15px;
    }
  }
  .o-content2 {
    height: 25px;
    line-height: 25px;
    display: flex;
    font-size: 12px;
    margin-left: 40rpx;
    .left {
      width: 100px;
    }
    .right {
      flex: 1;
    }
  }
  .o-content {
    height: 25px;
    line-height: 25px;
    display: flex;
    font-size: 12px;
    padding: 0 20px;
    .left {
      width: 100px;
    }
    .right {
      flex: 1;
    }
  }
}

.shop-cart {
  width: 100%;
  background: white;
  .shop-row {
    display: flex;
    height: 110px;
    .s-r-checkbox {
      padding-right: 10px;
      line-height: 100px;
    }
    .s-r-image {
      padding-right: 10px;
      image {
        width: 100px;
        height: 100px;
        background: #f5f5f5;
      }
    }
    .s-r-content {
      height: 23px;
      line-height: 24px;
      width: 100%;
      .s-p-n {
        display: flex;
        margin-top: 10rpx;
        .s-p-p {
          width: 30%;
        }
        .s-p-step {
          width: 55%;
        }
        .s-p-del {
          width: 15%;
          font-size: 20px;
          height: 30px;
          line-height: 32px;
          text-align: right;
          color: #666;
        }
      }
      .s-r-name {
        min-height: 35px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .s-r-remark {
        width: auto;
        padding: 2px 5px;
        background: #f5f5f5;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 5px 0;
      }
    }
  }
}
</style>
