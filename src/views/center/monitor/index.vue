<template>
  <div class="monitor-container">
    <van-tabs>
      <van-tab title="视频监控">
        <van-list class="monitor-list" :style="{ height: scrollerHeight }">
          <div
            v-for="(item, index) in list"
            :key="index"
            :class="'common-card list-item ' + (index === list.length - 1 ? 'last' : '')"
            style="background-color: white;"
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
import { getVideoToken, getYcData } from '@/api/project'
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
        {
      "id": 1,
      "name": "池州市急救中心项目1号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K54134283/1.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 126
    },
    {
      "id": 2,
      "name": "池州市急救中心项目2号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K54134283/2.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 126
    },
    {
      "id": 3,
      "name": "池州市急救中心项目3号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K54134283/3.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 126
    },
    {
      "id": 4,
      "name": "池州市急救中心项目4号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K54134283/4.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 126
    },
    {
      "id": 5,
      "name": "池州市急救中心项目5号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K54134283/5.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 126
    },
    {
      "id": 6,
      "name": "池州市急救中心项目6号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K54134283/6.hd.live",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 126
    },
    {
      "id": 7,
      "name": "池州市急救中心项目7号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K54134283/7.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 126
    },
    {
      "id": 8,
      "name": "池州市急救中心项目8号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K54134283/8.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 126
    },
    {
      "id": 9,
      "name": "池州职业技术学院实验实训南区EPC总承包项目1号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K54134316/1.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 130
    },
    {
      "id": 10,
      "name": "池州职业技术学院实验实训南区EPC总承包项目2号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K54134316/2.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 130
    },
    {
      "id": 11,
      "name": "池州职业技术学院实验实训南区EPC总承包项目3号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K54134316/3.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 130
    },
    {
      "id": 12,
      "name": "池州职业技术学院实验实训南区EPC总承包项目4号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K54134316/4.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 130
    },
    {
      "id": 13,
      "name": "池州职业技术学院实验实训南区EPC总承包项目5号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K54134316/5.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 130
    },
    {
      "id": 14,
      "name": "池州职业技术学院实验实训南区EPC总承包项目6号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K54134316/6.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 130
    },
    {
      "id": 15,
      "name": "池州职业技术学院实验实训南区EPC总承包项目7号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K54134316/7.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 130
    },
    {
      "id": 16,
      "name": "池州职业技术学院实验实训南区EPC总承包项目8号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K54134316/8.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 130
    },
    {
      "id": 17,
      "name": "池州职业技术学院实验实训综合提升项目（二期）F+EPC 1号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K09696219/1.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 195
    },
    {
      "id": 18,
      "name": "池州职业技术学院实验实训综合提升项目（二期）F+EPC 2号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K09696219/2.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 195
    },
    {
      "id": 19,
      "name": "池州职业技术学院实验实训综合提升项目（二期）F+EPC 3号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K09696219/3.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 195
    },
    {
      "id": 20,
      "name": "池州职业技术学院实验实训综合提升项目（二期）F+EPC 4号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K09696219/4.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 195
    },
    {
      "id": 21,
      "name": "池州职业技术学院实验实训综合提升项目（二期）F+EPC 5号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K09696219/5.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 195
    },
    {
      "id": 22,
      "name": "池州职业技术学院实验实训综合提升项目（二期）F+EPC 6号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K09696219/6.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 195
    },
    {
      "id": 23,
      "name": "池州职业技术学院实验实训综合提升项目（二期）F+EPC 7号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K09696219/7.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 195
    },
    {
      "id": 24,
      "name": "池州职业技术学院实验实训综合提升项目（二期）F+EPC 8号",
      "type": 2,
      "url": "ezopen://open.ys7.com/K09696219/8.hd.live",
      "deviceNo": "",
      "channelNo": "",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 195
    },
    {
      "id": 25,
      "name": "(球机)池州生态人文纪念园项目 1号",
      "type": 2,
      "url": "ezopen://open.ys7.com/L18119347/1.hd.live",
      "deviceNo": "L18119347",
      "channelNo": "1",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 191
    },
    {
      "id": 26,
      "name": "(球机)池州生态人文纪念园项目 2号",
      "type": 2,
      "url": "ezopen://open.ys7.com/L18119347/2.hd.live",
      "deviceNo": "L18119347",
      "channelNo": "2",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 191
    },
    {
      "id": 27,
      "name": "(球机)池州港乌沙港区公用码头工程 1号",
      "type": 2,
      "url": "ezopen://open.ys7.com/L01047307/1.hd.live",
      "deviceNo": "L01047307",
      "channelNo": "1",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 3
    },
    {
      "id": 28,
      "name": "(球机)池州港乌沙港区公用码头工程 2号",
      "type": 2,
      "url": "ezopen://open.ys7.com/L01047307/2.hd.live",
      "deviceNo": "L01047307",
      "channelNo": "2",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 3
    },
    {
      "id": 29,
      "name": "(球机)池州港乌沙港区公用码头工程 3号",
      "type": 2,
      "url": "ezopen://open.ys7.com/L01047307/3.hd.live",
      "deviceNo": "L01047307",
      "channelNo": "3",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 3
    },
    {
      "id": 30,
      "name": "(球机)池州港乌沙港区公用码头工程 4号",
      "type": 2,
      "url": "ezopen://open.ys7.com/L01047307/4.hd.live",
      "deviceNo": "L01047307",
      "channelNo": "4",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 3
    },
    {
      "id": 31,
      "name": "(球机)池州港乌沙港区公用码头工程 5号",
      "type": 2,
      "url": "ezopen://open.ys7.com/L01047307/5.hd.live",
      "deviceNo": "L01047307",
      "channelNo": "5",
      "geom": [120.1567907, 29.8855307, 85],
      "project": 3
    }
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
      this.list = this.list.filter((e) => e.project === this.$store.state.curProject.child[0].id)
      this.init()
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
        template: "standard" //
      })
    },
    fullScreen(item, index) {

      item?.player?.fullScreen()
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
