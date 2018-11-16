import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import state from './mutation-types';
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    ssxxCart: getStore(),
    userInfo: {}
  },
  getters: {
    getCartNum: state => {
      return state.ssxxCart.length
    },
    getShopCart: state => {
      return state.ssxxCart
    },
    getUsers: state => {
      return state.userInfo
    },
    //合计
    getCalculatePrice: state => {
      var sumPrice = 0.0
      state.ssxxCart.forEach(item => {
        if (item.isSelected) {
          sumPrice += item.number * item.retailPrice
        }
      })
      return sumPrice
    }
  },
  actions: {

  },
  mutations: {
    saveUserInfo(state, userInfo) {
      state.userInfo = userInfo
      wx.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    },
    checkAll(state, isTrue) {
      state.ssxxCart.forEach(item => {
        item.isSelected = isTrue
      })
      wx.setStorageSync('shopCart', JSON.stringify(state.ssxxCart))
    },
    upCart(state, skuInfo) {
      state.ssxxCart.forEach((item, index) => {
        if (item.productId === skuInfo.productId && item.goodsId === skuInfo.goodsId) {
          state.ssxxCart.splice(index, 1, skuInfo)
        }
      })
      wx.setStorageSync('shopCart', JSON.stringify(state.ssxxCart))
    },
    delCart(state, skuInfo) {
      state.ssxxCart.forEach((item, index) => {
        if (item.productId === skuInfo.productId && item.goodsId === skuInfo.goodsId) {
          state.ssxxCart.splice(index, 1)
        }
      })
      wx.setStorageSync('shopCart', JSON.stringify(state.ssxxCart))
    },
    addCart(state, skuInfo) {
      state.ssxxCart.push(skuInfo)
      wx.setStorageSync('shopCart', JSON.stringify(state.ssxxCart))
      wx.showToast({
        title: '新增购物车成功',
        icon: 'warn',
        duration: 2000
      })
    }
  }
})

function getStore() {
  var obj = wx.getStorageSync('shopCart')

  if (obj) {
    return JSON.parse(obj)
  }
  else {
    return []
  }
}
export default store;