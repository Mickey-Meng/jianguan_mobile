import api from './index'
import { Toast } from 'vant'
import { ZhuJiApi } from '@/config'

const judgePlus = function() {
  return new Promise(resolve => {
    if (process.env.NODE_ENV !== 'production') {
      resolve()
    } else if (window.plus) {
      resolve()
    } else {
      document.addEventListener('plusready', function() {
        resolve()
      })
    }
  })
}

const request = function(rParams) {
  mui.init()
  return new Promise(resolve => {
    judgePlus().then(() => {
      mui.init()
      let { url, method, params, data, isUploadFile, loading, showErrorMessage = true } = rParams

      if (params && JSON.stringify(params) !== '{}') {
        let temp = []
        for (let key in params) {
          temp.push(`${key}=${params[key]}`)
        }
        url += `?${temp.join('&')}`
      }

      let options = {
        url: ZhuJiApi + url,
        type: method.toUpperCase(),
        headers: { 'Content-Type': 'application/json' },
        success: function(response) {
          Toast.clear()
          if (response.status === 200 || response.meow === 0 || response.success) {
            resolve(response)
          } else if (response.status === 300) {
            resolve(response.data || [])
            showErrorMessage && Toast.fail(response.message || '无数据！')
          } else {
            showErrorMessage && Toast.fail(response.message || '接口访问出错！')
          }
        },
        error: function(xhr, type, errorThrown) {
          Toast.clear()
          // alert(options.url + (xhr.response || type || errorThrown))
          showErrorMessage && Toast.fail('请检查您的网络，或联系管理员！')
        }
      }
      if (data) {
        options.data = data
      }
      if (!isUploadFile) {
        let userinfoStr = localStorage.getItem('userinfo')
        if (userinfoStr) {
          let userinfo = JSON.parse(userinfoStr)
          options.headers['token'] = userinfo.token
        }
      }
      mui.ajax(options)
      loading &&
        Toast.loading({
          message: '加载中...',
          forbidClick: true
        })
    })
  })
}

/**
 * 通过id获取一条施工方案记录数据
 */
export const getBuildPlanDetail = params => {
  return request({
    url: api.getBuildPlanDetail,
    method: 'get',
    params: params
  })
}
/**
 * 通过id删除一条施工方案记录数据
 */
export const deleteBuildPlan = params => {
  return request({
    url: api.deleteBuildPlan,
    method: 'get',
    params: params
  })
}
/**
 * 分页查询施工方案记录数据
 */
export const getBuildPlanList = data => {
  return request({
    url: api.getBuildPlanList,
    method: 'post',
    data: data
  })
}

/**
 * 新增施工专业分包合同记录数据
 */
export const addOrUpdateContractBuild = data => {
  return request({
    url: api.addOrUpdateContractBuild,
    method: 'post',
    data: data
  })
}

/**
 * 分页查询施工专业分包合同记录数据
 */
export const getContractBuildDeatil = id => {
  return request({
    url: api.getContractBuildDeatil,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 分页查询施工专业分包合同记录数据
 */
export const deleteContractBuild = id => {
  return request({
    url: api.deleteContractBuild,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 分页查询施工专业分包合同记录数据
 */
export const getContractBuildList = data => {
  return request({
    url: api.getContractBuildList,
    method: 'post',
    data: data
  })
}

/**
 * 分页查询施工专业分包合同记录数据
 */
export const getContractBuildEnums = () => {
  return request({
    url: api.getContractBuildEnums,
    method: 'get',
    params: {}
  })
}
/**
 * 分页查询劳务分包合同记录数据
 */
export const addOrUpdateContractLabor = data => {
  return request({
    url: api.addOrUpdateContractLabor,
    method: 'post',
    data: data
  })
}

/**
 * 分页查询劳务分包合同记录数据
 */
export const getContractLaborDeatil = id => {
  return request({
    url: api.getContractLaborDeatil,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 分页查询劳务分包合同记录数据
 */
export const deleteContractLabor = id => {
  return request({
    url: api.deleteContractLabor,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 分页查询劳务分包合同记录数据
 */
export const getContractLaborList = data => {
  return request({
    url: api.getContractLaborList,
    method: 'post',
    data: data
  })
}
/**
 * 新增或者更新施工技术交底记录数据
 */
export const addOrUpdateBuildTechBottom = data => {
  return request({
    url: api.addOrUpdateBuildTechBottom,
    method: 'post',
    data: data
  })
}
/**
 * 通过id获取一条施工技术交底记录数据
 */
export const getBuildTechBottomDetail = params => {
  return request({
    url: api.getBuildTechBottomDetail,
    method: 'get',
    params: params
  })
}
/**
 * 通过id删除一条施工技术交底记录数据
 */
export const deleteBuildTechBottom = params => {
  return request({
    url: api.deleteBuildTechBottom,
    method: 'get',
    params: params
  })
}
/**
 * 分页查询施工技术交底记录数据
 */
export const getBuildTechBottomList = data => {
  return request({
    url: api.getBuildTechBottomList,
    method: 'post',
    data: data
  })
}

/**
 * 分页查询人员进退场记录数据
 */
export const addOrUpdateEnterExit = data => {
  return request({
    url: api.addOrUpdateEnterExit,
    method: 'post',
    data: data
  })
}

/**
 * 分页查询人员进退场记录数据
 */
export const getEnterExitDeatil = id => {
  return request({
    url: api.getEnterExitDeatil,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 分页查询人员进退场记录数据
 */
export const deleteEnterExit = id => {
  return request({
    url: api.deleteEnterExit,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 分页查询人员进退场记录数据
 */
export const getEnterExitList = data => {
  return request({
    url: api.getEnterExitList,
    method: 'post',
    data: data
  })
}

/**
 * 分页查询人员进退场记录数据
 */
export const getEnterExitUserList = data => {
  return request({
    url: api.getEnterExitUserList,
    method: 'post',
    data: data
  })
}

/**
 * 新增或者更新隐蔽工程验收记录数据
 */
export const addOrUpdateHiddenProject = data => {
  return request({
    url: api.addOrUpdateHiddenProject,
    method: 'post',
    data: data
  })
}
/**
 * 通过id获取一条隐蔽工程验收记录数据
 */
export const getHiddenProjectDetail = params => {
  return request({
    url: api.getHiddenProjectDetail,
    method: 'get',
    params: params
  })
}
/**
 * 通过id删除一条隐蔽工程验收记录数据
 */
export const deleteHiddenProject = params => {
  return request({
    url: api.deleteHiddenProject,
    method: 'get',
    params: params
  })
}
/**
 * 分页查询隐蔽工程验收记录数据
 */
export const getHiddenProjectList = data => {
  return request({
    url: api.getHiddenProjectList,
    method: 'post',
    data: data
  })
}
/**
 * 导出隐蔽工程验收记录数据
 */
export const exportHiddenProjectList = data => {
  return request({
    url: api.exportHiddenProject,
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}
/**
 * 设备进场
 */
export const addOrUpdateEquipmentEnter = data => {
  return request({
    url: api.addOrUpdateEquipmentEnter,
    method: 'post',
    data: data
  })
}

/**
 * 设备进场
 */
export const getEquipmentEnterDeatil = id => {
  return request({
    url: api.getEquipmentEnterDeatil,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 设备进场
 */
export const deleteEquipmentEnter = id => {
  return request({
    url: api.deleteEquipmentEnter,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 设备进场
 */
export const getEquipmentEnterList = data => {
  return request({
    url: api.getEquipmentEnterList,
    method: 'post',
    data: data
  })
}

/**
 * 设备进场
 */
export const getEquipmentEnterEnums = () => {
  return request({
    url: api.getEquipmentEnterEnums,
    method: 'get',
    params: {}
  })
}

/**
 * 设备退场
 */
export const addOrUpdateEquipmentExit = data => {
  return request({
    url: api.addOrUpdateEquipmentExit,
    method: 'post',
    data: data
  })
}
/**
 * 设备退场
 */
export const getEquipmentExitDeatil = id => {
  return request({
    url: api.getEquipmentExitDeatil,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 设备退场
 */
export const deleteEquipmentExit = id => {
  return request({
    url: api.deleteEquipmentExit,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 设备退场
 */
export const getEquipmentExitList = data => {
  return request({
    url: api.getEquipmentExitList,
    method: 'post',
    data: data
  })
}

/**
 * 项目开工申请
 */
export const addOrUpdateProjectOpenExit = data => {
  return request({
    url: api.addOrUpdateProjectOpenExit,
    method: 'post',
    data: data
  })
}
/**
 * 项目开工申请
 */
export const getProjectOpenDeatil = id => {
  return request({
    url: api.getProjectOpenDeatil,
    method: 'get',
    params: {
      id
    }
  })
}
/**
 * 项目开工申请
 */
export const deleteProjectOpen = id => {
  return request({
    url: api.deleteProjectOpen,
    method: 'get',
    params: {
      id
    }
  })
}
/**
 * 项目开工申请
 */
export const getProjectOpenList = data => {
  return request({
    url: api.getProjectOpenList,
    method: 'post',
    data: data
  })
}
/**
 * 分项开工申请
 */
export const addOrUpdateSubitemOpen = data => {
  return request({
    url: api.addOrUpdateSubitemOpen,
    method: 'post',
    data: data
  })
}

/**
 * 分项开工申请
 */
export const getSubitemOpenDeatil = id => {
  return request({
    url: api.getSubitemOpenDeatil,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 分项开工申请
 */
export const deleteSubitemOpen = id => {
  return request({
    url: api.deleteSubitemOpen,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 分项开工申请
 */
export const getSubitemOpenList = data => {
  return request({
    url: api.getSubitemOpenList,
    method: 'post',
    data: data
  })
}

/**
 * 收件认可
 */
export const addOrUpdateFirstAccept = data => {
  return request({
    url: api.addOrUpdateFirstAccept,
    method: 'post',
    data: data
  })
}
/**
 * 收件认可
 */
export const getFirstAcceptDeatil = id => {
  return request({
    url: api.getFirstAcceptDeatil,
    method: 'get',
    params: {
      id
    }
  })
}
/**
 * 收件认可
 */
export const deleteFirstAccept = id => {
  return request({
    url: api.deleteFirstAccept,
    method: 'get',
    params: {
      id
    }
  })
}
/**
 * 收件认可
 */
export const getFirstAcceptList = data => {
  return request({
    url: api.getFirstAcceptList,
    method: 'post',
    data: data
  })
}
/**
 * 质量简报
 */
export const addOrUpdateQualityReport = data => {
  return request({
    url: api.addOrUpdateQualityReport,
    method: 'post',
    data: data
  })
}

/**
 * 质量简报
 */
export const getQualityReportDeatil = id => {
  return request({
    url: api.getQualityReportDeatil,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 质量简报
 */
export const deleteQualityReport = id => {
  return request({
    url: api.deleteQualityReport,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 质量简报
 */
export const getQualityReportList = data => {
  return request({
    url: api.getQualityReportList,
    method: 'post',
    data: data
  })
}
/**
 * 监理旁站
 */
export const addOrUpdateSupervisionSide = data => {
  return request({
    url: api.addOrUpdateSupervisionSide,
    method: 'post',
    data: data
  })
}

/**
 * 监理旁站
 */
export const getSupervisionSideDeatil = id => {
  return request({
    url: api.getSupervisionSideDeatil,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 监理旁站
 */
export const deleteSupervisionSide = id => {
  return request({
    url: api.deleteSupervisionSide,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 监理旁站
 */
export const getSupervisionSideList = data => {
  return request({
    url: api.getSupervisionSideList,
    method: 'post',
    data: data
  })
}
/**
 * 监理旁站
 */
export const getSupervisionSideEnums = () => {
  return request({
    url: api.getSupervisionSideEnums,
    method: 'get',
    params: {}
  })
}
/**
 * 监理巡视
 */
export const addOrUpdateSupervisionPatrol = data => {
  return request({
    url: api.addOrUpdateSupervisionPatrol,
    method: 'post',
    data: data
  })
}
/**
 * 监理巡视
 */
export const getSupervisionPatrolDeatil = id => {
  return request({
    url: api.getSupervisionPatrolDeatil,
    method: 'get',
    params: {
      id
    }
  })
}
/**
 * 监理巡视
 */
export const deleteSupervisionPatrol = id => {
  return request({
    url: api.deleteSupervisionPatrol,
    method: 'get',
    params: {
      id
    }
  })
}
/**
 * 监理巡视
 */
export const getSupervisionPatrolList = data => {
  return request({
    url: api.getSupervisionPatrolList,
    method: 'post',
    data: data
  })
}

/**
 * 监理通知
 */
export const addOrUpdateSupervisionNotice = data => {
  return request({
    url: api.addOrUpdateSupervisionNotice,
    method: 'post',
    data: data
  })
}
/**
 * 监理通知
 */
export const getSupervisionNoticeDeatil = id => {
  return request({
    url: api.getSupervisionNoticeDeatil,
    method: 'get',
    params: {
      id
    }
  })
}
/**
 * 监理通知
 */
export const deleteSupervisionNotice = id => {
  return request({
    url: api.deleteSupervisionNotice,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 监理通知
 */
export const getSupervisionNoticeList = data => {
  return request({
    url: api.getSupervisionNoticeList,
    method: 'post',
    data: data
  })
}

/**
 * 监理指令
 */
export const addOrUpdateSupervisionOrder = data => {
  return request({
    url: api.addOrUpdateSupervisionOrder,
    method: 'post',
    data: data
  })
}

/**
 * 监理指令
 */
export const getSupervisionOrderDeatil = id => {
  return request({
    url: api.getSupervisionOrderDeatil,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 监理指令
 */
export const deleteSupervisionOrder = id => {
  return request({
    url: api.deleteSupervisionOrder,
    method: 'get',
    params: {
      id
    }
  })
}
/**
 * 监理指令
 */
export const getSupervisionOrderList = data => {
  return request({
    url: api.getSupervisionOrderList,
    method: 'post',
    data: data
  })
}

/**
 * 新增或者更新质量检测数据
 */
export const addOrUpdateQualityDetection = data => {
  return request({
    url: api.addOrUpdateQualityDetection,
    method: 'post',
    data: data
  })
}

/**
 * 通过id获取一条质量检测数据
 */
export const getQualityDetectionDetail = params => {
  return request({
    url: api.getQualityDetectionDetail,
    method: 'get',
    params: params
  })
}
/**
 * 通过id删除一条质量检测数据
 */
export const deleteQualityDetection = params => {
  return request({
    url: api.deleteQualityDetection,
    method: 'get',
    params: params
  })
}
/**
 * 质量检测分页查询
 */
export const getQualityDetectionList = data => {
  return request({
    url: api.getQualityDetectionList,
    method: 'post',
    data: data
  })
}
/**
 * 导出质量检测记录数据
 */
export const exportQualityDetectionList = data => {
  return request({
    url: api.exportQualityDetection,
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

/**
 * 质量活动
 */
export const addOrUpdateQualityActivity = data => {
  return request({
    url: api.addOrUpdateQualityActivity,
    method: 'post',
    data: data
  })
}

/**
 * 质量活动
 */
export const getQualityActivityDeatil = id => {
  return request({
    url: api.getQualityActivityDeatil,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 质量活动
 */
export const deleteQualityActivity = id => {
  return request({
    url: api.deleteQualityActivity,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 质量活动
 */
export const getQualityActivityList = data => {
  return request({
    url: api.getQualityActivityList,
    method: 'post',
    data: data
  })
}

/**
 * 管理目标分页查询
 */
export const getManagementObjectList = data => {
  return request({
    url: api.getManagementObjectList,
    method: 'post',
    data: data
  })
}
/**
 * 新增或更新 管理目标 数据
 */
export const addOrUpdateManagementObjectList = data => {
  return request({
    url: api.addOrUpdateManagementObjectList,
    method: 'post',
    data: data
  })
}

/**
 * 通过id获取一条管理目标数据
 */
export const getManagementObject = id => {
  return request({
    url: api.getManagementObject,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 删除 管理目标 数据
 */
export const deleteManagementObject = id => {
  return request({
    url: api.deleteManagementObject,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 管理制度分页查询
 */
export const getManageRegimeList = data => {
  return request({
    url: api.getManageRegimeList,
    method: 'post',
    data: data
  })
}
/**
 * 新增或更新 管理制度 数据
 */
export const addOrUpdateManageRegimeList = data => {
  return request({
    url: api.addOrUpdateManageRegimeList,
    method: 'post',
    data: data
  })
}

/**
 * 通过id获取一条管理制度数据
 */
export const getManageRegime = id => {
  return request({
    url: api.getManageRegime,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 删除 管理制度 数据
 */
export const deleteManageRegime = id => {
  return request({
    url: api.deleteManageRegime,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 往来款管理
 */
export const addOrUpdateComeGoMoney = data => {
  return request({
    url: api.addOrUpdateComeGoMoney,
    method: 'post',
    data: data
  })
}

/**
 * 往来款管理
 */
export const getComeGoMoneyDeatil = id => {
  return request({
    url: api.getComeGoMoneyDeatil,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 往来款管理
 */
export const deleteComeGoMoney = id => {
  return request({
    url: api.deleteComeGoMoney,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 往来款管理
 */
export const getComeGoMoneyList = data => {
  return request({
    url: api.getComeGoMoneyList,
    method: 'post',
    data: data
  })
}
/**
 * 查询待办任务
 */
export const listHandleTask = data => {
  return request({
    url: api.listHandleTask,
    method: 'post',
    data: data
  })
}

/**
 * 抄送列表
 */
export const listRemindingTask = data => {
  return request({
    url: api.listRemindingTask,
    method: 'post',
    data: data
  })
}
/**
 * 抄送列表
 */
export const listCopyMessage = data => {
  return request({
    url: api.listCopyMessage,
    method: 'post',
    data: data
  })
}

/**
 * 查询已办任务
 */
export const listHistoricTask = data => {
  return request({
    url: api.listHistoricTask,
    method: 'post',
    data: data
  })
}
/**
 * 查询历史任务
 */
export const listHistoricProcessInstance = data => {
  return request({
    url: api.listHistoricProcessInstance,
    method: 'post',
    data: data
  })
}
/**
 *
 */
export const rejectRuntimeTask = data => {
  return request({
    url: api.rejectRuntimeTask,
    method: 'post',
    data: data
  })
}
/**
 * 获取流程列表
 */
export const getFlowEntryList = data => {
  return request({
    url: api.getFlowEntryList,
    method: 'post',
    data: data
  })
}
/**
 * 获取流程分类
 */
export const getFlowCategoryListDict = data => {
  return request({
    url: api.getFlowCategoryListDict,
    method: 'get',
    params: {}
  })
}

/**
 * 获取流程对应节点的人员范围flowAuditEntry/detail/id
 * @param {*} data
 * @returns
 */
export const getFlowAuditEntry = data => {
  return request({
    url: api.flowAuditEntry,
    method: 'get',
    params: data
  })
}

export const getCopyUserByFlowKey = data => {
  return request({
    url: api.getCopyUserByFlowKey,
    method: 'get',
    params: data
  })
}

/**
 * 提交流程的用户任务
 */
export const submitUserTask = data => {
  return request({
    url: api.submitUserTask,
    method: 'post',
    data: data
  })
}
/**
 * viewRuntimeTaskInfo
 */
export const viewRuntimeTaskInfo = params => {
  return request({
    url: api.viewRuntimeTaskInfo,
    method: 'get',
    params: params,
    showErrorMessage: false
  })
}
/**
 * viewHighlightFlowData
 */
export const viewHighlightFlowData = params => {
  return request({
    url: api.viewHighlightFlowData,
    method: 'get',
    params: params
  })
}
/**
 * viewProcessBpmn
 */
export const viewProcessBpmn = params => {
  return request({
    url: api.viewProcessBpmn,
    method: 'get',
    params: params
  })
}
/**
 * listFlowTaskComment
 */
export const listFlowTaskComment = params => {
  return request({
    url: api.listFlowTaskComment,
    method: 'get',
    params: params
  })
}
/**
 * getFlowAndTaskInfo
 */
export const getFlowAndTaskInfo = params => {
  return request({
    url: api.getFlowAndTaskInfo,
    method: 'get',
    params: params
  })
}
/**
 * getRunVariables
 */
export const getRunVariables = params => {
  return request({
    url: api.getRunVariables,
    method: 'get',
    params: params
  })
}

/**
 * viewTaskUserInfo
 */
export const viewTaskUserInfo = params => {
  return request({
    url: api.viewTaskUserInfo,
    method: 'get',
    params: params
  })
}

export const getRolesByProject = data => {
  return request({
    url: api.getRolesByProject,
    method: 'post'
    //   data: data
  })
}
/**
 * getFlowType
 */
export const getFlowType = data => {
  return request({
    url: api.getFlowType,
    method: 'post',
    data: data
  })
}
/**
 * addFlowEntryByFlowKey
 */
export const addFlowEntryByFlowKey = params => {
  return request({
    url: api.addFlowEntryByFlowKey,
    method: 'get',
    params: params
  })
}
/**
 * addOrUpdateFlowAuditEntry
 */
export const addOrUpdateFlowAuditEntry = data => {
  return request({
    url: api.addOrUpdateFlowAuditEntry,
    method: 'post',
    data: data
  })
}
/**
 * getFlowTypeDetail
 */
export const getFlowTypeDetail = params => {
  return request({
    url: api.getFlowTypeDetail,
    method: 'get',
    params: params
  })
}
