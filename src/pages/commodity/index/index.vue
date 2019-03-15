<template>
  <div
    class="container"
    style="background:white;"
  >
    <div
      class="c-search"
      @click="$common.redirectTo('/pages/classify/search/main')"
    >
      <van-search
        :value="obj.keyword"
        placeholder="请输入搜索关键词"
        background="#f5f5f5"
      />
    </div>
    <div class="c-main">
      <div
        class="c-content"
        v-for="(item,index) in goodsList"
        :key="index"
      >
        <div
          class="c-single"
          @click="GoDetails(item)"
        >
          <div class="c-img">
            <image
              :src="item.listPicUrl"
              mode="widthFix"
            />

          </div>
          <div class="c-name">{{item.name}}</div>
          <div class="c-price">￥{{item.retailPrice}}</div>
        </div>
      </div>
    </div>
    <div v-if="isShowGoods" style="width:100%;">
      <icon-info name="goods"></icon-info>
    </div>
  </div>
</template>

<script>
import { GetGoodsListApi } from "@/utils/http/api.js";
import iconInfo from '../../../components/iconinfo.vue'

export default {
  data() {
    return {
      goodsList: [],
      isShowGoods:false,
      obj: {
        categoryId: "",
        keyword: ""
      },
      images: {}
    };
  },
  components:{
    iconInfo
  },
  methods: {
    goSearch(){

    },
    GetGoodsList() {
      const that = this;
      const c = res => {        
        that.goodsList = res.data;
        if(that.goodsList.length<=0){
          that.isShowGoods=true
        }
      };
      const param = {
        categoryId: that.obj.classId,
        keyword: that.obj.keyword
      };
      GetGoodsListApi(param).then(c);
    },
    GoDetails(item) {
      const url = "../details/main?goodsId=" + item.id;
      wx.navigateTo({ url });
    }
  },

  created() {},
  mounted() {
    const that = this;
    let temp = that.$common.getUrlPages();
    that.obj.classId = temp.classId ? temp.classId : "";
    that.obj.keyword = temp.keyword ? temp.keyword : "";
    that.GetGoodsList();
  }
};
</script>

<style scoped lang="less">
.c-search {
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
