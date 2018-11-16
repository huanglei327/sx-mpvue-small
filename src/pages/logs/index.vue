<template>
  <div>
    <ul class="container log-list">
      <li v-for="(log, index) in logs" :class="{ red: aa }" :key="index" class="log-item">
        <card :text="(index + 1) + ' . ' + log"></card>
      </li>
    </ul>

  </div>
</template>

<script>
import { formatTime } from "@/utils/index";
import card from "@/components/card";

export default {
  components: {
    card
  },

  data() {
    return {
      logs: [],
      x: 0,
      y: 0
    };
  },

  created() {
    const logs = wx.getStorageSync("logs") || [];
    this.logs = logs.map(log => formatTime(new Date(log)));
  },
  methods: {
    tap: function(e) {
      this.setData({
        x: 30,
        y: 30
      });
    },
    onChange: function(e) {
      console.log(e.detail);
    },
    onScale: function(e) {
      console.log(e.detail);
    }
  }
};
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
