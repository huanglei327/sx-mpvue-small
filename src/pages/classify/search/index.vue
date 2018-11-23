<template>
  <div class="container" >
    <div :style="{'height':systemInfo.windowHeight+'px;width:100%;background:white;'}">
      {{values}}
      <div class="s-search">
        <van-search :value="values" @search="onSearch()" @change="onSearch()" placeholder="请输入搜索关键词" use-action-slot maxlength="20">
          <view slot="action" @tap="onSearch()">搜索</view>
        </van-search>
      </div>
      <div class="search-content">
        <div class="main-title">
          <div>历史搜索</div>
          <div class="right" @click="goCommodity">
            <div class="u-name"> 清除</div>
            <div class="u-icon">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div>
          <div v-if="searchValues.length>0">
             <div v-for="(item,index) in searchValues" :key="index">
               {{item}}
             </div>
          </div>
          <div v-else="">
            暂无搜索记录
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
export default {
  data() {
    return {
      msg: '123',
      values:'123',
    }
  },
  computed: {
    ...mapState({
      systemInfo: state => state.systemInfo,
      searchValues: state => state.searchValues
    }),
  },
  methods:{
    onSearch(event){
      
      console.log(this.values)
      return
      this.$store.commit('saveSearchValues', this.values)
    },
  }
}
</script>

<style>
.s-search {
  width: 100%;
}
.search-content {
  width: 100%;
  background: white;
}
</style>
