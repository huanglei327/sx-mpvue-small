
//购物车添加数据
export function addCart(skuInfo) {
  try {
    var obj = wx.getStorageSync('shopCart')
    if (obj) {
      obj = JSON.parse(obj)
      var isTrue = false
      obj.forEach((item, index) => {
        //说明已经有同样的商品了
        if (item.id === skuInfo.id && item.goodsId === skuInfo.goodsId) {
          item.num = skuInfo.num + item.num
          isTrue = true
        }
      })
      //如果没有相同的就新增一条
      if (!isTrue) {
        obj.push(skuInfo)
      }
    }
    else {
      obj = []
      obj.push(skuInfo)
    }
    wx.setStorageSync('shopCart', JSON.stringify(obj))
    showToast('添加购物车成功')
  } catch (e) {
    console.log(e)
    showToast('系统出错')
  }
}

//删除购物车
export function removeCart(removeId) {
  try {
    var obj = JSON.parse(wx.getStorageSync('shopCart'))
    obj.forEach((item, index) => {
      if (item.cartId === removeId) {
        obj.splice(index, 1)
      }
    })
    wx.setStorageSync('shopCart', JSON.stringify(obj))
  } catch (e) {
    showToast('系统出错')
  }
}

function showToast(title, success) {
  if (!success)
    success = ''
  wx.showToast({
    title: title,
    icon: success,
    duration: 2000
  })
}