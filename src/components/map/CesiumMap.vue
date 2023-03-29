<template>
  <div class="map-container">
    <div id="map" class="map"></div>
    <div class="switch common-card" v-if="showSwitchMark">
      <van-cell center :title="item.name" v-for="(item, index) in diyLayers" :key="index">
        <template #right-icon>
          <van-switch v-model="item.visible" size="24" @change="switchDiyLayer(item)" />
        </template>
      </van-cell>
    </div>
    <div class="layer common-card" v-if="showSwitchLayer">
      <el-tree
        class="layer-tree"
        default-expand-all
        :props="treeProps"
        :data="treeData"
        :default-checked-keys="treeCheckedKeys"
        show-checkbox
        accordion
        highlight-current
        node-key="id"
        :default-expanded-keys="[2]"
        :expand-on-click-node="false"
        @node-click="nodeClick"
        @check-change="nodeCheck"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>
            <van-icon class="tree-icon" :name="data.children && data.children.length > 0 ? 'idcard' : 'points'" />{{
              node.label
            }}
          </span>
        </span>
      </el-tree>
    </div>
    <div class="operate common-card" v-if="cesiumLoadSuccess">
      <div :class="'item ' + (showSwitchMark ? 'active' : '')" @click="showSwitchMark = !showSwitchMark">
        <van-icon name="eye-o" size="28" />
        <div class="name">注记</div>
      </div>
      <div class="divider"></div>
      <div :class="'item ' + (showSwitchLayer ? 'active' : '')" @click="openLayerTree">
        <van-icon name="notes-o" size="28" />
        <div class="name">图层</div>
      </div>
    </div>
    <div class="operate control common-card" v-if="cesiumLoadSuccess">
      <div @click="control('zoomin')">
        <van-icon name="plus" size="28" />
      </div>
      <div class="divider"></div>
      <div @click="control('zoomout')">
        <van-icon name="minus" size="28" />
      </div>
      <div class="divider"></div>
      <div @click="control('home')">
        <van-icon name="aim" size="28" />
      </div>
    </div>
  </div>
</template>
<script>
import { earthConfig } from '@/api/map.config.js'
import redline_line from '@/api/redline_line.json'
import stake_mark from '@/api/stake_mark.json'
import mileage from '@/api/mileage.json'
export default {
  props: {
    serverMapLayers: {
      type: Array
    }
  },
  data() {
    return {
      showSwitchMark: false,
      showSwitchLayer: false,
      layers: [],
      diyLayers: [
        {
          name: '红线',
          visible: true
        },
        {
          name: '里程',
          visible: false
        },
        {
          name: '百米里程',
          visible: false
        }
      ],
      earthHelper: null,
      viewer: null,
      cesiumLoadSuccess: false,
      projectLocations: [
        {
          lon: 120.16026544960445,
          lat: 29.887495236979884,
          name: '次坞大桥',
          count: 84,
          status: '正在进行桩基施工',
          finish: '35'
        },
        {
          lon: 120.10271863327932,
          lat: 29.808129690315493,
          name: '灵山坞1号大桥',
          count: 75,
          status: '正在进行桩基施工',
          finish: '35'
        },
        {
          lon: 120.10769547987013,
          lat: 29.822609032800724,
          name: '应店街互通主线桥',
          count: 36,
          status: '正在进行桩基施工',
          finish: '18'
        },
        {
          lon: 120.15349518260355,
          lat: 29.883855111302335,
          name: '进水村大桥',
          count: 87,
          status: '正在进行桩基施工',
          finish: '33'
        },
        {
          lon: 120.10447654289393,
          lat: 29.702156564959076,
          name: '草塔互通主线1号桥',
          count: 175,
          status: '正在进行桩基施工',
          finish: '96'
        },
        {
          lon: 120.10340488132115,
          lat: 29.69620211542673,
          name: '草塔互通主线2号桥',
          count: 100,
          status: '正在进行桩基施工',
          finish: '12'
        },

        {
          lon: 120.10447016357617,
          lat: 29.66753287851887,
          name: '草塔南互通主线桥',
          count: 202,
          status: '正在进行桩基施工',
          finish: '80'
        },
        {
          lon: 120.10503756128541,
          lat: 29.605524316141658,
          name: '溪口大桥',
          count: 54,
          status: '正在进行桩基施工',
          finish: '31'
        },
        {
          lon: 120.1168826850927,
          lat: 29.58013549644847,
          name: '杭金衢分离大桥',
          count: 116,
          status: '正在进行桩基施工',
          finish: '20'
        }
      ],
      treeProps: {
        label: 'name',
        children: 'children'
      },
      treeData: [],
      treeCheckedKeys: []
    }
  },
  mounted() {
    earthConfig.layers = this.serverMapLayers
    try {
      this.initEarth()
    } catch (e) {
      // alert(e.message)
    }
  },
  methods: {
    openLayerTree() {
      this.initLayerTree(this.earthHelper.layers.getLayerTree())
      this.showSwitchLayer = !this.showSwitchLayer
    },
    initLayerTree(value) {
      this.treeCheckedKeys = []
      this.treeData = this.getTreeData(value)
    },
    getTreeData(nodes) {
      if (!nodes) {
        return []
      }
      const na = []
      for (let ni of nodes) {
        const { id, name, checked, children, layerId } = ni
        const n = { id, name, checked, layerId }
        if (children) {
          n.children = this.getTreeData(children)
        } else {
          if (checked) this.treeCheckedKeys.push(id)
          n.children = []
        }
        na.push(n)
      }
      return na
    },
    nodeClick(row) {
      row.layerId && this.earthHelper.earth.getDefaultLayerManager().viewLayerById(row.layerId)
    },
    nodeCheck(node, select) {
      node.layerId && this.earthHelper.earth.getDefaultLayerManager().setLayerVisibleById(node.layerId, select)
    },
    getDataSourceByName(viewer, name) {
      let dataSource
      for (let index = 0; index < viewer.dataSources.length; index++) {
        dataSource = viewer.dataSources.get(index)
        if (dataSource.name === name) {
          return dataSource
        }
      }
      dataSource = new Cesium.CustomDataSource(name)
      viewer.dataSources.add(dataSource)
      return dataSource
    },
    mercator2lonlat(mercator) {
      var lonlat = { x: 0, y: 0 }
      var x = (mercator.x / 20037508.34) * 180
      var y = (mercator.y / 20037508.34) * 180
      y = (180 / Math.PI) * (2 * Math.atan(Math.exp((y * Math.PI) / 180)) - Math.PI / 2)
      lonlat.x = x
      lonlat.y = y
      return lonlat
    },
    initEarth() {
      let earthHelper = new ZlskEarthHelper('map', earthConfig)
      this.earthHelper = earthHelper
      let viewer = earthHelper.viewer
      this.viewer = viewer
      viewer.scene.globe.showSkirts = true
      viewer.scene.globe.depthTestAgainstTerrain = false
      viewer.scene.screenSpaceCameraController.minimumZoomDistance = -4
      viewer.scene.screenSpaceCameraController.maximumZoomDistance = 40000 * 1000
      viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)

      if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
        viewer.resolutionScale = window.devicePixelRatio
      }

      viewer.scene.skyBox.show = false //隐藏天空盒
      viewer.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0.0) //设置背景透明
      viewer.scene.skyAtmosphere.show = false //隐藏大气圈
      viewer.scene.sun.show = false //隐藏太阳
      viewer.scene.moon.show = false //隐藏月亮

      let that = this
      //加载红线
      let readLineLayer = this.getDataSourceByName(viewer, '红线')
      redline_line.features.forEach(item => {
        if (item.geometry.type === 'LineString' && item.geometry.coordinates.length > 0) {
          item.Cartesian3 = item.geometry.coordinates.map(result => {
            return Cesium.Cartesian3.fromDegrees(result[0], result[1], 80)
          })

          readLineLayer.entities.add({
            polyline: {
              positions: item.Cartesian3,
              width: 2,
              clampToGround: true,
              material: Cesium.Color.CRIMSON
            }
          })
        }
      })

      // //加载工程位置
      // let projectLocationLayer = this.getDataSourceByName(viewer, '工程位置')
      // let carPositions = []
      // this.projectLocations.forEach(item => {
      //   carPositions.push(Cesium.Cartographic.fromDegrees(item.lon, item.lat))
      // })
      // setTimeout(() => {
      //   this.getHeightFromTerrain(viewer, carPositions).then(data => {
      //     this.projectLocations.forEach((item, index) => {
      //       projectLocationLayer.entities.add({
      //         position: Cesium.Cartographic.toCartesian(data[index]),
      //         billboard: {
      //           image: require('@/assets/image/construction.png'),
      //           height: 40,
      //           width: 30,
      //           distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 8000)
      //         },
      //         label: {
      //           text: item.name,
      //           font: '20px sans-serif',
      //           style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      //           outlineColor: Cesium.Color.WHITE,
      //           outlineWidth: 5,
      //           fillColor: Cesium.Color.fromCssColorString('#000000'),
      //           pixelOffset: new Cesium.Cartesian2(0, -40),
      //           scaleByDistance: new Cesium.NearFarScalar(1.5e2, 0.8, 1.5e7, 0.2),
      //           distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 8000.0)
      //         }
      //       })
      //     })
      //   })
      // }, 2000)

      //加载stake_mark
      let mileageDataLayer = this.getDataSourceByName(viewer, '里程')
      mileageDataLayer.show = false
      stake_mark.features.forEach(item => {
        if (item.properties.LB == '1') {
          item.Cartesian3 = Cesium.Cartesian3.fromDegrees(
            item.geometry.coordinates[0],
            item.geometry.coordinates[1],
            85
          )
          mileageDataLayer.entities.add({
            position: item.Cartesian3,
            label: {
              text: `${item.properties.name}`,
              font: '28pt Source Han Sans CN', //字体样式
              fillColor: Cesium.Color.GOLD, //字体颜色
              backgroundColor: Cesium.Color.AQUA, //背景颜色
              showBackground: false, //是否显示背景颜色
              style: Cesium.LabelStyle.FILL, //label样式
              outlineWidth: 2,
              scale: 0.5,
              verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
              horizontalOrigin: Cesium.HorizontalOrigin.RIGHT //水平位置
              // pixelOffset: new Cesium.Cartesian2(100, -30) //偏移
            }
          })
        }
      })

      //加载
      let bestMileageLayer = this.getDataSourceByName(viewer, '百米里程')
      bestMileageLayer.show = false
      mileage.data.map(item => {
        let site = this.mercator2lonlat(item)
        let Cartesian3 = Cesium.Cartesian3.fromDegrees(site.x, site.y, 80)
        bestMileageLayer.entities.add({
          position: Cartesian3,
          label: {
            text: `${item.name}`,
            font: '28pt Source Han Sans CN', //字体样式
            fillColor: Cesium.Color.GOLD, //字体颜色
            backgroundColor: Cesium.Color.AQUA, //背景颜色
            showBackground: false, //是否显示背景颜色
            style: Cesium.LabelStyle.FILL, //label样式
            outlineWidth: 2,
            scale: 0.5,
            verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
            horizontalOrigin: Cesium.HorizontalOrigin.RIGHT //水平位置
            // pixelOffset: new Cesium.Cartesian2(100, -30) //偏移
          }
        })
      })

      // let markerManager = this.earthHelper.earth.createMarkerManager({ clusterType: 'dilute' })
      // // markerManager.beginCluster()
      // getWorkPoint().then(data => {
      //   if (data && data.length > 0) {
      //     data.forEach(item => {
      //       let { altitude, sum, finish, longlatitude, projectName, type } = item
      //       let site = longlatitude.split(',')
      //       let height = altitude || 20
      //       let rate = Math.floor((finish / sum) * 10000) / 100
      //       rate = isNaN(rate) ? 0 : rate
      //       let imagename = 'image' + type
      //       const image = require(`@/assets/image/${imagename}.png`)
      //       if (site && site.length > 0) {
      //         const id = this.earthHelper.openPopup({
      //           position: [Number(site[0]), Number(site[1]), 0], // 必须 弹窗位置
      //           visibleRange: [600, 45000],
      //           offset: [0, -5], // 可选，弹窗是否偏移
      //           width: 220, // 可选，默认值: 400
      //           height: 100, // 可选，默认值: 240
      //           content: `
      //         <div class="overlayer_item">
      //         <div class="overlayer_header">${projectName}</div>
      //         <div class="overlayer_content">
      //          <div class="content_info">共计数量：${sum}个构件</div>
      //          <div class="content_info">完成数量：${finish}个构件</div>
      //          <div class="content_info">完成比例:<span class="process">${rate}%</span></div>
      //         </div>
      //       </div>`, // 弹框内容 可选，默认值: ''
      //           class: 'popup', // 可选，默认值:
      //           closable: false // 关闭按钮 可选，默认值: true
      //         })
      //         // this.markerId.push(id)
      //         markerManager.add({
      //           position: [Number(site[0]), Number(site[1]), height],
      //           image,
      //           // text: properties.Name,
      //           visibleRange: [600, 1e9],
      //           imageScaleRange: [0, 1, 1e9, 0.5],
      //           textVisibleRange: [600, 45000],
      //           // textColor: textColor,
      //           textOffset: [0, -45],
      //           textBackground: true, // 可选，默认值: true
      //           // textBgColor: textBgColor,
      //           // handleLineColor: [255, 255, 0, 255],
      //           onClick: function(id, b, c) {
      //             // const entity = em.getById(id)
      //             // entity && zeh.viewer.flyTo(entity)
      //           }
      //         })
      //       }
      //     })
      //   }
      // })
      this.cesiumLoadSuccess = true
    },
    switchLayer(item) {
      this.earthHelper.earth.getDefaultLayerManager().setLayerVisibleByName(item.name, item.visible)
    },
    switchDiyLayer(item) {
      let dataSources = this.viewer.dataSources.getByName(item.name)
      dataSources && dataSources.length !== 0 && (dataSources[0].show = item.visible)
    },
    control(type) {
      if (type === 'zoomin') {
        this.zoom(0.5)
      } else if (type === 'zoomout') {
        this.zoom(2)
      } else if (type === 'home') {
        this.flyToHome()
      }
    },
    zoom(scale) {
      let viewer = this.viewer
      let camera = viewer.camera
      if (viewer.scene.mode === Cesium.SceneMode.SCENE2D) {
        camera.zoomIn(camera.positionCartographic.height * (1 - scale))
        return
      } else if (viewer.scene.mode === Cesium.SceneMode.MORPHING) {
        return
      }
      let ray = new Cesium.Ray(camera.positionWC, camera.directionWC)
      let result = viewer.scene.globe.pick(ray, viewer.scene)
      result = camera.worldToCameraCoordinatesPoint(result)

      let direction = Cesium.Cartesian3.subtract(camera.position, result, new Cesium.Cartesian3())
      let movementVector = Cesium.Cartesian3.multiplyByScalar(direction, scale, direction)
      let endPosition = Cesium.Cartesian3.add(result, movementVector, result)

      camera.flyTo({
        destination: endPosition,
        orientation: {
          direction: camera.direction,
          up: camera.up
        },
        duration: 0.5,
        convert: false
      })
    },
    flyToHome() {
      let { lon, lat, height, heading, pitch, roll, duration } = earthConfig.init
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lon || 114.401058, lat || 30.457356, height || 2000),
        orientation: {
          heading: Cesium.Math.toRadians(heading || 0),
          pitch: Cesium.Math.toRadians(pitch || -90),
          roll: Cesium.Math.toRadians(roll || 0),
          duration: duration || 2
        }
      })
    },
    getHeightFromTerrain(viewer, cartographicArray) {
      if (viewer.terrainProvider._ready) {
        return Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, cartographicArray)
      } else {
        return new Promise(resolve => {
          cartographicArray.forEach(cartographic => {
            cartographic.height = viewer.scene.globe.getHeight(cartographic) || 0
          })
          resolve(cartographicArray)
        })
      }
    }
  }
}
</script>
<style lang="scss">
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
  .map {
    width: 100%;
    height: 100%;
    background: url(../../assets/image/world.jpg) no-repeat;
  }
  .operate {
    background-color: white;
    position: absolute;
    right: 5px;
    top: calc(50% - 80px);
    width: 38px;
    text-align: center;
    .divider {
      width: 100%;
      height: 1px;
      background: #eee;
      margin: 2px 0;
    }
    .item {
      .name {
        margin-top: -5px;
      }
    }
    .active {
      color: $hover-color;
    }
  }
  .control {
    bottom: 5px;
    top: initial;
  }
  .switch {
    background-color: white;
    width: 140px;
    position: absolute;
    left: 5px;
    top: 5px;
    .van-cell {
      padding: 5px 8px;
    }
  }
  .layer {
    background-color: white;
    position: absolute;
    left: 5px;
    bottom: 5px;
    padding: 4px 10px;
    max-height: 400px;
    overflow: hidden;
    overflow-y: auto;
    .layer-tree {
      font-size: 14px;
      .tree-icon {
        margin: 0 2px;
      }
    }
  }
}
.overlayer_item {
  .overlayer_header {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    background: linear-gradient(90deg, rgba(59, 255, 237, 0.4) 0%, rgba(75, 182, 252, 0.05) 100%);
    text-align: center;
    margin-bottom: 5px;
  }
  .overlayer_content {
    margin-left: 10px;
    .content_info {
      margin: 5px 0;
      .process {
        color: aqua;
        display: inline-block;
        margin: 0 5px;
      }
    }
  }
}
</style>
