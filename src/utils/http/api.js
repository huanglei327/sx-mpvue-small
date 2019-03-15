import { get, post } from '@/utils/http/fetch.js'

//小程序登陆
export function getWxLoginApi(param){
  //const apiName='/api/auth/loginByWeixin'
  const apiName='api/auth/loginByWeixin'
  return post(apiName,param)
}


export function GetUserInfoApi(param) {
    const apiName = '/m_user/query_userInfo'
    return post(apiName, param)
}

export function GetA(param) {
    const apiName = 'm_resolution/queryCount'
    return post(apiName, param)
}

export function GetClassIfyInfoApi(param) {
    const apiName = '/api/category/list'
    return post(apiName, param)
}

export function GetGoodsListApi(param) {
    const apiName = 'api/goods/list'
    return post(apiName, param)
}

export function GetGoodsDetailsApi(param) {
    const apiName = 'api/goods/detail'
    return post(apiName, param)
}

export function SaveOrderInfoApi(param){
  const apiName='/api/order/checkout'
  return post(apiName,param)
}

//下订单
export function SaveOrdersApi(param){
  const apiName ='/api/order/submit'
  return post(apiName,param)
}

//查询订单
export function GetOderListApi(param){
  const apiName ='/api/order/list'
  return post(apiName,param)
}

//查询订单详情
export function GetOrderDeatilsApi(param){
  const apiName='/api/order/detail'
  return post(apiName,param)
}

//足迹
export function GetFootprintApi(param){
  const apiName='api/footprint/footprintList'
  return post(apiName,param)
}

//首页轮播图
export function GetSwipetInfoApi(param){
  const apiName='api/index/ad'
  return post(apiName,param)
}

//推荐
export function GetRecommendApi(param){
  const apiName='api/index/showForU'
  return post(apiName,param)
}

//热销商品
export function GetHotGoodsApi(param){
  const apiName='api/index/hotgoods'
  return post(apiName,param)
}


//获取签名支付
export function GetGenerateOrderApi(param){
  const apiName='/api/pay/prepay'
  return post(apiName,param)
}

//支付结果
export function GetNotify(param){
  const apiName='/api/pay/notify'
  return post(apiName,param)
}

export function GoRefundApi(param){
  const apiName='/api/pay/refund'
  return post(apiName,param)
}