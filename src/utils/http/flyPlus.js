import Fly from 'flyio/dist/npm/wx'
import { showToast, openWin, getToken } from '../js/common.js'
const fly = new Fly()
//const host = 'http://172.17.234.231'
 const host = 'https://duoduoday.top'
// 添加请求拦截器
fly.interceptors.request.use((request) => {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  // request.headers["X-Tag"] = "flyio";
  // request.headers['content-type'] = 'application/json';
  // request.headers = {
  //     'content-type': 'application/x-www-form-urlencoded'
  // }

  // let authParams = {
  //   token:getToken()
  // }

  request.body.ssshopToken = getToken()

  request.body && Object.keys(request.body).forEach((val) => {
    if (request.body[val] === '') {
      delete request.body[val]
    };
  })
  request.params = {
    ...request.body,
    //...authParams
  }
  return Promise.resolve(request)
})

// 添加响应拦截器
fly.interceptors.response.use(
  (response) => {
    wx.hideLoading()
    let code = response.data.errorCode + ''
    if (code === '0') {
      return response.data
    }
    else {
      if (code === '1') {
        showToast(response.data.errorMessage, 'none')
      }
      else if (code === '9') {
        openWin('/pages/login/main')
        console.log(response)
        console.log('-------------')
        return response
      }
    }
  },
  (err) => {
    // 请求出错，根据返回状态码判断出错原因
    wx.hideLoading()
    if (err) {
      openWin('/pages/utils/error/main')
      return '请求失败'
    };
  }
)

fly.config.baseURL = host

export default fly