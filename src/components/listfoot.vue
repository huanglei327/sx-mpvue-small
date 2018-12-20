<template>
  <div
    class="d-foot color6"
    v-if="foots.type!==3"
  >
    <view v-if="foots.type === 1">
      加载中...
    </view>
    <view v-else>
      到底拉
    </view>
  </div>
</template>

<script>
export default {
  props: ["foots"],
  created() {}
};
</script>

<style>
.d-foot {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
</style>
