<template>
  <div style="width:100%;">
    <div class="iconList">
      <div
        v-if="name==='order'"
        class="icon-hs"
      >
        <image src="../../../static/images/nullorder.png" />
        <div>到底还过不过了！</div>
        <div style="font-size:12px;">啥也不买,你不吃不喝不睡觉了吗~</div>
        <div>
        </div>
      </div>
       <div
        v-if="name==='404'"
        class="icon-hs"
      >
        <image src="../../../static/images/bug.png" />
        <div @click="$common.openTabbar('/pages/index/main')">回到首页</div>
        <div>
        </div>
      </div>
      <div
        v-if="name==='cart'"
        class="icon-cart"
      >
        <image src="../../../static/images/nullcart.png" />
        <div>不过节吗！什么都没有啊~</div>
        <div class="color6">买不买的</div>
        <div class="color6">加个购物车再说嘛</div>
        <div>
          <view class="nullCartBtn"   @click="$common.openTabbar('/pages/index/main')">
              去 逛 逛
          </view>
        </div>
      </div>
        <div
        v-if="name==='goods'"
        class="icon-cart"
      >
        <image src="../../../static/images/nulllist.png" />
        <div>暂无商品</div>
       
        <div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ["name"],
  created(){
  }
};
</script>

<style lang="less">
.iconList {
  text-align: center;
  width: 100%;
  letter-spacing:1.5px;
  background: white;
  .icon-hs {
    color: #8f99a3;
    height: calc(100vh - 44px);
  }
  .icon-cart {
    height: 100vh;
    .color6{
      height: 25px;
      line-height: 25px;
      text-indent: 2px;
    }
    .nullCartBtn{
      width: 50%;
      margin:0 auto;
      color: white;
      background: #fa6d87;
      height: 35px;
      line-height: 35px;
      border-radius: 50px;
      margin-top: 5px;
    }
  }
  image {
    width: 80%;
    height: 300px;
  }
  view {
    height: 30px;
    line-height: 30px;
  }
}
</style>

