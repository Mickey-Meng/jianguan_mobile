<template>
  <div class="app-container">
    <div class="condition">
      <div class="span-container">
        <span> 近30天内安全文明事件统计 </span>
      </div>
    </div>
    <van-row class="echart" v-if="showChart">
      <van-col span="12"><common-chart :options="leftOptions" className="circle"></common-chart></van-col>
      <van-col span="12"><common-chart :options="rightOptions" className="circle"></common-chart></van-col>
    </van-row>
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
      leftOptions: {},
      rightOptions: {},
      showChart: false
    }
  },
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      this.leftOptions = this.getOptions('安全施工', [
        { value: 1, name: '待整改' },
        { value: 3, name: '已整改' }
      ]);
      this.rightOptions = this.getOptions('安全施工', [
        { value: 1, name: '待整改' },
        { value: 3, name: '已整改' }
      ]);
      this.showChart = true;
    },
    getOptions(title, data) {
      return {
        color: ['#ee0a24', '#1989fa'],
        graphic: [
          {
            type: 'text',
            left: '30%',
            top: '30%',
            z: 10,
            style: {
              fill: '#ee0a24',
              text: '待整改：' + data[0].value,
              font: '16px Microsoft YaHei'
            }
          },
          {
            type: 'text',
            left: '30%',
            top: '44%',
            z: 10,
            style: {
              fill: '#1989fa',
              text: '已整改：' + data[1].value,
              font: '16px Microsoft YaHei'
            }
          }
        ],
        tooltip: {
          trigger: 'item',
          //   formatter: '已整改：{d}%',
          backgroundColor: 'rgba(255,255,255,0.8)'
        },
        title: {
          text: title,
          x: 'center',
          y: 'bottom',
          padding: [0, 0, 20, 0]
        },
        series: [
          {
            name: title,
            type: 'pie',
            radius: ['55%', '70%'],
            center: ['50%', '40%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            data: data
          }
        ]
      };
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
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
      background-color: $active-color;
      color: white;
      border: none;
      span {
        float: left;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
  .echart {
    background-color: #ffffff;
    .circle {
      width: 100%;
      height: 200px;
    }
  }
}
</style>
