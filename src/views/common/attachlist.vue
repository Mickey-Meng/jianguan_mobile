<template>
	<div>
		<div class="block-line" v-if="editAble">
			<el-upload class="upload-demo" action="" :limit="1" :show-file-list="false" ref="upload"
				:accept="accept"
				:http-request="importFile">
				<el-button size="small" type="primary">点击上传</el-button>
			</el-upload>
		</div>
		<div class="block-table" style="background:rgba(0,0,0,0);">
			<el-table :data="attachTable" style="width: 100%" border class="have_scrolling">
				<el-table-column type="index" width="50" align="center" label="序号">
				</el-table-column>
				<el-table-column prop="fileName" align="center" label="附件" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="uploadTime" width="160px" align="center" label="上传日期">
				</el-table-column>
				<el-table-column prop="creatorName" width="120px" align="center" label="上传人">
				</el-table-column>
				<el-table-column width="120" align="center" label="操作">
					<template slot-scope="{ row, $index }">
						<!-- <el-button type="text" size="mini" @click="downloadAttach(row, $index)">下载</el-button> -->
						<el-button type="text" size="mini" @click="reviewAttach(row, $index)">预览</el-button>
						<el-button v-if="editAble" type="text" size="mini" @click="deleteAttach(row, $index)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		
    	<PdfPreview v-show="viewFileType=='pdf'" ref="pdfPreview"></PdfPreview>
		<el-dialog title="预览" :visible.sync="viewFileVisible" :fullscreen="true" width="100%" height="100%" :modal="false">
			<!-- {{viewFileUrl}} -->
			<img v-show="viewFileType=='img'" style="width: 100%; height: 100%" :src="viewFileUrl"/>
			<video v-show="viewFileType=='mp4'" style="width: 100%; height: 100%" :src="viewFileUrl" controls></video>
			<video v-show="viewFileType=='mov'" style="width: 100%; height: 100%" :src="viewFileUrl" controls></video>
			<!-- <el-image style="width: 100%; height: 100%" :src="viewImgUrl" :fit="fill"></el-image> -->
			<!-- <iframe width="100%" height="100%" style="min-height:800px" v-if="viewFileType=='pdf'" :src="viewFileUrl" frameborder="0"></iframe> -->
			
		</el-dialog>
	</div>
</template>

<script>
	import {mapGetters} from "vuex";
	import * as api from "@/api/quality";
	import { uploadFile } from '@/api/project.js'
	import {lookUrl} from "@/utils/index"
	import {
		formatDateTime
	} from "@/utils/format.js";
	import {MessageBox } from 'element-ui'
	
	import PdfPreview from '@/components/PdfPreview'
	export default {
		props: ['attachTable','editAble','acceptList'],
		components: {
			PdfPreview
		},
		data() {
			return {
				viewFileType: '',
				viewFileUrl: '',
				viewFileVisible: false,
				accept:this.acceptList||'image/*|video/*'
			}
		},
		computed: {
		  ...mapGetters(["userInfo", "name", "project", "roleId", "getUrl"])
		},
		methods: {
			downloadAttach(row, index) {
				api.downloadFile({
					fileid:row['fileId']
				})
			},
			reviewAttach(row, index) {
				// api.previewFile({
				// 	fileid:row['fileId']
				// }).then((res) => {
					
				// });
				console.log(row);
				let format = '';
				if (row.fileName.indexOf('.png') > -1 || row.fileName.indexOf('.jpg') > -1) format = 'img';
				if (row.fileName.indexOf('.mp4') > -1) format = 'mp4';
				if (row.fileName.indexOf('.mov') > -1 || row.fileName.indexOf('.MOV') > -1) format = 'mov';
				if (row.fileName.indexOf('.pdf') > -1) format = 'pdf';
				this.viewFileType = format;
				this.viewFileUrl = lookUrl(row.fileId);
				if (format == 'pdf') {
					setTimeout(() =>{
						this.$refs['pdfPreview'].show_otherPDF(row.fileId)
					}, 300)
				} else {
					this.viewFileVisible = true;
				}
			},
			deleteAttach(row, index) {
				MessageBox.confirm('确认是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.attachTable.splice(index, 1);
				});
			},
			afterUp(data) {
				this.attachTable.push({
					uploadTime: formatDateTime(data['uploadTime']),
					fileName: data['fileName'],
					fileId: data['fileId'],
					creatorName: this.$store.state.userinfo.name
				})
			},
			importFile(params) {
				// let data = new FormData();
				// data.append("file", params.file);
				// newUploadFile(data).then((res) => {
				// 	this.$message({
				// 		type: 'success',
				// 		message: '上传成功!'
				// 	});
				// 	this.$refs.upload.clearFiles();
				// 	this.afterUp(res['data']);
				// });

				
				const reader = new FileReader()
				reader.readAsDataURL(params.file)
				reader.onload = e => {
					let base64 = e.target['result'].split('base64,')[1]
					uploadFile({ name: params.file.name, base64: base64 }).then(url => {
						this.$refs.upload.clearFiles();
						const uploadTime = formatDateTime(new Date());
						const fileName = params.file.name;
						const fileId = url;
						this.afterUp({uploadTime, fileName, fileId});
					})
				}
			}
		}
	}
</script>

<style>
.el-message-box{
	width: 100% !important;
}
</style>
