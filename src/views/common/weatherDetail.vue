<template>
  <div class="weather-detail">
    <common-chart v-if="show" :options="options" className="echart"></common-chart>
  </div>
</template>
<script>
import CommonChart from '@/components/echarts/CommonChart'
import { getWeather } from '@/api/weather.js'
import { getWeatherImg } from '@/utils/index'
export default {
  components: {
    CommonChart
  },
  data() {
    return {
      echartId: 'weather-detail',
      xAxisData: [],
      xAxisDataBottom: [],
      tem: [],
      temLow: [],
      temWithSym: [],
      yMin: 20,
      yMax: 30,
      options: null,
      show: false
    }
  },
  mounted() {
    getWeather().then(data => {
      if (data.status === 0) {
        let forecasts = data.result.forecasts
        forecasts.forEach((item, index) => {
          this.xAxisData.push(item.text_day)
          this.xAxisDataBottom.push(item.week)
          this.tem.push(item.high)
          this.temLow.push(item.low)
          this.temWithSym.push({
            value: item.high,
            symbol: 'image://' + getWeatherImg(item.text_day)
          })
        })
      }

      this.yMax = this.tem.sort()[0] + 10
      this.yMin = this.temLow.sort()[this.temLow.length - 1] - 10
      this.updateChart()
    })
  },
  methods: {
    updateChart() {
      this.options = this.getOptions();
      this.show = true;
    },
    getOptions() {
      return {
        backgroundColor: '#fff',
        tooltip: {
          show: false
        },
        grid: {
          top: '15%',
          left: '8%',
          right: '8%',
          bottom: '10%'
        },
        xAxis: [
          {
            data: this.xAxisData,
            axisLine: {
              lineStyle: {
                color: '#3b5872',
                width: '2'
              }
            },
            axisTick: {
              alignWithLabel: true
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#00000080'
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: 16,
                fontWeight: '600'
              }
            }
          },
          {
            data: this.xAxisDataBottom,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: {
          min: this.yMin,
          max: this.yMax,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#5e5e5e'
            }
          }
        },
        series: [
          {
            type: 'bar',
            z: 1,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(219, 219, 219,1)'
                  },
                  {
                    offset: 0.3,
                    color: 'rgba(219, 219, 219,.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(219, 219, 219,.1)'
                  }
                ],
                global: false
              }
            },
            barWidth: '40',
            data: this.tem
          },
          {
            name: '',
            type: 'effectScatter',
            rippleEffect: {
              period: 1,
              scale: 2,
              brushType: 'fill'
            },
            z: 2,
            symbolPosition: 'end',
            symbolSize: 5,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  fontSize: 16,
                  position: 'bottom',
                  distance: -20,
                  formatter: function (params) {
                    return `${params.value}°`
                  },
                  fontWeight: '600'
                }
              }
            },
            data: this.temLow
          },
          {
            name: '',
            type: 'effectScatter',
            rippleEffect: {
              period: 1,
              scale: 2,
              brushType: 'fill'
            },
            z: 2,
            symbolPosition: 'end',
            symbolSize: [56, 32],
            symbolOffset: ['0', '0'],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  fontSize: 16,
                  position: 'bottom',
                  distance: -54,
                  formatter: function (params) {
                    return `${params.value}°`
                  },
                  fontWeight: '600'
                }
              }
            },
            data: this.temWithSym
          },
          {
            name: 'A',
            type: 'line',
            z: 1,
            lineStyle: {
              normal: {
                width: 2,
                color: '#000'
              }
            },
            symbolSize: [0, 0],
            data: this.tem
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.weather-detail {
  .echart {
    margin: 2px 0;
    background-color: #ffffff;
    width: 100%;
    height: 260px;
  }
}
</style>
