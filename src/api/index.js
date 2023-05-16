const api = {
  login: '/user/doLogin',
  userinfo: '/user/userinfo',
  username: '/user/name',
  getVideoToken: '/user/viewToken/new',
  // getProjectList: '/projects/getProjects',
  getProjectList: '/projects/getAppProjectByUser', //通过用户查询所拥有的项目权限(目前只支持用户所拥有的工区权限查询, 分两级，同时查询项目以及标段)

  updateOnline: '/user/updateOnline',
  getOnline: '/user/getOnline',
  getAllUserOnline: '/user/getAllUserOnline',

  //质量-工序
  getProcessType: '/produce/getType',
  getTypeDetail: '/produce/getTypeDetail',
  getCheckDataByConponentId: '/produce/getCheckDataByConponentId',
  getChecker: '/produce/getChecker',
  addRecode: '/produce/addRecode',
  updateRecode: '/produce/updateRecode',
  getAgency: '/produce/getAgency',
  getAllcheckData: '/produce/getAllcheckData',
  getCheckDataById: '/produce/getCheckDataById',
  check: '/produce/check',
  getCheckDataByrecod: '/produce/getCheckDataByrecod',
  getAllReverse: '/produce/getAllReverse',
  getConAndReferPerson: '/person/getPerson',

  // uploadFile: '/mong/upload',
  uploadFile: '/mong/uploadBase64',
  newUploadFile: '/mong/newUpload',

  //安全
  getSafeTree: '/safe/getTree',
  // getSafeCheck: '/safe/getcheck',
  getSafeCheck: '/safe/getPersonLiableByGroup',
  uploadSafeData: '/safe/uploadData',
  getSafeEvent: '/safe/getSafeEvent',
  submitDelaySafeEvent: '/safe/submitDelaySafeEvent',
  submitDealWithSafeEvent: '/safe/submitDealWithSafeEvent',
  getDelaySafeEvent: '/safe/getDelaySafeEvent',
  doDelaySafeEvent: '/safe/doDelaySafeEvent',
  getNotDoneSafeEvent: '/safe/getNotDoneSafeEvent',
  doNotDoneSafeEvent: '/safe/doNotDoneSafeEvent',
  getDoneSafeEvent: '/safe/getDoneSafeEvent',
  getprojectBygongqu: '/safe/getprojectBygongqu',
  // getGongQu: '/safe/getgqAll',
  getGongQuProject: '/safe/uploadAddr',
  getGongQu: '/safe/getGroups',
  getAllStatusSafeEvent: '/safe/getAllStatusSafeEvent',
  newInterfaceSafety: '/safe/newInterface',

  getMiddleData: '/progress/getMiddleData',
  getStatus: '/progress/getStatus',
  getCountIncresConponent: '/count/getCountIncresConponent',
  getCountIncresConponentGroupGq: '/count/getCountIncresConponentGroupGq',
  getCountConponent: '/count/getCountConponent',
  getYcData: '/progress/getYcData',

  //count
  getNewType: '/count/getNewType',
  getProjectDetail: '/count/getProjectDetail',
  getFinishConponent: '/count/getFinishConponent',
  getProject: '/count/getProject',
  getGqFirst: '/count/getGqFirst',
  getpjFirst: '/count/getpjFirst',

  //component
  getProjectTree: '/component/getProjectTree',
  getTree: '/component/getTree',

  //quality
  getQualityTree: '/quality/getTree',
  uploadQualityData: '/quality/uploadData',
  getQualityEvent: '/quality/getQualityEvent',
  submitDealWithQualityEvent: '/quality/submitDealWithSafeEvent',
  getNotDoneQualityEvent: '/quality/getNotDoneSafeEvent',
  doNotDoneQualityEvent: '/quality/doNotDoneSafeEvent',
  submitDelayQuality: '/quality/submitDelaySafeEvent',
  getDelayQualityEvent: '/quality/getDelaySafeEvent',
  doDelayQualityEvent: '/quality/doDelaySafeEvent',
  getAllStatusQualityEvent: '/quality/getAllStatusQualityEvent',
  newInterfaceQuality: '/quality/newInterface',

  //施工技术交底
  getBuildTechBottomList: '/web/api/v1/buildTechBottom/page',
  getBuildTechBottomDetail: '/web/api/v1/buildTechBottom/detail/id',
  addOrUpdateBuildTechBottom: '/web/api/v1/buildTechBottom/addOrUpdate',
  deleteBuildTechBottom: '/web/api/v1/buildTechBottom/id',
  //隐蔽工程管理
  getHiddenProjectList: '/web/api/v1/hiddenProjectAccept/page',
  getHiddenProjectDetail: '/web/api/v1/hiddenProjectAccept/detail/id',
  addOrUpdateHiddenProject: '/web/api/v1/hiddenProjectAccept/addOrUpdate',
  deleteHiddenProject: '/web/api/v1/hiddenProjectAccept/id',
  exportHiddenProject: '/web/api/v1/hiddenProjectAccept/export',
  //施工方案
  getBuildPlanList: '/web/api/v1/buildPlan/page',
  getBuildPlanDetail: '/web/api/v1/buildPlan/detail/id',
  addOrUpdateBuildPlan: '/web/api/v1/buildPlan/addOrUpdate',
  deleteBuildPlan: '/web/api/v1/buildPlan/id',
  //施工专业分包合同
  addOrUpdateContractBuild: '/web/api/v1/buildContract/addOrUpdate',
  getContractBuildDeatil: '/web/api/v1/buildContract/detail/id',
  deleteContractBuild: '/web/api/v1/buildContract/id',
  getContractBuildList: '/web/api/v1/buildContract/page',
  getContractBuildEnums: '/web/api/v1/buildContract/buildContractPart/enums',

  //劳务分包合同
  addOrUpdateContractLabor: '/web/api/v1/laborContract/addOrUpdate',
  getContractLaborDeatil: '/web/api/v1/laborContract/detail/id',
  deleteContractLabor: '/web/api/v1/laborContract/id',
  getContractLaborList: '/web/api/v1/laborContract/page',
  //进退场
  addOrUpdateEnterExit: '/web/api/v1/enterExit/addOrUpdate',
  getEnterExitDeatil: '/web/api/v1/enterExit/detail/id',
  deleteEnterExit: '/web/api/v1/enterExit/id',
  getEnterExitList: '/web/api/v1/enterExit/page',
  getEnterExitUserList: '/web/api/v1/enterExitUser/page',

  //设备进场
  addOrUpdateEquipmentEnter: '/web/api/v1/equipmentEnter/addOrUpdate',
  getEquipmentEnterDeatil: '/web/api/v1/equipmentEnter/detail/id',
  deleteEquipmentEnter: '/web/api/v1/equipmentEnter/id',
  getEquipmentEnterList: '/web/api/v1/equipmentEnter/page',
  getEquipmentEnterEnums: '/web/api/v1/equipmentEnter/equipment/enums',
  //设备退场
  addOrUpdateEquipmentExit: '/web/api/v1/equipmentExit/addOrUpdate',
  getEquipmentExitDeatil: '/web/api/v1/equipmentExit/detail/id',
  deleteEquipmentExit: '/web/api/v1/equipmentExit/id',
  getEquipmentExitList: '/web/api/v1/equipmentExit/page',

  //项目开工申请
  addOrUpdateProjectOpenExit: '/web/api/v1/projectOpen/addOrUpdate',
  getProjectOpenDeatil: '/web/api/v1/projectOpen/detail/id',
  deleteProjectOpen: '/web/api/v1/projectOpen/id',
  getProjectOpenList: '/web/api/v1/projectOpen/page',
  //分项开工申请
  addOrUpdateSubitemOpen: '/web/api/v1/subitemOpen/addOrUpdate',
  getSubitemOpenDeatil: '/web/api/v1/subitemOpen/detail/id',
  deleteSubitemOpen: '/web/api/v1/subitemOpen/id',
  getSubitemOpenList: '/web/api/v1/subitemOpen/page',

  //首件认可
  addOrUpdateFirstAccept: '/web/api/v1/firstAccept/addOrUpdate',
  getFirstAcceptDeatil: '/web/api/v1/firstAccept/detail/id',
  deleteFirstAccept: '/web/api/v1/firstAccept/id',
  getFirstAcceptList: '/web/api/v1/firstAccept/page',
  //质量简报
  addOrUpdateQualityReport: '/web/api/v1/qualityReport/addOrUpdate',
  getQualityReportDeatil: '/web/api/v1/qualityReport/detail/id',
  deleteQualityReport: '/web/api/v1/qualityReport/id',
  getQualityReportList: '/web/api/v1/qualityReport/page',

  //监理旁站
  addOrUpdateSupervisionSide: '/web/api/v1/supervisionSide/addOrUpdate',
  getSupervisionSideDeatil: '/web/api/v1/supervisionSide/detail/id',
  deleteSupervisionSide: '/web/api/v1/supervisionSide/id',
  getSupervisionSideList: '/web/api/v1/supervisionSide/page',
  getSupervisionSideEnums: '/web/api/v1/supervisionSide/sideProject/enums',

  //监理巡视
  addOrUpdateSupervisionPatrol: '/web/api/v1/supervisionPatrol/addOrUpdate',
  getSupervisionPatrolDeatil: '/web/api/v1/supervisionPatrol/detail/id',
  deleteSupervisionPatrol: '/web/api/v1/supervisionPatrol/id',
  getSupervisionPatrolList: '/web/api/v1/supervisionPatrol/page',

  //监理通知
  addOrUpdateSupervisionNotice: '/web/api/v1/supervisionNotice/addOrUpdate',
  getSupervisionNoticeDeatil: '/web/api/v1/supervisionNotice/detail/id',
  deleteSupervisionNotice: '/web/api/v1/supervisionNotice/id',
  getSupervisionNoticeList: '/web/api/v1/supervisionNotice/page',

  //质量活动
  addOrUpdateQualityActivity: '/web/api/v1/qualityActivity/addOrUpdate',
  getQualityActivityDeatil: '/web/api/v1/qualityActivity/detail/id',
  deleteQualityActivity: '/web/api/v1/qualityActivity/id',
  getQualityActivityList: '/web/api/v1/qualityActivity/page',

  //质量检测
  addOrUpdateQualityDetection: '/web/api/v1/qualityDetection/addOrUpdate',
  getQualityDetectionDetail: '/web/api/v1/qualityDetection/detail/id',
  getMaterialEnums: '/web/api/v1/qualityDetection/material/enums',
  deleteQualityDetection: '/web/api/v1/qualityDetection/id',
  getQualityDetectionList: '/web/api/v1/qualityDetection/page',
  exportQualityDetection: '/web/api/v1/qualityDetection/export',

  //监理指令
  addOrUpdateSupervisionOrder: '/web/api/v1/supervisionOrder/addOrUpdate',
  getSupervisionOrderDeatil: '/web/api/v1/supervisionOrder/detail/id',
  deleteSupervisionOrder: '/web/api/v1/supervisionOrder/id',
  getSupervisionOrderList: '/web/api/v1/supervisionOrder/page',

  // 管理目标
  addOrUpdateManagementObjectList: '/web/api/v1/manageTarget/addOrUpdate', // 新增或更新管理目标数据
  getManagementObject: '/web/api/v1/manageTarget/detail/id', // 通过id获取一条管理目标数据
  deleteManagementObject: '/web/api/v1/manageTarget/id', // 删除单个管理目标数据
  getManagementObjectList: '/web/api/v1/manageTarget/page', // 管理目标list

  // 管理制度
  addOrUpdateManageRegimeList: '/web/api/v1/manageRegime/addOrUpdate', // 新增或更新管理制度数据
  getManageRegime: '/web/api/v1/manageRegime/detail/id', // 通过id获取一条管理制度数据
  deleteManageRegime: '/web/api/v1/manageRegime/id', // 删除单个管理制度数据
  getManageRegimeList: '/web/api/v1/manageRegime/page', // 管理制度list

  //往来款
  addOrUpdateComeGoMoney: '/web/api/v1/comeGoMoney/addOrUpdate',
  getComeGoMoneyDeatil: '/web/api/v1/comeGoMoney/detail/id',
  deleteComeGoMoney: '/web/api/v1/comeGoMoney/id',
  getComeGoMoneyList: '/web/api/v1/comeGoMoney/page',

  // 流程任务
  listHandleTask: '/flow/flowOperation/listRuntimeTask', //待办
  listHistoricTask: '/flow/flowOperation/listHistoricTask', //已办
  listHistoricProcessInstance: '/flow/flowOperation/listHistoricProcessInstance', //历史任务
  submitUserTask: '/admin/flow/flowStaticPage/submitUserTask',
  rejectRuntimeTask: '/admin/flow/flowOperation/rejectRuntimeTask', //驳回
  viewTaskUserInfo: '/admin/flow/flowOperation/viewTaskUserInfo', //审批人
  viewRuntimeTaskInfo: '/admin/flow/flowOperation/viewRuntimeTaskInfo', //查询流程按钮
  viewHighlightFlowData: '/admin/flow/flowOperation/viewHighlightFlowData', //高亮流程图
  viewProcessBpmn: '/admin/flow/flowOperation/viewProcessBpmn', //获取流程图bpmn
  listFlowTaskComment: '/flow/flowOperation/listFlowTaskComment', //获取当前流程任务的审批列表
  listRemindingTask: '/admin/flow/flowMessage/listRemindingTask', //抄送列表
  listCopyMessage: '/admin/flow/flowMessage/listCopyMessage', //抄送列表
  getFlowAndTaskInfo: '/admin/flow/flowStaticPage/getFlowAndTaskInfo', //根据流程idH获取三个key 用于查看审批信息
  getRunVariables: '/flow/flowOperation/getRunVariables', //根据流程idH获取三个key 用于查看审批信息
  getFlowType: '/web/api/v1/flowType/page', //分页查询流程类型数据
  addFlowEntryByFlowKey: '/web/api/v1/flowAuditEntry/addFlowEntryByFlowKey', //新增流程节点信息
  addOrUpdateFlowAuditEntry: '/web/api/v1/flowAuditEntry/addOrUpdate', //新增或者更新流程节点审核人员数据
  getFlowTypeDetail: '/web/api/v1/flowType/getAuditInfoByTypeId', //通过id获取一条流程类型数据
  flowAuditEntry: '/web/api/v1/flowAuditEntry/getAuditInfoByFlowKey',
  getCopyUserByFlowKey: '/web/api/v1/flowAuditEntry/getCopyUserByFlowKey',
  // 流程配置
  getFlowEntryList: '/admin/flow/flowEntry/list', // 获取所有流程列表
  getFlowCategoryListDict: '/admin/flow/flowCategory/listDict', // 获取流程分类
  //项目相关
  getChildProject: '/projects/getChildProject', //通过项目id获取项目子级的标段信息
  // getCompanyByProjectId: "/projects/getCompanyByProjectId", //通过项目下的标段id获取项目的单位信息
  // getInfoByProjectId: "/projects/getInfoByProjectId", //通过项目id查询组织信息和用户信息
  getProjectInfoById: '/projects/getProjectInfoById', //通过项目id查询项目详细信息（项目名、施工单位、监理单位、合同号等）
  // getProjectRoleTree: "/projects/getProjectRoleTree", //获取项目下面的组织角色树
  // getProjectUserTree: "/projects/getProjectUserTree", //获取项目下面的组织用户树
  getUserByRoleId: '/person/getUserByRole', //通过角色id获取用户信息

  //message
  // getMessage: '/message/getMessage',
  getMessage1: '/message/getMessage1',
  getMessage2: '/message/getMessage2',

  //news
  getNews: '/news/get',

  getWorkPoint: '/digitalTwin/getData',

  // 考勤 /person/getClockIn
  getClockIn: '/person/getSelfClockIn',
  getFence: '/fence/getFence',
  subClockIn: '/person/subClockIn',

  // 人员变更
  getPersonChange: '/person/getPersonChange',
  getRoleInfoByUserId: '/projects/getUsersByUserid',
  getUserRoleAndCode: '/projects/getRoleByUser',
  addPersonChange: '/person/subPersonChange',
  getPersonChangeByProcessId: '/person/getChangeByProcessId', //根据项目id和工单ID查询变更信息

  // 请休假
  getLeave: '/person/getLeaveData',
  submitLeave: '/person/subLeave', //提交请假申请
  getLeaveByProcessId: '/person/getLeaveByProcessId',

  //人员报审
  getStaffByProcessIdAndProjectId: '/person/getContractByProcessId', //根据项目id和工单ID查询报审的信息

  //人员台账
  getChangeStandingBook: '/person/getChangeStandingBook', //人员变更台账
  getContractStandingBook: '/person/getContractStandingBook', //人员报审台账
  getLeaveStandingBook: '/person/getLeaveStandingBook' //请休假台账
}

export default api
