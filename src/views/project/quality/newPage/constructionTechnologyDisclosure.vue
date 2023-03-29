<!--
 * @Descripttion:施工技术交底
 * @version:
 * @Author: WangHarry
 * @Date: 2022-05-09 14:16:22
 * @LastEditors: zhouhai
 * @LastEditTime: 2022-05-09 14:16:28
-->
<template>
	<div class="container-box">
		<van-list @load="query" :style="{ height: scrollerHeight }" v-model="loading" :finished="finished" finished-text="没有更多了">
				<van-swipe-cell class="list" v-for="(item, index) in tableData" :key="index" :class="'item ' + (index === tableData.length - 1 ? 'last' : '')">
					<div class="item" style="" @click="viewDetail(item)">
						<div class="block">
							<div class="block-name">施工标段：</div>
							<div class="block-value">{{ item.buildSectionName }}</div>
						</div>
						<div class="block">
							<div class="block-name">施工单位：</div>
							<div class="block-value">{{ item.buildUnits }}</div>
						</div>
						<!-- <div class="block">
							<div class="block-name">施工技术交底概述：</div>
							<div class="block-value">{{ item.buildTechBottom }}</div>
						</div> -->
						<div v-if="item.stime" class="status">
							{{ item.statusStr }}
						</div>
						<!-- <div class="operate center-in-vertical">
							<img v-if="item.checkresult === 3" :src="require(`assets/image/待审核.png`)" />
							<img v-if="item.checkresult === 1" :src="require(`assets/image/已通过.png`)" />
							<img v-if="item.checkresult === 2" :src="require(`assets/image/已驳回.png`)" />
						</div> -->
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
		<!-- <edit v-if="!isDraft" ref="edit" @query="query" :editRow="editRow"></edit> -->
		<detail v-if="!isDraft" ref="detail" :detailRow="detailRow"></detail>
	</div>
</template>

<script>
	import * as api from "@/api/quality";
	import {
		formatDate,
	} from "@/utils/format.js";
	// import edit from './constructionTechnologyDisclosure/edit';
	import detail from './constructionTechnologyDisclosure/detail';
	export default {
		props:{
			isDraft:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				allData:{},
				tableData: [],
				loading: false,
				finished: false,
				operateBtnsVisible: true,
				dialogTitle: '智慧建设通用版-【绍兴市】235国道杭州',
				dialogFormVisible: false,
				queryData: {
					buildSectionName: '',
					createName: '',
					startCheckDate: '',
					endCheckDate: '',
					checkDate: '',

					projectCode: '',
					subProject: '',
					pageNum: 1,
					totalPage: 1,
					pageSize: 10,
					buildSection: this.$store.getters.currentBiaoDuan.id || 3,
					projectId: this.$store.getters.curProject.id || 2
				},
				editRow:null,
				detailRow:null
			};
		},
		created() {},
		components: {
			// edit,
			detail
		},
		computed: {
			scrollerHeight: function() {
				return window.innerHeight - 91 + 'px'
			}
		},
		mounted() {
			// this.query();
			
		},
		methods: {
			queryTimeFormat(res) {
				console.log(res);
				this.queryData.startCheckDate = formatDate(res[0]);
				this.queryData.endCheckDate = formatDate(res[1]);
			},
			query() {
				this.queryData.draftFlag=this.isDraft ? 0 : 1;
				api.getBuildTechBottomList(this.queryData).then((res) => {
					this.allData = res.data || {};
        			this.tableData = [...this.tableData,...this.formateTableData(res.data.list) || []]
					console.log(this.tableData);
					this.queryData.pageNum = res.data.pageNum + 1;
					this.queryData.totalPage=res.data.total;
					this.queryData.pageSize=res.data.pageSize;
					
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
					item['projectName'] = '235国道杭州至诸暨公路萧山河上至诸暨安华段改建工程';
					item['buildUnits'] = item['buildUnits'].join('、');
					item['contractCode'] = '235SJSG01';
					item['supervisorUnit'] = '浙江交科公路水运工程监理有限公司';
					item['buildSectionId'] = '';
					item['supervisorSection'] = '';
					item['statusStr'] = '';
				})
				return list;
			},
			addNew() {
				// this.editRow=null;
				this.$refs.edit.changeVisible(null, true);
			},
			modify(row) {
				// this.editRow=row;
				this.$refs.edit.changeVisible(null, true);
			},
			viewDetail(row) {
				this.detailRow=row;
				this.$refs.detail.changeVisible(true);
			},
			deleteRow(row) {
				this.$confirm('确认是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					api.deleteBuildTechBottom({id:row['id']}).then((res) => {
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
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			checkDetail(row){
				this.$emit("hideDraft");
				this.$emit("getDetail",row['id']);
			}
		},
	};
</script>
<style scoped lang="scss">
	// @import "../../../assets/css/table.scss"
	.container-box {
		color: #000000;
		background-color: #FAFAFA;
		height: 100%;
		width: calc(100% + 1px);
  		overflow-y: auto;
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

</style>