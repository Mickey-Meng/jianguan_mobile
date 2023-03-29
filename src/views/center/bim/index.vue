<template>
  <div class="bim-center" :style="{ height: scrollerHeight }">
    <cesium-map v-if="showMap" :serverMapLayers="layers"></cesium-map>
  </div>
</template>
<script>
import CesiumMap from '@/components/map/CesiumMap.vue'
import { getMap } from '@/api/userauth.js'
export default {
  components: {
    CesiumMap
  },
  data() {
    return {
      showMap: false,
      layers: []
    }
  },
  computed: {
    scrollerHeight: function() {
      return window.innerHeight - 82 + 'px'
    }
  },
  mounted() {
    let { id, groupid, roles } = this.$store.state.userinfo
    getMap(id, groupid, roles).then(data => {
      this.layers = data.getMe
      this.showMap = true
    })
  }
}
</script>
<style scoped>
.bim-center {
  overflow: hidden;
}
</style>
