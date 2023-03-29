<template>
  <div ref="container" class="app-container">
    <!-- <CenterHead /> -->
    <div class="layout-content" :style="{ height: scrollerHeight }" v-if="isRouterAlive">
      <keep-alive>
        <!-- 需要缓存的视图组件 -->
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <!-- 不需要缓存的视图组件 -->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <TabBar ref="tabbar" :data="authTables" />
  </div>
</template>

<script>
import constantField from '@/api/home'
import CenterHead from '@/components/head/CenterHead'
import TabBar from '@/components/TabBar'
import { authMenu } from '@/utils/index'
import { appUpdate } from '@/utils/appUpdate.js'
import { mapGetters } from 'vuex'
export default {
  name: 'AppLayout',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      authTables: [],
      params: this.$route.params,
      isRouterAlive: true,
      showTables: true,
      authMenu,
      appUpdate,
      active: 0
    }
  },
  components: {
    CenterHead,
    TabBar
  },
  computed: {
    scrollerHeight: function() {
      return window.innerHeight - 60 + 'px'
    },
    menuCookie: function() {
      return this.$store.state.userinfo.id
    },
    ...mapGetters([])
  },
  watch: {
    menuCookie: function(nv) {
      nv && this.init()
    }
  },
  mounted() {
    this.$store.state.currentProject = constantField.projectTypes[0]
    this.appUpdate.update()
    this.$store.state.userinfo.token && this.init()
  },
  methods: {
    init() {
      this.active = 0
      this.authTables = [
        {
          title: '首页',
          to: {
            path: '/center'
          },
          prefix: 'iconfont',
          icon: 'home'
        },
        {
          title: '智慧建管',
          prefix: 'iconfont',
          icon: 'menu',
          to: {
            path: '/menu'
          }
        },
        {
          title: '我的',
          prefix: 'iconfont',
          icon: 'me',
          to: {
            path: '/system'
          }
        }
      ]
      this.reload()
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
