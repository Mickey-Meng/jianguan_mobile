<template>
	<div class="detail" v-show="dialogFormVisible">
		<div class="full-dialog defined-dialog">
			<template slot="title">
				{{dialogTitle}}
				<div class="logo-icon"></div>
			</template>
			<el-container>
				<el-main
					style="background-color: rgba(0,0 0,0.5);height: calc(100vh - 96px); overflow-y: scroll;padding: 0px;margin: 0;">
					<div class="form-bg">
						<div class="form-content">
							<el-form ref="form" label-width="80px">
								
								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div>
										<strong>基本信息</strong>
										<div class="form-btns">
											<el-button size="medium" icon="el-icon-close" circle @click="dialogFormVisible=false"></el-button>
										</div>
									</div>
									<projectinfo></projectinfo>
									<div class="block-line">
										<div class="block-item">
											<div class="block-item-label">合同编号</div>
											<div class="block-item-value">
												{{formData.contractCode}}
											</div>
										</div>
									</div>
									<div class="block-line">
										<div class="block-item">
											<div class="block-item-label">承包人</div>
											<div class="block-item-value">
												{{formData.contractUser}}
											</div>
										</div>
									</div>
								</div>
								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>附件上传</strong>
										<!-- <span style="font-size: 12px;margin-left: 40px;">支持上传jpg jpeg png mp4 docx doc
											xisx xis pdf文件，且不超过100m</span> -->
									</div>
									<attachlist :editAble="false" ref="attachlist" :attachTable="attachTable"></attachlist>
									
								</div>
								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>合同信息</strong>
									</div>
									<div class="block-table">
										<el-table :data="contractTable" style="width: 100%" border
											class="have_scrolling">
											<el-table-column type="index" width="50" align="center" label="序号">
											</el-table-column>
											<el-table-column prop="buildProjectName" align="center" label="拟分包工程名称"
												show-overflow-tooltip>
											</el-table-column>
											<el-table-column prop="buildProjectPartName" width="180px" align="center"
												label="拟分包工程部位">
											</el-table-column>
											<el-table-column prop="contractUserName" width="120px" align="center"
												label="承包人名称">
											</el-table-column>
											<el-table-column prop="contractChargeUserName" width="120px" align="center"
												label="承包负责人">
											</el-table-column>
											<el-table-column prop="cardNum" width="120px" align="center" label="身份证号">
											</el-table-column>
											<el-table-column prop="contractNum" width="120px" align="center"
												label="拟分包工程合同金额(元)">
											</el-table-column>
											<el-table-column prop="buildDate" width="120px" align="center"
												label="拟分包施工日期">
											</el-table-column>
											<el-table-column prop="contractUserQualification" width="120px"
												align="center" label="承包人专业分包资质">
											</el-table-column>
											<el-table-column prop="remark" width="120px" align="center" label="备注">
											</el-table-column>
											
										</el-table>
									</div>
								</div>
								
								
								
							</el-form>
							<strong style="font-size: 16px;font-family: 'Microsoft YaHei';">流程日志</strong>
							<div>
								<tasklog :taskInfo="taskInfo" ref="tasklog"></tasklog>
							</div>
							<!-- <taskhandle :taskInfo="taskInfo"></taskhandle> -->
						</div>
					</div>
				</el-main>
			</el-container>
		</div>
		
	</div>
</template>

<script>
	import * as api from "@/api/quality";
	import tasklog from "@/views/common/tasklog.vue"
	import taskhandle from '@/views/common/taskhandle'
	import attachlist from "@/views/common/attachlist"
	import projectinfo from "@/views/common/projectinfo.vue"

	export default {
		props:['detailRow'],
		data() {
			return {
				dialogTitle: '项目全生命周期数字管理平台',
				dialogFormVisible: false,

				baseInfo: {
					buildSection: 1,
					buildSectionName: '235国道项目部',
					contractCode: '',
					buildCompany: '',
					supervisionUnit: '',
				},
				formData: { //表单参数
					attachment: [],
					buildSection: '4',
					contractCode: '',
					contractInfo: [],
					contractUser: '',
					deletedFlag: 1,
					draftFlag: 1,
					buildSection: this.$store.getters.currentBiaoDuan.id || 3,
					projectId: this.$store.getters.curProject.id || 2,
					projectName: '',
				},
				attachTable: [], //附件
				contractTable: [],
				taskInfo:{}
			};
		},
		created() {},
		components: {
			tasklog,
			taskhandle,
			attachlist,
			projectinfo
		},
		computed: {},
		watch:{
			detailRow(obj){
				if(obj['id']){
					this.getDetail(obj['id']);
				}
			}
		},
		mounted() {
			
		},
		methods: {
			closeDialog(){
				// if(this.taskInfo['processDefinitionId']){
				// 	this.$router.go(-1);
				// }
			},
			changeVisible(value){
				this.dialogFormVisible=value;
			},
			getDetail(id){
				api.getContractBuildDeatil(id).then((res) => {
					let data = res['data'] || {};
					this.formData = data;
					this.attachTable = data.attachment || [];
					this.contractTable = data.contractInfo || [];
				});
				api.getFlowAndTaskInfo({businessKey: id}).then((res) => {
					console.log(res.data);
					let data=res['data'];
					this.taskInfo={
						processDefinitionId: data['processDefinitionId'],
						processInstanceId: data['processInstanceId'],
						taskId: data['taskId'],
						flowKey: 'shigongfenbaohetong'
					}
					this.updateTaskLog();
				});
			},
			updateTaskLog(){
				setTimeout(()=>{
					this.$refs['tasklog'].initData();
				},100)
			},
		},
	};
</script>

<style scoped lang="scss">
	@import "@//assets/css/dialog.scss";
    .detail{
        position: absolute;
        height: 100%;
        width: 100%;
        background: rgba(61, 61, 61, 0.5);
        top: 0px;
    }
</style>
