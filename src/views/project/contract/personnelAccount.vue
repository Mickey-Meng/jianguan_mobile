<template>
  <div>
    <!-- <van-search v-model="name" placeholder="请输入姓名关键词" @search="onSearch" background="transparent" /> -->
    <van-tabs v-model:active="active" @change="changeTab">
      <van-tab title="人员变更">
        <van-list
          :finished="finished0"
          finished-text="我也是有底线的~~"
          @load="getChangeStandingBookList"
          class="common-list common-card"
          :style="{ height: scrollerHeight }"
        >
          <div class="list" v-for="(item, index) in changeList" :key="index">
            <div class="item" @click="toDetail(item, 'change')">
              <p>
                标段：<span>{{ item.projectChildName }}</span>
              </p>
              <p>
                人员变更类型：<span>{{ item.changeTypeName }}</span>
              </p>
              <p>
                变更岗位：<span>{{ item.changePostName }}</span>
              </p>
              <p>
                变更前人员：<span>{{ item.beforePerson }}</span>
              </p>
              <p>
                变更后人员：<span>{{ item.afterPerson }}</span>
              </p>
              <p>
                录入日期：<span>{{ item.subDate }}</span>
              </p>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="人员报审">
        <van-list
          :finished="finished1"
          finished-text="我也是有底线的~~"
          @load="getContractStandingBookList"
          class="common-list common-card"
          :style="{ height: scrollerHeight }"
        >
          <div class="list" v-for="(item, index) in baoShenList" :key="index">
            <div class="item" @click="toDetail(item, 'apply')">
              <p>
                姓名：<span>{{ item.name }}</span>
              </p>
              <p>
                性别：<span>{{ item.gender }}</span>
              </p>
              <p>
                岗位：<span>{{ item.post }}</span>
              </p>
              <p>
                证件名称：<span>{{ item.certificateName }}</span>
              </p>
              <p>
                文化程度：<span>{{ item.education }}</span>
              </p>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="请休假">
        <van-list
          :finished="finished2"
          finished-text="我也是有底线的~~"
          @load="getLeaveStandingBookList"
          class="common-list common-card"
          :style="{ height: scrollerHeight }"
        >
          <div class="list" v-for="(item, index) in LeaveList" :key="index">
            <div class="item" @click="toDetail(item, 'leave')">
              <p>
                请假人：<span>{{ item.leaverPersonName }}</span>
              </p>
              <p>
                请假类型：<span>{{ item.leaverType }}</span>
              </p>
              <p>
                请假时间：<span>{{ item.startTime }} - {{ item.endTime }}</span>
              </p>
              <p>
                工作交接人：<span>{{ item.handoffPerson }}</span>
              </p>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getChangeStandingBook, getContractStandingBook, getLeaveStandingBook } from '@/api/project'
export default {
  computed: {
    ...mapGetters(['currentBiaoDuan']),
    scrollerHeight: function() {
      return window.innerHeight - 135 + 'px'
    }
  },
  data() {
    return {
      finished0: true,
      finished1: true,
      finished2: true,
      title: '人员台账',
      name: '',
      changeList: [],
      baoShenList: [],
      LeaveList: [],
      active: 0
    }
  },
  mounted() {
    this.getChangeStandingBookList()
  },
  methods: {
    // 人员变更
    getChangeStandingBookList() {
      getChangeStandingBook({ projectId: this.currentBiaoDuan.id }).then(res => {
        this.changeList = res
      })
    },
    //人员报审
    getContractStandingBookList() {
      this.baoShenList = []
      getContractStandingBook({ projectId: this.currentBiaoDuan.id }).then(res => {
        if (res.length > 0) {
          res.forEach(item => {
            if (item.personSubs && item.personSubs.length > 0) {
              item.personSubs.forEach(sub => {
                sub.gender = sub.gender == 1 ? '男' : '女'
                // let obj = Object.assign(sub, { processInstanceId: item.person.maps.processInstanceId })
                this.baoShenList.push(sub)
              })
            }
          })
        }
      })
    },
    // 请休假
    getLeaveStandingBookList() {
      getLeaveStandingBook({ projectId: this.currentBiaoDuan.id }).then(res => {
        console.log(res)
        this.LeaveList = res
      })
    },
    changeTab(name, title) {
      if (title == '人员变更' && this.changeList.length == 0) {
        this.getChangeStandingBookList()
      }
      if (title == '人员报审' && this.baoShenList.length == 0) {
        this.getContractStandingBookList()
      }
      if (title == '请休假' && this.LeaveList.length == 0) {
        this.getLeaveStandingBookList()
      }
    },
    toDetail(item, type) {
      let obj = Object.assign({ type: type }, item)
      this.$router.push({ name: 'personnelAccountInfo', params: obj })
    },
    onSearch() {
      console.log(this.name)
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
  font-weight: 400;
  font-size: 14px;
  p {
    margin: 0;
    padding: 0;
    margin-bottom: 15px;
  }
}
</style>
