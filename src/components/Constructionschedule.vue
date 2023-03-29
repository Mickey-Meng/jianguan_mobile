<template>
  <div class="app-container">
    <div class="condition">
      <div class="span-container">
        <span> 各类构件进度 </span>
      </div>
    </div>
    <common-chart v-if="show" :options="options" className="mychart"></common-chart>
  </div>
</template>
<script>
import CommonChart from '@/components/echarts/CommonChart'
export default {
  components: {
    CommonChart
  },
  data() {
    return {
      options: null,
      show: false
    }
  },
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      this.options = this.getOptions();
      this.show = true;
    },
    getOptions() {
      return {
        tooltip: {
          trigger: 'axis',
          backgroundColor: "rgba(255,255,255,0.8)",
        },
        grid: {
          left: 5,
          top: 0,
          bottom: 50,
          right: 20,
          containLabel: true
        },
        legend: {
          data: ['总数量', '已完成'],
          x: 'center',
          y: 'bottom',
          padding: [0, 0, 20, 0]
        },
        xAxis: [
          {
            type: 'value',
            boundaryGap: [0, 0.01]
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: ['桩基', '承台', '桥台', '立柱', '盖梁', '预制小箱梁', '现浇箱梁', '钢梁', '组合梁', '铺装', '伸缩缝']
          }
        ],
        series: [
          {
            name: '总数量',
            type: 'bar',
            data: [1307, 467, 9, 649, 318, 1158, 22, 61, 83, 138, 149],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'right',
                  textStyle: {
                    fontSize: 12
                  }
                }
              }
            }
          },
          {
            name: '已完成',
            type: 'bar',
            data: [1235, 390, 3, 544, 249, 829, 12, 25, 78, 1, 0],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'right',
                  textStyle: {
                    fontSize: 12
                  }
                }
              }
            }
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  .mychart {
    width: 100%;
    height: 400px;
    background-color: #ffffff;
  }
  .condition {
    margin: 2px 0;
    background-color: #ffffff;
    height: 38px;
    line-height: 38px;
    text-align: center;
    font-size: 14px;
    width: 100%;
    .span-container {
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
  }
}
</style>
