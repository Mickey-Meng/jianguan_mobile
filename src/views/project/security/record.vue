<template>
  <div class="report-record">
    <van-cell-group inset class="common-card" style="margin-bottom: 0" ref="queryGroup">
      <van-field
        label="工程名称"
        v-model="queryItem.name"
        is-link
        readonly
        placeholder="请选择工程名称"
        @click="showPorjectSelect = true"
      />
      <van-field
        label="状态"
        v-model="queryItem.statusName"
        is-link
        readonly
        placeholder="请选择状态"
        @click="showStatusSelect = true"
      />
    </van-cell-group>
    <van-list
      :finished="finished"
      finished-text="我也是有底线的~~"
      @load="onLoad"
      class="common-list common-card"
      :style="{ height: scrollerHeight }"
    >
      <div
        @click="itemClick(item, 0)"
        v-for="(item, index) in listTemp"
        :key="index"
        :class="'item ' + (index === listTemp.length - 1 ? 'last' : '')"
      >
        <div class="content">
          <span class="name">工区名称：</span>
          <span class="value">{{ getGongQuName(item) }}</span>
        </div>
        <div class="content">
          <span class="name">工程名称：</span>
          <span class="value">{{ getProjectName(item) }}</span>
        </div>
        <div class="content">
          <span class="name">检查大项：</span>
          <span class="value">{{ item.safefirstname }}</span>
        </div>
        <div class="content">
          <span class="name">检查小项：</span>
          <span class="value">{{ item.safesecondname }}</span>
        </div>
        <div class="content">
          <span class="name">检查人员：</span>
          <span class="value">{{ item.uploadname }}</span>
        </div>
        <div class="content">
          <span class="name">检查日期：</span>
          <span class="value">{{ item.uploadtime }}</span>
        </div>
        <div class="content">
          <span class="name">整改人员：</span>
          <span class="value">{{ item.modifyname }}</span>
        </div>
        <div class="content" v-if="item.modifydate">
          <span class="name">整改期限：</span>
          <span class="value">{{ item.modifydate }} (天)</span>
        </div>
        <div class="content" v-if="item.modifytime">
          <span class="name">整改日期：</span>
          <span class="value">{{ item.modifytime }}</span>
        </div>
        <div class="content">
          <span class="name">事件状态：</span>
          <span :class="'value ' + statusColor[item.status || 0]">{{ statusName[item.status || 0] }}</span>
        </div>
      </div>
    </van-list>
    <van-action-sheet v-model="showPorjectSelect" :actions="projectActions" @select="onProjectSelect" />
    <van-action-sheet v-model="showStatusSelect" :actions="statusActions" @select="onStatusSelect" />
  </div>
</template>
<script>
import { getGongQuProject, getProject, getAllStatusSafeEvent } from '@/api/project.js'
export default {
  components: {},
  data() {
    return {
      list: [],
      listTemp: [],
      refreshing: false,
      finished: false,
      showDelay: false,
      delayItem: {},
      statusName: ['提交事件', '申请延期', '提交整改', '确认整改'],
      statusColor: ['common-status-0', 'common-status-1', 'common-status-2', 'common-status-3'],
      queryItem: {},
      showPorjectSelect: false,
      scrollerHeight: '',
      projectActions: [],
      gongQu: [],
      showStatusSelect: false,
      statusActions: [
        { name: '所有状态', status: -1 },
        { name: '待审核', status: 1 },
        { name: '待整改', status: 2 },
        { name: '确认整改', status: 3 }
      ]
    }
  },
  mounted() {
    this.scrollerHeight = window.innerHeight - 100 - this.$refs['queryGroup'].offsetHeight + 'px'
    this.onStatusSelect(JSON.parse(JSON.stringify(this.statusActions[0])))
  },
  created() {
    this.getAllGongQu()
  },
  methods: {
    getAllGongQu() {
      getGongQuProject().then(data => {
        this.gongQu = data
        this.getAllProject()
      })
    },
    getAllProject() {
      getProject().then(data => {
        let defaultItem = { name: '所有工程', projectid: null }
        let temps = [defaultItem]
        data.forEach(item => {
          temps.push({ ...item, ...{ name: item.projectname } })
        })
        this.projectActions = temps
        this.onProjectSelect(JSON.parse(JSON.stringify(defaultItem)))
      })
    },
    getGongQuName(item) {
      let gongquItem = this.gongQu.find(gongQuItem => gongQuItem.id === item.gongquid)
      if (gongquItem) {
        return gongquItem.name
      } else {
        return ''
      }
    },
    getProjectName(item) {
      let projectItem = this.projectActions.find(projectItem => projectItem.groupid === item.singleProjectId)
      if (projectItem) {
        return projectItem.projectname
      } else {
        return ''
      }
    },
    onProjectSelect(item) {
      this.showPorjectSelect = false
      this.queryItem.name = item.name
      this.queryItem.projectid = item.groupid
      this.onLoad()
    },
    onStatusSelect(item) {
      this.showStatusSelect = false
      this.queryItem.statusName = item.name
      if (item.status === -1) {
        this.listTemp = this.list
        return
      }
      let temp = []
      this.list.forEach(_item => {
        if (item.status === 1) {
          _item.status == 2 && temp.push(_item)
        } else if (item.status === 2) {
          (_item.status == 0 || _item.status == 1) && temp.push(_item)
        } else if (item.status === 3) {
          _item.status == 3 && temp.push(_item)
        }
        // if (_item.status == item.status) {
        //   temp.push(_item)
        // }
      })
      this.listTemp = temp
    },
    onLoad() {
      let that = this
      let params = { projectId: this.$store.state.currentBiaoDuan.id }
      if (this.queryItem.projectid) {
        params.singleProjectId = this.queryItem.projectid
      }
      getAllStatusSafeEvent(params).then(data => {
        that.list = data.sort(function(a, b) {
          return new Date(b['uploadtime'].replace(/-/g, '/')) - new Date(a['uploadtime'].replace(/-/g, '/'))
        })
        that.listTemp = that.list
        // console.log(that.listTemp)
        that.refreshing = false
        that.finished = true
      })
    },
    itemClick(item) {
      let temp = { ...item, ...{ projectname: this.getProjectName(item), gongquname: this.getGongQuName(item) } }
      this.$router.push({
        name: 'securityDetail',
        params: temp
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.report-record {
  height: 100%;
  overflow-y: auto;
}
</style>
