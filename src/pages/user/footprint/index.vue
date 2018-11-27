<template>
  <div>
    <footprint-list :status="status"></footprint-list>
  </div>
</template>

<script>
import { GetFootprintApi } from '@/utils/http/api.js'

import footprintList from '../../../components/footprint.vue'
export default {
  data() {
    return {
      status: {
        footpriintList: []
      }
    }
  },
  components: {
    footprintList
  },
  methods: {
    GetFootprint() {
      console.log('GetFootprint')
      const that = this
      const c = res => {
        console.log('res',res)
        that.status.footpriintList = res[0]
      }
      const param = {}
      GetFootprintApi(param).then(c)
    }
  },
  mounted() {
    
    this.GetFootprint()
  }
}
</script>

<style>
</style>
