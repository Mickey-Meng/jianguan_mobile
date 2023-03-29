import gcoord from '@/utils/gcoord.js'
import { reverse_geocoding } from '@/api/bdMap.js'
import { Notify } from 'vant'
import { Toast, Dialog } from 'vant'

const parseBdAddress = data => {
  let address = ''
  if (data.result) {
    if (data.result.pois.length !== 0) {
      if (data.result.addressComponent) {
        address += data.result.addressComponent.province || ''
        address += data.result.addressComponent.city || ''
        address += data.result.addressComponent.district || ''
        address += data.result.addressComponent.street || ''
      }
      address += data.result.pois[0].name
    } else {
      address += data.result.formatted_address
    }
  }
  return address
}

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

const getPositionFromPlus = (loading = true) => {
  return new Promise(resolve => {
    judgePlus().then(() => {
      plus.geolocation.getCurrentPosition(
        function(p) {
          let { coords, coordsType, address, addresses } = p
          let wgs84 = []
          if (coordsType === 'wgs84') {
            wgs84 = [coords.longitude, coords.latitude]
          } else if (coordsType === 'gcj02') {
            wgs84 = gcoord.transform([coords.longitude, coords.latitude], gcoord.GCJ02, gcoord.WGS84)
          } else if (coordsType === 'bd09') {
            wgs84 = gcoord.transform([coords.longitude, coords.latitude], gcoord.BD09, gcoord.WGS84)
          } else if (coordsType === 'bd09ll') {
            wgs84 = gcoord.transform([coords.longitude, coords.latitude], gcoord.BD09LL, gcoord.WGS84)
          }
          let locationDetail = {
            lon: wgs84[0],
            lat: wgs84[1],
            address: addresses
          }
          loading && Notify({ type: 'success', message: '定位成功! ' })
          reverse_geocoding(`${locationDetail.lat},${locationDetail.lon}`).then(
            data => {
              locationDetail.address = parseBdAddress(data)
              resolve(locationDetail)
            },
            error => {
              loading &&
                Dialog.alert({
                  title: '地址转换失败',
                  message: JSON.stringify(error)
                }).then(() => {
                  // on close
                })
              resolve(locationDetail)
            }
          )
        },
        function(e) {
          resolve(null)
          loading &&
            Dialog.alert({
              title: '定位获取失败',
              message: JSON.stringify(e)
            }).then(() => {
              // on close
            })
        },
        {
          enableHighAccuracy: true,
          provider: 'baidu'
        }
      )
    })
  })
}

const getPositionFromBdJsApi = () => {
  return new Promise(resolve => {
    let geolocation = new BMap.Geolocation()
    geolocation.enableSDKLocation()
    geolocation.getCurrentPosition(
      function(result) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          let { point, address } = result
          let wgs84 = gcoord.transform([point?.lng, point?.lat], gcoord.BD09, gcoord.WGS84)
          let locationDetail = {
            lon: wgs84[0],
            lat: wgs84[1],
            address: ''
          }
          Notify({ type: 'success', message: '定位成功!' })
          reverse_geocoding(`${point?.lat},${point?.lng}`).then(
            data => {
              locationDetail.address = parseBdAddress(data)
              resolve(locationDetail)
            },
            error => {
              //解析详细地址失败
              locationDetail.address = `${address.province}${address.city}${address.district}${address.street}`
              resolve(locationDetail)
            }
          )
        } else {
          //定位失败
          Notify({ type: 'warning', message: this.getStatus() })
          resolve(null)
        }
      },
      { enableHighAccuracy: true }
    )
  })
}

const getCurrentLocation = (loading = true) => {
  loading &&
    Toast.loading({
      message: '位置获取中...',
      forbidClick: true
    })
  return new Promise(resolve => {
    getPositionFromPlus(loading).then(result => {
      loading && Toast.clear()
      resolve(result)
    })
  })
}

export const locationUtil = {
  getCurrentLocation
}
