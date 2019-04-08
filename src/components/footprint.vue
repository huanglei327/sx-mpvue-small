<template>
  <div>
    <!-- <div class="c-main">
      <div class="c-content" v-for="(item,index) in status.footpriintList" :key="index">
        <div class="c-single" @click="$common.openWin('/pages/commodity/details/main?goodsId='+item.id)">
          <div class="c-img">
            <image :src="item.listPicUrl" mode="widthFix" />

          </div>
          <div class="c-name">{{item.name}}</div>
          <div class="c-price">￥{{item.retailPrice}}</div>
        </div>
      </div>
    </div> -->
    <div class="f-main">
      <div
        class="f-content"
        v-for="(item,index) in status.footpriintList"
        :key="index"
        @click="$common.openWin('/pages/commodity/details/main?goodsId='+item.id)"
      >
        <div class="f-left">
          <image
            :src="item.listPicUrl"
            mode="widthFix"
          />
        </div>
        <div class="f-right">
          <div class="f-name">{{item.name}}</div>
          <div class="f-biref color6">{{item.goodsBrief}}</div>
          <div class="f-price price-color">￥{{item.retailPrice}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["status"],
  created() {
    console.log("createed", this.status);
  },
  methods: {
    GoDetails(item) {
      const url = "../details/main?goodsId=" + item.id;
      wx.navigateTo({ url });
    }
  }
};
</script>

<style lang="less">
.f-main {
  width: 100%;
  font-size: 12px;
  margin-top: 5px;
  .f-content {
    display: flex;
    background: white;
    padding: 0 15px;
    border-bottom: 1px solid #f5f5f5;
    .f-left {
      width: 100px;
      height: 100px;
      image {
        width: 90px;
        height: 90px;
      }
    }
    .f-right {
      width: 100%;
      padding: 10px;
      .f-name {
        min-height: 40px;
        line-height: 20px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .f-biref {
        padding: 5px 0;
      }
      .f-price {
        height: 25px;
        line-height: 25px;
        font-weight: 600;
      }
    }
  }
}
</style>
