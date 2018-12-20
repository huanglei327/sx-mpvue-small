<template>
  <div class="container">
    <div class="d-swiper">
      <swiper class="swiper" indicator-dots="true">
        <block v-for="(item, index) in list.gallery" :index="index" :key="index">
          <swiper-item @click="$common.showPreviewImage(item.imgUrl,list.gallery,'imgUrl')">
            <image :src="item.imgUrl" class="slide-image" mode="aspectFill" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="dt-main">
      <div class="dt-name">
        <div class="left">
          <div class="title">{{goodsInfo.name}}</div>
          <div class="remark">{{goodsInfo.goodsBrief}}</div>
        </div>
        <div>分享</div>
      </div>
      <div class="dt-price">
        <span class="dx-4 price-color">￥</span>
        <span class="dt-p price-color">{{goodsInfo.retailPrice}}</span>&nbsp;&nbsp;&nbsp;
        <span class="dt-x">￥{{goodsInfo.marketPrice}}</span>
      </div>
    </div>
    <div class="d-space"></div>
    <div class="title-name">
      <van-cell-group>
        <van-cell is-link @click="showProp">
          <view slot="title">
            <span class="van-cell-text">{{specificationText}}</span>
          </view>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="d-space"></div>
     <div class="d-details">
      <!-- <div>
        <wxParse :content="goodsInfo.goodsDesc" @preview="preview" @navigate="navigate" />
      </div> -->
    </div> 
    <div style="z-index:101;">
      <van-goods-action>
        <van-goods-action-icon icon="chat" text="客服" />
        <van-goods-action-icon icon="cart" text="购物车" @click="$common.reLaunch('/pages/cart/index/main')" :info="ssxxCart>0?ssxxCart:''" />
        <van-goods-action-icon icon="shop" text="店铺" />
        <van-goods-action-button text="加入购物车" type="warning" size="small" @click="SaveShopCart" />
        <van-goods-action-button text="立即购买" size="mini" />
      </van-goods-action>
    </div>
    <van-popup class="detailsPopup" :show="show" position="bottom" close-on-click-overlay="true" @close="closeProp">
      <div class="prop-main">
        <div class="div-a">
          <div class="div-i">
            <image :src="skuInfo.listPicUrl" @click="$common.showPreviewImage(skuInfo.listPicUrl)" />
          </div>
          <div class="div-t">
            <div class="a">{{skuInfo.name}}</div>
            <div class="b">{{skuInfo.goodsBrief}}</div>
            <div class="c price-color">￥{{skuInfo.retailPrice}}</div>
          </div>
          <div class="div-f">分享</div>
        </div>
        <div v-for="(item,index) in list.specificationList" :key="index">
          <div class="div-b">{{item.name}}</div>
          <div class="div-type">
            <div v-for="(d,dindex) in item.valueList" :key="dindex" @click="selectClick(d,index)" :class="d.specificationName === true?'isSelected' : 'div-x'">{{d.value}}</div>
          </div>
        </div>
        <div>
          <div class="div-b">数量</div>
          <div class="div-type">
            <van-stepper :value="shopNumber" integer="true" min="1" max="10" step="1" @plus="numPlus" @minus="numMinus" />
          </div>
        </div>
        <div style="height:50px;width:100%;clear: both;">
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { GetGoodsDetailsApi } from '@/utils/http/api.js'
import wxParse from 'mpvue-wxparse'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      obj: {},
      list: [],
      cartNum: 0,
      show: false,
      goodsInfo: {},
      specificationList: [],
      specificationValue: '',
      specificationText: '请选择',
      shopNumber: 1,
      skuInfo: {
        name: '',
        goodsBrief: '',
        retailPrice: '',
        listPicUrl: '',
        productId: 0,
        goodsId: 0,
        number: 1,
        specificationInfo: ''
      },
      productList: []
    }
  },
  components: {
    wxParse
  },
  computed: {
    ...mapState({
      ssxxCart: state => {
        if (state.ssxxCart) {
          return state.ssxxCart.length
        } else {
          return 0
        }
      },
      tempCart: state => {
        return state.ssxxCart
      }
    })
  },
  methods: {
    getGoodsDetails() {
      const that = this
      const c = res => {
        that.list = res
        that.goodsInfo = res.goodsInfo
        that.specificationList = res.specificationList
        that.productList = res.productList
        that.skuInfo.name = res.goodsInfo.name
        that.skuInfo.listPicUrl = res.goodsInfo.listPicUrl
        that.skuInfo.goodsBrief = res.goodsInfo.goodsBrief
        that.skuInfo.retailPrice = res.goodsInfo.retailPrice
        that.dataFiltration()
      }
      const param = {
        goodsId: '1181000'
      }
      GetGoodsDetailsApi(param).then(c)
    },
    numMinus(num) {
      this.shopNumber--
    },
    numPlus() {
      this.shopNumber++
    },
    showCartNum() {
      const that = this
      try {
        var obj = wx.getStorageSync('shopCart')
        if (obj) {
          that.cartNum = JSON.parse(obj).length
        }
      } catch (e) {
        that.$common.showToast('系统出错')
      }
    },
    SaveShopCart() {
      const that = this
      if (!that.show) {
        that.show = !that.show
      } else {
        if (this.checkDetails()) {
          var isTrue = false
          that.tempCart.forEach((item, index) => {
            if (
              item.goodsId === that.skuInfo.goodsId &&
              item.productId === that.skuInfo.productId
            ) {
              that.skuInfo.number = item.number + that.shopNumber
              isTrue = true
              that.shopNumber = 1
            }
          })

          if (isTrue) {
            this.$store.commit('upCart', that.skuInfo)
          } else {
            
            that.skuInfo.number = that.shopNumber
            console.log('shopnum',  that.skuInfo)
            this.$store.commit('addCart', that.skuInfo)
          }
        }
      }
    },
    checkDetails() {
      const that = this
      let zTrue = true
      that.list.specificationList.forEach((item, index) => {
        let isTrue = false
        item.valueList.forEach((ditem, dindex) => {
          if (ditem.specificationName === true) {
            isTrue = true
          }
        })
        if (!isTrue) {
          wx.showToast({
            title: '请选择' + item.name,
            icon: 'none',
            duration: 2000
          })
          zTrue = false
        }
      })
      return zTrue
    },
    showProp() {
      this.show = !this.show
    },
    closeProp() {
      this.show = !this.show
    },
    //过滤加个字段
    dataFiltration() {
      const that = this
      let value = '请选择 ：'
      that.specificationList.forEach(item => {
        value += item.name + '   '
      })
      that.specificationText = value
    },
    preview(src, e) {
      // do something
    },
    navigate(href, e) {
      // do something
    },
    selectClick(d, index) {
      const that = this
      var value = []
      var text = []
      that.specificationList.forEach((item, inum) => {
        item.valueList.forEach(ix => {
          if (index === inum) {
            if (ix.id === d.id) {
              ix.specificationName = true
            } else {
              ix.specificationName = false
            }
          }
          if (ix.specificationName === true) {
            value[inum] = ix.id
            text[inum] = ix.value
          }
        })
      })
      that.specificationValue = value.join('_')
      that.productList.forEach(item => {
        if (item.goodsSpecificationIds === that.specificationValue) {
          that.skuInfo = {
            name: item.goodsName,
            retailPrice: item.retailPrice,
            listPicUrl: item.listPicUrl,
            productId: item.id,
            goodsId: item.goodsId,
            number: 1,
            isSelected: true,
            specificationInfo: text.join(';')
          }
        }
      })
    }
  },
  mounted() {
    this.obj = this.$common.getUrlPages()
    this.getGoodsDetails()
    this.showCartNum()
  }
}
</script>

<style lang="less">
@import '../../../common/css/index.less';
.wxParse {
  view {
    margin-top: -3px;
  }
}
.d-swiper {
  width: 100%;
  .swiper {
    height: 300px;
    swiper-item {
      image {
        width: 100%;
        display: block;
        height: 300px;
      }
    }
  }
}
.title-name {
  view {
    font-size: 12px;
  }
}
.dt-main {
  width: 100%;
  background: white;
  .dt-name {
    display: flex;
    padding: 0 30rpx;
    margin: 20rpx 0 0 0;
    .left {
      width: 80%;
      div {
        height: 25px;
        line-height: 25px;
      }
      .title {
        font-weight: 600;
      }
      .remark {
        color: #aaa;
      }
    }
  }
  .dt-price {
    display: flex;
    padding: 0 30rpx;
    height: 30px;
    line-height: 30px;
    .dx-4 {
    }
    .dt-p {
      font-size: 20px;
      font-weight: 600;
    }
    .dt-x {
      text-decoration: line-through;
    }
  }
}
.prop-main {
  max-height: 60%;
  min-height: 300px;
  padding: 10px;
  .div-a {
    display: flex;
    margin-bottom: 15px;
    .div-i {
      width: 30%;
      image {
        width: 100%;
        height: 100px;
      }
    }
    .div-t {
      width: 60%;
      padding: 5px 10px;
      .a {
        font: 13px;
        line-height: 20px;
        min-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .b {
        color: #aaa;
        line-height: 18px;
        min-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .c {
        font-size: 18px;
      }
    }
    .div-f {
      width: 10%;
    }
  }
  .div-b {
    padding: 0 0 10px 10px;
    clear: both;
  }
  .div-type {
    .div-x {
      float: left;
      padding: 10px 15px;
      background: #f5f5f5;
      margin: 0 10px 10px 0;
    }
  }
}
.isSelected {
  float: left;
  padding: 10px 15px;
  background: @price-color;
  margin: 0 10px 10px 0;
  color: white;
}
.detailsPopup {
  .van-popup--bottom {
    margin-bottom: 45px;
  }
}
</style>

