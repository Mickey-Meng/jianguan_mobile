<template>
  <div :style="{ height: scrollerHeight }" class="info">
    <van-form @submit="onSubmit" :v-model="formData">
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
        <van-field
          label="人员变更类型"
          v-model="formData.changeTypeName"
          is-link
          readonly
          placeholder="请选择"
          @click="showChangeType = true"
          :rules="[{ required: true, message: '请选择人员变更类型' }]"
          v-if="add"
        />
        <van-field v-else v-model="formData.changeTypeName" label="人员变更类型" readonly />

        <van-field
          label="变更岗位"
          v-model="formData.changePostName"
          is-link
          disabled
          placeholder="请选择"
          v-if="add"
        />
        <van-field v-else v-model="formData.changePostName" label="变更岗位" readonly />

        <van-field
          label="变更前人员"
          v-model="formData.beforePerson"
          is-link
          readonly
          placeholder="请选择"
          @click="showBeforePerson = true"
          :rules="[{ required: true, message: '请选择变更前人员' }]"
          v-if="add"
        />
        <van-field v-else v-model="formData.beforePerson" label="变更前人员" readonly />

        <van-field v-model="formData.beforeCode" label="变更前(执业)资格证书号" :readonly="!add" />
        <van-field
          label="变更后人员"
          v-model="formData.afterPerson"
          is-link
          readonly
          placeholder="请选择"
          @click="showAfterPerson = true"
          :rules="[{ required: true, message: '请选择变更后人员' }]"
          v-if="add"
        />
        <van-field v-else v-model="formData.afterPerson" label="变更后人员" readonly />

        <van-field v-model="formData.afterCode" label="变更后(执业)资格证书号" :readonly="!add" />
        <van-field v-model="formData.changeUnitName" label="变更单位" readonly />
      </van-cell-group>
      <p class="title">附件</p>
      <van-cell-group inset>
        <upload label="文件上传" :name="picFiled" :fileList="fileList" :editable="add"></upload>
      </van-cell-group>
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
      <!-- <div v-if="add">
        <approveuser :auditUser="auditUser" :flowKey="flowKey"> </approveuser>
      </div> -->
      <div class="btn-con">
        <!-- <van-button type="default" @click="cancel">取消</van-button> -->
        <van-button type="primary" v-if="add">提交</van-button>
      </div>
    </van-form>
    <van-action-sheet v-model="showChangeType" :actions="changeTypeList" @select="onChangeTypeSelect" />
    <van-action-sheet v-model="showBeforePerson" :actions="beforeUsers" @select="onChangeBeforePerson" />
    <van-action-sheet v-model="showAfterPerson" :actions="afterUsers" @select="onChangeAfterPerson" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNowDate } from '@/utils/date.js'
import { getRoleInfoByUserId, getUserRoleAndCode, addPersonChange } from '@/api/project'
import { submitUserTask, listFlowTaskComment } from '@/api/quality'
import { lookUrl } from '@/utils/index'
import Upload from '@/components/common/Upload'
import approveuser from '@/views/common/approveuser.vue'
export default {
  computed: {
    ...mapGetters(['currentBiaoDuan', 'userinfo', 'curProject']),
    scrollerHeight: function() {
      return window.innerHeight - 85 + 'px'
    }
  },
  components: {
    Upload,
    approveuser
  },
  data() {
    return {
      add: true,
      formData: {},
      showChangeType: false,
      showBeforePerson: false,
      showAfterPerson: false,
      changeTypeList: [], //人员变更类型
      beforeUsers: [], //变更前人员
      afterUsers: [], //变更后人员

      roleInfoList: [],

      fileList: [],
      picFiled: 'files',

      // flowTypes: [
      //   {
      //     key: 'shigongjihe', //施工单位人员变更
      //     flowKey: 'sgdwrybg'
      //   },
      //   {
      //     key: 'jianlijihe', //监理单位合同人员报审
      //     flowKey: 'jldwrybg'
      //   },
      //   {
      //     key: 'quanzijihe', //监理单位合同人员报审
      //     flowKey: 'qzdwrybg'
      //   }
      // ],
      // userRoleParentCode: '',
      logData: [],
      auditUser: {},
      flowKey: ''
    }
  },
  created() {
    if (!this.$route.params.flowKey) {
      this.add = false
      this.fileList = this.formatImgUrl(this.$route.params.files)
      this.formData = Object.assign({}, this.$route.params)
    }
  },
  mounted() {
    if (!this.$route.params.flowKey) {
      this.add = false
      // this.formData = Object.assign({}, this.$route.params)
      this.listFlowTaskComment()
    } else {
      this.flowKey = this.$route.params.flowKey
      this.init()
      this.initForm()
    }
  },
  methods: {
    init() {
      getRoleInfoByUserId({ projectid: this.currentBiaoDuan.id }).then(res => {
        this.roleInfoList = res
        this.changeTypeList = []
        if (res && res.length > 0) {
          let data = JSON.parse(JSON.stringify(res))
          for (let i = 0; i < data.length; i++) {
            for (let j = i + 1; j < data.length; j++) {
              if (data[i].roleid === data[j].roleid) {
                data.splice(j, 1)
                j--
              }
            }
          }
          data.forEach(item => {
            this.changeTypeList.push({
              name: item.rolename,
              roleid: item.roleid
            })
          })
        }
      })
      //获取用户角色
      // getUserRoleAndCode({ projectId: this.currentBiaoDuan.id }).then(res => {
      //   if (res) {
      //     this.userRoleParentCode = res.parentCode
      //   }
      // })
    },
    initForm() {
      this.formData = {
        afterCode: '', //变更后（执业）资格证书号
        afterPerson: '', //变更后人员名
        afterPersonId: null, //变更后人员id
        beforeCode: '', //变更前（执业）资格证书号
        beforePerson: '', //变更前人员名
        beforePersonId: null, //变更前人员id
        changePost: null, //变更岗位id
        changePostName: '', //变更岗位名
        changeReason: '', //变更原因
        changeType: null, //角色id
        changeTypeName: '', //角色名
        changeUnit: this.userinfo.groupid, //组织id
        changeUnitName: this.userinfo.groupname, //组织名
        projectChildId: this.currentBiaoDuan.id, //项目标段id
        projectChildName: this.currentBiaoDuan.name, //项目标段名
        projectId: this.curProject.id, //项目id
        projectName: this.curProject.name, //项目名
        recordId: this.userinfo.id, //变更发起人id
        recorder: this.userinfo.name, //变更发起人名
        subDate: getNowDate() //变更发起时间
      }
    },
    onChangeTypeSelect(item) {
      this.showChangeType = false
      this.formData.changeType = item.roleid
      this.formData.changeTypeName = item.name

      this.formData.changePost = item.roleid //变更岗位id
      this.formData.changePostName = item.name //变更岗位名

      this.beforeUsers = this.roleInfoList.filter(e => e.roleid === item.roleid)
      this.afterUsers = this.roleInfoList.filter(e => e.roleid !== item.roleid)

      this.formData.beforePerson = ''
      this.formData.beforePersonId = null
      this.formData.afterPerson = ''
      this.formData.afterPersonId = null
    },
    onChangeBeforePerson(item) {
      this.showBeforePerson = false
      this.formData.beforePerson = item.name
      this.formData.beforePersonId = item.id
    },
    onChangeAfterPerson(item) {
      this.showAfterPerson = false
      this.formData.afterPerson = item.name
      this.formData.afterPersonId = item.id
    },
    onSubmit(values) {
      // if (!this.userRoleParentCode) {
      //   return this.$notify({ type: 'warning', message: '配置错误、无法获取审批流程，请联系管理员！' })
      // }
      // let flowObj = this.flowTypes.find(e => e.key === this.userRoleParentCode)
      // if (!flowObj) {
      //   return this.$notify({ type: 'warning', message: '配置错误、无法获取审批流程，请联系管理员！' })
      // }
      let temp = []
      values[this.picFiled].forEach(item => {
        item.url &&
          temp.push({
            fileName: item.file.name,
            fileId: item.url,
            uploadPerson: this.userinfo.name,
            uploadPersonId: this.userinfo.id,
            uploadTime: this.moment(new Date()).format('YYYY-MM-DD HH:mm:SS')
          })
      })

      if (values[this.picFiled].length !== temp.length) {
        return this.$notify({ type: 'warning', message: '请上传照片或等待照片上传完成！' })
      }
      let obj = Object.assign({}, this.formData)
      if (temp.length > 0) {
        obj.files = temp
      }
      obj.processDefinitionKey = this.flowKey
      console.log(obj)
      addPersonChange(obj).then(res => {
        this.issueStep(res)
      })
    },
    issueStep(data) {
      let obj = {
        copyData: {},
        flowTaskCommentDto: {
          approvalType: '',
          comment: '',
          delegateAssginee: ''
        },
        masterData: {},
        processInstanceId: data,
        slaveData: {},
        taskId: '',
        taskVariableData: {}
      }
      submitUserTask(obj).then(res1 => {
        this.$router.go(-1)
        return this.$notify({ type: 'success', message: '填报成功！' })
      })
    },
    listFlowTaskComment() {
      listFlowTaskComment({ processInstanceId: this.$route.params.processInstanceId }).then(res => {
        this.logData = res.data
      })
    },
    formatImgUrl(arr) {
      let urls = []
      arr &&
        arr.forEach(item => {
          urls.push({ url: lookUrl(item.fileId), isImage: true })
        })
      return urls
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
