<template>
  <div class="app-container">
    <div class="condition">
      <div class="" style="float: left;
    margin-left: 0.26667rem;
    width: 3.2rem;
    background-color: #1989fa;
    color: white;
    position: relative;
    border: 0.02667rem solid #1989fa;
    border-radius: 0.13333rem;
    height: 0.69333rem;
    line-height: 0.69333rem;">
        <!-- <span> {{ this.type }} </span> -->
        进度总览
      </div>
    </div>
    <common-chart v-if="showChart" :options="options" className="echart"></common-chart>
    <div class="no-data" v-if="!showChart">
      <span>无数据！</span>
    </div>
    <div class="condition">
      <div class="" style="float: left;
    margin-left: 0.26667rem;
    width: 3.2rem;
    background-color: #1989fa;
    color: white;
    position: relative;
    border: 0.02667rem solid #1989fa;
    border-radius: 0.13333rem;
    height: 0.69333rem;
    line-height: 0.69333rem;">
        <span> 项目统计</span>
      </div>
      <div
        class="span-container"
        style="
          float: right;
          margin-right: 10px;
          background-color: transparent;
          color: #000000;
          border: 0.02667rem solid #1989fa;
        "
      >
        <span @click="show = true">{{ type }}</span>
      </div>
    </div>
    <common-chart v-if="showCountChart" :options="countOptions" className="echart" ref="countChart"></common-chart>
    <div class="no-data" v-if="!showCountChart">
      <span>无数据！</span>
    </div>
    <common-chart v-if="showCompRateChart" :options="compRateOptions" className="echart"></common-chart>
    <div class="no-data" v-if="!showCompRateChart">
      <span>无数据！</span>
    </div>
    <van-action-sheet v-model="show" :actions="topData" @select="typeChange" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CommonChart from '@/components/echarts/CommonChart'
import {
  getCountIncresConponent,
  getCountConponent,
  getCountIncresConponentGroupGq,
  getGqFirst,
  getpjFirst
} from '@/api/project.js'
import { lineOffset } from '@turf/turf'
export default {
  components: {
    CommonChart
  },
  computed: {
    ...mapGetters(['currentProject', 'currentBiaoDuan'])
  },
  watch: {
    currentProject: function(value) {
      this.getData(value)
    },
    currentBiaoDuan: function(value) {
      this.getData()
    }
  },
  data() {
    return {
      echartId: 'cumulative',
      type: '',
      show: false,
      myChart: null,
      xAxisData: [],
      chartData: [],
      options: null,
      showChart: false,

      showCountChart: false,
      countOptions: null,
      xAxisCountData: [],
      chartCountData: [],
      topData: [],

      showCompRateChart: false,
      compRateOptions: null,
      yAxisCompRateData: [],
      series0CompRateData: [100, 100, 100],
      series1CompRateData: [0, 0, 0]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      // getCountIncresConponent({ projectCode: this.currentProject.value, type: this.timeType.value, conponentType: 'all' }).then(data => {
      //   this.updateChart(data)
      // })

      // getCountConponent({ projectCode: this.currentProject.value, type: this.timeType.value, conponentType: 'all' }).then(data => {
      //   this.updateCountChart(data)
      // })
      getCountIncresConponentGroupGq({
        projectId: this.$store.state.currentBiaoDuan.id,
        type: this.currentProject.value
      }).then(data => {
        this.updateChart(data)
      })

      getGqFirst({
        projectId: this.$store.state.currentBiaoDuan.id,
        type: this.currentProject.value
      }).then(data => {
        this.updateCountChart(data)
      })
    },
    updateChart(data) {
      this.xAxisData = []
      this.chartData = []
      // data.forEach(item => {
      //   this.xAxisData.push(item.name)
      //   this.chartData.push(item.count)
      // })
      let x = []
      let series = []
      let o = []
      if (Object.keys(data)?.length > 0) {
        o = data[Object.keys(data)[0]]
        o.reverse()
        o.forEach(item => {
          x.push(item.name)
        })
      }

      for (let i in data) {
        let num = []
        let lists = data[i]
        lists.reverse()
        if (lists && lists.length > 0) {
          lists.forEach(result => {
            num.push(result.number)
          })
        }
        let obj = {
          name: i,
          type: 'line',
          data: num,
          symbolSize: 1,
          symbol: 'circle',
          smooth: true,
          yAxisIndex: 0,
          showSymbol: false,
          lineStyle: {
            width: 2
            // color: "#00DAFF",
          }
        }
        series.push(obj)
      }
      this.chartData = series
      this.xAxisData = x
      this.drawChart()
    },
    updateCountChart(data) {
      let option = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        tooltip: {},
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'slider',
            backgroundColor: '#F2F5F9',
            fillerColor: '#BFCCE3',
            showDataShadow: false,
            height: 13,
            handleSize: 22,
            right: 60,
            left: 60,
            bottom: 10,
            start: 0,
            end: 45,
            handleSize: '150%', // 手柄大小
            borderColor: 'none',
            handleIcon:
              // "M0,0 v9.7h5 v-9.7h-5 Z", // 画一个长方形
              'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5M36.9,35.8h-1.3z M27.8,35.8 h-1.3H27L27.8,35.8L27.8,35.8z', // 画一个圆形
            handleStyle: {
              color: '#BFCCE3',
              global: true, // 缺省为 false
              shadowBlur: 6,
              shadowColor: 'rgba(123, 154, 204, 0.5)',
              shadowOffsetX: 0, // 阴影偏移x轴多少
              shadowOffsetY: 0 // 阴影偏移y轴多少
            }
          }
        ],
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#363e83'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#363e83 '
            }
          },
          axisLabel: {
            textStyle: {
              color: '#000000',
              fontWeight: 'normal',
              fontSize: '12'
            }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#363e83'
              }
            },
            axisLabel: {
              inside: false,
              interval: 0,
              // rotate: 20,
              formatter: function(value) {
                let str = value.substring(0, value.lastIndexOf('-'))
                return str
              },
              textStyle: {
                color: '#000000',
                fontWeight: 'normal',
                fontSize: '12'
              }
            },
            data: []
          }
        ],
        series: []
      }
      var colorList = [
        '#C1232B',
        '#B5C334',
        '#FCCE10',
        '#E87C25',
        '#27727B',
        '#FE8463',
        '#9BCA63',
        '#FAD860',
        '#F3A43B',
        '#60C0DD',
        '#D7504B',
        '#C6E579',
        '#F4E001',
        '#F0805A',
        '#26C0C0'
      ]

      if (data && data.length > 0) {
        data = data.reverse()
        let series = []
        let gongqu = data[0].list[0].projectcode
        this.initCompRateChart(gongqu)
        data.forEach(item => {
          let obj = JSON.parse(JSON.stringify(option))
          item.ref = 'ref' + item.gongqucode
          item.name = item.gongquname
          series = []
          let m = {
            data: [],
            type: 'bar',
            barWidth: 30,
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex]
                }
              }
            },
            label: {
              show: true,
              position: 'top',
              formatter: '{c}'
            }
          }
          let x = []
          let totalNum = []
          let lists = item.list
          if (lists && lists.length > 0) {
            lists.forEach(result => {
              let { projectname, finish, total, projectcode } = result
              let num = finish || 0
              let to = total || 0
              totalNum.push(to)
              x.push(projectname + '-' + projectcode)
              m.data.push(num)
            })
          }
          if (lists.length <= 4) {
            obj.dataZoom[0].end = 100
          }
          if (lists.length > 4) {
            obj.dataZoom[0].end = 10
          }
          series.push(m)
          obj.tooltip = {
            trigger: 'axis',
            formatter(params) {
              for (x in params) {
                let index = params[x].dataIndex
                let total = totalNum[index]
                let rate = Math.floor((params[x].data / total) * 10000) / 100
                let name = params[x].name.substring(0, params[x].name.lastIndexOf('-'))
                return name + '已完成比例' + ':' + rate + '%'
              }
            }
          }

          obj.xAxis[0].data = x
          obj.series = series
          item.eOptions = obj
        })
        data.sort((a, b) => b.gongqucode - a.gongqucode)
        this.topData = data.reverse()
        if (this.topData.length > 0) {
          this.type = this.topData[0].name
        }
      } else {
        this.topData = []
        this.showCompRateChart = false
      }

      this.drawCountChart()
    },
    typeChange(item) {
      this.type = item.name
      this.show = false
      this.drawCountChart()
      console.log(item)
      this.initCompRateChart(item.list[0].projectcode)
    },
    drawChart() {
      this.showChart = false
      if (this.xAxisData.length === 0) {
        return
      }
      this.$nextTick(() => {
        this.options = this.getOptions()
        this.showChart = true
      })
    },
    drawCountChart() {
      this.showCountChart = false
      if (this.topData.length === 0) {
        return
      }
      this.$nextTick(() => {
        // this.countOptions = this.getCountOptions()
        this.countOptions = this.topData.find(item => item.name === this.type).eOptions
        this.showCountChart = true
        this.$nextTick(() => {
          let that = this
          this.$refs['countChart']?.myChart?.on('click', function(params) {
            let code = params.name.substring(params.name.lastIndexOf('-') + 1)
            that.initCompRateChart(code)
          })
        })
      })
    },
    getCountOptions() {
      return {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        tooltip: {},
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'slider',
            backgroundColor: '#F2F5F9',
            fillerColor: '#BFCCE3',
            showDataShadow: false,
            height: 13,
            handleSize: 22,
            right: 60,
            left: 60,
            bottom: 5,
            start: 0,
            end: 45,
            handleSize: '150%', // 手柄大小
            borderColor: 'none',
            handleIcon:
              // "M0,0 v9.7h5 v-9.7h-5 Z", // 画一个长方形
              'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5M36.9,35.8h-1.3z M27.8,35.8 h-1.3H27L27.8,35.8L27.8,35.8z', // 画一个圆形
            handleStyle: {
              color: '#BFCCE3',
              global: true, // 缺省为 false
              shadowBlur: 6,
              shadowColor: 'rgba(123, 154, 204, 0.5)',
              shadowOffsetX: 0, // 阴影偏移x轴多少
              shadowOffsetY: 0 // 阴影偏移y轴多少
            }
          }
        ],
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#363e83'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#363e83 '
            }
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontWeight: 'normal',
              fontSize: '12'
            }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#363e83'
              }
            },
            axisLabel: {
              inside: false,
              interval: 0,
              // rotate: 20,
              formatter: function(value) {
                let str = value.substring(0, value.lastIndexOf('-'))
                return str
              },
              textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: '12'
              }
            },
            data: this.xAxisCountData
          }
        ],
        series: this.chartCountData
      }
      // return {
      //   tooltip: {
      //     trigger: 'axis',
      //     backgroundColor: 'rgba(255,255,255,0.8)'
      //   },
      //   dataZoom: [
      //     {
      //       id: 'dataZoomX',
      //       type: 'slider',
      //       backgroundColor: '#F2F5F9',
      //       fillerColor: '#BFCCE3',
      //       showDataShadow: false,
      //       height: 13,
      //       handleSize: 22,
      //       right: 60,
      //       left: 60,
      //       bottom: 15,
      //       start: 0,
      //       end: 40,
      //       handleSize: '200%', // 手柄大小
      //       borderColor: 'none',
      //       handleIcon:
      //         // "M0,0 v9.7h5 v-9.7h-5 Z", // 画一个长方形
      //         'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5M36.9,35.8h-1.3z M27.8,35.8 h-1.3H27L27.8,35.8L27.8,35.8z', // 画一个圆形
      //       handleStyle: {
      //         color: '#BFCCE3',
      //         global: true, // 缺省为 false
      //         shadowBlur: 6,
      //         shadowColor: 'rgba(123, 154, 204, 0.5)',
      //         shadowOffsetX: 0, // 阴影偏移x轴多少
      //         shadowOffsetY: 0 // 阴影偏移y轴多少
      //       }
      //     }
      //   ],
      //   grid: {
      //     top: 10,
      //     left: '3%',
      //     right: '4%',
      //     bottom: '15%',
      //     containLabel: true
      //   },
      //   xAxis: [
      //     {
      //       type: 'category',
      //       data: this.xAxisCountData,
      //       axisTick: {
      //         alignWithLabel: true
      //       },
      //       axisLabel: {
      //         show: true,
      //         rotate: 20,
      //         textStyle: {
      //           fontSize: 12
      //         }
      //       },
      //       axisLine: {
      //         lineStyle: {
      //           color: '#000000',
      //           width: 1 // 这里是为了突出显示加上的
      //         }
      //       }
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: 'value',
      //       axisLine: {
      //         lineStyle: {
      //           color: '#000000',
      //           width: 1 // 这里是为了突出显示加上的
      //         }
      //       }
      //     }
      //   ],
      //   series: [
      //     {
      //       type: 'bar',
      //       barWidth: 30,
      //       barGap: 20,
      //       data: this.chartCountData,
      //       itemStyle: {
      //         normal: {
      //           color: '#5BB6FF'
      //         }
      //       }
      //     }
      //   ]
      // }
    },
    getOptions() {
      return {
        legend: {
          show: true,
          right: 'auto',
          top: '5%',
          itemGap: 20,
          itemWidth: 15,
          itemHeight: 10,
          textStyle: {
            color: '#000000'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            label: {
              show: true,
              backgroundColor: '#fff',
              color: '#556677',
              borderColor: 'rgba(0,0,0,0)',
              shadowColor: 'rgba(0,0,0,0)',
              shadowOffsetY: 0
            },
            lineStyle: {
              width: 0
            }
          },
          backgroundColor: '#fff',
          textStyle: {
            color: '#5c6c7c'
          }
        },
        grid: {
          top: '20%',
          left: '10%'
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxisData,
            axisLine: {
              lineStyle: {
                color: '#0173DA'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#000000'
              },
              // 默认x轴字体大小
              fontSize: 12
              // margin:文字到x轴的距离
            },
            boundaryGap: false,
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#0173DA'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#0173DA'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#000000'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#0173DA'
              }
            }
          },
          {
            type: 'value',
            position: 'right',
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#0173DA'
              },
              formatter: '{value}'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#0173DA'
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: this.chartData
      }
      // return {
      //   xAxis: {
      //     type: 'category',
      //     boundaryGap: false,
      //     data: this.xAxisData
      //   },
      //   tooltip: {
      //     trigger: 'axis',
      //     backgroundColor: 'rgba(255,255,255,0.8)'
      //   },
      //   yAxis: {
      //     type: 'value'
      //   },
      //   series: [
      //     {
      //       data: this.chartData,
      //       type: 'line',
      //       itemStyle: {
      //         normal: {
      //           color: '#5BB6FF'
      //         }
      //       },
      //       areaStyle: {}
      //     }
      //   ]
      // }
    },
    initCompRateChart(gongQuProjectCode) {
      this.showCompRateChart = false
      getpjFirst({
        projectId: this.$store.state.currentBiaoDuan.id,
        projectcode: gongQuProjectCode
      }).then(data => {
        let x = []
        let count = []
        let finishCount = []

        if (data && data.length > 0) {
          data.forEach(item => {
            let { list } = item
            if (list && list.length > 0) {
              list.forEach(result => {
                let { finish, sxname, projectname, total } = result
                let num = finish || 0
                let totaln = total || 0
                let frate = Math.floor((num / totaln) * 10000) / 100
                let nrate = 100 - frate
                x.push(sxname)
                finishCount.push(frate)
                count.push(nrate)
              })
            }
            this.yAxisCompRateData = x
            this.series0CompRateData = finishCount
            this.series1CompRateData = count
          })
          this.$nextTick(() => {
            this.compRateOptions = this.drawCompRateChart()
            this.showCompRateChart = true
          })
        }
      })
    },
    drawCompRateChart() {
      this.showCompRateChart = false
      return {
        grid: {
          left: '30%',
          right: '4%',
          bottom: '10%',
          top: '10%'
          // containLabel: true,
        },
        legend: {
          show: true,
          orient: 'horizontal',
          textStyle: {
            color: '#000000'
          },
          data: ['完成比例', '未完成比例'],
          left: '6%',
          top: '5'
        },
        xAxis: [
          {
            type: 'value',

            max: 100, // 设置最大值是多少
            splitNumber: 5, // 设置分几段显示
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value} %', // 给每个数值添加%
              textStyle: {
                color: '#000',
                fontWeight: 'normal',
                fontSize: '14'
              }
            },
            show: true
          }
        ],
        yAxis: {
          type: 'category',
          // data: ["桥面结构", "上部结构", "下部结构"],
          data: this.yAxisCompRateData,
          axisLabel: {
            inside: false,
            interval: 0,
            textStyle: {
              color: '#000000',
              fontWeight: 'normal',
              fontSize: '14'
            }
          }
        },
        series: [
          {
            name: '完成比例',
            type: 'bar',
            stack: 'total',
            itemStyle: {
              normal: {
                color: '#0B9010'
              }
            },
            label: {
              show: true,
              position: 'insideLeft', //在左边显示
              formatter: '{c}%' // 给计算后的数值添加%
            },
            emphasis: {
              focus: 'series'
            },
            data: this.series0CompRateData
          },
          {
            name: '未完成比例',
            type: 'bar',
            barWidth: '20',
            itemStyle: {
              normal: {
                color: '#C93609'
              }
            },
            stack: 'total',
            label: {
              show: true,
              position: 'insideRight', // 在右边显示
              formatter: '{c}%'
            },
            emphasis: {
              focus: 'series'
            },
            data: this.series1CompRateData
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  .no-data {
    height: 60px;
    width: 100%;
    line-height: 60px;
    text-align: center;
  }
  .condition {
    margin: 2px 0;
    background-color: #ffffff;
    height: 38px;
    line-height: 38px;
    text-align: center;
    font-size: 14px;
    width: 100%;
    .span-container,
    .type-container {
      position: relative;
      border: 1px solid $active-color;
      border-radius: 5px;
      height: 26px;
      line-height: 26px;
      margin-top: 6px;
      float: left;
      margin-left: 10px;
      width: 120px;
      background-color: $active-color;
      color: white;
      border: none;
      span {
        float: left;
        margin-left: 10px;
      }
    }
    .type {
      background-color: transparent;
    }
    .type-container {
      background-color: transparent;
      border: none;
      width: 180px;
      float: right;
      margin-right: 10px;
      .item {
        color: black;
        border: 1px solid $active-color;
        border-radius: 5px;
      }
      .select {
        background-color: $active-color;
        color: white;
      }
    }
    .span-container::after {
      position: absolute;
      top: 50%;
      right: 10px;
      margin-top: -5px;
      border: 3px solid;
      border-color: transparent transparent #dcdee0 #dcdee0;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      opacity: 0.8;
      content: '';
    }
  }
  .echart {
    background-color: #ffffff;
    width: 100%;
    height: 360px;
  }
}
</style>
