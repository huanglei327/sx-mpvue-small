<template>
  <div style="width:100%;">
   <div class="c-address">
      <van-cell-group>
        <van-cell icon="location" is-link label="收货地址：广东省深圳市南山区百里大厦" @click="upAddress">
          <div slot="title">
            <div v-if="userName">
              <div>收货人 : {{userName}} {{telNumber}}</div>
              <div class="c-add-ils color6">收货地址：{{address}}</div>
            </div>
            <div v-else>请选择收货地址</div>
          </div>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { GetOrderDeatilsApi } from "@/utils/http/api.js";
export default {
  data() {
    return {
      query:{},
      orderInfo:{}
    };
  },
  mounted(){
    this.query=this.$common.getUrlPages()
    console.log(this.query)
    if(this.query){
      this.GetOrderDeatils(this.query.orderId)
    }
  },
  methods:{
    GetOrderDeatils(orderId){
      const that = this
      const c= res=>{
        that.orderInfo = res.orderInfo
      }
      const param={
        orderId :orderId
      }
      GetOrderDeatilsApi(param).then(c)
    }
  }
};
</script>

 <style lang="less">.c-address {
  width: 100%;
  .c-add-ils {
    line-height: 20px;
    padding-top: 5px;
  }
}
</style>
