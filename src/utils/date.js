import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.locale('zh-cn')
dayjs.extend(customParseFormat)

const handleType = function(param) {
  if (typeof param === 'string') {
    return new Date(param)
  }
  return param
}

export const dateFormat = {
  DATE_PATTERN_FLAT: 'YYYY-MM-DD HH:mm:ss',
  DATE_PATTERN_FLAT1: 'YYYY-MM-DD',
  DATE_PATTERN_FLAT2: 'YYYY-MM-DD HH:mm:ss.SSS',
  DATE_PATTERN_SIMPLE: 'yyyy/MM/dd HH:mm:ss',
  DATE_PATTERN_SHORT: 'yyyyMMdd',
  DATE_PATTERN_STRING: 'YYYYMMDDHHmmss',
  DATE_PATTERN_STRING2: 'HH:mm:ss',
  DATE_PATTERN_SAMEMONTH: 'YYYYMM'
}

/**
 * 获取当前的日期时间 2021-06-22 22:13:19
 * @param type 时间格式
 * @returns {string} 返回YYYY-MM-DD HH:mm:ss格式的字符串时间
 */
export function getNowDate(type = dateFormat.DATE_PATTERN_FLAT) {
  return dayjs().format(type)
}

/**
 * 获取前月份 202106
 * @param type 时间格式
 * @returns {string} 返回 YYYYMM格式的字符串时间
 */
export function getNowMonth(type = dateFormat.DATE_PATTERN_SAMEMONTH) {
  return dayjs().format(type)
}

/**
 * 获取当前日期 2021-06-22
 * @param type时间格式
 * @return {string}返回YYYY-MM-DD格式的字符串时间
 */
export function getCurrentDate(type = dateFormat.DATE_PATTERN_FLAT1) {
  return dayjs().format(type)
}

/**
 * 获取一年后的时间日期
 * @param type 时间格式
 * @returns {string} 返回yyyyMMdd格式的字符串时间
 */
export function getNowDateShort(type = dateFormat.DATE_PATTERN_SHORT) {
  return dayjs().format(type)
}

/**
 * 获取当前时间部分  22:13:19
 * @param type 时间格式
 * @returns {string} 返回HH:mm:ss格式的字符串时间
 */
export function getNowDatehs(type = dateFormat.DATE_PATTERN_STRING2) {
  return dayjs().format(type)
}

/**
 * 时间差
 * @param start 开始时间
 * @param end 结束时间
 * @param type 返回的时间差值类型，默认返回秒
 * @returns {number} 返回两者时间的差值
 */
export function diff(start, end, type = 'second') {
  return dayjs(handleType(start)).diff(dayjs(handleType(end)), type)
}

export const diffDay = (start, end, type = 'day') => {
  return dayjs(handleType(start)).diff(dayjs(handleType(end)), type)
}
/**
 * 解析日期
 * @param date 当前日期
 * @param type 返回的日期的格式
 * @returns {Date} 返回当前日期对象
 */
export function parseDate(date, type = dateFormat.DATE_PATTERN_FLAT) {
  return dayjs(date, type).toDate()
}

/**
 * 格式化日期
 * @param date 当前日期
 * @param type 返回的日期的格式
 * @returns {string} 默认返回YYYY-MM-DD HH:mm:ss形式日期
 */
export function formatDate(date, type = dateFormat.DATE_PATTERN_FLAT) {
  return dayjs(handleType(date)).format(type)
}

/**
 * 在年的基础上增加指定时间量
 * @param date 日期
 * @param year 需要添加的年时间量
 * @returns {string}
 */
export function addYear(date, year) {
  return dayjs(handleType(date)).add(year, 'year').format(dateFormat.DATE_PATTERN_FLAT)
}

/**
 * 获取周一的时间
 * @returns {string} 返回YYYY-MM-DD HH:mm:ss形式日期
 */
export function getMondayDate() {
  return dayjs().startOf('week').format(dateFormat.DATE_PATTERN_FLAT)
}

/**
 * 上一天
 * @param date 当前日期
 * @returns {string} 返回YYYY-MM-DD HH:mm:ss形式日期
 */
export function subtractDayDate(date) {
  return dayjs(handleType(date)).subtract(1, 'day').format(dateFormat.DATE_PATTERN_FLAT)
}

/**
 * 下一天
 * @param date 当前日期
 * @returns {string} 返回YYYY-MM-DD HH:mm:ss形式日期
 */
export function addDayDate(date) {
  return dayjs(handleType(date)).add(1, 'day').format(dateFormat.DATE_PATTERN_FLAT)
}

/**
 * 前面的任意一天
 * @param date 当前日期
 * @returns {string} 返回YYYY-MM-DD HH:mm:ss形式日期
 */
export function subtractDaysBefore(any, date = getNowDate()) {
  return dayjs(handleType(date)).subtract(any, 'day').format(dateFormat.DATE_PATTERN_FLAT)
}

/**
 * 后面的任意一天
 * @param date 当前日期
 * @returns {string} 返回YYYY-MM-DD HH:mm:ss形式日期
 */
export function addAnyDays(any, date = getNowDate()) {
  return dayjs(handleType(date)).add(any, 'day').format(dateFormat.DATE_PATTERN_FLAT)
}

/**
 * 根据日期得到星期几
 * @param date 当前日期
 * @returns {number}
 */
export function getDay(date) {
  return dayjs(date).day()
}

/**
 * 判断时间是否在近7天之内
 * @param date 当前日期
 * @returns {boolean}
 */
export function toDecideTimeOfSevenDays(date) {
  date = new Date((date.replace(/-/g, '/')))
  const toDayData = new Date(new Date().toLocaleDateString()) // 当天时间的0时0分0秒
  const dataOfSevenDays = toDayData.setTime(toDayData.getTime() - 3600 * 1000 * 24 * 7) // 7天前的毫秒数
  return date.setTime(date.getTime()) > dataOfSevenDays
}

/**
 * 获取七天前的日期
 * @param date 当前日期
 * @returns {string}
 */
export function toSevenDays(date) {
  date = new Date((date.replace(/-/g, '/')))
  const toDayData = new Date(new Date().toLocaleDateString()) // 当天时间的0时0分0秒
  const dataOfSevenDays = toDayData.setTime(toDayData.getTime() - 3600 * 1000 * 24 * 7) // 7天前的毫秒数
  const SevenDay = formatDate(new Date(dataOfSevenDays), dateFormat.DATE_PATTERN_FLAT)
  return SevenDay
}

/**
 * 获取上个月
 * @param date 当前日期
 * @returns {string}
 */
export const getPreMonth = function(date) {
  const arr = date.split('-')
  const year = arr[0] // 获取当前日期的年份
  const month = arr[1] // 获取当前日期的月份
  const day = arr[2] // 获取当前日期的日
  let days = new Date(year, month, 0)
  days = days.getDate() // 获取当前日期中月的天数
  let year2 = year
  let month2 = parseInt(month) - 1
  if (month2 == 0) {
    year2 = parseInt(year2) - 1
    month2 = 12
  }
  let day2 = day
  let days2 = new Date(year2, month2, 0)
  days2 = days2.getDate()
  if (day2 > days2) {
    day2 = days2
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }
  const t2 = year2 + '-' + month2 + '-' + day2
  return t2
}

/**
 * @Description: 获取上一个月
 * @author wangharry
 * @param {2021-07}
 * @returns {}
 * @date 2021/7/23
*/

export const getLastMonth = function(date) {
  const arr = date.split('-')
  const year = arr[0] // 获取当前日期的年份
  const month = arr[1] // 获取当前日期的月份
  let year2 = year
  let month2 = parseInt(month) - 1
  if (month2 == 0) {
    year2 = parseInt(year2) - 1
    month2 = 12
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }
  const t2 = year2 + '-' + month2
  return t2
}
/**
 * @Description: 获取下一个月
 * @author wangharry
 * @param {2021-07}
 * @returns {}
 * @date 2021/7/23
 */

export const getNextMonth = function(date) {
  const arr = date.split('-')
  const year = arr[0] // 获取当前日期的年份
  const month = arr[1] // 获取当前日期的月份
  let year2 = year
  let month2 = parseInt(month) + 1
  if (month2 == 13) {
    year2 = parseInt(year2) + 1
    month2 = 1
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }
  const t2 = year2 + '-' + month2
  return t2
}
/**
 * @Description: 获取本周时间
 * @author wangharry
 * @param {}
 * @returns {}
 * @date 2021/7/22
*/
export const getCurrentWeek = () => {
  const start_time = dayjs().startOf('week').format('YYYY-MM-DD HH:mm:ss')
  const end_time = dayjs().endOf('week').format('YYYY-MM-DD HH:mm:ss')
  return {
    start_time: start_time,
    end_time: end_time
  }
}

/**
 * @Description: 获取本月时间
 * @author wangharry
 * @param {}
 * @returns {}
 * @date 2021/7/22
 */
export const getCurrentMonth = () => {
  const start_time = dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss')
  const end_time = dayjs().endOf('month').format('YYYY-MM-DD HH:mm:ss')
  return {
    start_time: start_time,
    end_time: end_time
  }
}

/**
 * 计算请假时长，可去除午休时间和节假日
 * @param {*} options 
 */
export const getTotal = (options) => {
  // {
  //   // 上班时间
  //   startWorkTime,
  //     // 下班时间
  //     endWorkTime,
  //     // 请假开始时间
  //     beginAt,
  //     // 请假结束时间
  //     endAt,
  //     // 是否去除午休时间
  //     excludeFreeTime,
  //     // 午休开始时间
  //     startFreeTime,
  //     // 午休结束时间
  //     endFreeTime
  //     //剔除日期数组
  //     excludeDates
  // }
  if (dayjs(options.beginAt).isAfter(dayjs(options.endAt))) {
    [options.beginAt, options.endAt] = [options.endAt, options.beginAt];
  }
 
  options.excludeDates = options.excludeDates.map(d => dayjs(d));
 
  let minute = 0;
 
  const diffDay = dayjs(options.endAt).startOf('day').diff(dayjs(options.beginAt).startOf('day'), 'day');
 
  for (let i = 0; i <= diffDay; i++) {
    const day = dayjs(options.beginAt).add(i, 'day').startOf('day');
 
    if (options.excludeDates.some(d => d.isSame(day, 'date'))) {
      continue;
    }
 
    const startWorkAt = day.minute(options.startWorkTime * 60);
    const endWorkAt = day.minute(options.endWorkTime * 60);
    const startFreeAt = day.minute(options.startFreeTime * 60);
    const endFreeAt = day.minute(options.endFreeTime * 60);
    let beginAt = dayjs(options.beginAt);
    beginAt = beginAt.isBefore(startWorkAt) ? startWorkAt : beginAt.isAfter(endWorkAt) ? endWorkAt : beginAt;
    let endAt = dayjs(options.endAt);
    endAt = endAt.isAfter(endWorkAt) ? endWorkAt : endAt;
    if (options.excludeFreeTime) {
      beginAt = (beginAt.isAfter(startFreeAt) && beginAt.isBefore(endFreeAt)) ? endFreeAt : beginAt;
      endAt = (endAt.isAfter(startFreeAt) && endAt.isBefore(endFreeAt)) ? startFreeAt : endAt;
    }
 
    let ranges = [];
 
    if (diffDay === 0) {
      if (options.excludeFreeTime && beginAt.isBefore(startFreeAt) && endAt.isAfter(endFreeAt)) {
        ranges = [[beginAt, startFreeAt], [endFreeAt, endAt]];
      } else {
        ranges = [[beginAt, endAt]];
      }
    } else if (i === 0) {
      if (options.excludeFreeTime) {
        ranges = beginAt.isBefore(startFreeAt) ? [
          [beginAt, startFreeAt],
          [endFreeAt, endWorkAt]
        ] : [[beginAt, endWorkAt]];
      } else {
        ranges = [[beginAt, endWorkAt]];
      }
    } else if (i === diffDay) {
      if (options.excludeFreeTime) {
        ranges = endAt.isBefore(startFreeAt) ? [[startWorkAt, endAt]] : [
          [startWorkAt, startFreeAt],
          [endFreeAt, endAt]
        ];
      } else {
        ranges = [[startWorkAt, endAt]];
      }
    } else {
      if (options.excludeFreeTime) {
        ranges = [
          [startWorkAt, startFreeAt],
          [endFreeAt, endWorkAt]
        ];
      } else {
        ranges = [[startWorkAt, endWorkAt]];
      }
    }
 
    // console.log(ranges.map(r => {
    //   return r.map(d => d.format('YYYY-MM-DD HH:mm:ss'));
    // }), ranges.map(range => {
    //   const diff = range[1].diff(range[0], 'minute');
    //   if (diff < 0) {
    //     return 0;
    //   }
    //   return diff;
    // }).reduce((a, b) => a + b, 0));
 
    minute += ranges.map(range => {
      const diff = range[1].diff(range[0], 'minute');
      if (diff < 0) {
        return 0;
      }
      return diff;
    }).reduce((a, b) => a + b, 0);
 
  }
  console.log(`
分钟: ${ minute }
小时: ${ parseFloat((minute / 60).toFixed(2)) }
  `);
  return parseFloat((minute / 60).toFixed(2));
}
