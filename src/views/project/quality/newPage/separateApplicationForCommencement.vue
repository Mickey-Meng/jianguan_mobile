<!--
 * @Descripttion:分项开工申请
 * @version:
 * @Author: zhouhai
 * @Date: 2022-05-09 14:10:50
 * @LastEditors: zhouhai
 * @LastEditTime: 2022-06-20 14:10:57
-->
<template>
	<el-container class="container-box">
        <van-list @load="query" :style="{ height: scrollerHeight }" v-model="loading" :finished="finished" finished-text="没有更多了">
				<van-swipe-cell class="list" v-for="(item, index) in tableData" :key="index" :class="'item ' + (index === tableData.length - 1 ? 'last' : '')">
					<div class="item" style="" @click="viewDetail(item)">
						<div class="block">
							<div class="block-name">标段:  </div>
							<div class="block-value">{{ item.projectName }}</div>
						</div>
						<div class="block">
							<div class="block-name">施工单位:  </div>
							<div class="block-value">{{ item.buildUnits }}</div>
						</div>
						<div class="block">
							<div class="block-name">建议开工日期:  </div>
							<div class="block-value">{{ item.openDate.replace('-','年').replace('-','月') }}日</div>
						</div>
						<div class="block">
							<div class="block-name">计划完工日期:  </div>
							<div class="block-value">{{ item.endDate.replace('-','年').replace('-','月') }}日</div>
						</div>
						<div class="block">
							<div class="block-name">地点或桩号:  </div>
							<div class="block-value">{{ item.place }}</div>
						</div>
						<!-- <div class="block">
							<div class="block-name">现场负责人:  </div>
							<div class="block-value">{{ item.liveUserName }}</div>
						</div>
						<div class="block">
							<div class="block-name">施工员:  </div>
							<div class="block-value">{{ item.buildUserName }}</div>
						</div>
						<div class="block">
							<div class="block-name">质检员:  </div>
							<div class="block-value">{{ item.checkUserName }}</div>
						</div> -->
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
</template>

<script>
	import * as api from "@/api/quality";
	import {
		convertOptions
	} from "@/utils/format.js";
	// import edit from './separateApplicationForCommencement/edit';
	import detail from './separateApplicationForCommencement/detail';
	import { mapGetters } from 'vuex'

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
				allData: [],
				tableData: [],
				loading: false,
				finished: false,
				operateBtnsVisible: true,
				dialogFormVisible: false,
				queryData: { //查询参数
					place: '',
					draftFlag: 1,
					pageNum: 1,
					totalPage: 1,
					pageSize: 10,
					buildSection: this.$store.getters.currentBiaoDuan.id || 3,
					projectId: this.$store.getters.curProject.id || 2,
				},
				currentPattern: 0, //0查看，1新增，2修改
				editRow: null,
				detailRow: null
			};
		},
		created() {},
		computed: {
			...mapGetters(["project"]),
			scrollerHeight: function() {
				return window.innerHeight - 91 + 'px'
			}
		},
		mounted() {
			// this.query();
		},
		methods: {
			query() {
				this.queryData.draftFlag=this.isDraft?0:1;
				api.getSubitemOpenList(this.queryData).then((res) => {
					res.data.list.forEach(element => {
						element.buildUnits = element.buildUnits.join('、')
					});
					this.allData = res.data || {};
					this.tableData = [...this.tableData,...this.allData.list||[]]
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
					api.deleteSubitemOpen(row['id']).then((res) => {
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
