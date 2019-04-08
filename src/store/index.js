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
    userInfo: getUserInfo(),
    token: getToken(),
    min: 1,
    max: 10,
    systemInfo: getSystemInfo(),
    searchValues: getSearchValues()
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
    //获取选中的商品数量
    getValidCartNum: state => {
      var cnum = 0
      state.ssxxCart.forEach(item => {
        if (item.isSelected) {
          cnum++
        }
      })
      console.log(cnum)
      return cnum
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
    clearSearchValues(state) {
      state.searchValues = []
      wx.removeStorageSync('searchValues')
    },
    clearStorage(state) {
      state.searchValues = []
      state.token =""
      state.ssxxCart = []
      state.userInfo={}
      //wx.removeStorageSync('shopCart')
    },
    clearTokenStoage(state) {
      state.token = {}
      wx.removeStorageSync('token')
    },
    saveSearchValues(state, value) {
      if (state.searchValues.length > 9) {
        //删除最后一个
        state.searchValues.splice(0, 1)
      }
      state.searchValues.push(value)
      wx.setStorageSync('searchValues', JSON.stringify(state.searchValues))
    },
    saveToken(state, token) {
      state.token = token
      wx.setStorageSync('token', JSON.stringify(state.token))
    },
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
    delCart(state,skuInfo) {
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

function getToken() {
  var obj = wx.getStorageSync('token')
  if (obj !== "") {
    return JSON.parse(obj)
  }
  else {
    return ""
  }
}
function getUserInfo() {
  var obj =  wx.getStorageSync('userInfo')
   
  if (obj !== "") {
    return JSON.parse(obj)
  }
  else {
    return {}
  }
}

function getSearchValues() {
  var obj = wx.getStorageSync('searchValues')
  if (obj) {
    return JSON.parse(obj)
  }
  else {
    return []
  }
}
function getSystemInfo() {
  var obj = {}
  wx.getSystemInfo({
    success(res) {
      obj = res
      console.log(obj)
    }
  })
  return obj
}
export default store;