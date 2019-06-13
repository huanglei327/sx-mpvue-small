<template>
  <div>
    <view class="page-section page-section-gap">
      <map id="myMap"
           style="width: 100%; height: 300px;"
           :latitude="latitude"
           :longitude="longitude"
           :markers="markers"
           :covers="covers"
           show-location></map>
    </view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      latitude: 23.066199,
      longitude: 114.429833,
      markers: [{
        id: 1,
        latitude: 23.066199,
        longitude: 114.429833,
        name: 'T.I.T 创意园'
      }],
      covers: [{
        latitude: 23.066199,
        longitude: 114.429833,
        iconPath: '../../../../static/images/bug.png'
      }, {
        latitude: 23.066199,
        longitude: 114.429833,
        iconPath: '../../../../static/images/bug.png'
      }]
    }
  }
}
</script>

<style lang="less">
.page-section-gap {
  box-sizing: border-box;
  padding: 0 30rpx;
}

.page-body-button {
  margin-bottom: 30rpx;
}
</style>
