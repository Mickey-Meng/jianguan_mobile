<template>
  <div>
    <common-head :title="title" :showIcon="true" :showSearch="true" @fun="add" @screen="screen"></common-head>
    <van-list
      :finished="finished"
      finished-text="我也是有底线的~~"
      @load="getClockIn"
      class="common-list common-card"
      :style="{ height: scrollerHeight }"
    >
      <div class="list" v-for="(item, index) in clockList" :key="index">
        <div class="item" @click="toDetail(item)">
          <p>人员出勤</p>
          <p>
            标段：<span>{{ item.projectName }}</span>
          </p>
          <p v-if="item.fenceAddrName">
            打卡点：<span>{{ item.fenceAddrName }}</span>
          </p>
          <p>
            打卡位置：<span>{{ item.clockAddr }}</span>
          </p>
          <!-- <div class="timeInfo">
            <div>
              <label>上班 {{ item.clockStartTime ? item.clockStartTime.substring(11, 19) : '' }}</label>
              <label class="addr">{{ item.clockAddr }}</label>
            </div>
            <div>
              <label>下班 {{ item.clockEndTime ? item.clockEndTime.substring(11, 19) : '' }}</label>
              <label class="addr">{{ item.clockEndAddr ? item.clockEndAddr : '未打卡' }}</label>
            </div>
          </div> -->
          <!-- <p>
            上班打卡时间：<span>{{
              item.clockStartTime ? item.clockStartTime.substring(0, 19).replace('T', ' ') : ''
            }}</span>
          </p>
          <p>
            下班打卡时间：<span>{{
              item.clockEndTime ? item.clockEndTime.substring(0, 19).replace('T', ' ') : ''
            }}</span>
          </p> -->
          <div class="info">
            <span class="person">{{ item.attendancePersonName }}</span>
            <!-- <span class="date">{{ item.clockStartTime ? item.clockStartTime.substring(0, 10) : '' }}</span> -->
            <span class="date">{{ item.clockTime ? item.clockTime.substring(0, 19).replace('T', ' ') : '' }}</span>
          </div>
          <label class="status">已打卡</label>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import CommonHead from '@/components/head/CommonHead'

import { getClockIn } from '@/api/project'
import { mapGetters } from 'vuex'
export default {
  components: {
    CommonHead
  },
  computed: {
    ...mapGetters(['currentBiaoDuan']),
    scrollerHeight: function() {
      return window.innerHeight - 85 + 'px'
    }
  },
  data() {
    return {
      finished: true,
      title: '考勤打卡',
      clockList: []
    }
  },
  mounted() {
    this.getClockIn()
  },
  methods: {
    getClockIn() {
      let params = { projectId: this.currentBiaoDuan.id }
      if (JSON.stringify(this.$route.params) !== '{}') {
        params = Object.assign(params, this.$route.params)
      }
      getClockIn(params).then(res => {
        this.clockList = res
      })
    },
    toDetail(item) {
      this.$router.push({ name: 'clockInAdd', params: item })
    },
    add() {
      this.$router.push({ name: 'clockInAdd' })
    },
    screen() {
      this.$router.push({ name: 'searchPage' })
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  padding: 10px 10px;
  margin-bottom: 10px;
  border-bottom: #ebedf0 1px solid;
  background-color: #fff;
  border-radius: 3px;
  position: relative;
  font-weight: 400;
  font-size: 14px;
  p {
    margin: 0;
    padding: 0;
    margin-bottom: 15px;
  }
  .timeInfo {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    & > div {
      background-color: #ededed;
      border-radius: 6px;
      width: 45%;
      & > label {
        display: block;
        padding: 5px;
        margin: 0px;
      }
      .addr {
        color: #999;
        font-size: 12px;
        padding-top: 0px;
      }
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    padding: 0px 5px;
    .person {
      color: #02a7f0;
    }
  }
  label.status {
    display: inline-block;
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: #00bfbf;
    color: #fff;
    border-radius: 2px;
    padding: 2px;
    font-size: 9px;
  }
}
</style>
