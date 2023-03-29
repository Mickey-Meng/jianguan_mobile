<!--
@name:
@description:人员进退场管理
@author: 王海林
@time: 2022-05-23 11:32:49
@modifier: zhouhai
@modifierTime: 2022-06-20 14:10:57
-->
<template>
	<div class="tab-page">
		<el-tabs v-model="activeName">
			<el-tab-pane label="人员报审" name="first">
				<el-container class="container-box">
					<van-list @load="query" :style="{ height: scrollerHeight }" v-model="loading" :finished="finished" finished-text="没有更多了">
						<van-swipe-cell class="list" v-for="(item, index) in tableData" :key="index" :class="'item ' + (index === tableData.length - 1 ? 'last' : '')">
							<div class="item" style="" @click="viewDetail(item)">
								<div class="block">
									<div class="block-name">施工标段：</div>
									<div class="block-value">{{ item.buildSectionName }}</div>
								</div>
								<div class="block">
									<div class="block-name">施工单位：</div>
									<div class="block-value">{{ item.buildUnitsStr }}</div>
								</div>
								<div class="block">
									<div class="block-name">报审类型：</div>
									<div class="block-value">{{ item.typeStr }}</div>
								</div>
								<div class="block">
									<div class="block-name">人数：</div>
									<div class="block-value">{{ item.num }}</div>
								</div>
								<div class="block">
									<div class="block-name">说明：</div>
									<div class="block-value">{{ item.explaination }}</div>
								</div>
								<div class="status">
									{{ item.statusStr }}
								</div>
								<div class="block" style="padding-top: 5px; border-top: 1px solid #d7d7d7;">
									<div style="float:left;">{{item.createUserName}}</div>
									<div style="float:right;">{{item.createTime}}</div>
								</div>
							</div>
							
							
							<!-- <template #right>
								<van-button square type="primary" text="详情" @click="viewDetail(item)"/>
								<van-button square type="primary" text="编辑" />
								<van-button square type="danger" text="删除" />
							</template> -->
						</van-swipe-cell>
					</van-list>
					<!-- <edit ref="edit" @query="query" :editRow="editRow"></edit> -->
					<detail ref="detail" :detailRow="detailRow"></detail>
				</el-container>
			</el-tab-pane>
			<el-tab-pane  v-if="!isDraft" label="人员一览" name="second">
				<el-container class="container-box">
					<van-list @load="query_1" :style="{ height: scrollerHeight_1 }" v-model="loading_1" :finished="finished_1" finished-text="没有更多了">
						<van-swipe-cell class="list" v-for="(item, index) in tableData_1" :key="index" :class="'item ' + (index === tableData_1.length - 1 ? 'last' : '')">
							<div class="item" style="">
								<div class="block">
									<div class="block-name">人员姓名：</div>
									<div class="block-value">{{ item.name }}</div>
								</div>
								<div class="block">
									<div class="block-name">手机号码：</div>
									<div class="block-value">{{ item.phone }}</div>
								</div>
								<div class="block">
									<div class="block-name">身份证号：</div>
									<div class="block-value">{{ item.card }}</div>
								</div>
								<div class="block">
									<div class="block-name">户籍：</div>
									<div class="block-value">{{ item.household }}</div>
								</div>
								<div class="block">
									<div class="block-name">健康状况：</div>
									<div class="block-value">{{ item.bodyStatus }}</div>
								</div>
								<div class="block">
									<div class="block-name">是否到过中高风险地区：</div>
									<div class="block-value">{{ item.isRisk }}</div>
								</div>
								<div class="block">
									<div class="block-name">中高风险地区：</div>
									<div class="block-value">{{ item.riskArea }}</div>
								</div>
								<div class="block">
									<div class="block-name">出发地：</div>
									<div class="block-value">{{ item.startArea }}</div>
								</div>
								<div class="block">
									<div class="block-name">途径城市：</div>
									<div class="block-value">{{ item.wayCity }}</div>
								</div>
								<div class="block">
									<div class="block-name">是否完成疫苗接种：</div>
									<div class="block-value">{{ item.isVaccine }}</div>
								</div>
								<div class="block">
									<div class="block-name">健康码(是否为绿码)：</div>
									<div class="block-value">{{ item.isHealth }}</div>
								</div>
								<div class="block">
									<div class="block-name">工种：</div>
									<div class="block-value">{{ item.workType }}</div>
								</div>
								<div class="block">
									<div class="block-name">备注：</div>
									<div class="block-value">{{ item.remark }}</div>
								</div>
							</div>
						</van-swipe-cell>
				</van-list>
				</el-container>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import * as api from "@/api/quality.js";
	// import edit from './entranceAndExitManagement/edit.vue';
	import detail from './entranceAndExitManagement/detail';

	export default {
		props:{
			isDraft:{
				type:Boolean,
				default:false
			}
		},
		components: {
			// edit,
			detail
		},
		data() {
			return {
				activeName:'first',
				allData: [],
				tableData: [],
				loading: false,
				finished: false,
				tableData_1: [],
				loading_1: false,
				finished_1: false,
				operateBtnsVisible: true,
				queryData: { //查询参数
					buildSectionName: '',
					pageNum: 1,
					draftFlag:1,
					totalPage: 1,
					pageSize: 10,
					buildSection: this.$store.getters.currentBiaoDuan.id || 3,
					projectId: this.$store.getters.curProject.id || 2,
				},
				queryData_1: { //查询参数
					buildSectionName: '',
					name:'',
					type:0,
					draftFlag:1,
					pageNum: 1,
					totalPage: 1,
					pageSize: 10,
					buildSection: this.$store.getters.currentBiaoDuan.id || 3,
					projectId: this.$store.getters.curProject.id || 2,
				},
				editRow: null,
				detailRow: null
			};
		},
		created() {},
		computed: {
			scrollerHeight: function() {
				return window.innerHeight - 91 + 'px'
			},
			scrollerHeight_1: function() {
				return window.innerHeight - 91 + 'px'
			}
		},
		mounted() {
			// this.query();
			this.query_1();
		},
		methods: {
			query() {
				this.queryData.draftFlag=this.isDraft?0:1;
				api.getEnterExitList(this.queryData).then((res) => {
					this.allData = res.data || {};
					// this.tableData = this.formateTableData(res.data.list);
					this.tableData = [...this.tableData,...this.formateTableData(res.data.list)||[]]
					this.queryData.pageNum = res.data.pageNum + 1;
					this.queryData.totalPage = res.data.total;
					this.queryData.pageSize = res.data.pageSize;
					
					// 加载状态结束
					this.loading = false;
					// 数据全部加载完成
					if (this.tableData.length >= res.data.total) {
						this.finished = true;
					}
				});
			},
			formateTableData(list) {
				list = list || [];
				list.forEach(item => {
					item['buildUnitsStr'] = item['buildUnits']?item['buildUnits'].join('、'):'';
				})
				return list;
			},
			query_1() {
				api.getEnterExitUserList(this.queryData_1).then((res) => {
					res.data = res.data || {};
					this.tableData_1 = res.data['list'] || [];
					this.tableData_1 = [...this.tableData,...res.data['list']||[]]
					this.queryData_1.pageNum = res.data.pageNum;
					this.queryData_1.totalPage = res.data.total;
					this.queryData_1.pageSize = res.data.pageSize;
					
					// 加载状态结束
					this.loading_1 = false;
					// 数据全部加载完成
					if (this.tableData_1.length >= res.data.total) {
						this.finished_1 = true;
					}
				});
			},
			addNew() {
				// this.editRow = null;
				this.$refs.edit.changeVisible(null,true);
			},
			modify(row) {
				// this.editRow = row;
				this.$refs.edit.changeVisible(row,true);
			},
			viewDetail(row) {
				this.detailRow = row;
				this.$refs.detail.changeVisible(true);
			},
			deleteRow(row) {
				this.$confirm('确认是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					api.deleteEnterExit(row['id']).then((res) => {
						if (this.tableData.length == 1) {
							this.queryData.pageNum = this.queryData.pageNum> 1 ? this.queryData.pageNum - 1 : 1
						}
						this.query();
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}).catch(error => {
						this.$message({
							type: 'fail',
							message: '删除失败!'
						});
					});
				});
			},
			handleCurrentChange(page) {
				this.queryData.pageNum=page
				this.query()
			},
			handleCurrentChange_1(page){
				this.queryData_1.pageNum=page
				this.query_1()
			},
			checkDetail(row){
				this.$emit("hideDraft");
				this.$emit("getDetail",row['id']);
			}
		},
	};
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
						overflow: auto;
						.block-name {
							float: left;
							width: 120px;
							color: rgb(85, 85, 85);
							min-height: 24px;
							font-size: 13px;
							line-height: 20px;
						}
						.block-value {
							width: calc(100% - 120px);
							margin-left: 120px;
							min-height: 24px;
							font-size: 13px;
							line-height: 20px;
						}
					}
					.status {
						background: rgb(0, 132, 255);
						padding: 1px 3px ;
						font-size: 10px;
						position: absolute;
						right: 25px;
						top: 8px;
						color: white;
						border-radius: 3px;
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
