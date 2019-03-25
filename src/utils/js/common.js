

import { getWxLoginApi } from "@/utils/http/api.js";
import store from '@/store/index.js'

export function openWin(url) {
  wx.navigateTo({ url: url })
}
// 关闭当前页面，跳转到应用内的某个页面
export function redirectTo(url) {
  wx.redirectTo({ url: url })
}
// 返回上一级窗口
export function backBeaforWin() {
  wx.navigateBack({ delta: 1 })
}

export function reLaunch(url) {
  wx.reLaunch({
    url: url
  })
}

export function openTabbar(url) {
  wx.switchTab({
    url: url
  })
}

export function MathRand(digit) {
  var Num = "";
  for (var i = 0; i < digit; i++) {
    Num += Math.floor(Math.random() * 10);
  }
  return Num;
}

export function getUrlPages() {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  var options = currentPage.options    //如果要获取url中所带的参数可以查看options

  return options
}

export function imageLoad(e) {
  var $width = e.detail.width,    //获取图片真实宽度
    $height = e.detail.height,
    ratio = $width / $height;    //图片的真实宽高比例
  var viewWidth = 718,           //设置图片显示宽度，左右留有16rpx边距
    viewHeight = 718 / ratio;    //计算的高度值
  var image = this.data.images;
  //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
  image[e.target.dataset.index] = {
    width: viewWidth,
    height: viewHeight
  }
  this.setData({
    images: image
  })
}

//图片预览
export function showPreviewImage(currentImg, imgList, domId) {
  var values = []
  if (!imgList) {
    values.push(currentImg)
  }
  else {
    imgList.forEach(item => {
      values.push(item[domId])
    });
  }
  wx.previewImage({
    current: currentImg, // 当前显示图片的http链接
    urls: values // 需要预览的图片http链接列表
  })
}

export function showToast(title, success) {
  if (!success)
    success = ''
  wx.showToast({
    title: title,
    icon: success,
    duration: 2000
  })
}

export function GetTokens() {
  //没有登陆
  if (Object.keys(store.state.token).length <= 0) {
    return false
  }
  else {
    return true
  }
}

export function checkLogin() {
  wx.checkSession({
    success() {
      //未过期
    },
    fail() {
      //如果已经过期把缓存清掉
      store.commit('clearTokenStoage')
    }
  })
}

export function getToken() {
  if (Object.keys(store.state.token).length <= 0) {
    return ""
  } else {
    return store.state.token
  }
}

export function getWxLogin(param) {
  const c = res => {
    console.log(res)
    //插入token
    store.commit('saveToken', res.token)
    //插入用户信息
    store.commit('saveUserInfo', res.userInfo)
    // var pages = getCurrentPages() //获取加载的页面
    // var currentPage = pages[pages.length - 1] //获取当前页面的对象
    // console.log('currentPage',currentPage)
    // var url = currentPage.route //当前页面url
    // var options = currentPage.options //如果要获取url中所带的参数可以查看options
    // console.log(options)

    //backBeaforWin()
  }
  getWxLoginApi(param).then(c)
}

export function userLogin() {
  wx.login({
    success: function (res) {
      if (res.code) {
        var code = res.code
        wx.getUserInfo({
          success: function (res) {
            const param = {
              jsCode: code,
              userInfo: res.userInfo,
              signature: res.signature,
              errMsg: res.errMsg,
              encryptedData: res.encryptedData,
              rawData: res.rawData,
              iv: res.iv
            }
            getWxLogin(param)
          }, fail: function (res) {
            wx.showModal({
              title: '提示',
              content: '授权登录失败，部分功能将不能使用，是否重新登录？',
              showCancel: true,
              cancelText: "否",
              confirmText: "是",
              success: function (res) {
                if (res.confirm) {
                  if (wx.openSetting) {//当前微信的版本 ，是否支持openSetting
                    wx.openSetting({
                      success: (res) => {
                        if (res.authSetting["scope.userInfo"]) {//如果用户重新同意了授权登录
                          wx.getUserInfo({//跟上面的wx.getUserInfo  sucess处理逻辑一样
                            success: function (res) {
                              var rawData = encodeURIComponent(res.rawData);
                              var signature = res.signature || '';
                              var encryptedData = res.encryptedData;
                              var iv = res.iv;
                              that.getLoginApi(code, rawData, signature, encryptedData, iv, function (res) {
                                wx.setStorageSync("user", res)
                                var app = getApp()
                                app.globalData.user = res
                                sucess(res)
                              })
                              getWxLogin(code)
                            }
                          })
                        } else {//用户还是拒绝
                          //fail()
                        }
                      },
                      fail: function () {//调用失败，授权登录不成功
                        fail()
                      }
                    })
                  } else {
                    fail()
                  }
                }
              }
            })
          }
        })
      }
    },
    fail: function (res) {
    }
  })
}


export function GoPay(param) {
  wx.requestPayment({
    timeStamp: param.timeStamp,
    nonceStr: param.nonceStr,
    package: param.package,
    signType: 'MD5',
    paySign: param.paySign,
    success(res) {
      console.log(res)
      redirectTo('/pages/cart/payment/main?stateType=1&orderId=' + param.orderId)
    },
    fail(res) {
      console.log(res)
      console.log('----------')
      if(param.isLink !== false)
        redirectTo('/pages/cart/payment/main?stateType=2&orderId=' + param.orderId)
    }
  })
}