<!--
 * @Descripttion:监理旁站
 * @version:
 * @Author: WangHarry
 * @Date: 2022-05-09 14:12:51
 * @LastEditors: WangHarry
 * @LastEditTime: 2022-05-09 14:15:22
-->
<template>
	<el-container class="container-box">
		<van-list @load="query" :style="{ height: scrollerHeight }" v-model="loading" :finished="finished" finished-text="没有更多了">
				<van-swipe-cell class="list" v-for="(item, index) in tableData" :key="index" :class="'item ' + (index === tableData.length - 1 ? 'last' : '')">
					<div class="item" style="" @click="gotoHandle(item)">
						<div class="block">
							<span class="block-name">流程名称</span>
							<span class="block-value">{{ item.processDefinitionName }}</span>
						</div>
						<div class="block">
							<span class="block-name">流程标识</span>
							<span class="block-value">{{ item.processDefinitionKey }}</span>
						</div>
						<div class="block">
							<span class="block-name">任务名称</span>
							<span class="block-value">{{ item.name }}</span>
						</div>
						<!-- <div class="block">
							<span class="block-name">执行操作</span>
							<span class="block-value">{{ item.approvalType }}</span>
						</div> -->
						<div class="block">
							<span class="block-name">任务发起人</span>
							<span class="block-value">{{ item.startUserName }}</span>
						</div>
						<div class="block">
							<span class="block-name">任务发起时间</span>
							<span class="block-value">{{ item.createTime }}</span>
						</div>
					</div>
					
					
					<!-- <template #right>
						<van-button square type="primary" text="详情" @click="gotoHandle(item)"/>
						<van-button square type="primary" text="编辑" />
						<van-button square type="danger" text="删除" />
					</template> -->
				</van-swipe-cell>
		</van-list>
	</el-container>
</template>

<script>
	import * as api from "@/api/quality";
	import {
		mapGetters
	} from 'vuex'
	import { constantRouterMap } from '@/router/router.project.js'
	import {
		setToken
	} from "@/utils/auth";
	export default {
		data() {
			return {
				tableData: [],
				loading: false,
				finished: false,
				queryData: {
					// processDefinitionName:'',
					// beginDate:'2021-05-15',
					// endDate:'2022-05-15',
					pageParam: {
						pageNum: 1,
						totalPage: 1,
						pageSize: 10
					},
				},
				routes: null,
				detailRouters: []
			};
		},
		created() {
			this.routes = this.menus;
			let detailRouter = constantRouterMap.find(e => e.name === "handlerFlowTask");
			this.detailRouters = detailRouter?.children;
		},
		components: {},
		computed: {
			...mapGetters(["menus"]),
			scrollerHeight: function() {
				return window.innerHeight - 91 + 'px'
			}
		},
		mounted() {
			// this.query();
		},
		methods: {
			query() {
				api.listHistoricProcessInstance(this.queryData).then((res) => {
					this.allData = res.data || {};
					this.tableData = [...this.tableData,...this.allData['list']||[]]
					this.queryData.pageParam.pageNum = res.data.pageNum + 1;
					this.queryData.pageParam.totalPage = res.data.total;
					this.queryData.pageParam.pageSize = res.data.pageSize;

					// 加载状态结束
					this.loading = false;
					// 数据全部加载完成
					if (this.tableData.length >= res.data.total) {
						this.finished = true;
					}
				});
			},
			handleCurrentChange(page) {
				this.queryData.pageParam.pageNum = page
				this.query()
			},
			gotoHandle(row) {
				//row['taskFormKey']=(typeof row['taskFormKey'])=='string'?JSON.parse(row['taskFormKey']):row['taskFormKey'];
				let key = row["processDefinitionKey"];
				let router = this.detailRouters.find(e => e.code.indexOf(key) !== -1);
				let hiddenEdit = ["sgdwhtrybs", "jldwhtrybs", "qzdwhtrybs", "sgdwrybg", "jldwrybg", "qzdwrybg", "sgdwryqj",
					"jldwryqj", "qzdwryqj"
				];
				if (router) {
					setToken("taskType", 3);
					this.$router.push({
						path: router.path,
						query: {
							// taskId: row.deploymentId,
							taskKey: row.taskKey,
							businessKey: row.businessKey,
							processDefinitionKey: row.processDefinitionKey,
							processInstanceId: row.processInstanceId,
							processDefinitionId: row.processDefinitionId,
							taskName: row.taskName,
							flowEntryName: row.processDefinitionName,
							processInstanceInitiator: row.processInstanceInitiator,
							isHiddenEdit: hiddenEdit.includes(key),
							flowKey: hiddenEdit.includes(key) ? key : ""
						}
					});
				}
				// this.routes.forEach(parent=>{
				// 	parent['children'].forEach(child=>{
				// 		if(child['meta']['code']==row['processDefinitionKey']){
				// 			this.$router.push({
				// 				path:child['path']+'_detail',
				// 				query:{
				// 					taskId: row.deploymentId,
				// 					businessKey:row.businessKey,
				// 					processDefinitionKey: row.processDefinitionKey,
				// 					processInstanceId: row.processInstanceId,
				// 					processDefinitionId: row.processDefinitionId,
				// 					taskName: row.taskName,
				// 					flowEntryName: row.processDefinitionName,
				// 					processInstanceInitiator: row.processInstanceInitiator,
				// 				}
				// 			});
				// 		}
				// 	})
				// })
			}
		}
	}
</script>
<style scoped lang="scss">
	.container-box {
		color: #000000;
		background-color: #FAFAFA;
		height: 100%;
		width: calc(100% + 1px);
  		overflow-y: auto;
		.van-list{
			width: 100%;
			.list {
				.item{
					padding: 10px;
					border:1px solid rgba(0, 0, 0, 0.1);
					border-radius:5px;
					margin:5px;
					box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
					.block {
						.block-value {
							margin-left: 5px;
						}
					}
				}
				.van-button {
					height: 100%;
					border-radius: 5px;
				}
			}
		}
	}
</style>
