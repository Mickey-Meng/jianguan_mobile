<template>
	<div>
		<el-dialog class="full-dialog defined-dialog" :visible.sync="dialogFormVisible" :fullscreen="true">
			<template slot="title">
				<!-- {{dialogTitle}}
				<div class="logo-icon"></div> -->
			</template>
			<el-container>
				<el-main
					style="background-color: rgba(0,0 0,0.5);height: calc(100vh - 96px); overflow-y: scroll;padding: 0px;margin: 0;">
					<div class="form-bg">
						<div class="form-content">
							<el-form :model="formData" ref="ruleForm" :rules="rules">
								<div class="form-title">
									<div class="title-big-bar"></div>
									<strong>监理巡视</strong>
									<!-- <drafthandle v-if="addOrModifyFlag" @addOrModify="addOrModify"
										@checkDraft="checkDraft" ref="drafthandle"></drafthandle> -->
								</div>

								<div class="form-block">
									<!-- <div class="form-block-title">
										<div class="title-bar"></div><strong>发起位置</strong>
									</div>
									<locationmap></locationmap> -->
									<div class="form-block-title">
										<div class="title-bar"></div><strong>基本信息</strong>
									</div>
									<projectinfo></projectinfo>
									<div class="block-line">
										<div class="block-line">
											<div class="block-item-label">发起时间</div>
												<div class="block-item-value">
													<el-form-item prop="startDate">
														<el-date-picker value-format="yyyy-MM-dd" v-model="formData.startDate"  style="width: 160px;"
															type="date" placeholder="请选择">
														</el-date-picker>
													</el-form-item>

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
											<el-form-item prop="patrolPlace">
												<el-input v-model="formData.patrolPlace"></el-input>
											</el-form-item>
										</div>
									</div>
									<div class="block-line">
										<div class="block-item-label">主要施工情况<i class="require-icon"></i></div>
										<div class="block-item-value">
											<el-form-item prop="buildCondition">
												<el-input v-model="formData.buildCondition"></el-input>
											</el-form-item>
										</div>
									</div>
									<div class="block-line">
										<div class="block-item-label">质量、安全、环保情况<i class="require-icon"></i></div>
										<div class="block-item-value">
											<el-form-item prop="qualityCondition">
												<el-input v-model="formData.qualityCondition"></el-input>
											</el-form-item>
										</div>
									</div>
									<div class="block-line">
										<div class="block-item-label">发现的问题及处理意见<i class="require-icon"></i></div>
										<div class="block-item-value">
											<el-form-item prop="problemDealCondition">
												<el-input v-model="formData.problemDealCondition"></el-input>
											</el-form-item>
										</div>
									</div>
								</div>


								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>巡视现场照片</strong>
										<!-- <span style="font-size: 12px;margin-left: 40px;">最少数量1， 支持上传 docx doc pdf
											文件，且不超过 200M</span> -->
									</div>
									<attachlist :editAble="true" ref="attachlist"
										:attachTable="formData.patrolPhotoAttachment">
									</attachlist>
								</div>
								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>视频</strong>
										<!-- <span style="font-size: 12px;margin-left: 40px;">最少数量1， 支持上传 docx doc pdf
											文件，且不超过 200M</span> -->
									</div>
									<attachlist :editAble="true" ref="attachlist" :attachTable="formData.video">
									</attachlist>
								</div>
								<div class="form-block">
									<div class="block-line">
										<div class="block-item-label">其他附件</div>
										<div class="block-item-value">
											<el-input v-model="formData.otherAttachmentInfo" type="textarea" 
												:rows="4" placeholder="请输入"></el-input>
										</div>
									</div>
								</div>

								<approveuser :auditUser="auditUser" :flowKey="flowKey">
								</approveuser>

								<div class="form-block">
									<el-button class="submit-btn" size="small" type="primary" @click="addOrModify()">提交
									</el-button>
								</div>
							</el-form>
						</div>
					</div>
				</el-main>
				<!-- <el-aside width="8px" class="close-wrapper">
					<div class="close-wrap">
						<i class="el-icon-caret-right"></i>
					</div>
				</el-aside> -->
				<!-- <el-aside
					style="width: 410px;background-color: rgb(242, 242, 242);overflow: scroll;height: calc(100vh - 96px);">
					<tasklog></tasklog>
				</el-aside> -->
			</el-container>
		</el-dialog>

		<el-dialog width="80%" class="little-container" :visible.sync="draftVisible">
			<supervisionPatrol @hideDraft="hideDraft" @getDetail="getDetail" :isDraft="draftVisible" v-if="draftVisible">
			</supervisionPatrol>
		</el-dialog>
	</div>
</template>

<script>
	import * as api from "@/api/quality";
	import {getChildProject} from "@/api/project";
	// import {
	// 	getUserInfo
	// } from "@/api/user";
	import {
		convertOptions,
		formatDate,
		formatDateTime,
		getDaysBetween,
		diffCompare
	} from "@/utils/format.js";
	import {Message} from 'element-ui'

	import upload from "@/views/common/upload.vue"
	import attachlist from "@/views/common/attachlist.vue"
	import drafthandle from "@/views/common/drafthandle.vue"
	import locationmap from "@/views/common/locationmap.vue"
	import approveuser from "@/views/common/approveuser.vue"
	import projectinfo from "@/views/common/projectinfo.vue"
	
	export default {
		data() {
			return {
				draftVisible: false,
				addOrModifyFlag: true,
				dialogFormVisible: false,
				dialogTitle: '项目全生命周期数字管理平台',
				childOptions:[],
				baseInfo: {
					buildSection: 1,
					buildSectionName: '',
					contractCode: '',
					buildCompany: '',
					supervisionUnit: '',
					supervisionSection: ''
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
					projectId: this.$store.getters.curProject.id || 2,
					"qualityCondition": "",
					"startDate": formatDate(new Date()),
					"video": [],
				},
				rules: {
					buildSection: [{
						required: true,
						message: '必须项',
						trigger: 'blur'
					}],
					patrolPlace: [{
						required: true,
						message: '必须项',
						trigger: 'blur'
					}],
					buildCondition: [{
						required: true,
						message: '必须项',
						trigger: 'blur'
					}],
					qualityCondition: [{
						required: true,
						message: '必须项',
						trigger: 'blur'
					}],
					problemDealCondition: [{
						required: true,
						message: '必须项',
						trigger: 'blur'
					}]
				},
				auditUser: {},
				flowKey: 'jianlixunshi'
			};
		},
		created() {},
		components: {
			upload,
			attachlist,
			drafthandle,
			approveuser,
			locationmap,
			projectinfo,
			supervisionPatrol: () => import("../supervisionPatrol.vue")
		},
		computed: {

		},
		watch: {

		},
		mounted() {
			this.getChildProject()
		},
		methods: {
			getChildProject() {
				getChildProject({
					projectid: this.$store.getters.curProject.id || 2
				}).then((res) => {
					let options = res.data || [];
					this.childOptions = convertOptions(options, 'name', 'id');
				});
			},
			changeChild() {
				api.getCompanyByProjectId({
					projectid: this.formData.buildSection
				}).then((res) => {
					this.baseInfo = res;
				});
			},
			changeVisible(obj, value) {
				this.dialogFormVisible = value;
				obj = obj || {};
				this.addOrModifyFlag = obj['id'] ? false : true;
				if (obj['id']) {
					this.getDetail(obj['id']);
				} else {
					this.formData = {
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
						projectId: this.$store.getters.curProject.id || 2,
						"qualityCondition": "",
						"startDate": formatDate(new Date()),
						"video": [],
					}
				}
			},

			getDetail(id) {
				api.getSupervisionPatrolDeatil(id).then((res) => {
					let data = res['data'] || {};
					this.formData = data;
				});
			},
			addOrModify(isdraft) {
				if (isdraft) {
					if (diffCompare([this.formData], [{
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
							projectId: this.$store.getters.curProject.id || 2,
							"qualityCondition": "",
							"startDate": formatDate(new Date()),
							"video": [],
						}], ['startDate'])) {
						Message({
							type: 'warning',
							message: '不能提交空白!'
						});
						return;
					}
					this.formData.draftFlag = isdraft ? 0 : 1;
					this.formData.auditUser = this.auditUser;
					api.addOrUpdateSupervisionPatrol(this.formData).then((res) => {
						if (res.data) {
							Message({
								type: 'success',
								message: '提交成功!'
							});
							this.dialogFormVisible = false;
							this.$emit("query");
						}
					});

				} else {
					this.$refs['ruleForm'].validate((valid) => {
						if (valid) {
							this.formData.auditUser = this.auditUser;
							this.formData.draftFlag = 1;
							api.addOrUpdateSupervisionPatrol(this.formData).then((res) => {
								if (res.data) {
									Message({
										type: 'success',
										message: '提交成功!'
									});
									this.dialogFormVisible = false;
									this.$emit("query", true);
								}
							});
						}

					})
				}
			},
			hideDraft() {
				this.draftVisible = false;
			},
			checkDraft() {
				this.draftVisible = true;
			}
		},
	};
</script>

<style scoped lang="scss">
	
.full-dialog{
	.form-bg {
		background: rgb(255, 255, 255);
		width: 100%;
		margin: 0px auto;
		min-height: 100%;
		padding: 30px 0px;
		overflow-y: auto;
	}
	.handle-bg{
		background: rgb(255, 255, 255);
		width: 984px;
		margin: 0px auto;
		padding: 30px 20px 20px;
		overflow-y: auto;
	}
}
.defined-dialog {
	background: rgba(0,0,0,0.5);;
	.logo-icon {
		width: 48px;
		height: 48px;
		background-image: url("~@/assets/process/logo.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		position: absolute;
		right: 20px;
		top: 24px;
		cursor: pointer;
	}

	.el-button--default {
		color: #355DFF;
	}
	.title-big-bar {
		width: 6px;
		height: 20px;
		background-image: url("~@/assets/process/bigbar.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin: 8px 8px 8px 0;
	}
	
	.title-bar {
		width: 4px;
		height: 20px;
		background-image: url("~@/assets/process/bar.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin: 2px 8px 2px 0;
	}

	.form-title {
		font-size: 20px;
		width: 100%;
		margin: 16px 0;
		color: #191919;
		font-family: Microsoft YaHei;
		display: inline-flex;
		height: 36px;
		line-height: 36px;
		position: relative;
	}

	.form-btns {
		position: absolute;
		right: 0;
	}

	.form-block {
		.form-block-title {
			margin: 8px 0;
			font-family: "Microsoft YaHei";
			font-size: 16px;
			display: inline-flex;
			height: 24px;
			line-height: 24px;
		}

		.block-line {
			line-height: 36px;
			display: inline-flex;
			font-size: 16px;
			width: 100%;
			position: relative;
			margin: 4px 0;

			.block-item {
				width: 50%;
				display: inline-flex;
			}

			.block-item-label {
				width: 120px;
				padding-right: 20px;
				text-align: right;
				font-weight: 600;
				color: #191919;
				font-family: PingFangSC-Medium, PingFang SC;
				font-size: 14px;
				position: relative;

				.require-icon {
					width: 4px;
					height: 4px;
					background: #FF4925;
					border-radius: 4px;
					position: absolute;
					right: 10px;
					top: 16px;
				}
			}

			.block-item-value {
				width: calc(100% - 140px);
				font-size: 14px;
			}

			.block-table-title {
				margin-left: 20px;
			}

			.block-table-btns {
				position: absolute;
				right: 20px;
			}
		}
	}

	.submit-btn {
		width: 260px;
		margin: 0 30px;
	}

	.is-fullscreen {
		background-color: #E4E4E4 !important;
	}

	.close-wrapper {
		position: relative;
		background: #dcdfe6;
		overflow: hidden;
		z-index: 1000;
	}

	.close-wrap {
		cursor: pointer;
		color: #fff;
		position: absolute;
		left: 0;
		top: calc(50% - 60px);
		width: 8px;
		height: 120px;
		line-height: 60px;
		background: #409eff;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.log-btns {
		margin: 10px 21px;
		padding-right: 10px;
		height: 46px;
		line-height: 46px;

		.print-btn {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0px;
		}

		.print-select-btn {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0px;
			margin: 0;
			width: 28px;
			text-align: center;
			border-left: 1px solid #fff;
			padding-left: 0;
			padding-right: 0;
			border-left-color: rgba(255, 255, 255, .5);
		}
	}

	.log-content {
		background-color: #FFFFFF;

		.log-line {
			display: inline-flex;
			width: calc(100% - 40px);
			margin: 0 20px;
			line-height: 28px;
		}

		.process-index {
			width: 20px;
			background: #355DFF;
			height: 20px;
			border-radius: 12px;
			color: #fff;
			font-weight: 600;
			text-align: center;
			line-height: 20px;
			margin: 0 12px;
			font-size: 12px;
		}
	}
}
</style>
