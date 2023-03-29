const { constant } = require("lodash")

// 正式 生成app所需要的  不需要跨域
const ip = 'https://system.zlskkj.com:59031';
// const ip = 'http://101.200.223.171:8085'
module.exports = {
  title: 'bim',
  baseApi: `${ip}/ZhuJiRoad`,
  STSfmzj: `${ip}/STSfmzj`,
  ZhuJiApi: `${ip}/ZhuJiApi`,
  baiduProxy:'https://api.map.baidu.com',
  data_zlsk:`${ip}/data_zlsk/zhujishi`,
}
