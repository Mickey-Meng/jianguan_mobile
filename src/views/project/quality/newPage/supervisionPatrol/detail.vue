<template>
	<div class="detail" v-show="dialogFormVisible">
		<div class="full-dialog defined-dialog">
			<template slot="title">
				{{ dialogTitle }}
				<div class="logo-icon"></div>
			</template>
			<el-container>
				<el-main
					style="background-color: rgba(0,0 0,0.5);height: calc(100vh - 96px); overflow-y: scroll;padding: 0px;margin: 0;">
					<div class="form-bg">
						<div class="form-content">
							<el-form ref="form" label-width="80px">
								<div class="form-block">
									<!-- <div class="form-block-title">
										<div class="title-bar"></div><strong>发起位置</strong>
										
									</div>
									<locationmap></locationmap> -->
									<div class="form-block-title">
										<div class="title-bar"></div><strong>基本信息</strong>
										<div class="form-btns">
											<el-button size="medium" icon="el-icon-close" circle
												@click="dialogFormVisible = false"></el-button>
										</div>
									</div>
									<projectinfo></projectinfo>
									<div class="block-line">
										<div class="block-line">
											<div class="block-item">
												<div class="block-item-label">发起时间</div>
												<div class="block-item-value">
													{{ formData.startDate }}

												</div>
											</div>
										</div>

									</div>
								</div>
								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>巡视信息</strong>
									</div>
									<div class="block-line">
										<div class="block-item-label">巡视地点<i class="require-icon"></i></div>
										<div class="block-item-value">
											{{ formData.patrolPlace }}
										</div>
									</div>
									<div class="block-line">
										<div class="block-item-label">主要施工情况<i class="require-icon"></i></div>
										<div class="block-item-value">
											{{ formData.buildCondition }}
										</div>
									</div>
									<div class="block-line">
										<div class="block-item">
											<div class="block-item-label">质量、安全、环保情况<i class="require-icon"></i></div>
											<div class="block-item-value">
												{{ formData.qualityCondition }}
											</div>
										</div>
									</div>
									<div class="block-line">
										<div class="block-item">
											<div class="block-item-label">发现的问题及处理意见<i class="require-icon"></i></div>
											<div class="block-item-value">
												{{ formData.problemDealCondition }}
											</div>
										</div>
									</div>
								</div>


								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>巡视现场照片</strong>
										<!-- <span style="font-size: 12px;margin-left: 40px;">最少数量1， 支持上传 docx doc pdf
											文件，且不超过 200M</span> -->
									</div>
									<attachlist :editAble="false" ref="attachlist"
										:attachTable="formData.patrolPhotoAttachment">
									</attachlist>
								</div>
								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>视频</strong>
										<!-- <span style="font-size: 12px;margin-left: 40px;">最少数量1， 支持上传 docx doc pdf
											文件，且不超过 200M</span> -->
									</div>
									<attachlist :editAble="false" ref="attachlist" :attachTable="formData.video">
									</attachlist>
								</div>
								<div class="form-block">
									<div class="block-line">
										<div class="block-item">
											<div class="block-item-label">其他附件</div>
											<div class="block-item-value">
												{{ formData.otherAttachmentInfo }}
											</div>
										</div>
									</div>
								</div>
							</el-form>
							<!-- <strong style="font-size: 16px; font-family: 'Microsoft YaHei'">流程日志</strong>
							<div>
								<tasklog :taskInfo="taskInfo" ref="tasklog"></tasklog>
							</div> -->
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
import {
	convertOptions,
	getQueryVariable,
	formatDate,
	getDaysBetween
} from "@/utils/format.js";
import tasklog from "@/views/common/tasklog.vue"
import locationmap from "@/views/common/locationmap.vue"
import taskhandle from '@/views/common/taskhandle'
import attachlist from "@/views/common/attachlist"
import projectinfo from "@/views/common/projectinfo.vue"

export default {
	props: ['detailRow'],
	data() {
		return {
			dialogFormVisible: false,
			dialogTitle: '项目全生命周期数字管理平台',
			baseInfo: {
				buildSection: '',
				buildSectionName: '235国道杭州至诸暨公路萧山河上至诸暨安华段改建工程',
				contractCode: '235SJSG01',
				buildCompany: '中交上海航道局有限公司、中国交通建设股份有限公司、浙江诸安建设集团有限公司、浙江省交通规划设计研究院有限公司',
				supervisionUnit: '浙江交科公路水运工程监理有限公司',
				supervisionSection: '监理办'
			},
			formData: { //表单参数
				"address": {},
				"auditUser": {},
				"buildCondition": "",
				"deletedFlag": 1,
				"draftFlag": 1,
				"otherAttachmentInfo": "",
				"patrolPhotoAttachment": [],
				"patrolPlace": "",
				"problemDealCondition": "",
				buildSection: this.$store.getters.currentBiaoDuan.id || 3,
				projectId: this.$store.getters.currentBiaoDuan.id || 2,
				"qualityCondition": "",
				"startDate": formatDate(new Date()),
				"video": [],
			},
			taskInfo: {}
		};
	},
	created() { },
	components: {
		tasklog,
		taskhandle,
		attachlist,
		locationmap,
		projectinfo
	},
	computed: {

	},
	watch: {
		detailRow(obj) {
			if (obj['id']) {
				this.getDetail(obj['id']);
			}
		}
	},
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
	},
	methods: {
		closeDialog() {
			// if(this.taskInfo['processDefinitionId']){
			// 	this.$router.go(-1);
			// }
		},
		changeVisible(value) {
			this.dialogFormVisible = value;
		},
		getDetail(id) {
			api.getSupervisionPatrolDeatil(id).then((res) => {
				let data = res['data'] || {};
				this.formData = data;
			});
			// api.getFlowAndTaskInfo({businessKey: id}).then((res) => {
			// 	let data=res['data'];
			// 	this.taskInfo={
			// 		processDefinitionId: data['processDefinitionId'],
			// 		processInstanceId: data['processInstanceId'],
			// 		taskId: data['taskId']
			// 	}
			// 	this.updateTaskLog();
			// });
		},
		// updateTaskLog(){
		// 	setTimeout(()=>{
		// 		this.$refs['tasklog'].initData();
		// 	},100)
		// },
	},
};
</script>

<style scoped lang="scss">
@import "@/assets/css/dialog.scss";

.detail {
	position: absolute;
	height: 100%;
	width: 100%;
	background: rgba(61, 61, 61, 0.5);
	top: 0px;
}
</style>
