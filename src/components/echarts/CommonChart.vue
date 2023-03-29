<template>
  <div :id="chartId" :class="className"></div>
</template>
<script>
import { guid } from '@/utils/index'
import e_macarons from '@/plugins/macarons'
import {EleResize} from '@/plugins/eleResize'
let echarts = require('echarts')
export default {
  props: {
    options: {
      type: Object,
      default: {}
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chartId: '',
      myChart: null
    }
  },
  created() {
    this.chartId = `chart${guid()}`
  },
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      let dom = document.getElementById(this.chartId)
      if(!dom){
        return
      }
      this.myChart = echarts.init(dom, e_macarons)
      EleResize.on(dom, () => {
        this.myChart.resize()
      })
      this.myChart.clear()
      this.myChart.setOption(this.options);
    },
    redraw(options) {
        this.myChart.setOption(this.options);
    }
  }
}
</script>
