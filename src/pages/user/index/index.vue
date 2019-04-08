<template>
  <div class="container">
    <div class="u-header">
      <div class="u-tou" v-if="userInfo.avatarUrl!== undefined">
        <image :src="userInfo.avatarUrl" />
        <div class="u-name">{{userInfo.nickName}}</div>
      </div>
       <div class="u-tou" v-else @click="$common.openWin('/pages/login/main')">
        <image src="../../../static/images/avatar.png" />
        <div class="u-name">点我登陆</div>
      </div>
    </div>
    <div class="d-space"></div>
    <div style="width:100%;">
      <div class="u-order">
        <div class="order-title">
          <div>我的订单</div>
          <div class="right">
            <div
              class="u-name"
              @click="goOrderList('全部')"
            > 全部订单</div>
            <div class="u-icon">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div class="u-flex">
          <div class="item"  @click="goOrderList('待付款')">
            <div class="icon">
              <van-icon name="pending-payment" />
            </div>
            <div class="title">待付款</div>
          </div>
          <div class="item"   @click="goOrderList('待发货')">
            <div class="icon">
              <van-icon name="logistics" />
            </div>
            <div class="title">待发货</div>
          </div>
          <div class="item"   @click="goOrderList('待收货')">
            <div class="icon">
              <van-icon name="tosend" />
            </div>
            <div class="title">待收货</div>
          </div>
          <div class="item"   @click="goOrderList('待评价')">
            <div class="icon">
              <van-icon name="completed" />
            </div>
            <div class="title">待评价</div>
          </div>
        </div>
      </div>
      <div class="d-space"></div>
      <div class="u-c-list">
        <van-cell-group>
          <!-- <van-cell title="我的积分" icon="shop" is-link></van-cell> -->
          <van-cell
            title="收货地址"
            icon="shop"
            @click="shippinpAddress"
            is-link
          ></van-cell>
          <van-cell
            title="足迹"
            @click="$common.openWin('/pages/user/footprint/main')"
            icon="shop"
            is-link
          ></van-cell>
          <!-- <van-cell
            title="意见反馈"
            @click="$common.openWin('/pages/user/feedback/main')"
            icon="shop"
            is-link
          ></van-cell> -->
          <!-- <van-cell title="帮助中心" icon="shop" is-link></van-cell> -->
          <van-cell
            title="设置"
            icon="shop"
            is-link
            @click="clearStore"
          ></van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { GetOderListApi } from "@/utils/http/api.js";
export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 20,
      orderStatus: 1
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      token: state => state.token
    }),
    ...mapGetters({
      getUsers: "getUsers"
    })
  },
  methods: {
    clearStore() {
      this.$store.commit("clearStorage");
      wx.clearStorageSync();
      wx.showToast({
        title: "清空缓存成功！",
        icon: "success",
        duration: 2000
      });
    },
    shippinpAddress() {
      const that = this;
       wx.chooseAddress({
              success: function(res) {
                that.userName = res.userName;
                that.address =
                  res.provinceName +
                  res.cityName +
                  res.countyName +
                  res.detailInfo;
                that.telNumber = res.telNumber;
              },fail(res){
                console.log(res)
              }
            });
        wx.getSetting({
        success(res) {
          console.log(JSON.stringify(res))
          if (!res.authSetting["scope.address"]) {
            wx.openSetting({

            });
          } else {
            //打开选择地址
            wx.chooseAddress({
              success: function(res) {
                that.userName = res.userName;
                that.address =
                  res.provinceName +
                  res.cityName +
                  res.countyName +
                  res.detailInfo;
                that.telNumber = res.telNumber;
              }
            });
          }
        },
        fail(res) {
          console.log("调用失败");
        }
      });
      
    },
    goOrderList(type) {
      let isTrue=  this.$common.GetTokens()
      if(isTrue){
        this.$common.openWin("/pages/user/order/main?type="+type)
      }
      else {
        this.$common.openWin("/pages/login/main");
      }
    }
  },
  mounted() {
    console.log('userInfo',this.userInfo)
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#ffc1c1",
      animation: {
        duration: 400,
        timingFunc: "easeIn"
      }
    });
  }
};
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
      color: white;
      text-indent: 2px;
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
        font-size: 22px;
        image {
          width: 32px;
          height: 32px;
        }
      }
    }
  }
}
.u-c-list {
  font-size: 12px;
}
</style>
