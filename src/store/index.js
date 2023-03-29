import Vue from 'vue'
import Vuex from 'vuex'
import { getMessage1, getMessage2, getOnline, updateOnline } from '@/api/project'
import { listHandleTask, listCopyMessage } from '@/api/quality'
import { appPush } from '@/utils/appPush.js'
import { locationUtil } from '@/utils/locationUtil.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userinfo: {},
    projectList: [],
    currentProject: {},
    curProject: {},
    currentBiaoDuan: {},
    process: [],
    qualityEventCount: 0,
    safeEventCount: 0,
    agencytaskEventCount: 0, // 待办任务
    copytaskEventCount: 0, // 抄送任务
    delayQualityEventCount: 0,
    delaySafeEventCount: 0,
    doRectificationQualityEventCount: 0,
    doRectificationSafeEventCount: 0,
    processFillingCount: 0,
    cid: '',
    location: null,
    locatePersonName: '',
    onlineYZCount: 0,
    onlineJLCount: 0,
    onlineSGCount: 0,
    onlineInfo: null,
    loginCount: 0,
    overviewAuth: false
  },
  getters: {
    userinfo: state => state.userinfo,
    menus: state => state.userinfo.menus,
    projectList: state => state.projectList,
    currentProject: state => state.currentProject,
    curProject: state => state.curProject,
    currentBiaoDuan: state => state.currentBiaoDuan,
    process: state => state.process,
    qualityEventCount: state => state.qualityEventCount,
    safeEventCount: state => state.safeEventCount,
    agencytaskEventCount: state => state.agencytaskEventCount, // 待办任务
    copytaskEventCount: state => state.copytaskEventCount, // 抄送任务
    delayQualityEventCount: state => state.delayQualityEventCount,
    delaySafeEventCount: state => state.delaySafeEventCount,
    doRectificationQualityEventCount: state => state.doRectificationQualityEventCount,
    doRectificationSafeEventCount: state => state.doRectificationSafeEventCount,
    processFillingCount: state => state.processFillingCount,
    cid: state => state.cid,
    location: state => state.location,
    locatePersonName: state => state.locatePersonName,
    onlineYZCount: state => state.onlineYZCount,
    onlineJLCount: state => state.onlineJLCount,
    onlineSGCount: state => state.onlineSGCount,
    onlineInfo: state => state.onlineInfo,
    loginCount: state => state.loginCount,
    overviewAuth: state => state.overviewAuth
  },
  actions: {
    getRealtimeMessage({ state }) {
      return new Promise(resolve => {
        getMessage1().then(data => {
          try {
            state.delayQualityEventCount = data.delayQualityEvent.length
            state.delaySafeEventCount = data.delaySafeEvent.length
            state.doRectificationQualityEventCount = data.doRectificationQualityEvent.length
            state.doRectificationSafeEventCount = data.doRectificationSafeEvent.length
            state.processFillingCount = data.processFilling.length
            getMessage2().then(message2 => {
              try {
                state.qualityEventCount = message2.zjQualityEventList.length
                state.safeEventCount = message2.zjSafeEventList.length
                resolve()
              } catch (e) {
                resolve()
              }
            })
          } catch (e) {
            resolve()
          }
        })
        // 待办任务
        listHandleTask({
          processDefinitionName: '',
          processDefinitionKey: '',
          taskName: '',
          taskHandleStatus: 1,
          pageParam: {
            pageNum: 0,
            totalPage: 1,
            pageSize: 2
          }
        }).then(res => {
          state.agencytaskEventCount = res.data.total
        })
        // 抄送任务
        listCopyMessage({
          orderParam: [{ fieldName: 'createTime', asc: 1 }],
          pageParam: {
            pageNum: 1,
            totalPage: 1,
            pageSize: 2
          },
          read: false
        }).then(res => {
          state.copytaskEventCount = res.data.totalCount
        })
      })
    },
    getCid({ state }) {
      return new Promise(resolve => {
        if (state.cid) {
          resolve(state.cid)
        } else {
          appPush.getPushCid().then(cid => {
            state.cid = cid
            resolve(state.cid)
          })
        }
      })
    },
    getRealtimeOnline({ state }) {
      return new Promise(resolve => {
        getOnline().then(data => {
          state.onlineYZCount = data?.YZ?.onlineUser?.length || 0
          state.onlineJLCount = data?.JL?.onlineUser?.length || 0
          state.onlineSGCount = data?.SG?.onlineUser?.length || 0
          state.onlineInfo = data
          resolve()
        })
      })
    },
    uploadOnlineState({ state }) {
      return new Promise(resolve => {
        if (state.userinfo && state.userinfo.token) {
          appPush.getPushCid().then(cid => {
            state.cid = cid
            let params = { cid }
            if (state.location) {
              params.lon = state.location.lon
              params.lat = state.location.lat
            }
            updateOnline(params).then(data => {
              if (data && data.isChange === 'true') {
                resolve(true)
              } else {
                resolve(false)
              }
            })
          })
        } else {
          resolve(false)
        }
      })
    },
    updateLocation({ state }) {
      locationUtil.getCurrentLocation(false).then(location => {
        if (location) {
          state.location = location
        }
      })
    }
  }
})

export default store
