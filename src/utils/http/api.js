import { get, post } from '@/utils/http/fetch.js'

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