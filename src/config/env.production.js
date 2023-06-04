const { constant } = require("lodash")

// 正式 生成app所需要的  不需要跨域
//const ip = 'https://system.zlskkj.com:59031';
const ip = 'http://150.158.139.18:26666'
module.exports = {
  title: 'bim',
  baseApi: `${ip}` + `/prod-api`,
  STSfmzj: `${ip}` + `/prod-api`,
  ZhuJiApi: `${ip}` + `/prod-api`,
  baiduProxy:'https://api.map.baidu.com',
  data_zlsk:`${ip}/data_zlsk/zhujishi`,
}
