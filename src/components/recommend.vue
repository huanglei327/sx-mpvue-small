<template>

  <div class="c-main">
    <div class="c-temp">为你推荐</div>
    <div class="c-content" v-for="(item,index) in list" :key="index">
      <div class="c-single" @click="$common.openWin('/pages/commodity/details/main?goodsId='+item.id)">
        <div class="c-img">
          <image :src="item.listPicUrl" lazy-load="true" mode="scaleToFill" @load="imageLoad" />

        </div>
        <div class="c-name">{{item.name}}</div>
        <div class="c-price price-color">￥{{item.retailPrice}}</div>
      </div>
    </div>
  </div>

</template>

<script>
import { GetRecommendApi } from '@/utils/http/api.js'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    console.log('createed')
    this.GetRecommend()
  },
  methods: {
    GoDetails(item) {
      const url = '../details/main?goodsId=' + item.id
      wx.navigateTo({ url })
    },
    GetRecommend() {
      const that = this
      const c = res => {
        that.list = res.recList
      }
      const param = {}
      GetRecommendApi(param).then(c)
    },
    imageLoad(ev) {
      console.log(ev)
    }
  }
}
</script>

<style scoped lang="less">
.c-main {
  width: 100%;
  height: 100%;
  background: white;
  margin-top: 10px;
  .c-temp {
    height: 60rpx;
    line-height: 60rpx;
    font-weight: 600;
    width: 100px;
    margin: 0 auto;
    text-align: center;
  }
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
