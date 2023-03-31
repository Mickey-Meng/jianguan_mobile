import api from './index'
import { Toast } from 'vant'
import { baseApi } from '@/config'

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
      let { url, method, params, data, isUploadFile, loading } = rParams
      let tempUrl = url
      if (params && JSON.stringify(params) !== '{}') {
        let temp = []
        for (let key in params) {
          temp.push(`${key}=${params[key]}`)
        }
        url += `?${temp.join('&')}`
      }

      let options = {
        url: baseApi + url,
        type: method.toUpperCase(),
        headers: { 'Content-Type': 'application/json' },
        success: function(response) {
          Toast.clear()
          if (response.status === 200 || response.meow === 0) {
            resolve(response.data)
          } else if (response.status === 201) {
            Toast.fail(response.message || '失败，请联系管理员！')
          } else if (response.status === 300) {
            resolve(response.data || [])
            Toast.fail(response.message || '无数据！')
          } else {
            Toast.fail(`${tempUrl}: ${response.message || '接口访问出错！'}`)
          }
        },
        error: function(xhr, type, errorThrown) {
          Toast.clear()
          // alert(options.url + (xhr.response || type || errorThrown))
          Toast.fail(`${tempUrl}: 请检查您的网络，或联系管理员！`)
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

export const getProjectInfoById = params => {
  return request({
    url: api.getProjectInfoById,
    method: 'post',
    data: {},
    params
  })
}
export const getUserByRoleId = params => {
  return request({
    url: api.getUserByRoleId,
    method: 'post',
    data: {},
    params
  })
}

export const getWorkPoint = () => {
  return request({
    url: api.getWorkPoint,
    method: 'post',
    data: {}
  })
}

export function getNews(params) {
  return request({
    url: api.getNews,
    method: 'get',
    params
  })
}

export function getMessage1(data) {
  return request({
    url: api.getMessage1,
    method: 'post',
    data
  })
}

export function getMessage2(data) {
  return request({
    url: api.getMessage2,
    method: 'post',
    data
  })
}

export function getMiddleData(params) {
  return request({
    url: api.getMiddleData,
    method: 'get',
    params,
    hideloading: true
  })
}

export function getDoneSafeEvent(params) {
  return request({
    url: api.getDoneSafeEvent,
    method: 'get',
    params
  })
}

export function doNotDoneSafeEvent(data) {
  return request({
    url: api.doNotDoneSafeEvent,
    method: 'post',
    data
  })
}

export function doNotDoneQualityEvent(data) {
  return request({
    url: api.doNotDoneQualityEvent,
    method: 'post',
    data
  })
}

export function getNotDoneSafeEvent(params) {
  return request({
    url: api.getNotDoneSafeEvent,
    method: 'get',
    params
  })
}

export function getNotDoneQualityEvent(params) {
  return request({
    url: api.getNotDoneQualityEvent,
    method: 'get',
    params
  })
}

export function doDelaySafeEvent(data) {
  return request({
    url: api.doDelaySafeEvent,
    method: 'post',
    data
  })
}

export function doDelayQualityEvent(data) {
  return request({
    url: api.doDelayQualityEvent,
    method: 'post',
    data
  })
}

export function getAllStatusQualityEvent(params) {
  return request({
    url: api.getAllStatusQualityEvent,
    method: 'get',
    params
  })
}

export function getAllStatusSafeEvent(params) {
  return request({
    url: api.getAllStatusSafeEvent,
    method: 'get',
    params
  })
}

export function getDelaySafeEvent(params) {
  return request({
    url: api.getDelaySafeEvent,
    method: 'get',
    params
  })
}

export function getDelayQualityEvent(params) {
  return request({
    url: api.getDelayQualityEvent,
    method: 'get',
    params
  })
}

export function submitDealWithSafeEvent(data) {
  return request({
    url: api.submitDealWithSafeEvent,
    method: 'post',
    data
  })
}

export function submitDealWithQualityEvent(data) {
  return request({
    url: api.submitDealWithQualityEvent,
    method: 'post',
    data
  })
}

export function submitDelaySafeEvent(data) {
  return request({
    url: api.submitDelaySafeEvent,
    method: 'post',
    data
  })
}

export function submitDelayQuality(data) {
  return request({
    url: api.submitDelayQuality,
    method: 'post',
    data
  })
}

export function getSafeEvent(params) {
  return request({
    url: api.getSafeEvent,
    method: 'get',
    params
  })
}

export function uploadSafeData(data) {
  return request({
    url: api.uploadSafeData,
    method: 'post',
    data
  })
}

export function uploadQualityData(data) {
  return request({
    url: api.uploadQualityData,
    method: 'post',
    data
  })
}

export function getQualityEvent(params) {
  return request({
    url: api.getQualityEvent,
    method: 'get',
    params
  })
}

export function getSafeCheck(params) {
  return request({
    url: api.getSafeCheck,
    method: 'post',
    params
  })
}

export function getSafeTree(params) {
  return request({
    url: api.getSafeTree,
    method: 'get',
    params
  })
}

export function uploadFile(data) {
  return request({
    url: api.uploadFile,
    method: 'post',
    data,
    isUploadFile: true
  })
}

export function check(data) {
  return request({
    url: api.check,
    method: 'post',
    data
  })
}

export function getCheckDataById(params) {
  return request({
    url: api.getCheckDataById,
    method: 'get',
    params
  })
}

export function getAgency(params) {
  return request({
    url: api.getAgency,
    method: 'get',
    params
  })
}

export function getAllcheckData(params) {
  return request({
    url: api.getAllcheckData,
    method: 'post',
    params
  })
}

export function addRecode(data) {
  return request({
    url: api.addRecode,
    method: 'post',
    data
  })
}

export function updateRecode(data) {
  return request({
    url: api.updateRecode,
    method: 'post',
    data
  })
}

export function getCheckDataByrecod(params) {
  return request({
    url: api.getCheckDataByrecod,
    method: 'get',
    params
  })
}

export function getAllReverse(data) {
  return request({
    url: api.getAllReverse,
    method: 'post',
    data
  })
}

export function getChecker(params) {
  return request({
    url: api.getChecker,
    method: 'get',
    params
  })
}

export function getCheckDataByConponentId(params) {
  return request({
    url: api.getCheckDataByConponentId,
    method: 'get',
    params
  })
}

export function getProcessType(params) {
  return request({
    url: api.getProcessType,
    method: 'get',
    params
  })
}

export function getTypeDetail(params) {
  return request({
    url: api.getTypeDetail,
    method: 'get',
    params
  })
}
export function getNewType(params) {
  return request({
    url: api.getNewType,
    method: 'get',
    params
  })
}

export function getGongQu(data) {
  // return request({
  //   url: api.getGongQu,
  //   method: 'get',
  //   params
  // })

  return request({
    url: api.getGongQu,
    method: 'post',
    data
  })
}

export function getGongQuNew(projectId) {
  return request({
    url: api.getGongQu + `/${projectId}`,
    method: 'get'
  })
}

export function getGongQuProject(params) {
  return request({
    url: api.getGongQuProject,
    method: 'get',
    params
  })
}

export function getprojectBygongqu(params) {
  return request({
    url: api.getprojectBygongqu,
    method: 'get',
    params
  })
}

export function getProjectTree(params) {
  return request({
    url: api.getProjectTree,
    method: 'get',
    params
  })
}

export function getTree(params) {
  return request({
    url: api.getTree,
    method: 'get',
    params,
    loading: true
  })
}

export function getProjectDetail(params) {
  return request({
    url: api.getProjectDetail,
    method: 'get',
    params
  })
}

export function getGqFirst(params) {
  return request({
    url: api.getGqFirst,
    method: 'get',
    params
  })
}

export function getpjFirst(params) {
  return request({
    url: api.getpjFirst,
    method: 'get',
    params
  })
}

export function getFinishConponent(data) {
  return request({
    url: api.getFinishConponent,
    method: 'post',
    data
  })
}

export function getProject(params) {
  return request({
    url: api.getProject,
    method: 'get',
    params
  })
}

export function getStatus(data) {
  return request({
    url: api.getStatus,
    method: 'post',
    data
  })
}

export function getCountIncresConponent(data) {
  return request({
    url: api.getCountIncresConponent,
    method: 'post',
    data
  })
}

export function getCountIncresConponentGroupGq(params) {
  return request({
    url: api.getCountIncresConponentGroupGq,
    method: 'get',
    params
  })
}

export function getCountConponent(data) {
  return request({
    url: api.getCountConponent,
    method: 'post',
    data
  })
}

export function getYcData(params) {
  return request({
    url: api.getYcData,
    method: 'get',
    params
  })
}

export function getQualityTree(params) {
  return request({
    url: api.getQualityTree,
    method: 'get',
    params
  })
}

export function getVideoToken(data) {
  return request({
    url: api.getVideoToken,
    method: 'post',
    data
  })
}

export function updateOnline(params) {
  return request({
    url: api.updateOnline,
    method: 'post',
    params
  })
}

export function getOnline(data) {
  return request({
    url: api.getOnline,
    method: 'post',
    data
  })
}

export function getAllUserOnline() {
  return request({
    url: api.getAllUserOnline,
    method: 'post'
  })
}

export function login(data) {
  return request({
    url: api.login,
    method: 'post',
    data
  })
}

export function getProjectList() {
  return request({
    url: api.getProjectList,
    method: 'post'
  })
}

export function getClockIn(params) {
  return request({
    url: api.getClockIn,
    method: 'post',
    params
  })
}

export function getFence(params) {
  return request({
    url: api.getFence,
    method: 'post',
    params
  })
}

export function subClockIn(data) {
  return request({
    url: api.subClockIn,
    method: 'post',
    data
  })
}

// 人员变更

export const getPersonChange = params => {
  return request({
    url: api.getPersonChange,
    method: 'post',
    params
  })
}

export const getRoleInfoByUserId = params => {
  return request({
    url: api.getRoleInfoByUserId,
    method: 'post',
    params
  })
}

export const getUserRoleAndCode = params => {
  return request({
    url: api.getUserRoleAndCode,
    method: 'post',
    params
  })
}

export const addPersonChange = data => {
  return request({
    url: api.addPersonChange,
    method: 'post',
    data
  })
}

export const submitUserTask = data => {
  return request({
    url: api.submitUserTask,
    method: 'post',
    data
  })
}

export const getPersonChangeByProcessId = params => {
  return request({
    url: api.getPersonChangeByProcessId,
    method: 'post',
    params
  })
}

// 请休假
export const getLeave = params => {
  return request({
    url: api.getLeave,
    method: 'post',
    params
  })
}

export const submitLeave = data => {
  return request({
    url: api.submitLeave,
    method: 'post',
    data
  })
}

export const getLeaveByProcessId = params => {
  return request({
    url: api.getLeaveByProcessId,
    method: 'post',
    params
  })
}

// 人员报审
export const getStaffByProcessIdAndProjectId = params => {
  return request({
    url: api.getStaffByProcessIdAndProjectId,
    method: 'post',
    params
  })
}

// 人员变更台账
export const getChangeStandingBook = params => {
  return request({
    url: api.getChangeStandingBook,
    method: 'post',
    params
  })
}

// 人员报审台账
export const getContractStandingBook = params => {
  return request({
    url: api.getContractStandingBook,
    method: 'post',
    params
  })
}

// 请休假台账
export const getLeaveStandingBook = params => {
  return request({
    url: api.getLeaveStandingBook,
    method: 'post',
    params
  })
}

//项目相关
export const getChildProject = params => {
  // return request.post(api.getChildProject,data)
  return request({
    url: api.getChildProject,
    method: 'post',
    data: {},
    params
  })
}

// 质量总览
export const newInterfaceQuality = params => {
  return request({
    url: api.newInterfaceQuality,
    method: 'get',
    params
  })
}
// 安全总览
export const newInterfaceSafety = params => {
  return request({
    url: api.newInterfaceSafety,
    method: 'get',
    params
  })
}
//获取建设集团和全咨集团的人
export const getConAndReferPerson = params => {
  return request({
    url: api.getConAndReferPerson,
    method: 'post',
    params
  })
}
