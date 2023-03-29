<template>
  <div :style="{ height: scrollerHeight, position: 'relative' }">
    <leaf-let-map ref="leafLetMapRef"></leaf-let-map>
    <div class="to-back" @click="toBack()"></div>
    <div class="top-card">
      <div class="item">
        <div class="icon zj"></div>
        <div class="con">
          <p>
            <span class="zj-count">{{ projectList.length }}</span
            >个
          </p>
          <p>在建项目</p>
        </div>
      </div>
      <div class="item">
        <div class="icon mon"></div>
        <div class="con">
          <p>
            <span class="mon-count">{{ mouneyCount }}</span>
            {{ unit }}
          </p>
          <p>投资总额</p>
        </div>
      </div>
    </div>
    <div class="left-tips">
      <div v-for="(value, key) in projecttypes" :key="key" class="tip-item">
        <p class="num">{{ value }}</p>
        <p class="type">{{ key }}</p>
      </div>
    </div>
    <div class="bortom-card" ref="prjlist">
      <div class="list">
        <div
          v-for="(item, index) in projectList"
          :key="index"
          class="project-item"
          @click.stop="flyTo(item)"
          :ref="'project' + item.id"
        >
          <div class="title-box">
            <div class="name-box">
              <span class="project-name">{{ item.name }}</span>
            </div>
            <span class="home-icon" @click.stop="toHome(item)"></span>
          </div>
          <p><span>地址</span><span></span></p>
          <p>
            <span>类型</span><span>{{ item.projecttype }}</span>
          </p>
          <p>
            <span>投资总额</span><span>{{ item.investment }}万元</span>
          </p>
          <p><span>当前阶段</span><span>施工中</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeafLetMap from '@/components/map/LeafLetMap.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    LeafLetMap
  },
  computed: {
    ...mapGetters(['projectList']),
    scrollerHeight: function() {
      return window.innerHeight + 'px'
    }
  },
  data() {
    return {
      projecttypes: {
        交通类: 0,
        房建类: 0,
        市政类: 0,
        其他类: 0
      },
      catchMarker: null,
      markers: [],

      mouneyCount: 0,
      unit: '万元'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.projecttypes = {
        交通类: 0,
        房建类: 0,
        市政类: 0,
        其他类: 0
      }
      this.mouneyCount = 0
      // L.layerGroup([marker1, marker2])
      let markers = []
      this.projectList.forEach(project => {
        let location = project.projectpoint?.split(',')
        let type = project.projecttype
        if (location.length == 2) {
          let iconSrc = this.getIcon(type)
          let marker = L.marker([location[0], location[1]], { icon: iconSrc, project: project })
          markers.push(marker)
        }

        if (project.projecttype) {
          this.projecttypes[project.projecttype] += 1
        }
        if (project.investment) {
          this.mouneyCount += parseFloat(project.investment)
        }
        // this.$refs.leafLetMapRef.gotoPoint(location[1], location[0])
      })
      if (this.mouneyCount >= 1000000) {
        this.mouneyCount = parseFloat(this.mouneyCount / 10000).toFixed(2)
        this.unit = '亿元'
      }
      let layerGroup = L.layerGroup([]).addTo(leafLetMap)
      let _this = this
      L.featureGroup(markers)
        .addTo(leafLetMap)
        .on('click', function(e) {
          if (this.catchMarker) {
            let type = this.catchMarker.options.project.projecttype
            let icon = _this.getIcon(type)
            this.catchMarker.setIcon(icon)
          }
          let project = e.layer.options.project
          if (project.coordinate) {
            layerGroup.clearLayers()
            let latlngs = JSON.parse(project.coordinate)
            let polyline = L.polyline(latlngs, { color: '#F75E35' })
            layerGroup.addLayer(polyline)
            leafLetMap.fitBounds(polyline.getBounds())
          }
          _this.$refs['prjlist'].scrollLeft = _this.$refs['project' + project.id][0].offsetLeft - 5

          let icon = _this.getActiveIcon(project.projecttype)
          e.layer.setIcon(icon)
          this.catchMarker = e.layer
        })
    },
    flyTo(item) {
      if (item.projectpoint) {
        let location = item.projectpoint?.split(',')
        this.$refs.leafLetMapRef.gotoPoint(location[1], location[0])
      } else {
        this.$notify({ type: 'warning', message: '该项目没有坐标信息！' })
      }
    },
    toHome(item) {
      this.$store.state.loginCount++
      this.$router.push({ path: '/', query: { project: JSON.stringify(item) } })
    },
    getIcon(type) {
      let jtIcon = L.icon({ iconUrl: require('../../assets/image/marker/jt.png') })
      let fjIcon = L.icon({ iconUrl: require('../../assets/image/marker/fj.png') })
      let szIcon = L.icon({ iconUrl: require('../../assets/image/marker/sz.png') })
      let otherIcon = L.icon({ iconUrl: require('../../assets/image/marker/other.png') })
      let icon = null
      switch (type) {
        case '交通类':
          icon = jtIcon
          break
        case '房建类':
          icon = fjIcon
          break
        case '市政类':
          icon = szIcon
          break
        case '其他类':
          icon = otherIcon
          break
        default:
          icon = jtIcon
          break
      }
      return icon
    },
    getActiveIcon(type) {
      let jtIcon = L.icon({ iconUrl: require('../../assets/image/marker/jt_active.png') })
      let fjIcon = L.icon({ iconUrl: require('../../assets/image/marker/fj_active.png') })
      let szIcon = L.icon({ iconUrl: require('../../assets/image/marker/sz_active.png') })
      let otherIcon = L.icon({ iconUrl: require('../../assets/image/marker/other_active.png') })
      let icon = null
      switch (type) {
        case '交通类':
          icon = jtIcon
          break
        case '房建类':
          icon = fjIcon
          break
        case '市政类':
          icon = szIcon
          break
        case '其他类':
          icon = otherIcon
          break
        default:
          icon = jtIcon
          break
      }
      return icon
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
.top-card {
  position: absolute;
  top: 60px;
  left: 5px;
  right: 5px;
  display: flex;
  justify-content: space-between;
  z-index: 9999;
  .item {
    width: 48%;
    height: 74px;
    background: #ffffff;
    box-shadow: 0px 0px 5px 0px rgba(147, 160, 177, 0.4);
    border-radius: 5px;
    padding: 12px 0px 12px 8px;
    & > div {
      float: left;
      height: 47px;
      &.icon {
        width: 47px;
        &.zj {
          background: url(../../assets/image/project/zj.png) no-repeat;
        }
        &.mon {
          background: url(../../assets/image/project/mon.png) no-repeat;
        }
      }
      &.con {
        margin-left: 12px;
        p {
          height: 23px;
          line-height: 23px;
          margin: 0px;
          padding: 0;
          font-size: 15px;
          font-weight: 500;
          color: #010302;
          .zj-count {
            font-size: 19px;
            font-weight: bold;
            color: #388bf5;
          }
          .mon-count {
            font-size: 19px;
            font-weight: bold;
            color: #f75e35;
          }
        }
      }
    }
  }
}
.left-tips {
  position: absolute;
  top: 160px;
  left: 15px;
  z-index: 9999;
  font-size: 16px;
  font-family: PingFang SC;
  .tip-item {
    width: 50px;
    height: 50px;
    background-color: #fff;
    box-shadow: 0px 0px 5px 0px rgba(147, 160, 177, 0.4);
    border-radius: 5px;
    padding: 8px 7px;

    font-weight: bold;
    color: #575c62;
    & + .tip-item {
      margin-top: 15px;
    }
    p {
      margin: 0;
      text-align: center;
      &.num {
        font-weight: bold;
        color: #575c62;
      }
      &.type {
        font-size: 11px;
        font-weight: 500;
        color: #010302;
      }
    }
  }
}
.bortom-card {
  position: absolute;
  bottom: 5px;
  width: 100%;
  height: 183px;
  padding-left: 5px;
  z-index: 9999;
  overflow: hidden;
  white-space: nowrap;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  text-align: justify;
  font-family: PingFang SC;
  .project-item {
    display: inline-block;
    // margin: 0 5px;
    width: 309px;
    height: 183px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px rgba(147, 160, 177, 0.4);
    padding: 10px 17px;
    box-sizing: border-box;
    & + .project-item {
      margin-left: 12px;
    }
    p,
    .title-box {
      display: flex;
      justify-content: space-between;
    }
    .title-box {
      height: 28px;
      line-height: 28px;
      width: 100%;
      .name-box {
        display: inline-block;
        width: 250px;
        // .project-name {
        font-size: 17px;
        font-weight: bold;
        color: #010302;
        overflow: auto;
      }

      .home-icon {
        display: inline-block;
        height: 16px;
        width: 16px;
        background: url(../../assets/image/project/homeIcon.png) no-repeat;
        margin-top: 5px;
      }
    }
    p {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #575c62;
      height: 32px;
      line-height: 32px;
      margin: 0;
      span {
        &:nth-child(2) {
          color: #010302;
        }
      }
    }
  }
}
</style>
