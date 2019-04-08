<template>
  <div class="container" style="background:white;">
    <!-- <div
      class="c-search"
      @click="$common.redirectTo('/pages/classify/search/main')"
    >
      <van-search
        :value="obj.keyword"
        placeholder="请输入搜索关键词"
        background="#f5f5f5"
      />
    </div> -->
    <div class="c-main">
      <div class="c-content" v-for="(item,index) in goodsList" :key="index">

        <div class="c-single" @click="GoDetails(item)">
          <div class="c-img">
            <image :src="item.listPicUrl"  mode="scaleToFill" lazy-load="true" />
          </div>
          <div class="c-name">{{item.name}}</div>
          <div class="c-price">￥{{item.retailPrice}}</div>
        </div>
      </div>
    </div>
    <div v-if="isShowGoods" style="width:100%;">
      <icon-info name="goods"></icon-info>
    </div>
    <view v-if="goodsList.length<=0">
      <!-- <icon-info name="order"></icon-info> -->
    </view>
    <view v-else>
      <view v-show="foots.isTrue">
        <list-foot :foots="foots"></list-foot>
      </view>
    </view>
  </div>
</template>

<script>
import { GetGoodsListApi } from '@/utils/http/api.js'
import iconInfo from '../../../components/iconinfo.vue'
import listFoot from '../../../components/listfoot.vue'
export default {
  data() {
    return {
      goodsList: [],
      isShowGoods: false,
      obj: {
        categoryId: '',
        keyword: ''
      },
      images: {},
      pageNo: 1,
      pageSize: 20,
      foots: {
        type: 1, //1加载   2到底
        isTrue: false
      }
    }
  },
  components: {
    iconInfo,
    listFoot
  },
  methods: {
    goSearch() {},
    _getRegisterInfo() {
      const that = this
      that.pageNo++
      that.isPaging = true
      that.GetGoodsList()
    },
    GetGoodsList() {
      const that = this
      const c = res => {
        if (res.data.length < that.pageSize) {
          that.foots = {
            type: 2,
            isTrue: true
          }
        } else {
          that.foots = {
            type: 1,
            isTrue: true
          }
        }
        if (that.pageSize === 1) {
          that.goodsList = res.data
        } else {
          res.data.forEach(item => {
            that.goodsList.push(item)
          })
        }

        if (that.goodsList.length <= 0) {
          that.isShowGoods = true
        }
      }
      const param = {
        categoryId: that.obj.classId,
        keyword: that.obj.keyword,
        pageNo: that.pageNo,
        pageSize: that.pageSize
      }
      GetGoodsListApi(param).then(c)
    },
    GoDetails(item) {
      const url = '../details/main?goodsId=' + item.id
      wx.navigateTo({ url })
    }
  },
  onReachBottom: function() {
    //执行上拉执行的功能
    if (this.foots.type === 1) {
      this._getRegisterInfo()
    }
  },
  // 停止下拉刷新
  async onPullDownRefresh() {
    // to doing..
    // 停止下拉刷新
    wx.stopPullDownRefresh()
  },
  created() {},
  mounted() {
    const that = this
    that.pageNo = 1
    that.foots.type = 1
    that.foots.isTrue = false
    that.isShowGoods = false
    that.goodsList = []
    let temp = that.$common.getUrlPages()
    that.obj.classId = temp.classId ? temp.classId : ''
    that.obj.keyword = temp.keyword ? temp.keyword : ''
    that.GetGoodsList()
  }
}
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
        width: 100%;
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
