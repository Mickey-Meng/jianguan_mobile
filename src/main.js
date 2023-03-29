import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn

// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 全局引入按需引入UI库 element
import '@/plugins/element'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/assets/css/bubble.css'
// import '@/assets/css/core.css'
// import '@/assets/css/snow.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'
// iconfont
import '@/assets/iconfont/iconfont.css'

// filters
import './filters'
Vue.config.productionTip = false

//vue-easytable
import 'vue-easytable/libs/theme-default/index.css'
import VueEasytable from 'vue-easytable'
Vue.use(VueEasytable)

//moment
import moment from 'moment'
Vue.prototype.moment = moment

//android 物理返回按键监听
import Back from '@/utils/back.js'

//视频、直播播放器
import VueCoreVideoPlayer from 'vue-core-video-player'
Vue.use(VueCoreVideoPlayer, {
  lang: 'zh-CN'
})

// 路由守卫 判断是否需要登陆
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('userinfo'))
  if (user) {
    store.state.userinfo = JSON.parse(localStorage.getItem('userinfo'))
  }
  if (to.path == '/login') {
    if (user) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (user) {
      // alert()
      // console.log(store);
      // store.dispatch('uploadOnlineState').then(() => {
      //   store.dispatch('getRealtimeOnline')
      // })
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  Back,
  render: h => h(App)
})
