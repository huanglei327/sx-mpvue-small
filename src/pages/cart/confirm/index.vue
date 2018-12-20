<template>
  <div class="container">
    <div class="c-address">
      <van-cell-group>
        <van-cell icon="location" is-link label="收货地址：广东省深圳市南山区百里大厦" @click="upAddress">
          <div slot="title">
            <div v-if="userName">
              <div>收货人 : {{userName}} {{telNumber}}</div>
              <div class="c-add-ils color6">收货地址：{{address}}</div>
            </div>
            <div v-else>请选择收货地址</div>
          </div>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="c-cut-off"></div>
    <div class="d-space"></div>
    <div v-show="ssxxCart.length>0" style="width:100%;">
      <div class="shop-cart" v-for="(item,index) in getShopCart" :key="index">
        <div style="padding:10px 15px 0 15px;">
          <div class="shop-row">
            <div class="s-r-checkbox">
              <van-checkbox checked-color="#fa6d87" :value="item.isSelected" @change="checkChange(item)" ></van-checkbox>
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
              </div>
            </div>
          </div>
        </div>
        <div class="d-space"></div>
      </div>
    </div>
    <div class="c-deta-list">
      <van-cell-group>
        <van-cell is-link :value="'￥'+getCalculatePrice">
          <view slot="title">
            <span class="van-cell-text">商品合计</span>
          </view>
        </van-cell>
        <van-cell title="运费" is-link value="￥0.00" />
      </van-cell-group>
    </div>
    <div class="vansub">
      <van-submit-bar custom-class="customClass" button-class="buttonClass" button-text="提交订单" @submit="onClickButton">
        <van-tag class="cart-vantag" type="primary">
          <div class="cart-sub">
            <div style="width:60%;">
              总价: ￥<span class="s-price">{{getCalculatePrice}}</span>
            </div>
            <div class="color6">共 {{getValidCartNum}} 件商品</div>
          </div>
        </van-tag>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { SaveOrdersApi } from '@/utils/http/api.js'
export default {
  data() {
    return {
      msg: '213123',
      address: '',
      userName: '',
      telNumber: '',
      adderssList: {}
    }
  },
  computed: {
    ...mapState({
      ssxxCart: state => {
        return state.ssxxCart.filter(function(item) {
          return item.isSelected
        })
      },
      min: state => {
        return state.min
      },
      max: state => {
        return state.max
      }
    }),
    ...mapGetters({
      getCalculatePrice: 'getCalculatePrice',
      getShopCart: 'getShopCart',
      getValidCartNum: 'getValidCartNum'
    })
  },
  methods: {
    onClickButton() {
      const that = this
      if (that.userName === '') {
        wx.showToast({
          title: '请填写收货地址',
          icon: 'none',
          duration: 2000
        })
        return
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
      const c = res => {
          wx.showToast({
            title: '订单保存成功',
            icon: 'none',
            duration: 2000
          })
      }
      that.adderssList.userName = '黄磊'
      that.adderssList.isDefault = 0
      delete that.adderssList.errMsg
      const param = {
        cartList:arr,
        address: that.adderssList
      }
      SaveOrdersApi(param).then(c)
    },
    plusCart(item, value) {
      this.calculateNum(item, value)
    },
    minusCart(item, value) {
      this.calculateNum(item, value)
    },
    calculateNum(item, value) {
      item.number = item.number + value
      this.$store.commit('upCart', item)
    },
    upAddress() {
      const that = this
      wx.chooseAddress({
        success(res) {
          that.userName = res.userName
          that.address =
            res.provinceName + res.cityName + res.countyName + res.detailInfo
          that.telNumber = res.telNumber
          that.adderssList = res
        }
      })
    }
  },
  mounted() {}
}
</script>

<style lang="less">
.c-address {
  
  width: 100%;
  .c-add-ils {
    line-height: 20px;
    padding-top: 5px;
  }
}
.c-cut-off{
    width: 100%;
    height: 2px;
    position: absolute;
    background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
    /* background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%); */
    background-size: 80px;
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
          color: #666;
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
.c-deta-list {
  width: 100%;
}
</style>
