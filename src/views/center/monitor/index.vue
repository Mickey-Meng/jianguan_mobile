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
              <div class="name" @click="fullScreen(item)">{{ item.name }}</div>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="环境监测">
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
      </van-tab>
    </van-tabs>
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
      list: [
        {
          id: 1,
          name: '一工区檀树山隧道',
          type: 2,
          url: 'ezopen://open.ys7.com/E61698613/1.hd.live',
          geom: [120.1567907, 29.8855307, 85]
        },
        {
          id: 2,
          name: '四工区杭金衢分离大桥',
          type: 2,
          url: 'ezopen://open.ys7.com/E58345532/1.hd.live',
          geom: [120.1156281, 29.5812506, 85]
        },
        {
          id: 3,
          name: '二工区灵山坞1号桥',
          type: 2,
          url: 'ezopen://open.ys7.com/E60311014/1.hd.live',
          geom: [120.103017, 29.8084805, 85]
        },
        {
          id: 4,
          name: '三工区草塔互通主线1号桥',
          type: 2,
          url: 'ezopen://open.ys7.com/E32519666/1.hd.live',
          geom: [120.1042696, 29.7006086, 85]
        },
        {
          id: 5,
          name: '三工区李家磨隧道',
          type: 2,
          url: 'ezopen://open.ys7.com/G65006040/1.hd.live',
          geom: [120.1059507, 29.7048416, 85]
        },
        {
          id: 6,
          name: '尖山隧道2#摄像头',
          type: 2,
          url: 'ezopen://open.ys7.com/J24350539/1.live',
          geom: [120.1132692, 29.6193488, 85]
        },
        {
          id: 7,
          name: '李家磨隧道临时堆放场',
          type: 2,
          url: 'ezopen://open.ys7.com/G73754116/1.live',
          geom: [120.1057611, 29.7042244, 85]
        },
        {
          id: 8,
          name: '1#场站1号摄像头',
          type: 2,
          url: 'ezopen://open.ys7.com/E61698579/1.hd.live',
          geom: [120.148124, 29.875247, 85]
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
      this.list.forEach(item => {
        this.initEzVideo(item)
      })
    },
    initEzVideo(item) {
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
        autoplay: true,
        footer: 'fullScreen'
      })
    },
    fullScreen(item) {
      item?.player?.fullScreen()
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
