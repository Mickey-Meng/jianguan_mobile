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
								<div class="form-title">
									<div class="title-big-bar"></div>
									<strong>施工技术交底-浙公路（JL）011</strong>
                                    <div class="form-btns">
										<el-button size="medium" icon="el-icon-close" circle @click="dialogFormVisible=false"></el-button>
									</div>
								</div>
		
								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>基本信息</strong>
									</div>
									<projectinfo></projectinfo>
									<div class="block-line">
										<div class="block-item">
											<div class="block-item-label">登记时间</div>
											<div class="block-item-value">
												{{formData.checkDate}}
											</div>
										</div>
									</div>
									<div class="block-line">
		
										<div class="block-item">
											<div class="block-item-label">施工技术交底概述</div>
											<div class="block-item-value">
												{{formData.buildTechBottom}}
											</div>
										</div>
									</div>
									<div class="block-line">
										<div class="block-item">
											<div class="block-item-label">备注</div>
											<div class="block-item-value">
												{{formData.remark}}
											</div>
										</div>
									</div>
								</div>
								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>附件清单</strong>
										<!-- <span style="font-size: 12px;margin-left: 40px;">支持上传jpg jpeg png mp4 docx doc
											xisx xis pdf文件，且不超过100m</span> -->
									</div>
		
									<div class="block-line">
										<div class="block-table-title">附件</div>
										<div class="block-table-btns">
											<!-- <el-button size="small" type="primary">下载全部</el-button> -->
										</div>
									</div>
									<attachlist :editAble="false" ref="attachlist" :attachTable="attachTable"></attachlist>
								</div>
		
								<!-- <div class="form-title">
									<div class="title-big-bar"></div><strong>审批信息</strong>
								</div> -->
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
	import * as projectApi from "@/api/project";
	import {
		convertOptions,
		createProjectInfo,
		getQueryVariable,
		formatDate
	} from "@/utils/format.js";
	import tasklog from "@/views/common/tasklog.vue"
	import taskhandle from '@/views/common/taskhandle'
	import attachlist from "@/views/common/attachlist.vue"
	import projectinfo from "@/views/common/projectinfo.vue"
	export default {
		props:['detailRow'],
		data() {
			return {
				dialogTitle: '项目全生命周期数字管理平台',
				dialogFormVisible: false,
				annexTableData: [],
				activeName: 'first',
				waitTableData: [],
				baseInfo: {
					buildSection: 1,
					buildSectionName: '235国道杭州至诸暨公路萧山河上至诸暨安华段改建工程',
					contractCode: '235SJSG01',
					buildCompany: '中交上海航道局有限公司、中国交通建设股份有限公司、浙江诸安建设集团有限公司、浙江省交通规划设计研究院有限公司',
					supervisionUnit: '浙江交科公路水运工程监理有限公司',
				},
				formData: { //表单参数
					buildTechBottom: '', // 施工交底概述
					checkDate: formatDate(new Date()), // 登记时间
					remark: '', // 备注
					attachment: [],
					buildCheckselfResult: '',
					deletedFlag: 1,
					draftFlag: 1,
					BuildTechBottom: '',
					projectBuildUser: 1,
					projectChargeUser: 1,
					projectCode: '',
					buildSection: this.$store.getters.currentBiaoDuan.id || 3,
					projectId: this.$store.getters.curProject.id || 2,
					qualityCheckUser: 1,
					subProject: '',
					supervisorEngineerUser: 1,
					supervisorUser: 1,
					unit: ''
				},
				attachTable: [], //附件
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
		mounted() {
			// setTimeout(()=>{
			// 	var params = getQueryVariable();
			// 	if (params['processDefinitionId']) {
			// 		this.dialogFormVisible=true;
			// 		params['id'] = params['businessKey'];
			// 		this.taskInfo=params;
			// 		this.getDetail(params['businessKey']);
			// 	}
			// },500)
			this.getProjectInfoById();
		},
		watch:{
			detailRow(obj){
				if(obj['id']){
					this.getDetail(obj['id']);
				}
			}
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
			getProjectInfoById(){
				projectApi.getProjectInfoById({
					projectid: this.$store.getters.curProject.id || 2
				}).then((res) => {
					let data = res['data'] || {};
					this.baseInfo['buildSectionName'] = data['project'] ? data['project']['name'] : '';
					let list = data['companys'] || [];
					let info = createProjectInfo(list);
					this.baseInfo['buildCompany'] = info['buildCompany'];
					this.baseInfo['supervisionUnit'] = info['supervisionUnit'];

					this.formData['buildSection'] = data['project'] ? data['project']['id'] : 1;
				});
			},
			getDetail(id){
				api.getBuildTechBottomDetail({id:id}).then((res) => {
					let data=res['data']||{};
					console.log(res)
					this.formData=data;
					this.attachTable=data.attachment||[];
				});
				api.getFlowAndTaskInfo({businessKey: id}).then((res) => {
					console.log(res.data);
					let data=res['data'];
					this.taskInfo={
						processDefinitionId: data['processDefinitionId'],
						processInstanceId: data['processInstanceId'],
						taskId: data['taskId'],
						flowKey: 'shigongjishujiaodi'
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

