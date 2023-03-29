// 根据环境引入不同配置 process.env.VUE_APP_ENV
const environment = process.env.VUE_APP_ENV || 'production'
const config = require('./env.' + environment)
config.overviewGroups = [7,8]
console.log(config);
module.exports = config
