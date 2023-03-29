<template>
  <div class="process">
    <common-head ref="head" :title="$route.meta.title"> </common-head>
    <div class="full-dialog defined-dialog">
      <template slot="title">
        {{ dialogTitle }}
        <div class="logo-icon"></div>
      </template>
      <div
        style="
          background-color: rgba(0, 0 0, 0.5);
          height: calc(100vh - 96px);
          overflow-y: scroll;
          padding: 0px;
          margin: 0;
        "
      >
        <div>
          <div class="form-bg">
            <div class="form-content">
              <!-- <div v-if="isUnEdit" class="form-title">
                  <div class="title-big-bar"></div>
                  <strong>{{ menuTitle }}</strong>
                  <div class="form-btns">
                    <el-button size="medium">暂存</el-button>
                    <el-button size="medium">保存草稿</el-button>
                    <el-button size="medium">选择草稿</el-button>
                    <el-button size="medium" type="primary">复制填充</el-button>
                  </div>
                </div> -->
              <router-view ref="routerview" :detailRow="detailRow"></router-view>
            </div>
          </div>
          <taskhandle v-if="isHandleVisible" :taskInfo="taskInfo" ref="taskhandle"></taskhandle>
        </div>
        <strong style="font-size: 16px;font-family: 'Microsoft YaHei';">流程日志</strong>
        <div>
          <tasklog v-if="isInfoVisible" :taskInfo="taskInfo" ref="tasklog"></tasklog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CommonHead from '@/components/head/CommonHead'
import * as api from '@/api/quality'
import { convertOptions, getQueryVariable } from '@/utils/format.js'
import tasklog from '../../common/tasklog.vue'
import taskhandle from '../../common/taskhandle'
export default {
  //   props: ['dialogTitle', 'menuTitle'],
  components: {
    CommonHead,

    taskhandle,
    tasklog
  },
  data() {
    return {
      isLoading: false,
      isRouterAlive: true,

      dialogFormVisible: true,
      dialogTitle: '项目全生命周期数字管理平台',
      menuTitle: '流程审批',
      detailRow: {},
      taskInfo: {},
      isUnEdit: false,
      isHandleVisible: false,
      isInfoVisible: false
    }
  },
  computed: {
    scrollerHeight: function () {
      return window.innerHeight - 81 + 'px'
    }
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false
        this.reload()
      }, 1000)
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    updateView() {
      setTimeout(() => {
        console.log(this.$refs['routerview'])
        this.$refs['routerview'].getDetail(this.detailRow['id'])
      }, 2000)
    },
    updateTaskHandle() {
      setTimeout(() => {
        this.$refs['taskhandle'] && this.$refs['taskhandle'].initData()
      }, 100)
    },
    updateTaskLog() {
      setTimeout(() => {
        this.$refs['tasklog'].initData()
      }, 100)
    },
    closeDialog() {
      this.$router.go(-1)
    }
  },
  mounted() {
    var params = getQueryVariable()
    if (params['businessKey']) {
      this.detailRow = {
        id: params['businessKey']
      }
      this.updateView()
      if (params['processDefinitionId']) {
        this.taskInfo = {
          processDefinitionId: params['processDefinitionId'],
          processInstanceId: params['processInstanceId'],
          taskId: params['taskId'],
          flowKey: params['processDefinitionKey'],
          entryKey: params['taskKey']
        }
        if (params['taskId']) {
          this.isHandleVisible = true
          this.isUnEdit = true

          this.updateTaskHandle();
        }
        this.updateTaskLog();
        this.isInfoVisible = true
      } else {
        this.isUnEdit = false
      }
    } else {
      this.isUnEdit = false
    }
    if (params['isHiddenEdit'] === 'true') {
      this.isUnEdit = false
    }
  }
}
</script>
<style lang="scss" scoped>
.process {
  height: 100%;
  overflow: hidden;
  .layout-content {
    overflow-y: auto;
  }
}
</style>