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
										<el-button
											size="medium"
											icon="el-icon-close"
											circle
											@click="dialogFormVisible = false"
										></el-button>
										</div>
									</div>
									<projectinfo></projectinfo>
									<div class="block-line">
										<div class="block-item">
											<div class="block-item-label">报验单号</div>
											<div class="block-item-value">
												{{formData.inspectionCode}}
											</div>
										</div>
									</div>
									<div class="block-line">
										<div class="block-item">
											<div class="block-item-label">填报日期</div>
											<div class="block-item-value">
												{{formData.fillDate}}
											</div>
										</div>
									</div>
								</div>
								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>检测信息</strong>
									</div>
									<div class="block-table">
										<el-table :data="examineTable" style="width: 100%" border
											class="have_scrolling">
											<el-table-column type="index" width="50" align="center" label="序号">
											</el-table-column>
											<el-table-column prop="name" align="center" label="材料名称"
												show-overflow-tooltip>
											</el-table-column>
											<el-table-column prop="addressStr" width="160px" align="center"
												label="材料来源">
											</el-table-column>
											<el-table-column prop="specification" width="120px" align="center"
												label="材料规格">
											</el-table-column>
											<el-table-column prop="projectPart" width="120px" align="center"
												label="工程部位">
											</el-table-column>
											<el-table-column prop="num" width="120px" align="center"
												label="材料数量(吨)">
											</el-table-column>
											<el-table-column prop="takeAddress" width="120px" align="center"
												label="取样地点">
											</el-table-column>
											<el-table-column prop="testDate" width="120px" align="center"
												label="试验日期">
											</el-table-column>
											<el-table-column prop="testNum" width="120px" align="center"
												label="实验数量">
											</el-table-column>
											<el-table-column prop="qualifiedNum" width="120px" align="center"
												label="合格数量">
											</el-table-column>
											<el-table-column prop="qualifiedRate" width="120px" align="center"
												label="总合格率(%)">
											</el-table-column>
											<el-table-column prop="detectionResult" width="120px" align="center"
												label="检测结果">
												<template slot-scope="scope">
													<template v-if="scope.row.detectionResult==0">合格</template>
													<template v-else-if="scope.row.detectionResult==1">不合格</template>
												</template>
											</el-table-column>
											<el-table-column prop="reportCode" width="120px" align="center"
												label="报告编号">
											</el-table-column>
										</el-table>
									</div>
								</div>
								<div class="form-title">
									<div class="title-big-bar"></div><strong>附件上传</strong>
								</div>
								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>试验检测报告</strong>
										<!-- <span style="font-size: 12px;margin-left: 40px;">最少数量1， 支持上传 docx doc pdf
											文件，且不超过 200M</span> -->
									</div>
									<attachlist :editAble="false" ref="attachlist" :attachTable="reportTable"></attachlist>
									
								</div>
								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>出厂信息</strong>
										<!-- <span style="font-size: 12px;margin-left: 40px;">最少数量1， 支持上传 docx doc pdf
											文件，且不超过 200M</span> -->
									</div>
									
									<attachlist :editAble="false" ref="attachlist" :attachTable="factoryTable"></attachlist>
									
									
								</div>
								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>其他附件</strong>
										<!-- <span style="font-size: 12px;margin-left: 40px;">最少数量1， 支持上传 docx doc pdf
											文件，且不超过 200M</span> -->
									</div>
									<attachlist :editAble="false" ref="attachlist" :attachTable="attachTable"></attachlist>
									
									<div class="block-line">
										<div class="block-item">
											<div class="block-item-label">备注</div>
											<div class="block-item-value">
												{{formData.remark}}
											</div>
										</div>
									</div>
								</div>
							</el-form>
							<strong style="font-size: 16px; font-family: 'Microsoft YaHei'">流程日志</strong>
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
	import {
		convertOptions,
		getQueryVariable
	} from "@/utils/format.js";
	import tasklog from "@/views/common/tasklog.vue"
	
	import taskhandle from '@/views/common/taskhandle'
	import attachlist from "@/views/common/attachlist"
import projectinfo from "@/views/common/projectinfo.vue"
	export default {
		props:['detailRow'],
		data() {
			return {
				dialogFormVisible: false,
				dialogTitle: '项目全生命周期数字管理平台',
				annexTableData: [],
				activeName: 'first',
				waitTableData: [],

				baseInfo: {
					buildSection: '',
					buildSectionName: '235国道杭州至诸暨公路萧山河上至诸暨安华段改建工程',
					contractCode: '235SJSG01',
					buildCompany: '中交上海航道局有限公司、中国交通建设股份有限公司、浙江诸安建设集团有限公司、浙江省交通规划设计研究院有限公司',
					supervisionUnit: '浙江交科公路水运工程监理有限公司',
					supervisionSection: '监理办'
				},
				formData: { //表单参数
					deletedFlag: 1,
					detectionInfo: [],
					detectionReport: [],
					draftFlag: 1,
					fillDate: new Date(),
					id: 1,
					inspectionCode: '',
					buildSection: this.$store.getters.currentBiaoDuan.id || 3,
					projectId: this.$store.getters.curProject.id || 2,
					remark: '',
					createTime: null,
					createUserId: null,
					updateTime: null,
					updateUserId: null
				},
				
				examineTable: [], //检测信息
				reportTable: [], //试验检测报告
				factoryTable: [], //出厂信息
				attachTable: [], //其他附件
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
			closeDialog(){
				// if(this.taskInfo['processDefinitionId']){
				// 	this.$router.go(-1);
				// }
			},
			changeVisible(value){
				this.dialogFormVisible=value;
			},
			getDetail(id){
				api.getQualityDetectionDetail({id:id}).then((res) => {
					let data=res['data']||{};
					this.formData=data;
					data.detectionInfo=data.detectionInfo||[]
					for (let i = 0; i < data.detectionInfo.length; i++) {
						const item = data.detectionInfo[i];
						item.addressStr = item.address.provice + item.address.city
					}
					this.examineTable=data.detectionInfo||[];
					this.reportTable=data.detectionReport||[];
					this.factoryTable=data.factoryInfo||[];
					this.attachTable=data.otherAttachment||[];
				});
				api.getFlowAndTaskInfo({businessKey: id}).then((res) => {
					console.log(res.data);
					let data=res['data'];
					this.taskInfo={
						processDefinitionId: data['processDefinitionId'],
						processInstanceId: data['processInstanceId'],
						taskId: data['taskId'],
						flowKey: 'zhiliangjiance'
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
	@import "@/assets/css/dialog.scss";
    .detail{
        position: absolute;
        height: 100%;
        width: 100%;
        background: rgba(61, 61, 61, 0.5);
        top: 0px;
    }
</style>
