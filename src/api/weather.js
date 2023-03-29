import axios from 'axios'
import { baiduProxy } from '@/config'
import { Toast } from 'vant'

let request;

request = axios.create({
    baseURL: baiduProxy,
    withCredentials: true,
    timeout: 5000
});

request.interceptors.response.use(
    response => {
        return Promise.resolve(response.data)
    },
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)

if(process.env.NODE_ENV === "production"){
  const judgePlus = function() {
    return new Promise(resolve => {
      if (window.plus) {
        resolve()
      } else {
        document.addEventListener('plusready', function() {
          resolve()
        })
      }
    })
  }

  request = function({url}) {
    return new Promise(resolve => {
      judgePlus().then(() => {
        let xhr = new plus.net.XMLHttpRequest()
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status == 200 && xhr.response) {
              if(xhr.response){
                resolve(xhr.response)
              }else {
                Toast.fail(xhr.response.message || '接口访问出错！');
              }
            }else {
              Toast.fail('请检查您的网络，或联系管理员！');
            }
          }
        }

        xhr.open('GET', baiduProxy + url)
        xhr.responseType = 'json'
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send()
      })
    })
  }
}

export function getWeather() {
    return request({
        url: '/weather/v1/?district_id=330681&data_type=all&ak=K5P2ccCwPCf6bIGUQvfVpnSBjLAssCxd&mcode=10:7C:27:50:C0:E7:28:BE:4F:3E:7C:DB:87:A3:0B:15:13:60:03:C7;plus.H5BB7D9CB',
        method: 'get'
    })
}
