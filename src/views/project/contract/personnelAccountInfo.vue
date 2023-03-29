<template>
  <div :style="{ height: scrollerHeight }" class="info">
    <div v-if="formData.type == 'change'">
      <p class="title">基本信息</p>
      <van-cell-group inset>
        <van-field v-model="formData.projectChildName" label="标段" readonly />
        <van-field v-model="formData.recorder" label="填报人" readonly />
        <van-field v-model="formData.subDate" label="填报日期" readonly />
        <!-- <van-field v-model="showTime" label="日期时间" readonly />
        <van-field v-model="formData.clockAddr" label="打卡位置" readonly /> -->
      </van-cell-group>
      <p class="title">变更信息</p>
      <van-cell-group inset>
        <van-field v-model="formData.projectName" label="项目" readonly />
        <van-field v-model="formData.projectChildName" label="标段" readonly />
        <van-field v-model="formData.changeTypeName" label="人员变更类型" readonly />

        <van-field v-model="formData.changePostName" label="变更岗位" readonly />

        <van-field v-model="formData.beforePerson" label="变更前人员" readonly />

        <van-field v-model="formData.beforeCode" label="变更前(执业)资格证书号" readonly />

        <van-field v-model="formData.afterPerson" label="变更后人员" readonly />

        <van-field v-model="formData.afterCode" label="变更后(执业)资格证书号" readonly />
        <van-field v-model="formData.changeUnitName" label="变更单位" readonly />
      </van-cell-group>
      <p class="title">附件</p>
      <van-cell-group inset>
        <upload label="文件上传" :fileList="fileList" :editable="false"></upload>
      </van-cell-group>
    </div>
    <div v-if="formData.type == 'apply'">
      <p class="title">基本信息</p>
      <van-cell-group inset>
        <van-field v-model="formData.name" label="姓名" readonly />
        <van-field v-model="formData.identityId" label="身份证号" readonly />
        <van-field v-model="formData.identityTime" label="有效期" readonly />
        <van-field v-model="formData.gender" label="性别" readonly />
        <van-field v-model="formData.post" label="岗位" readonly />
        <van-field v-model="formData.certificateName" label="证件名称" readonly />
        <van-field v-model="formData.certificateCode" label="证件编号" readonly />
        <van-field v-model="formData.issuer" label="发证单位" readonly />
        <van-field v-model="formData.effectiveTime" label="有效期" readonly />
        <van-field v-model="formData.education" label="文化程度" readonly />
        <upload label="人脸识别" :fileList="fileList" :editable="false"></upload>
      </van-cell-group>
    </div>
    <div v-if="formData.type == 'leave'">
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
    </div>
    <div v-if="formData.type != 'apply'">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { lookUrl, formatImgUrl } from '@/utils/index'
import { listFlowTaskComment } from '@/api/quality'
import Upload from '@/components/common/Upload'
export default {
  components: {
    Upload
  },
  computed: {
    ...mapGetters(['currentBiaoDuan']),
    scrollerHeight: function() {
      return window.innerHeight - 85 + 'px'
    }
  },
  data() {
    return {
      formData: {},
      fileList: [],
      logData: []
    }
  },
  created() {
    let type = this.$route.params.type
    if (type == 'change') {
      this.fileList = this.formatImgUrlArr(this.$route.params.files)
    }
    if (type == 'apply') {
      this.fileList = formatImgUrl(this.$route.params.peoplePic)
    }
    this.formData = this.$route.params
    if (type != 'apply') {
      this.listFlowTaskComment()
    }
  },
  methods: {
    formatImgUrlArr(arr) {
      let urls = []
      arr &&
        arr.forEach(item => {
          urls.push({ url: lookUrl(item.fileId), isImage: true })
        })
      return urls
    },
    listFlowTaskComment() {
      listFlowTaskComment({ processInstanceId: this.$route.params.processInstanceId }).then(res => {
        this.logData = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/steps.scss';
.info {
  overflow: auto;
  p.title {
    font-size: 14px;
    padding-left: 15px;
  }
}
</style>
