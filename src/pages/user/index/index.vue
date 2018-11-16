<template>
  <div class="container">
    <div class="u-header">
      <div class="u-tou">
        <image :src="userInfo.avatarUrl" />
        <div class="u-name">{{userInfo.nickName}}</div>
      </div>
    </div>
    <div class="d-space"></div>
    <div style="width:100%;">
      <div class="u-order">
        <div class="main-title">
          <div>我的订单</div>
          <div class="right">
            <div class="u-name"> 全部订单</div>
            <div class="u-icon">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div class="u-flex">
          <div class="item">
            <div class="icon">
              <van-icon name="logistics" />
            </div>
            <div class="title">待付款</div>
          </div>
          <div class="item">
            <div class="icon">
              <van-icon name="logistics" />
            </div>
            <div class="title">待发货</div>
          </div>
          <div class="item">
            <div class="icon">
              <van-icon name="logistics" />
            </div>
            <div class="title">待收货</div>
          </div>
          <div class="item">
            <div class="icon">
              <van-icon name="logistics" />
            </div>
            <div class="title">待评价</div>
          </div>
        </div>
      </div>
      <div class="d-space"></div>
      <div class="u-c-list">
        <van-cell-group>
          <van-cell title="我的积分" icon="shop" is-link></van-cell>
          <van-cell title="收货地址" icon="shop" is-link></van-cell>
          <van-cell title="足迹" icon="shop" is-link></van-cell>
          <van-cell title="意见反馈" icon="shop" is-link></van-cell>
          <van-cell title="帮助中心" icon="shop" is-link></van-cell>
          <van-cell title="设置" icon="shop" is-link @click="clearStoreage"></van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    }),
    ...mapGetters({
      getUsers: 'getUsers'
    })
  },
  methods: {
    clearStoreage() {
      wx.clearStorageSync()
    }
  },
  created() {},
  mounted() {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ffc1c1',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  }
}
</script>

<style lang="less">
.u-header {
  height: 180px;
  width: 100%;
  background: #ffc1c1;
  .u-tou {
    height: 130px;
    width: 100px;
    margin: 30px auto 0 auto;
    text-align: center;
    .u-name {
      height: 30px;
      line-height: 35px;
      padding-top: 5px;
    }
    image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
}

.u-order {
  padding: 10px;
  background: white;
  .u-flex {
    display: flex;
    font-size: 12px;
    border-top: 1px solid #f5f5f5;

    .item {
      width: 25%;
      text-align: center;
      padding-top: 5px;
      .icon {
        font-size: 28px;
      }
    }
  }
}
.u-c-list {
  font-size: 12px;
}
</style>
