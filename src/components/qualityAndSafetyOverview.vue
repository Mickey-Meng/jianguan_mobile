<template>
  <div class="overview">
    <van-row>
      <van-col span="12">
        <div class="span-container overviewType" @click="showOverviewType = true">
          <span>
            {{ this.overviewType }}
          </span>
        </div>
      </van-col>
      <van-col span="12">
        <van-radio-group v-model="count" direction="horizontal" @change="countChange">
          <van-radio :name="1">近一个月</van-radio>
          <van-radio :name="3">近三个月</van-radio>
        </van-radio-group>
      </van-col>
    </van-row>
    <van-row class="echart" v-if="showChart">
      <van-col span="12" @click="toQulityList" v-if="overviewType == '质量总览'"
        ><common-chart :options="qualityOptions" className="circle"></common-chart
      ></van-col>
      <van-col span="12" @click="toSafetyList" v-else
        ><common-chart :options="safetyOptions" className="circle"></common-chart
      ></van-col>
      <van-col span="12" style="padding-top: 26px; padding-right: 20px">
        <div class="echart-info total">
          <span>提出整改</span><span>{{ total }}起</span>
        </div>
        <div class="echart-info finish">
          <span>完成整改</span><span>{{ finish }}起</span>
        </div>
        <div class="echart-info unfinish">
          <span>已逾期</span><span>{{ unfinish }}起</span>
        </div>
      </van-col>
    </van-row>
    <van-action-sheet v-model="showOverviewType" :actions="overviewTypes" @select="overviewTypeChange" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { newInterfaceQuality, newInterfaceSafety } from '@/api/project'
import CommonChart from '@/components/echarts/CommonChart'
export default {
  components: {
    CommonChart
  },
  computed: {
    ...mapGetters(['currentBiaoDuan'])
  },
  watch: {
    currentBiaoDuan: function(value) {
      this.getData()
    }
  },
  data() {
    return {
      // key: value
      count: 3,
      showChart: false,
      overviewType: '安全总览',
      overviewTypes: [{ name: '安全总览' }, { name: '质量总览' }],
      showOverviewType: false,
      qualityData: [
        { value: 0, name: '完成整改' },
        { value: 0, name: '已逾期' }
      ],
      safetyData: [
        { value: 0, name: '提出整改' },
        { value: 0, name: '完成整改' }
      ],
      qualityOptions: {},
      safetyOptions: {},

      total: 0,
      finish: 0,
      unfinish: 0
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      if (this.overviewType == '质量总览') {
        newInterfaceQuality({ count: this.count, projectId: this.currentBiaoDuan.id }).then(res => {
          this.total = 0
          this.finish = 0
          this.unfinish = 0
          res?.total?.forEach(item => {
            this.total += parseInt(item.count)
            this.finish += parseInt(item.finish)
          })
          res?.overdueList?.forEach(item => {
            this.unfinish += parseInt(item.overdue)
          })
          this.qualityData = [
            { value: this.total === 0 ? 0 : ((this.finish / this.total) * 100).toFixed(2), name: '完成整改' },
            {
              value: this.total === 0 ? 0 : ((this.unfinish / this.total) * 100).toFixed(2),
              name: '已逾期'
            }
          ]
          this.drawChart()
        })
      } else {
        newInterfaceSafety({ count: this.count, projectId: this.currentBiaoDuan.id }).then(res => {
          this.total = 0
          this.finish = 0
          this.unfinish = 0
          res?.total?.forEach(item => {
            this.total += parseInt(item.count)
            this.finish += parseInt(item.finish)
          })
          res?.overdueList?.forEach(item => {
            this.unfinish += parseInt(item.overdue)
          })
          this.safetyData = [
            { value: this.total === 0 ? 0 : ((this.finish / this.total) * 100).toFixed(2), name: '完成整改' },
            {
              value: this.total === 0 ? 0 : ((this.unfinish / this.total) * 100).toFixed(2),
              name: '已逾期'
            }
          ]
          this.drawChart()
        })
      }
    },
    drawChart() {
      this.showChart = false
      this.qualityOptions = this.getOptions('质量总览', this.qualityData)
      this.safetyOptions = this.getOptions('安全总览', this.safetyData)
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
            top: '40%',
            z: 10,
            style: {
              fill: '#388BF5',
              text: data[0].value + '%',
              font: 'bolder 14px Microsoft YaHei'
            },
            formatter: '进度：{d}%'
          },
          {
            type: 'text',
            left: '35%',
            top: '55%',
            z: 10,
            style: {
              fill: '#000',
              text: '整改完成率',
              font: '13px Microsoft YaHei'
            },
            formatter: '进度：{d}%'
          }
        ],
        tooltip: {
          trigger: 'item',
          formatter: '进度：{d}%',
          backgroundColor: 'rgba(255,255,255,0.8)'
        },
        // title: {
        //   text: title,
        //   x: 'center',
        //   y: 'bottom',
        //   padding: [0, 0, 20, 0],
        //   textStyle: {
        //     fontSize: 15
        //   }
        // },
        color: ['#388BF5', '#F0F0F0'],
        series: [
          {
            name: title,
            type: 'pie',
            radius: ['55%', '65%'],
            center: ['50%', '50%'],
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
    countChange() {
      this.getData()
    },
    toQulityList() {
      this.$router.push({ path: '/record' })
    },
    toSafetyList() {
      this.$router.push({ path: '/securityRecord' })
    },
    overviewTypeChange(item) {
      this.showOverviewType = false
      this.overviewType = item.name
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.overview {
  margin: 12px 0;
  background-color: white;
  border-radius: 6px;
  padding-top: 10px;
  .span-container {
    position: relative;
    border: 1px solid $active-color;
    border-radius: 5px;
    height: 26px;
    line-height: 26px;
    span {
      float: left;
      margin-left: 10px;
    }
  }
  .overviewType {
    float: left;
    margin-left: 10px;
    width: 120px;
    background-color: $active-color;
    color: white;
    border: none;
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
  .circle {
    width: 100%;
    height: 160px;
  }
  .echart-info {
    margin-top: 8px;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    &.total {
      background-color: #ebf3fe;
      color: #3689f4;
    }
    &.finish {
      background-color: #eef8f0;
      color: #67c377;
    }
    &.unfinish {
      background-color: #feefea;
      color: #f65c36;
    }
  }
}
</style>
