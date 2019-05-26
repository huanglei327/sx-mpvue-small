<template>
  <div class="section">

    <div class="left">
      <div v-for="(item,index) in list" :key="index" @click="bindActive(index)" :class="active=== index ?'active' :''">
        {{item.name}}
      </div>
    </div>
    <div class="right">
      <div v-for="(item,index) in list" :key="index" v-if="active===index" class="typeTree">
        <div class="heand" v-show="item.prettyBannerUrl" >
          <image :src="item.prettyBannerUrl" width="100%" height="200" />
        </div>
        <div v-for="(c,indexc) in item.subCategoryList" :key="indexc" class="category">
          <div class="brand">
            <div class="item" @click="$common.openWin('/pages/commodity/index/main?classId='+c.id)">
              <image :src="c.prettyBannerUrl" />
              <div>{{c.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { GetUserInfoApi, GetA, GetClassIfyInfoApi } from '@/utils/http/api.js'
import classify from './classify.json'
export default {
  data() {
    return {
      motto: 'Hello World',
      active: 0,
      list: []
    }
  },

  methods: {
    getList() {
      const that = this
      for (let i = 0; i < 15; i++) {
        that.list.push(i)
      }
    },
    bindActive(index) {
      this.active = index
    },
    onChange(event) {
      wx.showToast({
        title: `切换到标签 ${event.detail.index + 1}`,
        icon: 'none'
      })
    },
    GetClassIfyInfo() {
      const that = this
      const c = res => {
        that.list = res.categoryList
      }
      const param = {}
      GetClassIfyInfoApi(param).then(c)
    }
  },
  mounted() {
    this.getList()
    this.GetClassIfyInfo()
  }
}
</script>

<style lang="less">
.section {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.left {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 90px;
  background: #f6f6f6;
  text-align: center;
  overflow: auto;
  font-size: 14px;
}
.left::before {
  content: '';
  position: absolute;
  background: #dcdcdc;
  right: 0;
  top: 0;
  height: 100%;
}
.left view.active {
  background: #fff;
  position: relative;
  z-index: 2;
  border-left: 3px solid #fa6d87;
  font-size: 16px;
}
.left view {
  display: block;
  height: 45px;
  line-height: 45px;
  border-bottom: 0px solid #dcdcdc;
  border-left: 3px solid #f6f6f6;
}
.right {
  margin-left: 90px;
  height: 100%;
  overflow: auto;
  width: auto;
  background: #fff;
  padding: 0 10px;
}
.right text {
  font-size: 12px;
}
.typeTree {
  padding-top: 10px;
  width: 100%;
  .title {
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #999;
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 30px;
    padding-top: 10px;
  }
  .heand {
    image {
      width: 100%;
      height: 100px;
    }
  }
}
.typeTree .item {
  text-align: center;
  display: inline-block;
  vertical-align: top;
  font-size: 12px;
}
// .typeTree .category {
// 	clear: both;
// }

.typeTree .brand {
  width: 33%;
  float: left;
  text-align: center;
  height: 90px;
  padding: 5px 0;
}

.search-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  color: #fff;
  background: white;
  border-bottom: 1px solid #efefef;
  font-size: 32rpx;
}
.search {
  flex-grow: 1;
  margin: 7px 12px;
}
.item image {
  width: 60px;
  height: 60px;
}
</style>
