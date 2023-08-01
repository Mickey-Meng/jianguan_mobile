<template>
  <div class="overview">
    <div class="content-chart">
      <van-row class="content" v-show="showMiddleData">
        <van-col span="6" v-for="(item, index) in data" :key="index">
          <div class="value" :style="{ color: item.color }">{{ item.value }}</div>
          <div class="name">{{ item.name }}</div>
        </van-col>
      </van-row>
      <van-row class="echart" v-if="showChart" @click="toReport">
        <van-col span="12"><common-chart :options="leftOptions" className="circle"></common-chart></van-col>
        <van-col span="12"><common-chart :options="rightOptions" className="circle"></common-chart></van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import constantField from '@/api/home'
import CommonChart from '@/components/echarts/CommonChart'
import { getMiddleData, getFinishConponent } from '@/api/project.js'
export default {
  components: {
    CommonChart
  },
  data() {
    return {
      data: [
        {
          name: '构件总数量',
          value: 0,
          color: '#1989fa'
        },
        {
          name: '已完成数量',
          value: 0,
          color: '#07c160'
        },
        {
          name: '延期数量',
          value: 0,
          color: '#ee0a24'
        },
        {
          name: '当天完成数量',
          value: 0,
          color: '#1989fa'
        }
      ],
      leftData: [
        { value: 40, name: '已完成' },
        { value: 60, name: '未完成' }
      ],
      rightData: [
        { value: 50, name: '已完成' },
        { value: 50, name: '未完成' }
      ],
      leftOptions: {},
      rightOptions: {},
      showChart: false,
      showMiddleData: false,
      isRequest: false,
      projectTypes: constantField.projectTypes,
      projectType: ''
    }
  },
  computed: {
    ...mapGetters(['currentProject', 'currentBiaoDuan', 'curProject'])
  },
  watch: {
    projectType: function(value) {
      let project = constantField.projectTypes.find(item => item.value === value)
      this.$store.state.currentProject = project
    },
    currentProject: function(value) {
      this.getCurrentMiddleData(value)
      this.getCurrentFinishConponent(value)
    },
    currentBiaoDuan: function() {
      this.init()
      this.getCurrentMiddleData(this.currentProject)
      this.getCurrentFinishConponent(this.currentProject)
    }
  },
  mounted() {
    this.init()
    this.getCurrentMiddleData(this.currentProject)
    this.getCurrentFinishConponent(this.currentProject)
  },
  methods: {
    isNotG235() {
      return this.curProject?.id !== 2
    },
    init() {
      this.projectType = this.projectTypes[0].value
    },
    getCurrentFinishConponent(currentProject) {
      getFinishConponent({ type: currentProject.value, projectId: this.$store.state.currentBiaoDuan.id }).then(data => {
        this.leftData = [
          {
            value: ((data.act.finish / data.act.count) * 100).toFixed(2),
            name: '已完成'
          },
          {
            value: (((data.act.count - data.act.finish) / data.act.count) * 100).toFixed(2),
            name: '未完成'
          }
        ]

        this.rightData = [
          {
            value: ((data.plan.finish / data.plan.count) * 100).toFixed(2),
            name: '已完成'
          },
          {
            value: (((data.plan.count - data.plan.finish) / data.plan.count) * 100).toFixed(2),
            name: '未完成'
          }
        ]

        this.drawChart()
      })
    },
    getCurrentMiddleData(currentProject) {
      this.isRequest = true
      getMiddleData({ projectId: this.$store.state.currentBiaoDuan.id }).then(data => {
        let item = data[currentProject.value]
        this.data[0].value = item ? item.count : 0
        this.data[1].value = item ? item.finish : 0
        this.data[2].value = item ? item.dalay : 0
        this.data[3].value = item ? item.todayFinish : 0
        this.showMiddleData = true
        this.isRequest = false
      })
    },
    typeChange(item) {
      this.type = item.name
      this.show = false
      this.drawChart()
    },
    drawChart() {
      this.showChart = false
      this.leftOptions = this.getOptions('形象完成量', this.leftData)
      this.rightOptions = this.getOptions('计划完成量', this.rightData)
      this.$nextTick(() => {
        this.showChart = true
      })
    },
    getOptions(title, data) {
      return {
        graphic: [
          {
            type: 'text',
            left: '40%',
            top: '37%',
            z: 10,
            style: {
              fill: '#6f9426',
              text: data[0].value + '%',
              font: '14px Microsoft YaHei'
            },
            formatter: '进度：{d}%'
          }
        ],
        tooltip: {
          trigger: 'item',
          formatter: '进度：{d}%',
          backgroundColor: 'rgba(255,255,255,0.8)'
        },
        title: {
          text: title,
          x: 'center',
          y: 'bottom',
          padding: [0, 0, 20, 0],
          textStyle: {
            fontSize: 15
          }
        },
        series: [
          {
            name: title,
            type: 'pie',
            radius: ['38.5%', '49%'],
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
      }
    },
    toReport() {
      this.$router.push({ name: 'report' })
    }
  }
}
</script>
<style lang="scss">
.overview {
  margin: 12px 0;
  .condition {
    background-color: white;
    margin: 2px 0;
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
    .type-container {
      background-color: transparent;
      color: black;
      float: right;
      width: 180px;
      border: 1px solid $active-color;
      border-radius: 5px;
      margin-right: 10px;
    }
    .type-container::after {
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
  .content-chart {
    background-color: white;
    border-radius: 6px;
    margin: 12px 0;
  }
  .content {
    .value {
      text-align: center;
      font-size: 30px;
      margin: 10px 0 0 0;
      font-weight: bold;
      font-family: 'time', serif;
    }
    .name {
      text-align: center;
      margin: 0 0 10px 0;
      font-size: 10px;
    }
  }
  .echart {
    .circle {
      width: 100%;
      height: 200px;
    }
  }
}
</style>
