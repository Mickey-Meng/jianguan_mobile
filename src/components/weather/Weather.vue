<template>
  <div class="weather" @click="gotoWeatherDetail">
    <img class="img center-in-vertical" :src="weatherImg" />
    <span>{{ this.temperature }}°</span>
  </div>
</template>
<script>
import { getWeather } from '@/api/weather.js'
import { getWeatherImg } from '@/utils/index'
export default {
  data() {
    return {
      weatherImgMap: {
        晴: '00',
        多云: '01',
        阴: '02',
        阵雨: '03',
        雷阵雨: '04',
        雷阵雨伴有冰雹: '05',
        雨夹雪: '06',
        小雨: '07',
        中雨: '08',
        大雨: '09',
        暴雨: '10',
        大暴雨: '11',
        特大暴雨: '12',
        阵雪: '13',
        小雪: '14',
        中雪: '15',
        大雪: '16',
        暴雪: '17',
        雾: '18',
        冻雨: '19',
        沙尘暴: '20',
        小到中雨: '21',
        中到大雨: '22',
        大到暴雨: '23',
        暴雨到大暴雨: '24',
        大暴雨到特大暴雨: '25',
        小到中雪: '26',
        中到大雪: '27',
        大到暴雪: '28',
        浮尘: '29',
        扬沙: '30',
        强沙尘暴: '31',
        浓雾: '32',
        龙卷风: '33',
        弱高吹雪: '34',
        轻雾: '35',
        强浓雾: '49',
        霾: '53',
        中度霾: '54',
        重度霾: '55',
        严重霾: '56',
        大雾: '57',
        特强浓雾: '58'
      },
      city: '',
      weather: '',
      weatherImg: '',
      temperature: ''
    }
  },
  created() {
    getWeather().then(data => {
      if (data.status === 0) {
        this.city = data.result.location.name
        this.weather = data.result.now.text
        this.temperature = data.result.now.temp
        this.weatherImg = getWeatherImg(this.weather)
      }
    })
  },
  methods: {
    gotoWeatherDetail() {
      this.$router.push({ path: 'weatherDetail' })
    }
  }
}
</script>
<style lang="scss" scoped>
.weather {
  float: right;
  width: 80px;
  position: relative;
  .img {
    height: 34px;
    float: right;
  }
  span {
    float: right;
    margin-right: 10px;
  }
}
</style>
