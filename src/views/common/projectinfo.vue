<template>
	<div class="form-block">
		<div class="block-line">
			<div class="block-item">
				<div class="block-item-label">项目名称</div>
				<div class="block-item-value">
					{{baseInfo.projectName}}
				</div>
			</div>
		</div>
		<div class="block-line">
			<div class="block-item">
				<div class="block-item-label">合同号</div>
				<div class="block-item-value">
					{{baseInfo.contractCode}}
				</div>
			</div>
		</div>
		<div class="block-line">
			<div class="block-item">
				<div class="block-item-label">施工单位</div>
				<div class="block-item-value">
					{{baseInfo.buildCompany}}
				</div>
			</div>
		</div>
		<div class="block-line">
			<div class="block-item">
				<div class="block-item-label">监理单位</div>
				<div class="block-item-value">
					{{baseInfo.supervisionUnit}}
				</div>
			</div>
		</div>
		<!-- <div class="block-line">
			<div class="block-item">
				<div class="block-item-label">标段</div>
				<div class="block-item-value">
					{{baseInfo.buildSectionName}}
				</div>
			</div>
		</div> -->
	</div>
</template>

<script>
	import {mapGetters} from "vuex";
	import * as api from "@/api/project.js";
	import {
		formatDateTime,
		createProjectInfo
	} from "@/utils/format.js";
	
	export default {
		props: ['hasSection'],
		data() {
			return {
				baseInfo: {
					projectName: '',
					buildSectionName: '',
					contractCode: '',
					buildCompany: '',
					supervisionUnit: '',
				},
				hasBuildSection:(this.hasSection==undefined?false:this.hasSection)
			}
		},
		computed: {
		  ...mapGetters(["userInfo", "name", "project", "roleId", "getUrl", "currentBiaoDuan", "curProject"])
		},
		mounted(){
			this.getProjectInfoById();
		},
		methods: {
			getProjectInfoById() {
					// buildSection: this.$store.getters.currentBiaoDuan.id || 3,
					// projectId: this.$store.getters.currentBiaoDuan.id || 2
				this.baseInfo.buildSectionName=this.currentBiaoDuan.name;
				this.baseInfo.contractCode=this.currentBiaoDuan.contractnum;
				api.getProjectDetail({
					projectId: this.currentBiaoDuan.id || 2
				}).then((res) => {
					let data = res || {};
					this.baseInfo['projectName'] = data['projectName'];
					// let list = data['companys'] || [];
					// let info = createProjectInfo(list);
					this.baseInfo['buildCompany'] = data['constructdpt'];
					this.baseInfo['supervisionUnit'] = data['supervisordpt'];
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "@/assets/css/dialog.scss"
</style>

