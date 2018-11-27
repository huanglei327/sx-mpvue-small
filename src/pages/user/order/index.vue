<template>
  <div class="container">
    <div style="width:100%;">
      <van-tabs :active="active" @change="onChange" swipe-threshold="5">
        <van-tab title="全部">全部</van-tab>
        <van-tab title="待付款">
          <div>
            <order-list :status="status"></order-list>
          </div>
        </van-tab>
        <van-tab title="待发货">
          <order-list :status="status"></order-list>
        </van-tab>
        <van-tab title="待收货">
          <order-list :status="status"></order-list>
        </van-tab>
        <van-tab title="待评价">
          <order-list :status="status"></order-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { GetOderListApi } from '@/utils/http/api.js'

import orderList from '../../../components/order.vue'

export default {
  data() {
    return {
      msg: '2234',
      active: 1,
      pageNo: 1,
      pageSize: 20,
      orderStatus: 0,
      status: {
        orList: []
      }
    }
  },
  components: {
    orderList
  },
  methods: {
    onChange(event) {
      this.active = event.mp.index
      this.orderStatus = this.getStatus(event.mp.detail.title)
      this.pageNo = 1
      this.goOrder()
    },
    goOrder() {
      const that = this
      const c = res => {
        console.log('res',res)
        that.status.orList = res.data
      }
      const param = {
        pageNo: that.pageNo,
        pageSize: that.pageSize,
        orderStatus: that.orderStatus
      }
      GetOderListApi(param).then(c)
    },
    getStatus(value) {
      var temp = 0
      switch (value) {
        case '待付款':
          temp = 0
          break
        case '待发货':
          temp = 201
          break
        case '待收货':
          temp = 300
          break
        case '已完成':
          temp = 301
          break
      }
      return temp
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
    padding: 0 15px;
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
</style>

 