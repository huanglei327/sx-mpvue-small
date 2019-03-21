<template>
  <div style="width:100%;">
    <div class="payment">
      <div class="title">支付失败</div>
      <div class="remark">请在当天内完成付款</div>
      <div class="remark">否则订单会被系统取消</div>
      <div class="btnlist">
        <div>
          <van-button size="small">查看订单</van-button>
        </div>
        <div>
          <van-button size="small">重新支付</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
