<!--
 * @Descripttion:待办任务
 * @version:
 * @Author: WangHarry
 * @Date: 2022-05-09 14:12:16
 * @LastEditors: WangHarry
 * @LastEditTime: 2022-05-09 14:12:22
-->
<template>
  <div class="container-box">
    <!-- <el-header>
			<div class="input-box">
				<div class="input-value">
					<el-input v-model="queryData.processDefinitionName" placeholder="请输入流程名称"></el-input>
				</div>

			</div>
			<div class="input-box">
				<div class="input-value">
					<el-input v-model="queryData.processDefinitionKey" placeholder="请输入流程标识"></el-input>
				</div>
			</div>
			<div class="input-box">
				<div class="input-value">
					<el-input  v-model="queryData.taskName" placeholder="请输入任务名称"></el-input>
				</div>
			</div>
			<el-button type="primary" @click="query">搜索</el-button>
		</el-header> -->
    <van-list @load="query" :style="{ height: scrollerHeight }" v-model="loading" :finished="finished" finished-text="没有更多了">
      <van-swipe-cell
        class="list"
        v-for="(item, index) in tableData"
        :key="index"
        :class="'item ' + (index === tableData.length - 1 ? 'last' : '')"
      >
        <div class="item" style="" @click="gotoHandle(item)">
          <div class="block">
            <span class="block-name">流程名称：</span>
            <span class="block-value" style="margin-left: unset;">{{ item.processDefinitionName }}</span>
          </div>
          <div class="block">
            <span class="block-name">当前任务：</span>
            <span class="block-value" style="margin-left: unset;">{{ item.taskName }}</span>
          </div>
          <div class="block">
            <span class="block-name">任务发起人：</span>
            <span class="block-value" style="margin-left: unset;">{{ item.processInstanceInitiatorName }}</span>
          </div>
          <div class="block">
            <span class="block-name">任务发起时间：</span>
            <span class="block-value" style="margin-left: unset;">{{ item.processInstanceStartTime }}</span>
          </div>
          <!-- <div class="operate center-in-vertical">
							<img v-if="item.checkresult === 3" :src="require(`assets/image/待审核.png`)" />
							<img v-if="item.checkresult === 1" :src="require(`assets/image/已通过.png`)" />
							<img v-if="item.checkresult === 2" :src="require(`assets/image/已驳回.png`)" />
						</div> -->
        </div>

        <!-- <template #right>
          <van-button square type="primary" text="办理" @click="gotoHandle(item)" />
        </template> -->
      </van-swipe-cell>
    </van-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as api from '@/api/quality'
//   import {constantRoutes} from "@/router/router";
// const { constantRoutes } = require(`@/router/router.${process.env.VUE_APP_TYPE}`)
import { constantRouterMap } from '@/router/router.project.js'
import { setToken } from '@/utils/auth'

export default {
  data() {
    return {
      tableData: [],
      loading: false,
      finished: false,
      queryData: {
        processDefinitionName: '',
        processDefinitionKey: '',
        taskName: '',
        taskHandleStatus: 1,
        pageParam: {
          pageNum: 0,
          totalPage: 1,
          pageSize: 10
        }
      },
      routes: null,
      detailRouters: []
    }
  },
  created() {
    this.routes = this.menus
    console.log(constantRouterMap)
    let detailRouter = constantRouterMap.find(e => e.name === 'handlerFlowTask')
    this.detailRouters = detailRouter?.children
  },
  components: {},
  computed: {
    scrollerHeight: function () {
      return window.innerHeight - 91 + 'px'
    },
    ...mapGetters(['menus'])
  },
  mounted() {
    // this.query()
  },
  methods: {
    query() {
        this.queryData.pageParam.pageNum++;
      api.listHandleTask(this.queryData).then(res => {
        this.allData = res.data || {}
        this.tableData = [...this.tableData,...this.allData.list || []]
        this.queryData.pageParam.pageNum = res.data.pageNum
        this.queryData.pageParam.totalPage = res.data.total
        this.queryData.pageParam.pageSize = res.data.pageSize

        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.tableData.length >= res.data.total) {
          this.finished = true;
        }
      })
    },
    handleCurrentChange(page) {
      this.queryData.pageNum = page
      this.query()
    },
    gotoHandle(row) {
      row['taskFormKey'] = typeof row['taskFormKey'] == 'string' ? JSON.parse(row['taskFormKey']) : row['taskFormKey']
      let key = row['taskFormKey']['routerName']
      let router = this.detailRouters.find(e => e.code.indexOf(key) !== -1)
      let hiddenEdit = [
        'sgdwhtrybs',
        'jldwhtrybs',
        'qzdwhtrybs',
        'sgdwrybg',
        'jldwrybg',
        'qzdwrybg',
        'sgdwryqj',
        'jldwryqj',
        'qzdwryqj'
      ]
      if (router) {
        setToken('taskType', 1)
        this.$router.push({
          path: router.path,
          query: {
            taskId: row.taskId,
            taskKey: row.taskKey,
            businessKey: row.businessKey,
            processDefinitionKey: row.processDefinitionKey,
            processInstanceId: row.processInstanceId,
            processDefinitionId: row.processDefinitionId,
            taskName: row.taskName,
            flowEntryName: row.processDefinitionName,
            processInstanceInitiator: row.processInstanceInitiator,
            isHiddenEdit: hiddenEdit.includes(key),
            flowKey: hiddenEdit.includes(key) ? key : ''
          }
        })
      }
      // this.routes.forEach(parent => {
      //   parent["children"].forEach(child => {
      //     if (child["meta"]["code"] == row["taskFormKey"]["routerName"]) {
      //       this.$router.push({
      //         path: child["path"] + "_detail",
      //         query: {
      //           taskId: row.taskId,
      //           businessKey: row.businessKey,
      //           processDefinitionKey: row.processDefinitionKey,
      //           processInstanceId: row.processInstanceId,
      //           processDefinitionId: row.processDefinitionId,
      //           taskName: row.taskName,
      //           flowEntryName: row.processDefinitionName,
      //           processInstanceInitiator: row.processInstanceInitiator
      //         }
      //       });
      //     }
      //   });
      // });
    }
  }
}
</script>
<style scoped lang="scss">
// @import "../../assets/css/table.scss"
.container-box {
  color: #000000;
  background-color: #fafafa;
  height: 100%;
  width: calc(100% + 1px);
  overflow-y: auto;
  .list {
    .item {
      padding: 10px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      margin: 5px;
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
    }
    .van-button {
      height: 100%;
      border-radius: 5px;
    }
  }
}
</style>
