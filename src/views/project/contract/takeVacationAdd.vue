<template>
  <div :style="{ height: scrollerHeight }" class="info">
    <van-form @submit="onSubmit" :v-model="formData">
      <div class="head">
        <span>基本信息</span>
        <van-button class="operate" type="primary" size="mini" v-if="add">提交</van-button>
      </div>
      <van-cell-group inset>
        <van-field v-model="formData.leaverPersonName" label="请假人" readonly />
        <van-field
          label="请假类型"
          v-model="formData.leaverType"
          is-link
          readonly
          placeholder="请选择"
          @click="showLeaverType = true"
          v-if="add"
        />
        <van-field v-else v-model="formData.leaverType" label="请假类型" readonly />
        <van-field
          v-model="formData.startTime"
          is-link
          readonly
          name="calendar"
          label="开始时间"
          placeholder="点击选择日期"
          @click="showBeginPicker = true"
          :rules="[{ required: true, message: '请选择开始时间' }]"
          v-if="add"
        />
        <van-field v-else v-model="formData.startTime" label="开始时间" readonly />

        <van-field
          v-model="formData.endTime"
          is-link
          readonly
          name="calendar"
          label="结束时间"
          placeholder="点击选择日期"
          @click="showEndPicker = true"
          :rules="[{ required: true, message: '请选择结束时间' }]"
          v-if="add"
        />
        <van-field v-else v-model="formData.endTime" label="结束时间" readonly />

        <van-field v-model="formData.leaveDay" label="请假天数" readonly />
        <van-field
          label="工作交接人"
          v-model="formData.handoffPerson"
          is-link
          readonly
          placeholder="请选择"
          @click="showhandoffPerson = true"
          v-if="add"
        />
        <van-field v-else v-model="formData.handoffPerson" label="工作交接人" readonly />
        <van-field
          v-model="formData.leaveReason"
          label="请假原因"
          :readonly="!add"
          :rules="[{ required: true, message: '请输入请假原因' }]"
        />
        <van-field v-model="formData.remark" label="备注" :readonly="!add" />
      </van-cell-group>
      <!-- <div v-if="add">
        <approveuser :auditUser="auditUser" :flowKey="flowKey"> </approveuser>
      </div> -->
      <!-- <div class="btn-con">
        <van-button type="primary" v-if="add">提交</van-button>
      </div> -->
    </van-form>
    <flowStep :flowTypes="flowTypes" :step="flowStep"></flowStep>
    <div v-if="!add">
      <p class="title">审批记录</p>
      <van-cell-group inset>
        <van-steps direction="vertical" :active="logData.length - 1">
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
    <van-action-sheet v-model="showLeaverType" :actions="eventType" @select="onLeaverTypeSelect" />
    <van-action-sheet v-model="showhandoffPerson" :actions="handoffPerson" @select="onhandoffPersonSelect" />
    <van-popup v-model="showBeginPicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        @confirm="beginConfirm"
        @cancel="showBeginPicker = false"
      />
    </van-popup>
    <van-popup v-model="showEndPicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        @confirm="endConfirm"
        @cancel="showEndPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDic } from '@/api/userauth'
import { getRoleInfoByUserId, getUserRoleAndCode, submitLeave } from '@/api/project'
import { getFlowAuditEntry, submitUserTask, listFlowTaskComment } from '@/api/quality'
import { diff, getTotal, getNowDate } from '@/utils/date'
import { formatISO8601Time } from '@/utils/index'
import approveuser from '@/views/common/approveuser.vue'
import flowStep from '@/views/common/flowStep.vue'
export default {
  computed: {
    ...mapGetters(['userinfo', 'currentBiaoDuan', 'curProject']),
    scrollerHeight() {
      return window.innerHeight - 85 + 'px'
    }
  },
  components: {
    approveuser,
    flowStep
  },
  data() {
    return {
      add: true,
      formData: [],
      handoffPerson: [], //工作交接可选人
      eventType: [],
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
      ],
      showLeaverType: false,
      showhandoffPerson: false,
      currentDate: new Date(),
      showBeginPicker: false,
      showEndPicker: false,

      logData: [],

      auditUser: {},

      workTime: {
        startWorkTime: 8.5, //上班时间
        endWorkTime: 18, //下班时间
        startFreeTime: 12, //午休开始时间
        endFreeTime: 13.5, //午休结束时间
        excludeFreeTime: true, //是否去除午休时间
        excludeDates: [] //剔除日期数组
      },
      flowKey: '',
      flowStep: 0
    }
  },
  mounted() {
    console.log(this.$route.params)
    if (this.$route.params.flowKey) {
      this.flowKey = this.$route.params.flowKey
      this.init()
    } else {
      this.add = false
      this.formData = Object.assign({}, this.$route.params)
      this.listFlowTaskComment()
    }
  },
  methods: {
    init() {
      getDic('qjlx').then(data => {
        this.eventType = data.qjlx
      })
      getRoleInfoByUserId({ projectid: this.currentBiaoDuan.id }).then(data => {
        this.handoffPerson = data.filter(e => e.id !== this.userinfo.id)
      })
      //获取用户角色
      // getUserRoleAndCode({ projectId: this.currentBiaoDuan.id }).then(data => {
      //   if (data) {
      //     this.userRoleParentCode = data.parentCode
      //   }
      // })
      this.initForm()
    },
    initForm() {
      this.formData = {
        startTime: '', //开始时间
        endTime: '', //结束时间
        handoffPerson: '', //工作交接人
        handoffPersonId: null, //交接人ID
        leaveDay: null, //请假天数
        leavePersonId: this.userinfo.id, //leavePersonId
        leaverPersonName: this.userinfo.name, //leaverPersonName
        leaveReason: '', //leaveReason
        leaverType: '', //请假类型id
        projectId: this.currentBiaoDuan.id, //项目id
        remark: '', //备注
        subDate: '' //填报时间
      }
    },
    onLeaverTypeSelect(item) {
      this.showLeaverType = false
      this.formData.leaverType = item.name
    },
    onhandoffPersonSelect(item) {
      this.showhandoffPerson = false
      this.formData.handoffPerson = item.name
      this.formData.handoffPersonId = item.id
    },
    beginConfirm(time) {
      this.showBeginPicker = false
      this.formData.startTime = formatISO8601Time(new Date(time).toJSON())
      this.calcLeaveDay()
    },
    endConfirm(time) {
      this.showEndPicker = false
      this.formData.endTime = formatISO8601Time(new Date(time).toJSON())
      this.calcLeaveDay()
    },
    // 计算请假天数
    calcLeaveDay() {
      if (this.formData.startTime !== '' && this.formData.endTime !== '') {
        let h = diff(this.formData.endTime, this.formData.startTime) //时间差
        if (h <= 0) {
          this.formData.endTime = ''
          return this.$notify({ type: 'warning', message: '结束时间需大于开始时间!' })
        }
        let obj = Object.assign({}, this.workTime)
        obj.beginAt = this.formData.startTime
        obj.endAt = this.formData.endTime
        let leaveHours = getTotal(obj)

        let wholeWorkTime =
          this.workTime.startFreeTime -
          this.workTime.startWorkTime +
          this.workTime.endWorkTime -
          this.workTime.endFreeTime
        // console.log("上班总时长："+wholeWorkTime);
        let day = leaveHours / wholeWorkTime
        let arrDay = day.toString().split('.')
        if (arrDay[0] > 0) {
          let xs = day - arrDay[0]
          // xs =parseFloat('0.'+xs)
          if (xs > 0 && xs < 0.5) {
            day = parseInt(arrDay[0]) + 0.5
          } else if (xs > 0.5) {
            day = parseInt(arrDay[0]) + 1
          }
        } else {
          if (day > 0 && day < 0.5) {
            day = 0.5
          } else if (day > 0.5) {
            day = 1
          }
        }
        this.formData.leaveDay = day + ''
      }
    },
    onSubmit() {
      // if (!this.userRoleParentCode) {
      //   return this.$notify({ type: 'warning', message: '配置错误、无法获取审批流程，请联系管理员！' })
      // }
      // let flowObj = this.flowTypes.find(e => e.key === this.userRoleParentCode)
      // if (!flowObj) {
      //   return this.$notify({ type: 'warning', message: '配置错误、无法获取审批流程，请联系管理员！' })
      // }
      let obj = Object.assign({}, this.formData)
      obj.subDate = getNowDate()
      obj.processDefinitionKey = this.flowKey
      submitLeave(obj).then(data => {
        this.issueStep(data)
      })
    },
    issueStep(params) {
      getFlowAuditEntry({
        flowKey: this.flowKey,
        buildSection: this.currentBiaoDuan.id,
        projectId: this.curProject.id
      }).then(res => {
        let arr = []
        let { data } = res
        for (let i in data) {
          arr = arr.concat(data[i])
        }
        let userMap = {}
        arr.forEach(item => {
          let value = item.entryUserVariable
          userMap[value] = item.userNames.toString()
        })
        userMap.startUserName = this.userinfo.name
        let obj = {
          copyData: {},
          flowTaskCommentDto: {
            approvalType: '',
            comment: '',
            delegateAssginee: ''
          },
          masterData: {},
          processInstanceId: params,
          slaveData: {},
          taskId: '',
          taskVariableData: userMap
        }
        submitUserTask(obj).then(res1 => {
          this.$router.go(-1)
          return this.$notify({ type: 'success', message: '填报成功！' })
        })
      })
    },
    listFlowTaskComment() {
      listFlowTaskComment({ processInstanceId: this.$route.params.processInstanceId }).then(res => {
        this.logData = res.data
        this.flowStep = this.logData.length > 0 ? this.logData.length - 1 : 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/steps.scss';
.info {
  overflow: auto;
  .head {
    height: 36px;
    line-height: 36px;
    padding: 0 20px;
    .operate {
      float: right;
      margin-top: 5px;
      width: 80px;
    }
  }
  .title {
    margin-left: 20px;
  }
  .btn-con {
    text-align: center;
    display: flex;
    justify-content: space-around;
    padding: 10px 30px;
    .van-button--normal {
      padding: 0px 45px;
    }
  }
}
</style>
