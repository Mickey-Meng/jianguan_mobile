import { data_zlsk } from '@/config'
import constantField from '@/api/home'
import { getAppUpdateInfo } from '@/api/userauth'
import { Dialog } from 'vant'
import { Toast } from 'vant'

const getServerInfo = type => {
  return new Promise(resolve => {
    getAppUpdateInfo({
      table: 'ss_f_app_update',
      mapStr: JSON.stringify({
        os: type,
        type: process.env.VUE_APP_TYPE
      })
    }).then(data => {
      if (!data || data.length === 0) {
        resolve(constantField.versionInfo[type][process.env.VUE_APP_TYPE])
      } else {
        let temps = []
        temps = data.sort(function(a, b) {
          return Date.parse(b['time']) - Date.parse(a['time'])
        })
        let { name, code, remark } = temps[0]
        resolve({
          version: {
            name,
            code
          },
          remark: JSON.parse(remark)
        })
      }
    })
  })
}

const checkIsNeedUpdate = type => {
  let currentInfo = constantField.versionInfo[type][process.env.VUE_APP_TYPE]
  return new Promise(resolve => {
    getServerInfo(type).then(serverInfo => {
      if (serverInfo.version.code > currentInfo.version.code) {
        resolve(serverInfo)
      } else {
        resolve()
      }
    })
  })
}

const showUpdateInfo = data => {
  return new Promise(resolve => {
    Dialog({
      title: `【${data.version.name}】版本更新`,
      message: data.remark,
      confirmButtonText: '更新',
      confirmButtonColor: 'green',
      closeOnClickOverlay: true
    })
      .then(action => {
        action === 'confirm' && resolve()
      })
      .catch(action => {})
  })
}

const iosUpdate = () => {
  checkIsNeedUpdate('ios').then(data => {
    data &&
      showUpdateInfo(data).then(() => {
        let url = encodeURI(`https://apps.apple.com/cn/app/${constantField.name}/${constantField.iosAppId}`)
        plus.runtime.openURL(url, function(error) {
          alert(JSON.stringify(error))
        })
      })
  })
}

const androidUpdate = () => {
  checkIsNeedUpdate('android').then(data => {
    if (data) {
      let fileName = `${process.env.VUE_APP_TYPE}${data.version.name}.apk`
      showUpdateInfo(data).then(() => {
        androidDownload(fileName)
      })
    }
  })
}

const androidDownload = appName => {
  Toast.loading({
    message: '安装包下载中，请等到1-2两分钟！',
    forbidClick: true
  })
  let fileName = '_downloads/' + appName
  var dtask = plus.downloader.createDownload(data_zlsk + '/bim/' + appName, { filename: fileName }, function(
    d,
    status
  ) {
    Toast.clear()
    // 下载完成
    if (status == 200) {
      plus.runtime.install(
        fileName,
        {},
        function() {
          Toast.success('安装成功')
        },
        function() {
          Toast.fail('安装失败')
        }
      )
    } else {
      Toast.fail('下载失败')
    }
  })
  dtask.start()
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

const update = () => {
  judgePlus().then(() => {
    let os = plus.os.name.toLowerCase()
    if (os === 'ios') {
      iosUpdate()
    } else {
      androidUpdate()
    }
  })
  // androidUpdate()
}

const checkUpdate = () => {
  judgePlus().then(() => {
    let os = plus.os.name.toLowerCase()
    let type = os === 'ios' ? 'ios' : 'android'
    checkIsNeedUpdate(type).then(data => {
      if (data) {
        update()
      } else {
        Toast.success('当版本为最新版本！')
      }
    })
  })
}

const getCurrentVersionInfo = () => {
  let os = window.plus ? window.plus.os.name.toLowerCase() : 'android'
  return constantField.versionInfo[os === 'ios' ? 'ios' : 'android'][process.env.VUE_APP_TYPE]
}

export const appUpdate = {
  checkUpdate,
  update,
  getCurrentVersionInfo
}
