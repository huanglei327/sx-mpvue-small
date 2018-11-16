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
export function openTabbar(url){
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

export function getUrlPages(){
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length-1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  var options = currentPage.options    //如果要获取url中所带的参数可以查看options
  
 return options
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