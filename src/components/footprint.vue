<template>
  <div>
    <div class="c-main">
      <div class="c-content" v-for="(item,index) in status.footpriintList" :key="index">
        <div class="c-single" @click="$common.openWin('/pages/commodity/details/main?goodsId='+item.id)">
          <div class="c-img">
            <image :src="item.listPicUrl" mode="widthFix" />

          </div>
          <div class="c-name">{{item.name}}</div>
          <div class="c-price">￥{{item.retailPrice}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['status'],
  created() {
    console.log('createed',this.status)
  },
  methods: {
    GoDetails(item) {
      const url = '../details/main?goodsId=' + item.id
      wx.navigateTo({ url })
    }
  }
}
</script>

<style lang="less">
.c-main {
  width: 100%;
font-size:12px;

  .c-content {
    float: left;
    width: 50%;
    .c-single {
      padding: 5px;
      .c-img {
        background: #f5f5f5;
        image {
          width: 100%;
          height: 150px;
        }
      }
      .c-name {
        height: 25px;
        line-height: 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .c-price {
        height: 25px;
        line-height: 25px;
        font-weight: 600;
      }
    }
  }
}
</style>
