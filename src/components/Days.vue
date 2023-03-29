<template>
  <div>
    <div class="days">
      <span>已安全生产</span>
      <span class="daya">{{ time }}</span>
      <span>天</span>
    </div>
  </div>
</template>
<script>
import { getProjectDetail } from '@/api/project.js'
import { getCurrentDate, diffDay } from '@/utils/date'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      time: 0,
      online: {}
    }
  },
  computed: {
    ...mapGetters(['curProject'])
  },
  watch: {
    curProject: function() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    isNotG235() {
      return this.curProject?.id !== 2
    },
    init() {
      getProjectDetail().then(data => {
        data.starttime && this.initDays(data.starttime)
      })
    },
    initDays(starttime) {
      const start = starttime.split(' ')[0]
      this.time = 0
      this.time = this.isNotG235() ? 0 : diffDay(getCurrentDate(), start)
    }
  }
}
</script>
<style lang="scss" scoped>
.days {
  margin: 12px 0;
  // background-color: #ffffff;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 16px;
  width: 100%;
  color: black;
  position: relative;
  .daya {
    font-size: 36px;
    color: $active-color;
    margin: 0 10px;
    font-weight: bold;
    font-family: 'time', serif;
  }
  .name {
    border-radius: 50%;
    color: white;
    width: 26px;
    height: 26px;
    line-height: 26px;
  }
  .content {
    text-align: right;
    padding-left: 26px;
    text-align: center;
  }
  .online {
    font-weight: bold;
  }
  .unit {
    margin-left: 4px;
  }
  .yz {
    background-color: #1989fa;
  }
  .jl {
    background-color: #07c160;
  }
  .sg {
    background-color: #ff6034;
  }
}
</style>
