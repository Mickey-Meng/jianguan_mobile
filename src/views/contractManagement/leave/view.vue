<template>
  <div class="info">
    <van-form :v-model="formData">
      <p class="title">基本信息</p>
      <van-cell-group inset>
        <van-field v-model="formData.leaverPersonName" label="请假人" readonly />

        <van-field v-model="formData.leaverType" label="请假类型" readonly />
        <van-field v-model="formData.startTime" label="开始时间" readonly />

        <van-field v-model="formData.endTime" label="结束时间" readonly />

        <van-field v-model="formData.leaveDay" label="请假天数" readonly />
        <van-field v-model="formData.handoffPerson" label="工作交接人" readonly />
        <van-field v-model="formData.leaveReason" label="请假原因" readonly />
        <van-field v-model="formData.remark" label="备注" readonly />
      </van-cell-group>
      <!-- <div v-if="!add">
        <p class="title">审批记录</p>
        <van-cell-group inset>
          <van-steps direction="vertical" :active="0">
            <van-step v-for="(item, index) in logData" :key="index">
              <h3>{{ item.taskName }}</h3>
              <p>执行人：{{ item.createName }}</p>
              <p>操作：{{ item.approvalType }}</p>
              <p>审批意见：{{ item.comment }}</p>
              <p>处理时间：{{ item.createTime }}</p>
            </van-step>
          </van-steps>
        </van-cell-group>
      </div>
      <div class="btn-con">
        <van-button type="primary" v-if="add">提交</van-button>
      </div> -->
    </van-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getLeaveByProcessId } from '@/api/project'
import { getToken } from '@/utils/auth'
export default {
  computed: {
    ...mapGetters(['currentBiaoDuan'])
  },
  data() {
    return {
      formData: {}
    }
  },
  methods: {
    getDetail(id) {
      let type = getToken('taskType')
      let obj = {
        projectId: this.currentBiaoDuan.id,
        businessKey: id,
        type: type
      }
      getLeaveByProcessId(obj).then(res => {
        if (res) {
          this.formData = res.ZjPersonLeave
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  overflow: auto;
  p.title {
    font-size: 14px;
    padding-left: 15px;
  }
}
</style>
