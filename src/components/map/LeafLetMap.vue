<template>
  <div class="container">
    <div id="map" class="map"></div>
    >
  </div>
</template>
<script>
import { leafLetConfig } from '@/api/map.config.js'
export default {
  data() {
    return {
      baseLayers: [],
      layers: []
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      L.zlskmap.createMap({
        id: 'map',
        data: leafLetConfig.init,
        success: (map, gis) => {
          this.onMapSuccess(map)
        }
      })
    },
    onMapSuccess(map) {
      window.leafLetMap = map
      leafLetConfig.baseLayers.forEach(layer => {
        this.getLayer(map, layer, true)
      })
      leafLetConfig.layers.forEach(layer => {
        this.getLayer(map, layer, false)
      })
      map.on('click', function(ev) {
        console.log(ev.latlng) // ev is an event object (MouseEvent in this case)
      })
    },
    getLayer(map, params, isBase) {
      let that = this
      let { type, name, visible } = params
      let layer = null
      switch (type) {
        case 'tile':
        case 'www_tdt':
          layer = L.zlskmap.layer.createLayer(params)
          break
        case 'wms':
          params.crs = params.crs || L.CRS.EPSG4326
          layer = L.tileLayer.wms(params.url, params)
          break
        case 'wfs':
          layer = L.wfsLayer(params)
          layer.on('click', function(e, data) {
            let id = e.layer.feature.id
            let name = e.layer.feature.properties.name
            that.$router.push({ path: '/panorama', query: { name, id: id } })
          })
          break
      }
      if (layer.setZIndex) {
        this.layerIndex++
        layer.setZIndex(this.layerIndex)
      }
      isBase ? this.baseLayers.push({ params, layer }) : this.layers.push({ params, layer })
      visible && layer.addTo(map)
      return layer
    },
    gotoPoint(lng, lat, zoom, duration) {
      leafLetMap.flyTo({ lng, lat }, zoom || 17, { duration: duration || 1.5 })
    }
  }
}
</script>
<style lang="scss">
.container {
  height: 100%;
  width: 100%;
  position: relative;
  .map {
    height: 100%;
    position: absolute;
  }
}
.leaflet-bottom {
  bottom: 80px !important;
}
.location-bar {
  bottom: 80px !important;
}
</style>
