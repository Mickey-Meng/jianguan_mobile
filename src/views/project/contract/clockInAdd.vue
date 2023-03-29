<template>
  <div :style="{ height: scrollerHeight }">
    <div class="map">
      <leaf-let-map ref="leafLetMapRef"></leaf-let-map>
    </div>
    <div class="info">
      <van-form @submit="onSubmit" :v-model="clockData">
        <p class="title">人员信息</p>
        <van-cell-group inset>
          <van-field v-model="clockData.projectName" label="标段" readonly />
          <van-field v-model="clockData.attendancePersonName" label="考勤人员" readonly />
          <van-field v-model="clockData.groupName" label="所在部门" readonly />
          <div v-if="add">
            <van-field v-model="showTime" label="日期时间" readonly />
            <van-field v-model="clockData.clockAddr" label="打卡位置" readonly rows="2" type="textarea">
              <template #right-icon>
                <van-icon name="location-o" @click="getLocation" />
              </template>
            </van-field>
          </div>
          <div v-else>
            <van-field v-model="showTime" label="打卡时间" readonly />
            <van-field v-model="clockData.clockAddr" label="打卡位置" readonly rows="2" type="textarea" />
            <!-- <van-field v-model="showEndTime" label="下班打卡时间" readonly />
            <van-field v-model="clockData.clockEndAddr" label="下班打卡位置" readonly rows="2" type="textarea" /> -->
          </div>
        </van-cell-group>
        <p class="title">签到拍照</p>
        <van-cell-group inset v-if="add">
          <upload
            label="上传照片"
            :name="picFiled"
            :rules="[{ required: true, message: '请选择照片' }]"
            :fileList="fList"
            :editable="add"
          ></upload>
        </van-cell-group>
        <van-cell-group inset v-else>
          <upload
            label="打卡照片"
            :name="picFiled"
            :rules="[{ required: true, message: '请选择照片' }]"
            :fileList="fList"
            :editable="false"
          ></upload>
          <!-- <upload
            label="下班打卡照片"
            :name="picFiled"
            :rules="[{ required: true, message: '请选择照片' }]"
            :fileList="fEndList"
            :editable="false"
          ></upload> -->
        </van-cell-group>
        <div class="btn-con">
          <!-- <van-button type="default" @click="cancel">取消</van-button> -->
          <van-button type="primary" v-if="add">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { mapGetters } from 'vuex'
import { getNowDate } from '@/utils/date.js'
import { locationUtil } from '@/utils/locationUtil.js'
import Upload from '@/components/common/Upload'
import LeafLetMap from '@/components/map/LeafLetMap.vue'
import { getFence, subClockIn } from '@/api/project'
import { formatImgUrl } from '@/utils/index'
import * as turf from '@turf/turf'
import { reverse_geocoding } from '@/api/bdMap.js'
export default {
  components: {
    Upload,
    LeafLetMap
  },
  computed: {
    ...mapGetters(['userinfo', 'currentBiaoDuan']),
    scrollerHeight: function() {
      return window.innerHeight - 85 + 'px'
    }
  },

  data() {
    return {
      picFiled: 'clockPic',
      clockData: {},
      showTime: '',
      showEndTime: '',
      curLocation: [],
      curPolygonCoor: [],
      fences: [],
      add: true,
      fList: [],
      // fEndList: [],
      formatImgUrl,
      lastLocationMarker: null
    }
  },
  created() {
    if (JSON.stringify(this.$route.params) != '{}') {
      this.fList = this.formatImgUrl(this.$route.params.clockPic)
      // this.fEndList = this.formatImgUrl(this.$route.params.clockEndPic)
    }
  },
  mounted() {
    if (JSON.stringify(this.$route.params) != '{}') {
      this.add = false
      this.clockData = Object.assign({}, this.$route.params)
      this.showTime = this.$route.params.clockTime
        ? this.$route.params.clockTime.substring(0, 19).replace('T', ' ')
        : ''
      // this.showEndTime = this.$route.params.clockEndTime
      //   ? this.$route.params.clockEndTime.substring(0, 19).replace('T', ' ')
      //   : ''
      this.mapEcho()
    } else {
      this.add = true
      this.showTime = getNowDate()
      let nowTime = this.moment()
        .utc()
        .toISOString()
      this.$set(this.clockData, 'clockTime', nowTime)
      this.$set(this.clockData, 'attendancePersonId', this.userinfo.id)
      this.$set(this.clockData, 'attendancePersonName', this.userinfo.name)
      this.$set(this.clockData, 'groupId', this.userinfo.groupid)
      this.$set(this.clockData, 'groupName', this.userinfo.groupname)
      this.$set(this.clockData, 'projectId', this.currentBiaoDuan.id)
      this.$set(this.clockData, 'projectName', this.currentBiaoDuan.name)
      this.getLocation()
      this.getFence()
    }
  },
  methods: {
    getLocation() {
      locationUtil.getCurrentLocation().then(location => {
        if (!location) {
          return
        }
        this.$set(this.clockData, 'clockAddr', location?.address)
        this.$set(this.clockData, 'clockCoordinate', `${location?.lon},${location?.lat}`)
        if (this.lastLocationMarker) {
          leafLetMap.removeLayer(this.lastLocationMarker)
        }
        this.lastLocationMarker = L.marker([location?.lat, location?.lon])
        leafLetMap.addLayer(this.lastLocationMarker)
        this.$refs.leafLetMapRef.gotoPoint(location?.lon, location?.lat)
        this.curLocation = [location?.lon, location?.lat]
      })
      //测试打卡
      // let location = {
      //   address: '测试地址',
      //   lon: 120.15890473840167,
      //   lat: 29.903062084639853
      // }
      // this.$set(this.clockData, 'clockAddr', location?.address)
      // this.$set(this.clockData, 'clockCoordinate', `${location?.lon},${location?.lat}`)
      // if (this.lastLocationMarker) {
      //   leafLetMap.removeLayer(this.lastLocationMarker)
      // }
      // this.lastLocationMarker = L.marker([location?.lat, location?.lon])
      // leafLetMap.addLayer(this.lastLocationMarker)
      // this.$refs.leafLetMapRef.gotoPoint(location?.lon, location?.lat)
      // this.curLocation = [location?.lon, location?.lat]
    },
    onSubmit(values) {
      let clockFence = this.getClockFence()
      if (!clockFence) {
        return this.$notify({ type: 'warning', message: '您的当前位置不在打卡区域内，无法打卡！' })
      }
      console.log(clockFence)
      let temp = []
      values[this.picFiled].forEach(item => {
        item.url && temp.push(item.url)
      })
      if (values[this.picFiled].length !== temp.length) {
        return this.$notify({ type: 'warning', message: '请上传照片或等待照片上传完成！' })
      }
      let formData = JSON.parse(JSON.stringify(this.clockData))
      formData[this.picFiled] = temp.join(',')
      //  if (!ifinner) {
      //   return this.$notify({ type: 'warning', message: '您的当前位置不在打卡区域内，无法打卡！' })
      // }
      formData.gid = clockFence.id
      subClockIn(formData).then(res => {
        this.$router.go(-1)
      })
    },
    getClockFence() {
      // this.curLocation = [120.15890473840167, 29.903062084639853]
      let pt = turf.point(this.curLocation)
      for (let index = 0; index < this.fences.length; index++) {
        let tempPolygon = []
        let curPolygonCoor = JSON.parse(this.fences[index].coordinate)
        curPolygonCoor.forEach(point => {
          tempPolygon.push([point[1], point[0]])
        })
        let poly = turf.polygon([tempPolygon])
        let ifinner = turf.booleanPointInPolygon(pt, poly)
        if (ifinner) {
          return this.fences[index]
        }
      }
      return null
    },
    cancel() {
      this.$router.go(-1)
    },
    // 电子围栏
    getFence(prjId, fenceId) {
      let param = { projectId: this.currentBiaoDuan.id }
      if (!this.add) {
        param = { projectId: prjId }
        if (fenceId) {
          param.fenceId = fenceId
        }
      }
      getFence(param).then(res => {
        res.forEach(item => {
          this.createFence(JSON.parse(item.coordinate))
        })
        this.fences = res || []
      })
    },
    createFence(latlngs) {
      var polygon = L.polygon(latlngs, { color: 'green' }).addTo(leafLetMap)
      // leafLetMap.fitBounds(polygon.getBounds())
    },
    // 地图回显
    mapEcho() {
      let location = this.$route.params.clockCoordinate.split(',')
      L.marker([location[1], location[0]]).addTo(leafLetMap)
      // let locationEnd = this.$route.params.clockEndCoordinate ? this.$route.params.clockEndCoordinate.split(',') : ''
      // if (locationEnd) {
      //   L.marker([locationEnd[1], locationEnd[0]]).addTo(leafLetMap)
      // }
      this.$refs.leafLetMapRef.gotoPoint(location[0], location[1])
      this.getFence(this.$route.params.projectId, this.$route.params.gid)
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  height: 210px;
  background-color: #ddd;
}
.info {
  height: calc(100% - 210px);
  overflow: auto;
  p.title {
    font-size: 14px;
    padding-left: 15px;
  }
  .btn-con {
    text-align: center;
    display: flex;
    justify-content: space-around;
    padding: 10px 30px;
    .van-button--normal {
      padding: 0px 45px;
    }
  }
}
</style>
