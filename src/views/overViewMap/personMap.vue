<template>
  <div :style="{ height: scrollerHeight, position: 'relative' }">
    <LeafLetMap ref="leafLetMapRef"></LeafLetMap>
    <div class="to-back" @click="toBack()"></div>
    <div class="legend">
      <van-row class="item">
        <van-col class="img-conatiner" span="12"><img class="img" :src="onlineSrc"/></van-col>
        <van-col span="12">在线</van-col>
      </van-row>
      <van-row class="item">
        <van-col class="img-conatiner" span="12"><img class="img" :src="offlineSrc"/></van-col>
        <van-col span="12">离线</van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import LeafLetMap from '@/components/map/LeafLetMap.vue'
import { getAllUserOnline } from '@/api/project'
let featureGroup
export default {
  computed: {
    scrollerHeight: function() {
      return window.innerHeight + 'px'
    }
  },
  components: {
    LeafLetMap
  },
  data() {
    return {
      isFirstIn: true,
      canInit: true,
      interval: null,
      onlineSrc: require('../../assets/image/marker/online.png'),
      offlineSrc: require('../../assets/image/marker/offline.png')
    }
  },
  destroyed() {
    this.interval && clearInterval(this.interval)
  },
  mounted() {
    featureGroup = L.markerClusterGroup([]).addTo(leafLetMap)
    this.init()
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.init()
      }, 1000 * 10)
    }
  },
  methods: {
    init() {
      if (this.canInit) {
        this.canInit = false
        getAllUserOnline().then(data => {
          this.canInit = true
          this.drawPerson(data)
        })
      }
    },
    drawPerson(data) {
      data.forEach(item => {
        let { lon, lat, name, updatetime } = item
        lon && lat && updatetime && this.draw(item)
      })
      if (this.$store.state.locatePersonName) {
        let marker = featureGroup
          .getLayers()
          .find(layer => layer.options.data.name === this.$store.state.locatePersonName)
        if (marker) {
          leafLetMap.flyTo(marker.getLatLng(), leafLetMap.getMaxZoom())
        }
        this.$store.state.locatePersonName = ''
        this.isFirstIn = false
      } else {
        if (this.isFirstIn) {
          this.isFirstIn = false
          leafLetMap.fitBounds(featureGroup.getBounds())
        }
      }
    },
    isToday(str) {
      var d = new Date(str.replace(/-/g, '/'))
      var todaysDate = new Date()
      if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
        return true
      } else {
        return false
      }
    },
    isActive(updatetime) {
      return updatetime && Math.abs(new Date(updatetime.replace(/-/g, '/')) - new Date()) < 1000 * 60 * 3
    },
    draw(data) {
      let { lon, lat, name, updatetime, userid } = data
      let showMarker = this.isToday(updatetime)
      let existLayer = featureGroup.getLayers().find(layer => layer.options.data.userid === userid)
      if (showMarker) {
        let active = this.isActive(updatetime)
        let src = active ? this.onlineSrc : this.offlineSrc
        let latLng = L.latLng(lat, lon)
        // let icon = L.icon({iconUrl: src})
        let icon = L.divIcon({
          html: `
              <div class='person-icon-container'>
                <span class='name'>${name}</span>
                <img class='img' src='${src}' />
              </div>
            `,
          className: 'my-div-icon',
          iconSize: 60
        })

        if (existLayer) {
          existLayer.setLatLng(latLng)
          existLayer.setIcon(icon)
        } else {
          featureGroup.addLayer(L.marker(latLng, { icon, data }))
        }
      } else {
        if (existLayer) {
          featureGroup.removeLayer(existLayer)
        }
      }
    },
    toBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.to-back {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  top: 10px;
  left: 10px;
  // border: 1px solid #c9c9c9;
  // background-color: #fff;
  background: #fff url(../../assets/image/back.png) 40% 50% no-repeat;
  text-align: center;
  line-height: 30px;
  z-index: 9999;
  box-shadow: 0px 0px 5px 0px rgba(147, 160, 177, 0.4);
}
.legend {
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgba(147, 160, 177, 0.4);
  border-radius: 5px;
  z-index: 9999;
  position: absolute;
  bottom: 10px;
  left: 10px;
  .item {
    height: 40px;
    line-height: 40px;
    width: 80px;
    .img-conatiner {
      height: 40px;
      line-height: 40px;
      text-align: center;
      .img {
        margin-top: 8px;
        height: 22px;
      }
    }
  }
}
::v-deep .my-div-icon {
  .person-icon-container {
    text-align: center;
    .name {
      text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
    }
    .img {
      margin-top: 2px;
      // width: 27px;
    }
  }
}
</style>
