<template>
  <div class="container">
    <div class="c-search" @click="$common.openWin('/pages/classify/search/main')">
      <van-search placeholder="请输入搜索关键词" background="#f5f5f5" />
    </div>
    <div class="c-main">
      <div class="c-content" v-for="(item,index) in goodsList" :key="index">
        <div class="c-single" @click="GoDetails(item)">
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
import { GetGoodsListApi } from '@/utils/http/api.js'

export default {
  data() {
    return {
      goodsList: [],
      obj: {},
      images:{}
    }
  },
  methods: {
    GetGoodsList() {
      const that = this
      const c = res => {
        that.goodsList = res
      }
      const param = {
        categoryId: that.obj.classId
      }
      GetGoodsListApi(param).then(c)
    },
    GoDetails(item) {
      const url = '../details/main?goodsId=' + item.id
      wx.navigateTo({ url })
    }
  },

  created() {},
  mounted() {
    const that = this
    that.obj = that.$common.getUrlPages()
    console.log(that.obj)
    that.GetGoodsList()
  }
}
</script>

<style scoped lang="less">
.c-search{
  height: 50px;
  width: 100%;
  background: white;
}
.c-main {
  width: 100%;

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
