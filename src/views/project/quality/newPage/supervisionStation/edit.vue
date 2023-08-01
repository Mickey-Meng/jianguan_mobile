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
									<strong>监理旁站</strong>
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
										<!-- <div class="block-item">
											<div class="block-item-label">创建人</div>
											<div class="block-item-value">
												{{baseInfo.userName}}
											</div>
										</div> -->
										<div class="block-line">
											<div class="block-item">
												<div class="block-item-label">旁站时间</div>
												<div class="block-item-value">
													<el-form-item prop="sideDate">
														<el-date-picker value-format="yyyy-MM-dd" style="width: 160px;"
															v-model="formData.sideDate" type="date" placeholder="请选择">
														</el-date-picker>
													</el-form-item>

												</div>
											</div>
										</div>

									</div>
								</div>
								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>旁站信息</strong>
									</div>
									<div class="block-line">
										<div class="block-item-label">工程部位</div>
										<div class="block-item-value">
											<el-form-item prop="projectPartId">
												<el-input readonly @focus="checkPartPro"
													v-model="formData.projectPartStr"></el-input>


												<!-- <el-select v-model="formData.projectPartId" placeholder="请选择">
													<el-option v-for="item in partOptions" :key="item.value"
														:label="item.label" :value="item.value">
													</el-option>
												</el-select> -->
											</el-form-item>
										</div>
									</div>
									<div class="block-line">
										<div class="block-item-label">旁站监理项目<i class="require-icon"></i></div>
										<div class="block-item-value">
											<el-form-item prop="sideProjectId">
												<el-select v-model="formData.sideProjectId" placeholder="请选择">
													<el-option v-for="item in sideOptions" :key="item.value"
														:label="item.label" :value="item.value">
													</el-option>
												</el-select>
											</el-form-item>
										</div>
									</div>
									<!-- <div class="block-line">
										<div class="block-item">
											<div class="block-item-label">工程部位描述</div>
											<div class="block-item-value">
												<el-form-item prop="projectPartDesc">
													<el-input v-model="formData.projectPartDesc"></el-input>
												</el-form-item>
											</div>
										</div>
										<div class="block-item">
											<div class="block-item-label">异常情况<i class="require-icon"></i></div>
											<div class="block-item-value">
												<el-form-item prop="exceptionCondition">
													<el-input v-model="formData.exceptionCondition"></el-input>
												</el-form-item>
											</div>
										</div>
									</div> -->
									<div class="block-line">
										<div class="block-item-label">工程部位描述</div>
										<div class="block-item-value">
											<el-form-item prop="projectPartDesc">
												<el-input v-model="formData.projectPartDesc"></el-input>
											</el-form-item>
										</div>
									</div>
									<div class="block-line">
										<div class="block-item-label">异常情况<i class="require-icon"></i></div>
										<div class="block-item-value">
											<el-form-item prop="exceptionCondition">
												<!-- <el-radio v-model="formData.exceptionCondition" label="存在">存在
												</el-radio>
												<div></div>
												<el-radio v-model="formData.exceptionCondition" label="不存在">不存在
												</el-radio> -->
												
												<van-radio-group v-model="formData.exceptionCondition" style="display: flex;">
													<van-radio name="存在">存在</van-radio>
													<van-radio name="不存在">不存在</van-radio>
												</van-radio-group>
											</el-form-item>
										</div>
									</div>
								</div>
								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>旁站信息记录</strong>
									</div>

									<el-collapse v-model="sideInfoVisible">
										<el-collapse-item v-if="formData.sideProjectId==1" title="嵌入表单" name="1">
											<el-row
												style="font-size: 18px;color: #606266;font-weight: 600;text-align: center;">
												沥青面层</el-row>
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">施工过程详情
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="管理人员（人）">
														<el-input v-model="sideInfo.a33" placeholder="请输入管理人员（人）">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="施工人员（人）">
														<el-input v-model="sideInfo.a34" placeholder="请输入施工人员（人）">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="层位">
														<el-input v-model="sideInfo.a35" placeholder="层位">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="机械设备">
														<el-input v-model="sideInfo.a36" placeholder="请输入机械设备">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="自动找平方式">
														<el-input v-model="sideInfo.a37" placeholder="请输入自动找平方式">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="摊铺长度(m)">
														<el-input v-model="sideInfo.a38" placeholder="请输入摊铺长度(m)">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="管理人员（人）">
														<el-input v-model="sideInfo.a39" placeholder="请输入管理人员（人）">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="使用混合料">
														<el-input v-model="sideInfo.a40" placeholder="请输入使用混合料">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="摊铺开始时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a41" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="摊铺结束时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a42" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="">
														<el-checkbox v-model="sideInfo.a43">下承层清扫</el-checkbox>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="">
														<el-checkbox v-model="sideInfo.a44">粘层</el-checkbox>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="">
														<el-checkbox v-model="sideInfo.a45">设备正常</el-checkbox>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="">
														<el-checkbox v-model="sideInfo.a46">熨平板预热</el-checkbox>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="">
														<el-checkbox v-model="sideInfo.a47">工艺与方案一致</el-checkbox>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="">
														<el-checkbox v-model="sideInfo.a48">有离析</el-checkbox>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
											</el-row>
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">主要数据记录
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="桩号">
														<el-input v-model="sideInfo.a49" placeholder="请输入桩号">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="摊铺速度(km/h)">
														<el-input v-model="sideInfo.a50" placeholder="请输入摊铺速度(km/h)">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="摊铺厚度(mm)">
														<el-input v-model="sideInfo.a51" placeholder="请输入摊铺厚度(mm)">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="初压速度(km/h)">
														<el-input v-model="sideInfo.a52" placeholder="请输入初压速度(km/h)">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="初压遍数(遍)">
														<el-input v-model="sideInfo.a53" placeholder="请输入初压遍数(遍)">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="复压速度(km/h)">
														<el-input v-model="sideInfo.a54" placeholder="请输入复压速度(km/h)">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="复压遍数(遍)">
														<el-input v-model="sideInfo.a55" placeholder="请输入复压遍数(遍)">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
										</el-collapse-item>
										<el-collapse-item v-if="formData.sideProjectId==2" title="嵌入表单" name="2">
											<el-row
												style="font-size: 18px;color: #606266;font-weight: 600;text-align: center;">
												压浆</el-row>
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">施工过程详情
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="管理人员（人）">
														<el-input v-model="sideInfo.a56" placeholder="请输入管理人员（人）">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="施工人员（人）">
														<el-input v-model="sideInfo.a57" placeholder="请输入施工人员（人）">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="设备型号">
														<el-input v-model="sideInfo.a58" placeholder="请输入设备型号">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="孔道编码">
														<el-input v-model="sideInfo.a59" placeholder="请输入孔道编码">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="压力表读数">
														<el-input v-model="sideInfo.a60" placeholder="请输入压力表读数">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="是否堵孔">
														<el-input v-model="sideInfo.a61" placeholder="请输入是否堵孔">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>

											<el-row>
												<el-col :span="12">
													<el-form-item label="开始时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a62" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="结束时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a63" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="稳压时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a64" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
											</el-row>

											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">主要数据记录
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="压浆液水胶比">
														<el-input v-model="sideInfo.a65" placeholder="请输入压浆液水胶比">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="压浆液水胶比">
														<el-input v-model="sideInfo.a66" placeholder="请输入压浆液水胶比">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="压浆液水胶比">
														<el-input v-model="sideInfo.a67" placeholder="请输入压浆液水胶比">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="制取强度试件">
														<el-input v-model="sideInfo.a68" placeholder="请输入制取强度试件">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="制取强度试件">
														<el-input v-model="sideInfo.a69" placeholder="请输入制取强度试件">
														</el-input>
													</el-form-item>
												</el-col>

											</el-row>

										</el-collapse-item>
										<el-collapse-item v-if="formData.sideProjectId==3" title="嵌入表单" name="3">
											<el-row
												style="font-size: 18px;color: #606266;font-weight: 600;text-align: center;">
												张拉</el-row>
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">施工过程详情
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="管理人员（人）">
														<el-input v-model="sideInfo.a70" placeholder="请输入管理人员（人）">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="施工人员（人）">
														<el-input v-model="sideInfo.a71" placeholder="请输入施工人员（人）">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="设备型号">
														<el-input v-model="sideInfo.a72" placeholder="请输入设备型号">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="油表编号">
														<el-input v-model="sideInfo.a73" placeholder="请输入油表编号">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>

											<el-row>
												<el-col :span="12">
													<el-form-item label="开始时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a74" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="结束时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a75" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="断束数量">
														<el-input v-model="sideInfo.a76" placeholder="请输入断束数量">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="端头砼有无碎裂">
														<el-input v-model="sideInfo.a77" placeholder="请输入端头砼有无碎裂">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="锚垫板有无变形">
														<el-input v-model="sideInfo.a78" placeholder="请输入锚垫板有无变形">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>

											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">主要数据记录
											</el-row>
										</el-collapse-item>
										<el-collapse-item v-if="formData.sideProjectId==4" title="嵌入表单" name="4">
											<el-row
												style="font-size: 18px;color: #606266;font-weight: 600;text-align: center;">
												桩基首盘混凝土</el-row>
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">施工过程详情
											</el-row>
											<el-row>
												<el-form-item label="旁站时间">
													<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
														v-model="sideInfo.a01" type="datetime" placeholder="请选择">
													</el-date-picker>
												</el-form-item>
											</el-row>
											<el-row>
												<el-col :span="8">
													<el-form-item label="施工员在岗情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a02" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="8">
													<el-form-item label="质检员在岗情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a03" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="8">
													<el-form-item label="安全员在岗情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a04" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="24">
													<el-form-item label="施工作业人员满足施工需要情况" label-width="220px">
													</el-form-item>
													
													
													<van-radio-group v-model="sideInfo.a05" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="24">
													<el-form-item label="特殊作业人员持证上岗情况" label-width="220px">
													</el-form-item>
													
													
													<van-radio-group v-model="sideInfo.a06" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="24">
													<el-form-item label="施工机械满足施工需要情况" label-width="220px">
													</el-form-item>
													
													
													<van-radio-group v-model="sideInfo.a07" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="24">
													<el-form-item label="施工材料符合设计和规范要求" label-width="220px">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a08" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="开始施工时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a09" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="结束施工时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a10" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-form-item label="施工工艺按审批施工方案实施">
												</el-form-item>
													
												<van-radio-group v-model="sideInfo.a11" style="display: flex;">
													<van-radio name="是">是</van-radio>
													<van-radio name="否">否</van-radio>
												</van-radio-group>
											</el-row>
											<el-row>
												<el-form-item label="钢筋笼安放所采用的施工机械设备是否满足要求">
												</el-form-item>
													
												<van-radio-group v-model="sideInfo.a12" style="display: flex;">
													<van-radio name="是">是</van-radio>
													<van-radio name="否">否</van-radio>
												</van-radio-group>
											</el-row>
											<el-row>
												<el-form-item label="钢筋笼吊装及安放工艺是否符合批准的施工方案">
												</el-form-item>
													
												<van-radio-group v-model="sideInfo.a13" style="display: flex;">
													<van-radio name="是">是</van-radio>
													<van-radio name="否">否</van-radio>
												</van-radio-group>
											</el-row>
											<el-row>
												<el-col :span="24">
													<el-form-item label="施工现场质量措施落实情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a14" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="24">
													<el-form-item label="安全措施落实情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a15" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="24">
													<el-form-item label="环保措施落实情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a16" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">主要数据记录
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="施工现场质量措施落实情况">
														<el-input v-model="sideInfo.a17" placeholder="请输入桩位设计值">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="桩位实测值">
														<el-input v-model="sideInfo.a18"
															placeholder="请输入桩位实测值，多个数据请用,隔开"></el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="孔深设计值(m）">
														<el-input v-model="sideInfo.a19" placeholder="请输入孔深设计值">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="孔深实测值(m）">
														<el-input v-model="sideInfo.a20"
															placeholder="请输入孔深实测值，多个数据请用,隔开"></el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="孔径设计值(mm)">
														<el-input v-model="sideInfo.a21" placeholder="请输入孔径设计值">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="孔径实测值(mm)">
														<el-input v-model="sideInfo.a22"
															placeholder="请输入孔径实测值，多个数据请用,隔开"></el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="钻孔倾斜度设计值(mm)">
														<el-input v-model="sideInfo.a23" placeholder="请输入钻孔倾斜度设计值">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="倾斜度实测值(mm)">
														<el-input v-model="sideInfo.a24"
															placeholder="请输入倾斜度实测值，多个数据请用,隔开"></el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="沉淀厚度设计值(mm)">
														<el-input v-model="sideInfo.a25" placeholder="请输入沉淀厚度设计值">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="沉淀厚度实测值(mm)">
														<el-input v-model="sideInfo.a26"
															placeholder="请输入沉淀厚度实测值，多个数据请用,隔开"></el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="终孔后泥浆比重">
														<el-input v-model="sideInfo.a27" placeholder="请输入终孔后泥浆比重">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="砂率">
														<el-input v-model="sideInfo.a28" placeholder="请输入砂率，多个数据请用,隔开">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="一清后泥浆的比重">
														<el-input v-model="sideInfo.a29" placeholder="请输入一清后泥浆的比重">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="砂率">
														<el-input v-model="sideInfo.a30" placeholder="请输入砂率，多个数据请用,隔开">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="二清后泥浆的比重">
														<el-input v-model="sideInfo.a31" placeholder="请输入二清后泥浆的比重">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="砂率">
														<el-input v-model="sideInfo.a32" placeholder="请输入砂率，多个数据请用,隔开">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
										</el-collapse-item>
										<el-collapse-item v-if="formData.sideProjectId==5" title="嵌入表单" name="5">
											<el-row
												style="font-size: 18px;color: #606266;font-weight: 600;text-align: center;">
												桩基钢筋笼安放</el-row>
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">施工过程详情
											</el-row>
											<el-row>
												<el-form-item label="施工准备完成时间">
													<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
														v-model="sideInfo.a79" type="datetime" placeholder="请选择">
													</el-date-picker>
												</el-form-item>
											</el-row>
											<el-row>
												<el-col :span="8">
													<el-form-item label="施工员在岗情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a80" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="8">
													<el-form-item label="质检员在岗情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a82" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="8">
													<el-form-item label="安全员在岗情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a82" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="16">
													<el-form-item label="施工作业人员满足施工需要情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a83" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="业人员持证上岗情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a84" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="16">
													<el-form-item label="施工机械满足施工需要情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a85" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="16">
													<el-form-item label="施工材料符合设计和规范要求">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a86" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="开始施工时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a87" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="结束施工时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a88" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
											</el-row>
												<el-col :span="16">
													<el-form-item label="施工工艺按审批施工方案实施">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a89" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											<el-row>
											</el-row>
											<el-row>
												<el-form-item label="钢筋笼安放所采用的施工机械设备是否满足要求">
												</el-form-item>
													
													<van-radio-group v-model="sideInfo.a90" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
											</el-row>
											<el-row>
												<el-form-item label="钢筋笼吊装及安放工艺是否符合批准的施工方案">
												</el-form-item>
													
													<van-radio-group v-model="sideInfo.a91" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
											</el-row>
											<el-row>
												<el-col :span="16">
													<el-form-item label="施工现场质量措施落实情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a92" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="安全措施落实情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a93" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="环保措施落实情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a94" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
											</el-row>
											<el-row>
											</el-row>
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">主要数据记录
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="钢筋笼主筋间距设计值(mm)">
														<el-input v-model="sideInfo.a95"
															placeholder="请输入钢筋笼主筋间距设计值(mm)">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="钢筋笼主筋间距实测值(mm)">
														<el-input v-model="sideInfo.a96"
															placeholder="请输入钢筋笼主筋间距实测值(mm)，多个数据请用,隔开"></el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="螺旋筋间距设计值(mm）">
														<el-input v-model="sideInfo.a97" placeholder="请输入螺旋筋间距设计值(mm）">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="螺旋筋间距实测值(mm）">
														<el-input v-model="sideInfo.a98"
															placeholder="请输入螺旋筋间距实测值(mm），多个数据请用,隔开"></el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="钢筋笼长度(直径)设计值(mm)">
														<el-input v-model="sideInfo.a99"
															placeholder="请输入钢筋笼长度(直径)设计值(mm)">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="钢筋笼长度(直径)实测值(mm)">
														<el-input v-model="sideInfo.a100"
															placeholder="请输入钢筋笼长度(直径)实测值(mm)，多个数据请用,隔开"></el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="保护层厚度设计值(mm)">
														<el-input v-model="sideInfo.a101" placeholder="请输入保护层厚度设计值(mm)">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="保护层厚度实测值(mm)">
														<el-input v-model="sideInfo.a102"
															placeholder="请输入保护层厚度实测值(mm)，多个数据请用,隔开"></el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="钢筋笼接头扭矩规定值(Nm)">
														<el-input v-model="sideInfo.a103"
															placeholder="请输入钢筋笼接头扭矩规定值(Nm)">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="钢筋笼接头扭矩实测值(Nm)">
														<el-input v-model="sideInfo.a104"
															placeholder="请输入钢筋笼接头扭矩实测值(Nm)，多个数据请用,隔开"></el-input>
													</el-form-item>
												</el-col>
											</el-row>

										</el-collapse-item>
										<el-collapse-item v-if="formData.sideProjectId==6" title="嵌入表单" name="6">
											<el-row
												style="font-size: 18px;color: #606266;font-weight: 600;text-align: center;">
												砼浇筑</el-row>
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">施工过程详情
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="管理人员（人）">
														<el-input v-model="sideInfo.a105" placeholder="请输入管理人员（人）">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="施工人员（人）">
														<el-input v-model="sideInfo.a106" placeholder="请输入施工人员（人）">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="砼供应方式">
														<el-input v-model="sideInfo.a107" placeholder="请输入砼供应方式">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="机械设备">
														<el-input v-model="sideInfo.a108" placeholder="请输入机械设备">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="砼振捣方式">
														<el-input v-model="sideInfo.a109" placeholder="请输入砼振捣方式">
														</el-input>
													</el-form-item>
												</el-col>

											</el-row>

											<el-row>
												<el-col :span="12">
													<el-form-item label="浇筑开始时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a110" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="浇筑结束时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a111" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
											</el-row>
											<el-row>
											</el-row>
											<el-row>
											</el-row>
											<el-row>
												<el-col :span="24">
													<el-form-item label="检查项1">
														<el-checkbox v-model="sideInfo.a112">模板清洁</el-checkbox>
													</el-form-item>
												</el-col>
												<el-col :span="24">
													<el-form-item label="检查项2">
														<el-checkbox v-model="sideInfo.a113">设备正常</el-checkbox>
													</el-form-item>
												</el-col>
												<el-col :span="24">
													<el-form-item label="检查项3">
														<el-checkbox v-model="sideInfo.a114">保护层垫块良好</el-checkbox>
													</el-form-item>
												</el-col>
												<el-col :span="24">
													<el-form-item label="检查项4">
														<el-checkbox v-model="sideInfo.a115">工艺与方案一致</el-checkbox>
													</el-form-item>
												</el-col>
												<el-col :span="24">
													<el-form-item label="检查项5">
														<el-checkbox v-model="sideInfo.a116">无涨模现象</el-checkbox>
													</el-form-item>
												</el-col>
												<el-col :span="24">
													<el-form-item label="检查项6">
														<el-checkbox v-model="sideInfo.a117">预埋件位置正确</el-checkbox>
													</el-form-item>
												</el-col>
												<el-col :span="24">
													<el-form-item label="检查项7">
														<el-checkbox v-model="sideInfo.a118">电器设备安全</el-checkbox>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">主要数据记录
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="坍落度(mm)">
														<el-input v-model="sideInfo.a119" placeholder="请输入坍落度(mm)">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="砼强度等级(MPa)">
														<el-input v-model="sideInfo.a120" placeholder="请输入砼强度等级(MPa)">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="砼设计方量(m³)">
														<el-input v-model="sideInfo.a121" placeholder="请输入砼设计方量(m³)">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="砼实际方量(m³)">
														<el-input v-model="sideInfo.a122" placeholder="请输入砼实际方量(m³)">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="制作抗压试件(组)">
														<el-input v-model="sideInfo.a123" placeholder="请输入制作抗压试件(组)">
														</el-input>
													</el-form-item>
												</el-col>

											</el-row>

										</el-collapse-item>
										<el-collapse-item v-if="formData.sideProjectId==7" title="嵌入表单" name="7">
											<el-row
												style="font-size: 18px;color: #606266;font-weight: 600;text-align: center;">
												湿喷桩</el-row>
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">施工过程详情
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="管理人员（人）">
														<el-input v-model="sideInfo.a124" placeholder="请输入管理人员（人）">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="施工人员（人）">
														<el-input v-model="sideInfo.a125" placeholder="请输入施工人员（人）">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="钻机型号">
														<el-input v-model="sideInfo.a126" placeholder="请输入钻机型号">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="施工工艺">
														<el-input v-model="sideInfo.a127" placeholder="请输入施工工艺">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="桩号">
														<el-input v-model="sideInfo.a128" placeholder="请输入桩号">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="设计桩长(m)">
														<el-input v-model="sideInfo.a129" placeholder="请输入设计桩长(m)">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>

											<el-row>
												<el-col :span="12">
													<el-form-item label="下钻开始时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a130" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="下钻结束时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a131" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="复搅卡开始时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a132" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="复搅卡结束时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a133" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">主要数据记录
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="桩号">
														<el-input v-model="sideInfo.a134" placeholder="请输入桩号">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="水泥浆稠度">
														<el-input v-model="sideInfo.a135" placeholder="请输入水泥浆稠度">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="下钻速度(米/分)">
														<el-input v-model="sideInfo.a136" placeholder="请输入下钻速度(米/分)">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="复搅速度(米/分)">
														<el-input v-model="sideInfo.a137" placeholder="请输入复搅速度(米/分)">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="结束电流(A)">
														<el-input v-model="sideInfo.a138" placeholder="请输入结束电流(A)">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="水泥用量(kg/延米)">
														<el-input v-model="sideInfo.a139" placeholder="请输入水泥用量(kg/延米)">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="实际桩长(m)">
														<el-input v-model="sideInfo.a140" placeholder="请输入实际桩长(m)">
														</el-input>
													</el-form-item>
												</el-col>

											</el-row>

										</el-collapse-item>
										<el-collapse-item v-if="formData.sideProjectId==8" title="嵌入表单" name="8">
											<el-row
												style="font-size: 18px;color: #606266;font-weight: 600;text-align: center;">
												湿喷桩</el-row>
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">施工过程详情
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="管理人员（人）">
														<el-input v-model="sideInfo.a141" placeholder="请输入管理人员（人）">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="施工人员（人）">
														<el-input v-model="sideInfo.a142" placeholder="请输入施工人员（人）">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="钻机类型">
														<el-input v-model="sideInfo.a143" placeholder="请输入钻机类型">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="单节钢筋笼(m)">
														<el-input v-model="sideInfo.a144" placeholder="请输入单节钢筋笼(m)">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="安装方式">
														<el-input v-model="sideInfo.a145" placeholder="请输入安装方式">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="连接方式">
														<el-input v-model="sideInfo.a146" placeholder="请输入连接方式">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>

											<el-row>
												<el-col :span="12">
													<el-form-item label="安装开始时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a147" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="安装结束时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a148" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="二次清孔开始时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a149" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="二次清孔结束时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a150" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">桩基浇筑
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="二次清孔泥浆比重">
														<el-input v-model="sideInfo.a151" placeholder="请输入二次清孔泥浆比重">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="粘度(S)">
														<el-input v-model="sideInfo.a152" placeholder="请输入粘度(S)">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="含沙率(%)">
														<el-input v-model="sideInfo.a153" placeholder="请输入含沙率(%)">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="沉淀层厚度(cm)">
														<el-input v-model="sideInfo.a154" placeholder="请输入沉淀层厚度(cm)">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="首封砼方量(m³)">
														<el-input v-model="sideInfo.a155" placeholder="请输入首封砼方量(m³)">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="首封管深埋(m)">
														<el-input v-model="sideInfo.a156" placeholder="请输入首封管深埋(m)">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="坍落度(mm)">
														<el-input v-model="sideInfo.a157" placeholder="请输入坍落度(mm)">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="浇筑砼总方量(m³)">
														<el-input v-model="sideInfo.a158" placeholder="请输入浇筑砼总方量(m³)">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="砼顶面高程(m)">
														<el-input v-model="sideInfo.a159" placeholder="请输入砼顶面高程(m)">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="高于设计桩顶(m)">
														<el-input v-model="sideInfo.a160" placeholder="请输入高于设计桩顶(m)">
														</el-input>
													</el-form-item>
												</el-col>
											</el-row>

										</el-collapse-item>
										<el-collapse-item v-if="formData.sideProjectId==9" title="嵌入表单" name="9">
											<el-row
												style="font-size: 18px;color: #606266;font-weight: 600;text-align: center;">
												水泥稳定碎石基层（底基层）</el-row>
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">施工过程详情
											</el-row>
											<el-row>
												<el-form-item label="施工准备完成时间">
													<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
														v-model="sideInfo.a161" type="datetime" placeholder="请选择">
													</el-date-picker>
												</el-form-item>
											</el-row>
											<el-row>
												<el-col :span="24">
													<el-form-item label="施工员在岗情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a162" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
												<el-col :span="24">
													<el-form-item label="质检员在岗情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a163" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
												<el-col :span="24">
													<el-form-item label="安全员在岗情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a164" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="24">
													<el-form-item label="施工作业人员满足施工需要情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a165" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
												<el-col :span="24">
													<el-form-item label="特殊作业人员持证上岗情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a166" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="24">
													<el-form-item label="施工机械满足施工需要情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a167" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
												<el-col :span="24">
													<el-form-item label="施工材料符合设计和规范要求">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a168" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="开始施工时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a169" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="结束施工时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a170" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-form-item label="施工工艺">
												</el-form-item>
													
													<van-radio-group v-model="sideInfo.a171" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
											</el-row>
											
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">主要数据记录
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="松铺厚度">
														<el-input v-model="sideInfo.a172" placeholder="请输入松铺厚度">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="宽度">
														<el-input v-model="sideInfo.a173"
															placeholder="请输入宽度"></el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="平整度">
														<el-input v-model="sideInfo.a174" placeholder="请输入平整度">
														</el-input>
													</el-form-item>
												</el-col>
												
											</el-row>
											
										</el-collapse-item>
										<el-collapse-item v-if="formData.sideProjectId==10" title="嵌入表单" name="10">
											<el-row
												style="font-size: 18px;color: #606266;font-weight: 600;text-align: center;">
												级配碎石基层（底基层）</el-row>
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">施工过程详情
											</el-row>
											<el-row>
												<el-form-item label="施工准备完成时间">
													<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
														v-model="sideInfo.a175" type="datetime" placeholder="请选择">
													</el-date-picker>
												</el-form-item>
											</el-row>
											<el-row>
												<el-col :span="24">
													<el-form-item label="施工员在岗情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a176" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
												<el-col :span="24">
													<el-form-item label="质检员在岗情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a177" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
												<el-col :span="24">
													<el-form-item label="安全员在岗情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a178" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="24">
													<el-form-item label="施工作业人员满足施工需要情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a179" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
												<el-col :span="24">
													<el-form-item label="特殊作业人员持证上岗情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a180" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="24">
													<el-form-item label="施工机械满足施工需要情况">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a181" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
												<el-col :span="24">
													<el-form-item label="施工材料符合设计和规范要求">
													</el-form-item>
													
													<van-radio-group v-model="sideInfo.a182" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="12">
													<el-form-item label="开始施工时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a183" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="结束施工时间">
														<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
															v-model="sideInfo.a184" type="datetime" placeholder="请选择">
														</el-date-picker>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-form-item label="施工工艺">
												</el-form-item>
													
													<van-radio-group v-model="sideInfo.a185" style="display: flex;">
														<van-radio name="是">是</van-radio>
														<van-radio name="否">否</van-radio>
													</van-radio-group>
											</el-row>
											
											<el-row style="font-size: 16px;color: #236fa1;font-weight: 600;">主要数据记录
											</el-row>
											<el-row>
												<el-col :span="24">
													<el-form-item label="松铺厚度">
														<el-input v-model="sideInfo.a186" placeholder="请输入松铺厚度">
														</el-input>
													</el-form-item>
												</el-col>
												<el-col :span="24">
													<el-form-item label="宽度">
														<el-input v-model="sideInfo.a187"
															placeholder="请输入宽度"></el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="24">
													<el-form-item label="平整度">
														<el-input v-model="sideInfo.a188" placeholder="请输入平整度">
														</el-input>
													</el-form-item>
												</el-col>
												
											</el-row>
											
										</el-collapse-item>
									</el-collapse>

									<div class="block-line">
										<div class="block-item-label">旁站工作情况</div>
										<div class="block-item-value">
											<el-form-item prop="sideWorkCondition">
												<el-input v-model="formData.sideWorkCondition"></el-input>
											</el-form-item>
										</div>
									</div>
									<div class="block-line">
										<div class="block-item-label">发现的问题及处理结果</div>
										<div class="block-item-value">
											<el-form-item prop="problemDealCondition">
												<el-input v-model="formData.problemDealCondition"></el-input>
											</el-form-item>
										</div>
									</div>
								</div>

								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>旁站现场照片</strong>
										<span style="font-size: 12px;margin-left: 40px;">支持上传 png jpg 文件</span>
									</div>
									<attachlist :editAble="true" ref="attachlist"
										:attachTable="formData.scenePhotoAttachment">
									</attachlist>
								</div>
								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>实测实量照片</strong>
										<span style="font-size: 12px;margin-left: 40px;">支持上传 png jpg 文件</span>
									</div>
									<attachlist :editAble="true" ref="attachlist"
										:attachTable="formData.actualCheckAttachment">
									</attachlist>
								</div>
								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>视频上传</strong>
										<span style="font-size: 12px;margin-left: 40px;">支持上传 mp4 mov 文件</span>
									</div>
									<attachlist :editAble="true" ref="attachlist" :attachTable="formData.video">
									</attachlist>
								</div>
								<div class="form-block">
									<div class="form-block-title">
										<div class="title-bar"></div><strong>附件上传</strong>
										<span style="font-size: 12px;margin-left: 40px;">支持上传 docx doc pdf 文件</span>
									</div>
									<attachlist :editAble="true" ref="attachlist" :attachTable="formData.attachment">
									</attachlist>
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
			<supervisionStation @hideDraft="hideDraft" @getDetail="getDetail" :isDraft="draftVisible"
				v-if="draftVisible">
			</supervisionStation>
		</el-dialog>

		<el-dialog title="选择工程部位" width="100%" class="little-container" :visible.sync="partVisible">
			<partproject @callback="checkPartProCallback">
			</partproject>
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
		diffCompare,
		getChidlren
	} from "@/utils/format.js";

	import {Message} from 'element-ui'
	// import {
	// 	getBridgeTree
	// } from "@/api/tree";

	import simpleData from '@/views/common/simdata.js'

	import upload from "@/views/common/upload.vue"
	import attachlist from "@/views/common/attachlist.vue"
	import drafthandle from "@/views/common/drafthandle.vue"
	import locationmap from "@/views/common/locationmap.vue"
	import approveuser from "@/views/common/approveuser.vue"
	import projectinfo from "@/views/common/projectinfo.vue"
	import partproject from "@/views/common/partproject.vue"
	let userInfo = JSON.parse(localStorage.getItem('userinfo'))
	export default {
		data() {
			return {
				draftVisible: false,
				addOrModifyFlag: true,
				dialogFormVisible: false,
				dialogTitle: '项目全生命周期数字管理平台',
				childOptions: [],
				partOptions: [],
				sideOptions: [],
				baseInfo: {
					userName: userInfo.name,
					startDate: formatDate(new Date()),
				},
				sideInfoVisible:'',
				sideInfo: {

				},
				sidetest:'否1',
				formData: { //表单参数
					"actualCheckAttachment": [],
					"address": {},
					"attachment": [],
					"auditUser": {},
					"deletedFlag": 1,
					"draftFlag": 1,
					"exceptionCondition": "",
					"problemDealCondition": "",
					buildSection: this.$store.getters.currentBiaoDuan.id || 3,
					projectId: this.$store.getters.currentBiaoDuan.id || 2,
					"projectPartDesc": "",
					"projectPartId": null,
					"projectPartStr": '',
					"scenePhotoAttachment": [],
					"sideDate": formatDate(new Date()),
					"sideInfo": "",
					"sideProjectId": null,
					"sideWorkCondition": "",
					"video": []
				},
				rules: {
					buildSection: [{
						required: true,
						message: '必须项',
						trigger: 'blur'
					}],
					sideProjectId: [{
						required: true,
						message: '必须项',
						trigger: 'blur'
					}],
					exceptionCondition: [{
						required: true,
						message: '必须项',
						trigger: 'blur'
					}],
					sideWorkCondition: [{
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
				flowKey: 'jianlipangzhan',
				partVisible: false,
				treeData: null
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
			partproject,
			supervisionStation: () => import("../supervisionStation.vue")
		},
		computed: {

		},
		watch: {

		},
		mounted() {
			this.initData();
			this.getChildProject();
			this.getSupervisionSideEnums();
		},
		methods: {
			initData() {
				this.treeData = [simpleData.data];
				// getBridgeTree('QL', null).then((res) => {
				//   const arr = [];
				//   arr.push(res.data);
				//   this.treeInfo = arr;
				// });
			},
			checkPartPro() {
				this.partVisible = true;
			},
			checkPartProCallback(node, data, treename) {
				if (!data.isLeaf) {
					Message({
						type: 'warning',
						message: '请选择到最后一级!'
					});
					return;
				}
				this.formData.projectPartId = node.id;
				this.formData.projectPartStr = treename.join('/');
				this.partVisible = false
			},
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
			getSupervisionSideEnums() {
				api.getSupervisionSideEnums().then((res) => {
					let options = res.data || [];
					this.sideOptions = convertOptions(options, 'desc', 'code');
				});
			},
			changeVisible(obj, value) {
				this.dialogFormVisible = value;
				obj = obj || {};
				this.sideInfoVisible=''
				this.addOrModifyFlag = obj['id'] ? false : true;
				if (obj['id']) {
					this.getDetail(obj['id']);
				} else {
					this.sideInfo = {}
					this.formData = {
						"actualCheckAttachment": [],
						"address": {},
						"attachment": [],
						"auditUser": {},
						"deletedFlag": 1,
						"draftFlag": 1,
						"exceptionCondition": "",
						"problemDealCondition": "",
						buildSection: this.$store.getters.currentBiaoDuan.id || 3,
						projectId: this.$store.getters.currentBiaoDuan.id || 2,
						"projectPartDesc": "",
						"projectPartId": null,
						"projectPartStr": '',
						"scenePhotoAttachment": [],
						"sideDate": formatDate(new Date()),
						"sideInfo": "",
						"sideProjectId": null,
						"sideWorkCondition": "",
						"video": []
					}
				}
			},

			getDetail(id) {
				api.getSupervisionSideDeatil(id).then((res) => {
					let data = res['data'] || {};
					this.formData = data;
					this.sideInfo = data['sideInfo'] ? JSON.parse(data['sideInfo']) : {};
					let treename = getChidlren(this.treeData, this.formData.projectPartId, []);
					this.formData.projectPartStr = (treename ? treename : []).join('/');
				});
			},
			addOrModify(isdraft) {
				if (isdraft) {
					this.formData.sideInfo = JSON.stringify(this.sideInfo);
					if (diffCompare([this.formData], [{
							"actualCheckAttachment": [],
							"address": {},
							"attachment": [],
							"auditUser": {},
							"deletedFlag": 1,
							"draftFlag": 1,
							"exceptionCondition": "",
							"problemDealCondition": "",
							buildSection: this.$store.getters.currentBiaoDuan.id || 3,
							projectId: this.$store.getters.currentBiaoDuan.id || 2,
							"projectPartDesc": "",
							"projectPartId": null,
							"projectPartStr": '',
							"scenePhotoAttachment": [],
							"sideDate": formatDate(new Date()),
							"sideInfo": "",
							"sideProjectId": null,
							"sideWorkCondition": "",
							"video": []
						}], ['sideDate'])) {
						Message({
							type: 'warning',
							message: '不能提交空白!'
						});
						return;
					}

					this.formData.draftFlag = isdraft ? 0 : 1;
					this.formData.auditUser = this.auditUser;
					api.addOrUpdateSupervisionSide(this.formData).then((res) => {
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
							this.formData.sideInfo = JSON.stringify(this.sideInfo);
							this.formData.auditUser = this.auditUser;
							this.formData.draftFlag = 1;
							api.addOrUpdateSupervisionSide(this.formData).then((res) => {
								if (res.data) {
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
	.el-collapse-item {
		.el-input {
			width: calc(100% - 5px) !important;
		}
	}
	.van-radio-group--horizontal {
    	transform: translate(10px, 50%);
	}

	
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
				text-align: left;
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
