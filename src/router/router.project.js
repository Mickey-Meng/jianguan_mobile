/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/projectOverview',
    name: 'projectOverview',
    component: () => import('@/views/overView/index')
  },
  {
    path: '/overViewMap',
    name: 'overViewMap',
    component: () => import('@/views/overViewMap/index')
  },
  {
    path: '/personMap',
    name: 'personMap',
    component: () => import('@/views/overViewMap/personMap.vue')
  },
  {
    path: '/',
    component: () => import('@/views/project/index'),
    name: 'home',
    redirect: '/center',
    meta: {
      title: '首页',
      keepAlive: true
    },
    children: [
      {
        path: '/center',
        name: 'center',
        component: () => import('@/views/project/center/index'),
        meta: { title: '数据中心', keepAlive: true }
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('@/views/project/menu'),
        meta: {
          title: '菜单',
          keepAlive: true
        }
      },
      {
        path: '/system',
        name: 'system',
        component: () => import('@/views/system/index'),
        meta: { title: '系统设置', keepAlive: true }
      }
    ]
  },
  {
    path: '/common', //带有公共头部（左箭头返回+title）  以及下拉刷新
    component: () => import('@/views/common/index'),
    name: 'common',
    children: [
      {
        path: '/processFilling',
        name: 'processFilling',
        component: () => import('@/views/project/quality/processFilling'),
        meta: { title: '工序填报' }
      },
      {
        path: '/processList',
        name: 'processList',
        component: () => import('@/views/project/quality/processList'),
        meta: { title: '工序选择' }
      },
      {
        path: '/produceRecord',
        name: 'produceRecord',
        component: () => import('@/views/project/quality/produceRecord'),
        meta: { title: '工序报验' }
      },
      {
        path: '/record',
        name: 'record',
        component: () => import('@/views/project/quality/record'),
        meta: { title: '质量记录', keepAlive: false }
      },
      {
        path: '/check',
        name: 'check',
        component: () => import('@/views/project/quality/check'),
        meta: { title: '质量检查' }
      },
      {
        path: '/modify',
        name: 'modify',
        component: () => import('@/views/project/quality/modify'),
        meta: { title: '质量整改' }
      },
      {
        path: '/delayVerify',
        name: 'delayVerify',
        component: () => import('@/views/project/quality/delayVerify'),
        meta: { title: '延期审核' }
      },
      {
        path: '/verify',
        name: 'verify',
        component: () => import('@/views/project/quality/verify'),
        meta: { title: '整改确认' }
      },
      {
        path: '/deal',
        name: 'deal',
        component: () => import('@/views/project/quality/deal'),
        meta: { title: '质量整改处理' }
      },
      {
        path: '/detail',
        name: 'detail',
        component: () => import('@/views/project/quality/detail'),
        meta: { title: '质量检查详情' }
      },
      {
        path: '/processReport',
        name: 'processReport',
        component: () => import('@/views/project/quality/processReport'),
        meta: { title: '工序上报' }
      },
      {
        path: '/processReportDetail',
        name: 'processReportDetail',
        component: () => import('@/views/project/quality/processReportDetail'),
        meta: { title: '工序上报详情' }
      },
      {
        path: '/processFillingRecord',
        name: 'processFillingRecord',
        component: () => import('@/views/project/quality/processFillingRecord'),
        meta: { title: '填报记录' }
      },
      {
        path: '/processChecking',
        name: 'processChecking',
        component: () => import('@/views/project/quality/processChecking'),
        meta: { title: '工序自检' }
      },
      {
        path: '/processInspection',
        name: 'processInspection',
        component: () => import('@/views/project/quality/processInspection'),
        meta: { title: '工序报验' }
      },
      {
        path: '/processAudit',
        name: 'processAudit',
        component: () => import('@/views/project/quality/processAudit'),
        meta: { title: '工序审核' }
      },
      {
        path: '/processAuditRecord',
        name: 'processAuditRecord',
        component: () => import('@/views/project/quality/processAuditRecord'),
        meta: { title: '审核记录' }
      },
      {
        path: '/processAuditReport',
        name: 'processAuditReport',
        component: () => import('@/views/project/quality/processAuditReport'),
        meta: { title: '工序审核详情' }
      },
      {
        path: '/constructionTechnologyDisclosure',
        name: 'constructionTechnologyDisclosure',
        component: () => import('@/views/project/quality/newPage/constructionTechnologyDisclosure'),
        meta: { title: '施工技术交底' }
      },
      {
        path: '/concealedWorksManagement',
        name: 'concealedWorksManagement',
        component: () => import('@/views/project/quality/newPage/concealedWorksManagement'),
        meta: { title: '隐蔽工程管理' }
      },
      {
        path: '/constructionScheme',
        name: 'constructionScheme',
        component: () => import('@/views/project/quality/newPage/constructionScheme'),
        meta: { title: '施工方案' }
      },
      {
        path: '/constructionSubcontract',
        name: 'constructionSubcontract',
        component: () => import('@/views/contractManagement/constructionSubcontract'),
        meta: { title: '施工分包合同' }
      },
      {
        path: '/laborSubcontract',
        name: 'laborSubcontract',
        component: () => import('@/views/contractManagement/laborSubcontract'),
        meta: { title: '劳务分包合同' }
      },
      {
        path: '/entranceAndExitManagement',
        name: 'entranceAndExitManagement',
        component: () => import('@/views/contractManagement/entranceAndExitManagement'),
        meta: { title: '人员进退场管理' }
      },
      {
        path: '/equipmentEntryForInspection',
        name: 'equipmentEntryForInspection',
        component: () => import('@/views/contractManagement/equipmentEntryForInspection'),
        meta: { title: '设备进场报验' }
      },
      {
        path: '/equipmentExitForInspection',
        name: 'equipmentExitForInspection',
        component: () => import('@/views/contractManagement/equipmentExitForInspection'),
        meta: { title: '设备退场报验' }
      },
      {
        path: '/projectCommencementApplication',
        name: 'projectCommencementApplication',
        component: () => import('@/views/project/quality/newPage/projectCommencementApplication'),
        meta: { title: '项目开工申请' }
      },
      {
        path: '/separateApplicationForCommencement',
        name: 'separateApplicationForCommencement',
        component: () => import('@/views/project/quality/newPage/separateApplicationForCommencement'),
        meta: { title: '分项开工申请' }
      },
      {
        path: '/firstProcessApproval',
        name: 'firstProcessApproval',
        component: () => import('@/views/project/quality/newPage/firstProcessApproval'),
        meta: { title: '首件认可' }
      },
      {
        path: '/qualityPresentation',
        name: 'qualityPresentation',
        component: () => import('@/views/project/quality/newPage/qualityPresentation'),
        meta: { title: '质量简报' }
      },
      {
        path: '/supervisionStation',
        name: 'supervisionStation',
        component: () => import('@/views/project/quality/newPage/supervisionStation'),
        meta: { title: '监理旁站' }
      },
      {
        path: '/supervisionPatrol',
        name: 'supervisionPatrol',
        component: () => import('@/views/project/quality/newPage/supervisionPatrol'),
        meta: { title: '监理巡视' }
      },
      {
        path: '/supervisionOfInstruction',
        name: 'supervisionOfInstruction',
        component: () => import('@/views/project/quality/newPage/supervisionOfInstruction'),
        meta: { title: '监理指令' }
      },
      {
        path: '/supervisionNotice',
        name: 'supervisionNotice',
        component: () => import('@/views/project/quality/newPage/supervisionNotice'),
        meta: { title: '监理通知' }
      },
      {
        path: '/qualityTest',
        name: 'qualityTest',
        component: () => import('@/views/project/quality/newPage/qualityTest'),
        meta: { title: '质量检测' }
      },
      {
        path: '/qualityActivity',
        name: 'qualityActivity',
        component: () => import('@/views/project/quality/newPage/qualityActivity'),
        meta: { title: '质量活动' }
      },

      {
        path: '/managedObject',
        name: 'managedObject',
        component: () => import('@/views/project/quality/newPage/managedObject'),
        meta: { title: '管理目标' }
      },
      {
        path: '/managementSystem',
        name: 'managementSystem',
        component: () => import('@/views/project/quality/newPage/managementSystem'),
        meta: { title: '管理制度' }
      },
      {
        path: '/currentAccountManagement',
        name: 'currentAccountManagement',
        component: () => import('@/views/contractManagement/currentAccountManagement'),
        meta: { title: '往来款管理' }
      },
      // 我的任务
      {
        path: '/agencytask',
        name: 'agencytask',
        component: () => import('@/views/task/agencytask'),
        meta: { title: '待办任务' }
      },
      {
        path: '/copytask',
        name: 'copytask',
        component: () => import('@/views/task/copytask'),
        meta: { title: '抄送列表' }
      },
      {
        path: '/completedtasks',
        name: 'completedtasks',
        component: () => import('@/views/task/completedtasks'),
        meta: { title: '已办任务' }
      },
      {
        path: '/historicaltask',
        name: 'historicaltask',
        component: () => import('@/views/task/historicaltask'),
        meta: { title: '历史任务' }
      },
      //安全
      {
        path: '/securityRecord',
        name: 'securityRecord',
        component: () => import('@/views/project/security/record'),
        meta: { title: '安全记录' }
      },
      {
        path: '/securityReport',
        name: 'securityReport',
        component: () => import('@/views/project/security/report'),
        meta: { title: '安全检查' }
      },
      {
        path: '/securityReportRecord',
        name: 'securityReportRecord',
        component: () => import('@/views/project/security/reportRecord'),
        meta: { title: '安全整改' }
      },
      {
        path: '/securityReportDeal',
        name: 'securityReportDeal',
        component: () => import('@/views/project/security/reportDeal'),
        meta: { title: '整改处理' }
      },
      {
        path: '/securityDelayRecord',
        name: 'securityDelayRecord',
        component: () => import('@/views/project/security/delayRecord'),
        meta: { title: '延期审核' }
      },
      {
        path: '/securityDealRecord',
        name: 'securityDealRecord',
        component: () => import('@/views/project/security/dealRecord'),
        meta: { title: '整改确认' }
      },
      {
        path: '/securityDoneRecord',
        name: 'securityDoneRecord',
        component: () => import('@/views/project/security/doneRecord'),
        meta: { title: '整改完成' }
      },
      {
        path: '/securityDetail',
        name: 'securityDetail',
        component: () => import('@/views/project/security/detail'),
        meta: { title: '安全检查详情' }
      },

      //进度
      {
        path: '/cheduleFilling',
        name: 'cheduleFilling',
        component: () => import('@/views/project/chedule/cheduleFilling'),
        meta: { title: '计划填报' }
      },

      {
        path: '/weatherDetail',
        name: 'weatherDetail',
        component: () => import('@/views/common/weatherDetail'),
        meta: { title: '天气预报' }
      },
      {
        path: '/overview',
        name: 'overview',
        component: () => import('@/views/center/overview/index'),
        meta: { title: '项目概览', keepAlive: false }
      },
      {
        path: '/news',
        name: 'news',
        component: () => import('@/views/center/news/index'),
        meta: { title: '新闻动态', keepAlive: false }
      },
      {
        path: '/bim',
        name: 'bim',
        component: () => import('@/views/center/bim/index'),
        meta: { title: 'BIM中心', keepAlive: false }
      },
      {
        path: '/monitor',
        name: 'monitor',
        component: () => import('@/views/center/monitor/index'),
        meta: { title: '监控中心', keepAlive: false }
      },
      // 合同管理
      {
        path: '/clockInAdd',
        name: 'clockInAdd',
        component: () => import('@/views/project/contract/clockInAdd'),
        meta: { title: '新增打卡' }
      },
      {
        path: '/searchPage',
        name: 'searchPage',
        component: () => import('@/views/project/contract/searchPage'),
        meta: { title: '筛选条件' }
      },
      // 人员变更
      {
        path: '/personnelChangeAdd',
        name: 'personnelChangeAdd',
        component: () => import('@/views/project/contract/personnelChangeAdd'),
        meta: { title: '人员变更' }
      },
      // 请休假
      {
        path: '/takeVacationAdd',
        name: 'takeVacationAdd',
        component: () => import('@/views/project/contract/takeVacationAdd'),
        meta: { title: '请休假' }
      },
      // 人员台账
      {
        path: '/personnelAccount',
        name: 'personnelAccount',
        component: () => import('@/views/project/contract/personnelAccount'),
        meta: { title: '人员台账' }
      },
      {
        path: '/personnelAccountInfo',
        name: 'personnelAccountInfo',
        component: () => import('@/views/project/contract/personnelAccountInfo'),
        meta: { title: '人员台账详情' }
      },
      {
        path: '/report',
        name: 'report',
        component: () => import('@/components/Report'),
        meta: { title: '分项报表' }
      }
      // {
      //   path: '/overViewMap',
      //   name: 'overViewMap',
      //   component: () => import('@/views/overViewMap/index'),
      //   meta: { title: '项目总览' }
      // }
    ]
  },
  // 合同管理
  {
    path: '/clockIn',
    name: 'clockIn',
    component: () => import('@/views/project/contract/clockIn'),
    meta: { title: '考勤打卡', keepAlive: false }
  },
  {
    path: '/handlerFlowTask',
    name: 'handlerFlowTask',
    component: () => import('@/views/task/handlerFlowTask/index'),
    children: [
      {
        // 施工技术交底
        path: '/constructionTechnologyDisclosure_detail',
        name: 'constructionTechnologyDisclosure_detail',
        code: 'shigongjishujiaodi',
        component: () => import('@/views/project/quality/newPage/constructionTechnologyDisclosure/view'),
        meta: { title: '施工技术交底' }
      },
      {
        // 隐蔽工程管理
        path: '/concealedWorksManagement_detail',
        name: 'concealedWorksManagement_detail',
        code: 'yinbigongchengguanli',
        component: () => import('@/views/project/quality/newPage/concealedWorksManagement/view'),
        meta: { title: '隐蔽工程管理' }
      },
      {
        // 施工方案
        path: '/constructionScheme_detail',
        name: 'constructionScheme_detail',
        code: 'shigongfangan',
        component: () => import('@/views/project/quality/newPage/constructionScheme/view'),
        meta: { title: '施工方案' }
      },
      {
        // 施工分包合同
        path: '/constructionSubcontract_detail',
        name: 'constructionSubcontract_detail',
        code: 'shigongfenbaohetong',
        component: () => import('@/views/contractManagement/constructionSubcontract/view'),
        meta: { title: '施工分包合同' }
      },
      {
        // 劳务分包合同
        path: '/laborSubcontract_detail',
        name: 'laborSubcontract_detail',
        code: 'laowufenbaohetong',
        component: () => import('@/views/contractManagement/laborSubcontract/view'),
        meta: { title: '劳务分包合同' }
      },
      {
        // 人员进退场管理
        path: '/entranceAndExitManagement_detail',
        name: 'entranceAndExitManagement_detail',
        code: 'jintuichangguanli',
        component: () => import('@/views/contractManagement/entranceAndExitManagement/view'),
        meta: { title: '人员进退场管理' }
      },
      {
        // 设备进场
        path: '/equipmentEntryForInspection_detail',
        name: 'equipmentEntryForInspection_detail',
        code: 'shebeijinchangbaoyan',
        component: () => import('@/views/contractManagement/equipmentEntryForInspection/view'),
        meta: { title: '设备进场报验' }
      },
      {
        // 设备退场
        path: '/equipmentExitForInspection_detail',
        name: 'equipmentExitForInspection_detail',
        code: 'shebeituichangbaoyan',
        component: () => import('@/views/contractManagement/equipmentExitForInspection/view'),
        meta: { title: '设备退场报验' }
      },
      {
        // 项目开工申请
        path: '/projectCommencementApplication_detail',
        name: 'projectCommencementApplication_detail',
        code: 'xiangmukaigongshenqing',
        component: () => import('@/views/project/quality/newPage/projectCommencementApplication/view'),
        meta: { title: '项目开工申请' }
      },
      {
        // 项目开工申请
        path: '/separateApplicationForCommencement_detail',
        name: 'separateApplicationForCommencement_detail',
        code: 'fenxiangkaigongshenqing',
        component: () => import('@/views/project/quality/newPage/separateApplicationForCommencement/view'),
        meta: { title: '分项开工申请' }
      },
      {
        // 质量简报
        path: '/qualityPresentation_detail',
        name: 'qualityPresentation_detail',
        code: 'zhiliangjianbao',
        component: () => import('@/views/project/quality/newPage/qualityPresentation/view'),
        meta: { title: '质量简报' }
      },
      {
        // 首件认可
        path: '/firstProcessApproval_detail',
        name: 'firstProcessApproval_detail',
        code: 'shoujianrenke',
        component: () => import('@/views/project/quality/newPage/firstProcessApproval/view'),
        meta: { title: '首件认可' }
      },
      {
        // 监理质量
        path: '/supervisionOfInstruction_detail',
        name: 'supervisionOfInstruction_detail',
        code: 'jianlizhiling',
        component: () => import('@/views/project/quality/newPage/supervisionOfInstruction/view'),
        meta: { title: '监理质量' }
      },
      {
        // 监理通知
        path: '/supervisionNotice_detail',
        name: 'supervisionNotice_detail',
        code: 'jianlitongzhi',
        component: () => import('@/views/project/quality/newPage/supervisionNotice/view'),
        meta: { title: '监理通知' }
      },
      {
        // 监理旁站
        path: '/supervisionStation_detail',
        name: 'supervisionStation_detail',
        code: 'jianlipangzhan',
        component: () => import('@/views/project/quality/newPage/supervisionStation/view'),
        meta: { title: '监理旁站' }
      },
      {
        // 监理巡视
        path: '/supervisionPatrol_detail',
        name: 'supervisionPatrol_detail',
        code: 'jianlixunshi',
        component: () => import('@/views/project/quality/newPage/supervisionPatrol/view'),
        meta: { title: '监理巡视' }
      },
      {
        // 质量检测
        path: '/qualityTest_detail',
        name: 'qualityTest_detail',
        code: 'zhiliangjiance',
        component: () => import('@/views/project/quality/newPage/qualityTest/view'),
        meta: { title: '质量检测' }
      },
      {
        // 质量活动
        path: '/qualityActivity_detail',
        name: 'qualityActivity_detail',
        code: 'zhilianghuodong',
        component: () => import('@/views/project/quality/newPage/qualityActivity/view'),
        meta: { title: '质量活动' }
      },
      {
        path: '/currentAccountManagement_detail',
        name: 'currentAccountManagement_detail',
        code: 'wanglaikuanguanli',
        component: () => import('@/views/contractManagement/currentAccountManagement/view')
      },
      {
        path: '/personnelChange_detail',
        name: 'personnelChange_detail',
        code: 'renyuanbiangeng,sgdwrybg,jldwrybg,qzdwrybg',
        component: () => import('@/views/contractManagement/personChange/view'),
        meta: { title: '人员变更' }
      },
      {
        path: '/applicationForLeave_detail',
        name: 'applicationForLeave_detail',
        code: 'qingjiashenqing,sgdwryqj,jldwryqj,qzdwryqj',
        component: () => import('@/views/contractManagement/leave/view'),
        meta: { title: '请休假' }
      },
      {
        path: '/staffSubmit_detail',
        name: 'staffSubmit_detail',
        code: 'hetongrenyuanbaoshen,sgdwhtrybs,jldwhtrybs,qzdwhtrybs',
        component: () => import('@/views/contractManagement/staffSubmit/view'),
        meta: { title: '人员报审' }
      }
    ]
  },
  {
    path: '/personnelChange',
    name: 'personnelChange',
    component: () => import('@/views/project/contract/personnelChange'),
    meta: { title: '人员变更' }
  },
  {
    path: '/takeVacation',
    name: 'takeVacation',
    component: () => import('@/views/project/contract/takeVacation'),
    meta: { title: '请休假' }
  },
  {
    path: '*',
    redirect: '/'
  }
]
