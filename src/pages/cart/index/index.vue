<template>
  <div class="container">
    <div v-show="ssxxCart.length<=0" class="nullCart">
      <image src="../../../static/images/nullcart.png" />
      <div>购物车还是空的哦~</div>
      <div>
        <van-button size="newSmall" @click="$common.openTabbar('/pages/index/main')" type="danger">去逛逛</van-button>
      </div>
    </div>
    <div v-show="ssxxCart.length>0" style="width:100%;">
      <div class="shop-cart" v-for="(item,index) in getShopCart" :key="index">
        <div style="padding:10px 15px 0 15px;">
          <div class="shop-row">
            <div class="s-r-checkbox">
              <van-checkbox :value="item.isSelected" @change="checkChange(item)"></van-checkbox>
            </div>
            <div class="s-r-image">
              <image :src="item.listPicUrl" />
            </div>
            <div class="s-r-content">
              <div class="s-r-name">{{item.name}}</div>
              <div>
                <span class="s-r-remark">{{item.specificationInfo}}</span>
              </div>
              <div class="s-p-n">
                <div class="s-p-p">￥{{item.retailPrice}}</div>
                <div class="s-p-step">
                  <van-stepper :value="item.number" integer="true" input-class="inputClass" minus-class="minusClass" plus-class="plusClass" :min="min" :max="max" step="1" @plus="plusCart(item,1)" @minus="minusCart(item,-1)" />
                </div>
                <div class="s-p-del color6" @click="delShopCart(item)">
                  <van-icon name="delete" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-space"></div>
      </div>
      <div class="vansub">
        <van-submit-bar button-text="提交订单" custom-class="customClass" button-class="buttonClass" @submit="btnSaveOrder">
          <van-tag class="cart-vantag" type="primary">
            <div class="cart-sub">
              <div style="width:60%;">
                <van-checkbox :value="allCheckboc" @change="allChange">全选 ( {{checkNum}} ) </van-checkbox>
              </div>
              <div>合计 : {{getCalculatePrice}}</div>
            </div>
          </van-tag>
          <view slot="tip" v-show="false">
            您的收货地址不支持同城送, <text>修改地址</text>
          </view>
        </van-submit-bar>
      </div>
    </div>
  </div>
</template>

<script>
import { GetGoodsListApi, SaveOrderInfoApi } from '@/utils/http/api.js'
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      nullShow: false,
      value: 1,
      allCheckboc: true,
      checkNum: 0,
      isTemp: false
    }
  },
  computed: {
    ...mapState({
      ssxxCart: state => state.ssxxCart,
      min: state => {
        return state.min
      },
      max: state => {
        return state.max
      }
    }),
    ...mapGetters({
      getCalculatePrice: 'getCalculatePrice',
      getShopCart: 'getShopCart'
    })
  },
  methods: {
    goIndex() {},
    checkChange(item) {
      const that = this
      item.isSelected = !item.isSelected
      this.$store.commit('upCart', item)
      this.allCheckInfo()
    },
    allChange() {
      this.allCheckboc = !this.allCheckboc
      this.$store.commit('checkAll', this.allCheckboc)
      this.allCheckInfo()
    },
    plusCart(item, value) {
      this.calculateNum(item, value)
    },
    minusCart(item, value) {
      this.calculateNum(item, value)
    },
    getSkuInfoByItem(skuInfo) {
      return this.ssxxCart.findIndex(item => {
        return item.id === skuInfo.id && item.goodsId === skuInfo.goodsId
      })
    },
    delShopCart(item) {
      const that = this
      wx.showModal({
        title: '',
        content: '确定删除该商品吗',
        success(res) {
          if (res.confirm) {
            that.$store.commit('delCart', item)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    calculateNum(item, value) {
      item.number = item.number + value
      this.$store.commit('upCart', item)
    },
    allCheckInfo() {
      const that = this
      var cnum = 0
      that.ssxxCart.forEach(item => {
        if (item.isSelected) {
          cnum++
        }
      })
      if (cnum === that.ssxxCart.length) {
        that.allCheckboc = true
      } else {
        that.allCheckboc = false
      }
      that.checkNum = cnum
    },
    btnSaveOrder() {
      const that = this
      const c = res => {
        console.log('---------')
        that.$commom.openWin('/pages/cart/confirm/main')
      }
      let arr = []
      that.ssxxCart.forEach(item => {
        if (item.isSelected) {
          arr.push({
            productId: item.productId,
            goodsId: item.goodsId,
            number: item.number
          })
        }
      })
      if (arr.length <= 0) {
        wx.showToast({
          title: '请勾选要下单的商品！',
          icon: 'none',
          duration: 2000
        })
        return
      }
      const param = {
        cartList: JSON.stringify(arr)
      }
      SaveOrderInfoApi(param).then(c)
    }
  },

  created() {},
  mounted() {
    const that = this
    if (that.ssxxCart.length <= 0) {
      that.nullShow = true
    }
    this.allCheckInfo()
  },
  onHide() {
    this.isTemp = false
    console.log('onhide')
  },
  onShow() {
    console.log('getcurrentpages', getCurrentPages())
    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
  }
}
</script>

<style scoped lang="less">
.nullCart {
  text-align: center;
  width: 100%;
  image {
    width: 80%;
    height: 300px;
  }
  view {
    height: 30px;
    line-height: 30px;
  }
}
.shop-cart {
  width: 100%;
  background: white;
  .shop-row {
    display: flex;
    height: 110px;
    .s-r-checkbox {
      padding-right: 10px;
      line-height: 100px;
    }
    .s-r-image {
      padding-right: 10px;
      image {
        width: 100px;
        height: 100px;
        background: #f5f5f5;
      }
    }
    .s-r-content {
      height: 23px;
      line-height: 24px;
      width: 100%;
      .s-p-n {
        display: flex;
        margin-top: 10rpx;
        .s-p-p {
          width: 30%;
        }
        .s-p-step {
          width: 55%;
        }
        .s-p-del {
          width: 15%;
          font-size: 20px;
          height: 30px;
          line-height: 32px;
          text-align: right;
        }
      }
      .s-r-name {
        min-height: 35px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .s-r-remark {
        width: auto;
        padding: 2px 5px;
        background: #f5f5f5;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 5px 0;
      }
    }
  }
}
</style>
