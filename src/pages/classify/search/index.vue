<template>
  <div class="container">
    <div :style="{'height':systemInfo.windowHeight+'px;width:100%;background:white;'}">
      
      <div class="search-content">
        <div class="main-title">
          <div>历史搜索</div>
          <div
            class="right"
            @click="goCommodity"
          >
            <div
              class="u-name"
              @click="delList"
            > 清除</div>
            <div class="u-icon">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div>
          <div
            v-if="searchValues.length>0"
            class="se-list"
          >
            <div
              v-for="(item,index) in searchValues"
              :key="index"
            >
              {{item}}
            </div>
          </div>
          <div
            v-else
            class="se-list"
          >
            暂无搜索记录
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      msg: "123",
      values: ""
    };
  },
  computed: {
    ...mapState({
      systemInfo: state => state.systemInfo,
      searchValues: state => state.searchValues
    })
  },
  created(){
    this.values=''
  },
  methods: {
    onChange(event) {
      this.values = event.mp.detail;
    },
    onclick() {
      this.$store.commit("saveSearchValues", this.values)
      wx.redirectTo({ url: '/pages/commodity/index/main?keyword='+this.values })
    },
    delList() {
      this.$store.commit("clearSearchValues");
    }
  }
};
</script>

<style lang="less">
.s-search {
  width: 100%;
}

.search-content {
  width: 100%;
  background: white;
  .se-list {
    display: flex;
    padding: 10px;
    flex-wrap: wrap;
    flex-direction: row;
    div {
      padding: 4px 6px;
      padding: 8rpx 12rpx;
      background: #f5f5f5;
      margin-right: 10px;
      margin-top: 10px;
      border-radius: 2px;
    }
  }
}
</style>
