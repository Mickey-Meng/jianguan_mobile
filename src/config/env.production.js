const { constant } = require("lodash")

// 正式 生成app所需要的  不需要跨域
//const ip = 'https://system.zlskkj.com:59031';
const ip = 'http://150.158.139.18:8088'
module.exports = {
  title: 'bim',
  baseApi: `${ip}` + `/app-api`,
  STSfmzj: `${ip}` + `/app-api`,
  ZhuJiApi: `${ip}` + `/app-api`,
  baiduProxy:'https://api.map.baidu.com',
  data_zlsk:`${ip}/data_zlsk/zhujishi`,
}
