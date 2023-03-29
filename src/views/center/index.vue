<template>
  <div class="app-container">
    <!-- <CenterHead ref="head" /> -->
    <div class="layout-content" :style="{ height: scrollerHeight }">
      <keep-alive>
        <router-view v-if="isRouterAlive"></router-view>
      </keep-alive>
    </div>
    <center-tab ref="bottom" :data="authTables" />
  </div>
</template>

<script>
import CenterHead from '@/components/head/CenterHead'
import CenterTab from '@/components/CenterTab'
import { authMenu } from '@/utils/index'
import { appUpdate } from '@/utils/appUpdate.js'
export default {
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      params: this.$route.params,
      isRouterAlive: true,
      authTables: [],
      authMenu,
      appUpdate
    }
  },
  components: {
    CenterHead,
    CenterTab
  },
  computed: {
    scrollerHeight: function() {
      return window.innerHeight - 60 + 'px'
    },
    menuCookie: function() {
      return this.$store.state.userinfo.id
    }
  },
  watch: {
    menuCookie: function(nv) {
      nv && this.init()
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.appUpdate.update()
  },
  methods: {
    init() {
      let tabbars = [
        {
          title: '数据中心',
          prefix: 'iconfont',
          icon: 'center',
          to: {
            path: '/center'
          }
        },
        {
          title: '项目概况',
          prefix: 'iconfont',
          icon: 'overview',
          to: {
            path: '/overview'
          }
        },
        {
          title: '新闻日报',
          prefix: 'iconfont',
          icon: 'news',
          to: {
            path: 'news'
          }
        },
        {
          title: 'BIM中心',
          prefix: 'iconfont',
          icon: 'bim',
          to: {
            path: 'bim'
          }
        },
        {
          title: '监控中心',
          prefix: 'iconfont',
          icon: 'monitor',
          to: {
            path: 'monitor'
          }
        }
      ]
      let menus = this.$store.state.userinfo.userAuth.menuCookie
      this.authTables = this.authMenu(tabbars, menus)
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  height: 100%;
  overflow: hidden;
  .layout-content {
    overflow-y: auto;
  }
}
</style>
