<template>
	<div class="form-content">
			<el-form ref="form" label-width="80px">
				<div class="form-block">
					<div class="form-block-title">
						<div class="title-bar"></div><strong>基本信息</strong>
					</div>
					<projectinfo></projectinfo>
					<div class="block-line">
						<div class="block-item">
							<div class="block-item-label">简报名称：<i class="require-icon"></i></div>
							<div class="block-item-value">
								{{formData.title}}
							</div>
						</div>
					</div>
				</div>
				<div class="form-block">
					<div class="form-block-title">
						<div class="title-bar"></div><strong>附件上传</strong>
						<!-- <span style="font-size: 12px;margin-left: 40px;">最少数量1， 支持上传 docx doc pdf
							文件，且不超过 200M</span> -->
					</div>
					<attachlist :editAble="false" ref="attachlist" :attachTable="formData.reportAttachment">
					</attachlist>
				
				</div>
			</el-form>
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
	import attachlist from "@/views/common/attachlist"
	import projectinfo from "@/views/common/projectinfo.vue"
	
	export default {
		data() {
			return {
				baseInfo: {
					buildSection: 1,
					buildSectionName: '235国道杭州至诸暨公路萧山河上至诸暨安华段改建工程',
					contractCode: '235SJSG01',
					buildCompany: '中交上海航道局有限公司、中国交通建设股份有限公司、浙江诸安建设集团有限公司、浙江省交通规划设计研究院有限公司',
					supervisionUnit: '浙江交科公路水运工程监理有限公司',
					supervisionSection: '监理办'
				},
				formData: { //表单参数
					deletedFlag: 1,
					attachment: [],
					draftFlag: 1,
					title: '',
					reportAttachment:[],
					buildSection: this.$store.getters.currentBiaoDuan.id || 3,
					projectId: this.$store.getters.curProject.id || 2,
				},
				taskInfo:{}
			};
		},
		created() {},
		components: {
			attachlist,
			projectinfo
		},
		computed: {
			
		},
		watch: {
			
		},
		mounted() {
			
		},
		methods: {
			getDetail(id) {
				api.getQualityReportDeatil(id).then((res) => {
					let data = res['data'] || {};
					this.formData = data;
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	@import "@/assets/css/dialog.scss"
</style>
