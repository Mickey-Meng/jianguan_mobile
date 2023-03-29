import { baseApi } from '@/config'
const weatherMap = {
  晴: '00',
  多云: '01',
  阴: '02',
  阵雨: '03',
  雷阵雨: '04',
  雷阵雨伴有冰雹: '05',
  雨夹雪: '06',
  小雨: '07',
  中雨: '08',
  大雨: '09',
  暴雨: '10',
  大暴雨: '11',
  特大暴雨: '12',
  阵雪: '13',
  小雪: '14',
  中雪: '15',
  大雪: '16',
  暴雪: '17',
  雾: '18',
  冻雨: '19',
  沙尘暴: '20',
  小到中雨: '21',
  中到大雨: '22',
  大到暴雨: '23',
  暴雨到大暴雨: '24',
  大暴雨到特大暴雨: '25',
  小到中雪: '26',
  中到大雪: '27',
  大到暴雪: '28',
  浮尘: '29',
  扬沙: '30',
  强沙尘暴: '31',
  浓雾: '32',
  龙卷风: '33',
  弱高吹雪: '34',
  轻雾: '35',
  强浓雾: '49',
  霾: '53',
  中度霾: '54',
  重度霾: '55',
  严重霾: '56',
  大雾: '57',
  特强浓雾: '58'
}

export function authMenu(tabbars, menus) {
  tabbars = JSON.parse(JSON.stringify(tabbars))
  menus = JSON.parse(JSON.stringify(menus))
  let tempMenus = []
  menus.forEach(item => {
    tempMenus = tempMenus.concat(item.children)
  })
  let result = []
  tabbars.forEach(item => {
    if (item.sub) {
      let tempSub = []
      item.sub.forEach(subItem => {
        let auth = tempMenus.find(menuItem => menuItem.MENUCODE === subItem.path)

        if (auth) {
          subItem.name = auth.NAME
          tempSub.push(subItem)
        }
      })
      if (tempSub.length > 0) {
        item.sub = tempSub
        result.push(item)
      }
    } else {
      let auth = tempMenus.find(menuItem => menuItem.MENUCODE === item.to.path.replace('/', ''))
      if (auth) {
        item.title = auth.NAME
        result.push(item)
      }
    }
  })
  return result
}

/**
 * 处理带T的时间字符串
 * @param {*} time
 */
export function formatISO8601Time(time) {
  var zoneDate = new Date(time).toJSON()
  var date = new Date(+new Date(zoneDate) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '')
  return date
}

export function replaceBaseApi(content) {
  content = content || ''
  return content.replaceAll('/ZhuJiRoad', baseApi)
}

export function lookUrl(url) {
  if (url.indexOf('mong/preview') !== -1) {
    return url
  }
  let lookServer = baseApi + '/mong/preview?fileid='
  return lookServer + url
}

export function formatImgUrl(str) {
  let urls = []
  str &&
    str.split(',').forEach(url => {
      urls.push({ url: lookUrl(url), isImage: true })
    })
  return urls
}

export function formatImgUrlListString(str) {
  let urls = []
  str &&
    str.split(',').forEach(url => {
      urls.push(lookUrl(url))
    })
  return urls
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

export function judgeIsNight() {
  let hours = new Date().getHours()
  return hours >= 18 && hours <= 24
}

export function getWeatherImg(weather, night) {
  let isNight = night ? true : judgeIsNight()
  return require(`assets/image/weather/${weatherMap[weather]}_${isNight ? '1' : '0'}.png`)
}

export function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

export function guid() {
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

export function random(lower, upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower
}
