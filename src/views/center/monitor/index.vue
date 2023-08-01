<template>
  <div class="monitor-container">
    <van-tabs>
      <van-tab title="视频监控">
        <div style="margin-top: 5px;">
          请选择视频： <el-select name="" id="" v-model="selectedVideo" @change="changeVideo()">
            <el-option v-for="(item, index) in list" :key="index" :label="item.name" :value="index">
                </el-option>
          </el-select>
        </div>
        <van-list class="monitor-list" :style="{ height: scrollerHeight }">
          <div
            v-for="(item, index) in list"
            :key="index"
            :class="'common-card list-item ' + (index === list.length - 1 ? 'last' : '')"
            style="background-color: white;"
            v-show="index == selectedVideo"
          >
            <div class="ez-vedio" :id="item.id"></div>
            <div class="content">
              <div class="name" @click="fullScreen(item, index)">{{ item.name }}</div>
            </div>
          </div>
        </van-list>
      </van-tab>
      <!-- <van-tab title="环境监测" disabled style="display:none;">
        <van-list class="sensor-list common-card" :style="{ height: scrollerHeight }">
          <div
            v-for="(item, index) in sensorList"
            :key="index"
            :class="'item ' + (index === list.length - 1 ? 'last' : '')"
          >
            <div class="content">
              <span class="name">监测点：</span>
              <span class="cn-value">{{ item.name }}</span>
            </div>
            <div class="content">
              <span class="name">编码：</span>
              <span class="value">{{ item.code }}</span>
            </div>
            <div class="content">
              <span class="name">温度：</span>
              <span class="value">{{ item.tem }} ℃</span>
            </div>
            <div class="content">
              <span class="name">湿度：</span>
              <span class="value">{{ item.hum }} %RH</span>
            </div>
            <div class="content">
              <span class="name">噪声：</span>
              <span class="value">{{ item.noise }} db</span>
            </div>
            <div class="content">
              <span class="name">PM2.5：</span>
              <span class="value">{{ item.pm25 }} μg/m3</span>
            </div>
            <div class="content">
              <span class="name">PM10：</span>
              <span class="value">{{ item.pm10 }} μg/m3</span>
            </div>
            <div class="content">
              <span class="name">采集时间：</span>
              <span class="time">{{ item.time }}</span>
            </div>
          </div>
        </van-list>
      </van-tab> -->
    </van-tabs>
    <el-row style="position:fixed; bottom: 10px;left:10px;">
      <el-button icon="el-icon-arrow-left" circle @touchstart.native="startCtrl(2)" @touchend.native="stopCtrl"></el-button>
      <el-button icon="el-icon-arrow-right" circle @touchstart.native="startCtrl(3)" @touchend.native="stopCtrl"></el-button>
      <el-button icon="el-icon-arrow-down" circle @touchstart.native="startCtrl(1)" @touchend.native="stopCtrl"></el-button>
      <el-button icon="el-icon-arrow-up" circle @touchstart.native="startCtrl(0)" @touchend.native="stopCtrl"></el-button>
    </el-row>
  </div>
</template>
<script>
import EZUIKit from 'ezuikit-js'
import { getVideoToken, getMonitoring, getYcData } from '@/api/project'
export default {
  computed: {
    scrollerHeight: function() {
      return window.innerHeight - 138 + 'px'
    }
  },
  data() {
    return {
      hls: null,
      refreshing: false,
      finished: false,
      moveActive: false,
      selectedVideo: 0,
      list: [
      ],
      sensorList: [],
      show: false,
      title: '',
      showVideo: false,
      videoToken: ''
    }
  },
  mounted() {
    getVideoToken().then(data => {
      this.videoToken = data
      getMonitoring(this.$store.state.curProject.child[0].id).then((res) => {
        this.list = res.monitorDevices
        this.init()
      });
    })
    this.initSensor()
  },
  methods: {
    initSensor() {
      getYcData().then(data => {
        this.sensorList = data
      })
    },
    init() {
      this.$nextTick(() => {
        this.initVideo()
      })
    },
    initVideo() {
      this.list.forEach((item,index) => {
        this.initEzVideo(item, index)
      })
    },
    initEzVideo(item, index) {
      const that = this;
      if (item.player) {
        return
      }
      let { id, url } = item
      item.player = new EZUIKit.EZUIKitPlayer({
        id,
        accessToken: this.videoToken,
        url,
        width: 320,
        height: 240,
        autoplay: index == 0 ? true : false,
        footer: 'fullScreen',
        template: "standard", //
        handleSuccess: function(){
          that.list.forEach((_item,_index) => {
            if (_item.player && _index != index) {
              _item.player.stop()
            }
          })
        }
      })
    },
    fullScreen(item, index) {

      item?.player?.stop()
      this.selectedVideo=index
    },
    startCtrl(direction) {
      const playerInfo = this.list[this.selectedVideo];
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("accessToken", this.videoToken);
      urlencoded.append("deviceSerial", playerInfo.deviceNo);
      urlencoded.append("channelNo", playerInfo.channelNo);
      urlencoded.append("direction", direction);
      urlencoded.append("speed", "1");

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch("https://open.ys7.com/api/lapp/device/ptz/start", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      
      this.moveActive = true;
    },
    stopCtrl() {
      const playerInfo = this.list[this.selectedVideo];
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("accessToken", this.videoToken);
      urlencoded.append("deviceSerial", playerInfo.deviceNo);
      urlencoded.append("channelNo", playerInfo.channelNo);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch("https://open.ys7.com/api/lapp/device/ptz/stop", requestOptions)
        .then(response => response.text())
        .then(result => {this.moveActive = false;})
        .catch(error => console.log('error', error));

      
    },
    stopVideo() {
      if (this.list.length > 0) {
        this.list.forEach((item) => {
          item.player && item.player.stop();
        });
      }
    },
    changeVideo() {
      this.stopVideo()
      this.list[this.selectedVideo].player && this.list[this.selectedVideo].player.play()
    }
  }
}
</script>
<style lang="scss">
.monitor-container {
  overflow: hidden;
}
.monitor-list {
  overflow-y: auto;
  .list-item {
    overflow: hidden;
    text-align: center;
    .content {
      font-size: 16px;
      font-weight: bold;
      height: 24px;
      line-height: 24px;
    }
    .ez-vedio {
      padding: 5px;
    }
  }
}
.sensor-list {
  overflow-y: auto;
  background: #ffffff;
  overflow-y: auto;
  .item {
    padding: 10px 20px;
    margin-bottom: 5px;
    border-bottom: #ebedf0 1px solid;
    position: relative;
    .content {
      line-height: 26px;
      font-size: 14px;
      .name {
        width: 92px;
        display: inline-block;
        color: #969799;
      }
      .cn-value {
        font-weight: bold;
      }
      .time {
        letter-spacing: 2px;
        font-size: 18px;
        color: $active-color;
        font-weight: bold;
        font-family: 'time', serif;
      }
    }
    .operate {
      position: absolute;
      right: 10px;
      .button {
        margin-right: 10px;
      }
      img {
        width: 48px;
      }
    }
  }
  .last {
    border: none !important;
  }
}
</style>
