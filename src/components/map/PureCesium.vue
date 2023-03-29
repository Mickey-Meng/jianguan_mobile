<template>
  <div class="map-container">
    <div id="map" class="map"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.initEarth()
  },
  methods: {
    initEarth() {
      let Cesium = this.cesium

      let viewer = new Cesium.Viewer('map', {
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url: 'http://101.200.223.171/mapData/zhujishi/DOM_18/{z}/{x}/{y}.png'
        }),
        homeButton: false,
        animation: false,
        geocoder: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        terrainProviderViewModels: [],
        imageryProviderViewModels: [],
        fullscreenButton: false,
        navigationHelpButton: false,
        timeline: false
      })
      viewer.cesiumWidget.creditContainer.style.display ='none'

      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(120.1095329338229, 29.706018768457866, 5000),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-90),
          roll: Cesium.Math.toRadians(0),
          duration: 2
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
  .map {
    width: 100%;
    height: 100%;
  }
}
</style>
