import { baiduProxy } from '@/config'
import { Toast,Dialog } from 'vant'
const BD_AK = 'eFEnoMIGqGEep6LqLTgR5WBBER7qTHB2';

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
      let { url, method} = rParams
      let options = {
        url: baiduProxy + url,
        type: method.toUpperCase(),
        headers: {"Content-Type": "application/json"},
        dataType: "json",
        success: function(response) {
          Toast.clear()
          resolve(response)
        },
        error: function(xhr, type, errorThrown) {
          Toast.fail(type || '错误！');
        }
      }
      mui.ajax(options)
    })
  })
}

export function reverse_geocoding(location) {
    return request({
        url: `/reverse_geocoding/v3/?ak=${BD_AK}&output=json&coordtype=wgs84ll&extensions_poi=1&extensions_road=true&location=${location}`,
        method: 'get'
    })
}

export function geocoding(address) {
    return request({
        url: `/geocoding/v3/?output=json&ak=${BD_AK}=${address}`,
        method: 'get'
    })
}

export function suggestion(query) {
    return request({
        url: `/place/v2/suggestion?ak=${BD_AK}&output=json&region=全国&query=${query}`,
        method: 'get'
    })
}
