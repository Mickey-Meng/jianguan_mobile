import axios from 'axios'
import { Toast } from 'vant'
// 根据环境不同引入不同api地址
import { STSfmzj } from '@/config'

// let request = axios.create({
//   baseURL: STSfmzj, // url = base api url + request url
//   withCredentials: true, // send cookies when cross-domain requests
//   timeout: 500000 // request timeout
// })

// // request拦截器 request interceptor
// request.interceptors.request.use(
//   config => {
//     // 不传递默认开启loading
//     if (!config.hideloading) {
//       // loading
//       Toast.loading({
//         message: '加载中...',
//         forbidClick: true,
//         duration: 0
//       })
//     }
//     // let userinfoStr = localStorage.getItem('userinfo')
//     // if (userinfoStr) {
//     //   let userinfo = JSON.parse(userinfoStr);
//     //   config.headers['token'] = userinfo.token;
//     // }
//     return config
//   },
//   error => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )
// // respone拦截器
// request.interceptors.response.use(
//   response => {
//     Toast.clear()
//     if (response && response.data && response.data.meow === 0) {
//       return Promise.resolve(response.data.data)
//     }
//     if (response && response.data && response.data.meow === 300) {
//       return Promise.resolve(response.data.data)
//     } else {
//       Toast.fail(response.data.msg || '请求失败')
//       return Promise.reject()
//     }
//   },
//   error => {
//     Toast.clear()
//     Toast.fail('请求失败')
//     return Promise.reject(error)
//   }
// )

// if (process.env.NODE_ENV === 'production') {
//   const judgePlus = function() {
//     return new Promise(resolve => {
//       if (window.plus) {
//         resolve()
//       } else {
//         document.addEventListener('plusready', function() {
//           resolve()
//         })
//       }
//     })
//   }

//   request = function(rParams) {
//     return new Promise(resolve => {
//       judgePlus().then(() => {
//         mui.init()
//         let xhr = new plus.net.XMLHttpRequest()
//         let { url, method, params, data } = rParams
//         method = method || 'GET'
//         method = method.toUpperCase()

//         if (method === 'GET' && params && JSON.stringify(params) !== '{}') {
//           let temp = []
//           for (let key in params) {
//             temp.push(`${key}=${params[key]}`)
//           }
//           url += `?${temp.join('&')}`
//         }

//         xhr.onreadystatechange = function() {
//           if (xhr.readyState === 4) {
//             if (xhr.status == 200 && xhr.response) {
//               if (xhr.response.meow === 0) {
//                 resolve(xhr.response.data)
//               } else {
//                 Toast.fail(xhr.response.message || '接口访问出错！')
//               }
//             } else {
//               Toast.fail('请检查您的网络，或联系管理员！')
//             }
//           }
//         }

//         xhr.open(method, STSfmzj + url)
//         xhr.responseType = 'json'
//         xhr.setRequestHeader('Content-Type', 'application/json')

//         let userinfoStr = localStorage.getItem('userinfo')
//         if (userinfoStr) {
//           let userinfo = JSON.parse(userinfoStr)
//           xhr.setRequestHeader('token', userinfo.token)
//         }

//         if (method === 'GET') {
//           xhr.send()
//         } else if (method === 'POST') {
//           data ? xhr.send(JSON.stringify(data)) : xhr.send()
//         }
//       })
//     })
//   }
// }

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
      console.log("接口发出去的参数",url)
      let options = {
        url: STSfmzj + encodeURI(url),
        type: method.toUpperCase(),
        headers: { 'Content-Type': 'application/json' },
        success: function(response) {
          Toast.clear()
          console.log("接口返回的数据",response)
          if (response.status === 200 || response.code === 200 || response.meow === 0) {
            resolve(response.data)
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
      if (!isUploadFile && !params?.noToken) {
        let userinfoStr = localStorage.getItem('userinfo')
        if (userinfoStr) {
          let userinfo = JSON.parse(userinfoStr)
          options.headers['token'] = userinfo.token
          options.headers['Authorization'] = 'Bearer ' + userinfo.token; // 让每个请求携带自定义token 请根据实际情况自行修改
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

export function getUserInfo(params) {
  return request({
    url: '/userauth/getUserInfo',
    method: 'get',
    params
  })
}
export function getUserInfo_new(params) {
  return request({
    url: '/getInfo',
    method: 'get',
    params
  })
}

export function loginMap(params) {
  return request({
    url: '/userauth/login',
    method: 'get',
    params
  })
}

export function getMap(ID, GROUPID, roles) {
  let roleIds = []
  roles &&
    roles.forEach(item => {
      roleIds.push(item.ID)
    })
  return request({
    url: `/mapConfig/getMyMap?type=2,3&userid=${ID}&groupId=${GROUPID}&rolesId=${roleIds.join(',')}`,
    method: 'get'
  })
}

export function getAppUpdateInfo(params) {
  return request({
    url: '/assets/easySelect',
    method: 'get',
    params
  })
}

export const getDic = key => {
  return request({
    url: `/userauth/selectDicByParentKey?keyStr=${key}`,
    method: 'get'
  })
}
