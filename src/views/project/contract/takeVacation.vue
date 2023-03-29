<template>
  <div>
    <common-head :title="title" :showIcon="true" :showSearch="true" @fun="add" @screen="screen"></common-head>
    <van-list
      :finished="finished"
      finished-text="我也是有底线的~~"
      @load="getLeaveList"
      class="common-list common-card"
      :style="{ height: scrollerHeight }"
    >
      <div class="list" v-for="(item, index) in dataList" :key="index">
        <div class="item" @click="toDetail(item)">
          <p>请休假</p>
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
          <!-- <label>已完成</label> -->
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import CommonHead from '@/components/head/CommonHead'
import { getLeave, getUserRoleAndCode } from '@/api/project'
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
  mounted() {
    this.getLeaveList()
  },
  data() {
    return {
      finished: true,
      title: '请休假',
      dataList: [],
      userRoleParentCode: '',
      flowTypes: [
        {
          key: 'shigongjihe', //施工单位人员请假
          flowKey: 'sgdwryqj'
        },
        {
          key: 'jianlijihe', //监理单位人员请假
          flowKey: 'jldwryqj'
        },
        {
          key: 'quanzijihe', //全咨单位人员请假
          flowKey: 'qzdwryqj'
        }
      ]
    }
  },
  methods: {
    getLeaveList() {
      getLeave({ projectId: this.currentBiaoDuan.id }).then(res => {
        this.dataList = res
      })
      getUserRoleAndCode({ projectId: this.currentBiaoDuan.id }).then(data => {
        if (data) {
          this.userRoleParentCode = data.parentCode
        }
      })
    },
    toDetail(item) {
      this.$router.push({ name: 'takeVacationAdd', params: item })
    },
    add() {
      if (!this.userRoleParentCode) {
        return this.$notify({ type: 'warning', message: '无权限，请联系管理员！' })
      }
      let flowObj = this.flowTypes.find(e => e.key === this.userRoleParentCode)
      if (!flowObj) {
        return this.$notify({ type: 'warning', message: '无权限，请联系管理员！' })
      }
      this.$router.push({ name: 'takeVacationAdd', params: { flowKey: flowObj.flowKey } })
    },

    screen() {}
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
