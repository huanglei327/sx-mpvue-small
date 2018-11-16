<template>
  <div class="container">
    <div class="d-swiper">
      <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000" previous-margin="10" next-margin="5">
        <block v-for="(item, index) in list.focus" :index="index" :key="index">
          <swiper-item>
            <image :src="item.img" class="slide-image" mode="aspectFill" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="d-space"></div>
    <div class="d-m">
      <!-- <div class="title">
        <van-row gutter="20">
          <van-col span="18">人气推荐</van-col>
          <van-col span="6" class="right" @click="goCommodity">
            更多
            <van-icon name="arrow" />
          </van-col>
        </van-row>
      </div> -->
      <div class="main-title">
          <div>人气推荐</div>
          <div class="right" @click="goCommodity">
            <div class="u-name"> 更多</div>
            <div class="u-icon">
              <van-icon name="arrow" />
            </div>
          </div>
      </div>
      <div class="content">
        <div class="c-n-1">
          <div class="left">
            <image class="imgs" src="https://yanxuan.nosdn.127.net/52b9ee8f296cfd5f8157ac97c0874430.png" />
          </div>
          <div class="right">
            <div class="p-t-20">
              <div class="n-1">
                <div>严选明星</div>
                <div>满赠</div>
              </div>
              <div class="n-2">升级款白鹅绒秋冬加厚......</div>
              <div class="n-3">热销5万+条，一条被子过冬</div>
              <div class="n-4">￥1149</div>
            </div>
          </div>
          <!-- <van-row>
            <van-col span="10">
              <image class="imgs" src="https://yanxuan.nosdn.127.net/52b9ee8f296cfd5f8157ac97c0874430.png" />
            </van-col>
            <van-col span="14">
              <div class="p-t-20">
                <div class="n-1">
                  <div>严选明星</div>
                  <div>满赠</div>
                </div>
                <div class="n-2">升级款白鹅绒秋冬加厚......</div>
                <div class="n-3">热销5万+条，一条被子过冬</div>
                <div class="n-4">￥1149</div>
              </div>
            </van-col>
          </van-row> -->
        </div>
        <div class="c-n-1">
          <div class="brand" v-for="(item,index) in listPopularItems.itemList" :key="index">
            <div class="item" v-if="index<3">
              <image :src="item.listPicUrl" @click="previewImage(item.listPicUrl)" />
              <div>
                <div class="n-1">
                  <div>严选明星</div>
                  <div>满赠</div>
                </div>
                <div class="n-2">{{item.name}}</div>
                <div class="n-4">￥{{item.primaryRetailPriceCopy}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="userinfo" @click="$common.openWin('/pages/logs/main')">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div> -->

    <!-- <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面22222</a>

    <van-button type="default" @click.stop="showpoprp" close-on-click-overlay="true">默认按钮</van-button>
    <div style="width:100%">
      <van-row>
        <van-col span="8">span: 8</van-col>
        <van-col span="8">span: 8</van-col>
        <van-col span="8">
          <van-icon name="success" />
        </van-col>
      </van-row>
    </div>
    <a href="/pages/shop/shopdetails/main" class="counter">去往Vuex示例页面22222</a>
    <van-popup :show="show" @close="onClose">
      <div style="width:100px;height:200px;">asd</div>
    </van-popup>

    <view class="group">
      <block v-for="(item,index) in iconType" :key="index">
        <icon :type="item" size="40" />
      </block>
    </view> -->

  </div>
</template>

<script>
import card from '@/components/card'
import { GetUserInfoApi, GetA } from '@/utils/http/api.js'
import listA from './list.json'
export default {
  config: {
    // 注意，页面级可配置属性相当于只是`src/main.js`中配置里的`window`部分
    navigationBarTitleText: '文章列表页面'
  },
  data() {
    return {
      motto: 'Hello World',
      iconType: [
        'success',
        'success_no_circle',
        'info',
        'warn',
        'waiting',
        'cancel',
        'download',
        'search',
        'clear'
      ],
      userInfo: {},
      list: [],
      show: false,
      listPopularItems: [],
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap() {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    showpoprp() {
      wx.showToast({
        title: '新增购物车成功',
        duration: 2000
      })
      // console.log(this.$store.state.cartNum)
    },
    onClose() {
      this.show = !this.show
    },
    goCommodity() {
      const url = '../commodity/index/main'
      wx.navigateTo({ url })
    },
    previewImage(imageValue) {
      const that = this
      //that.$showPreviewImage(imageValue)
      that.$common.showPreviewImage(imageValue)
      return
      let values = []
      values.push(imageValue)
      wx.previewImage({
        current: imageValue, // 当前显示图片的http链接
        urls: values // 需要预览的图片http链接列表
      })
    },
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.userInfo = res.userInfo
              this.$store.commit('saveUserInfo',res.userInfo)
            }
          })
        }
      })
    },
    clickHandle(msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    getListInfo() {
      const that = this
      that.list = listA.data
      that.listPopularItems = listA.data.popularItems
    }
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  },
  mounted() {
    const that = this
    that.getListInfo()
    console.log(that.$store.state.cartNum)
  }
}
</script>

<style scoped lang="less">
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
.d-swiper {
  width: 100%;
  .swiper {
    swiper-item {
      image {
        width: 98%;
        border-radius: 5px;
        display: block;
      }
    }
  }
}
.d-m {
  width: 100%;
  padding: 0 15px;
  .title {
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    .right {
      font-size: 12px;
      line-height: 40px;
      text-align: right;
      color: #1d3f14;
    }
  }
  .content {
    padding: 0 15px;
    .c-n-1 {
      width: 100%;
      display: flex;
      .left {
        width: 40%;
        background: repeating-linear-gradient(
          45deg,
          #fff5e7,
          #fff5e7 15px,
          #fbefe1 0,
          #fbefe1 30px
        );
      }
      .right {
        width: 60%;
        background: #fcf0e2;
        padding-left: 15px;
      }
      .n-1 {
        font-size: 12px;
        height: 20px;
        view {
          padding: 2px 3px;
          background: #ea7b84;
          color: white;
          float: left;
          margin-left: 3px;
        }
      }
      .n-2 {
        height: 20px;
        clear: both;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .n-3 {
        height: 20px;
        font-size: 12px;
        color: #aaa;
      }
      .n-4 {
        color: #a42d39;
      }
      .brand {
        width: 33%;
        float: left;
        text-align: center;
        padding: 5px 0;
        .item {
          text-align: center;
          display: inline-block;
          vertical-align: top;
          font-size: 12px;
          width: 100%;
          image {
            width: 100%;
            height: 100px;
          }
        }
      }
    }
  }
}
.imgs {
  height: 130px;
  width: 100%;
}
.p-t-20 {
  padding-top: 27px;
}
</style>
