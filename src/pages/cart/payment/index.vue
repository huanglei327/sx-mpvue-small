<template>
  <div style="width:100%;">
    <div class="payment" v-if="query.stateType === '2'">
      <div class="title">支付失败</div>
      <div class="remark">请在当天内完成付款</div>
      <div class="remark">否则订单会被系统取消</div>
      <div class="btnlist">
        <div>
          <van-button size="small" @click="goOrderDetails()">查看订单</van-button>
        </div>
        <div>
          <van-button size="small" @click="GetGenerateOrder()">重新支付</van-button>
        </div>
      </div>
    </div>
    <div class="payment"  v-else>
      <div class="title">支付成功</div>
      <div class="remark">请在当天内完成付款</div>
      <div class="remark">否则订单会被系统取消</div>
      <div class="btnlist">
        <div>
          <van-button size="small" @click="goOrderDetails()">查看订单</van-button>
        </div>
        <div>
          <van-button size="small" @click="goHome()">回到首页</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetOrderDeatilsApi,GetGenerateOrderApi } from "@/utils/http/api.js";
export default {
  data() {
    return {
      query: {}
    };
  },
  mounted() {
     this.query = this.$common.getUrlPages();
     console.log(this.query)
  },
  methods: {
    goOrderDetails() {
      this.$common.openWin("/pages/user/odetails/main?orderId=" + this.query.orderId);
    },
    goHome(){
      this.$common.openWin("/pages/index/index/main");
    },
     GetGenerateOrder() {
      const that = this;
      const c = res => {
        let param = {
          timeStamp: res.timeStamp,
          paySign: res.paySign,
          package: res.package,
          nonceStr: res.nonceStr,
          signType: res.signType,
          isLink: false
        };
        that.$common.GoPay(param);
      };
      const param = {
        orderId: that.query.orderId
      };
      GetGenerateOrderApi(param).then(c);
    },
  }
};
</script>

 <style lang="less">
.payment {
  margin: 0 auto;
  text-align: center;
  padding: 30px 0;
  background: white;
  .title {
    color: red;
    height: 35px;
    line-height: 35px;
  }
  .remark {
    font-size: 12px;
    height: 18px;
  }
  .btnlist {
    display: flex;
    width: 60%;
    margin: 0 auto;
    padding: 25px 0 10px 0;

    div {
      flex: 1;
    }
  }
}
</style>
