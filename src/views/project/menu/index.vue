<template>
  <div class="main-menu" ref="mainMenu">
    <common-head ref="head" :title="title" :left="false"> </common-head>
    <div :style="{ height: scrollerHeight, overflowY: 'auto' }">
      <div class="menu-container" v-for="(item, index) in authTables" :key="index">
        <div class="container-name">{{ item.title }}</div>
        <div class="menu-item">
          <van-grid :column-num="4" :border="false" icon-size="36px">
            <van-grid-item
              v-for="(subItem, subIndex) in item.sub"
              :key="subIndex"
              :icon="subItem.icon"
              icon-prefix="iconfont"
              :text="subItem.name"
              :badge="subItem.message === 0 ? '' : subItem.message"
              :to="subItem.path"
            />
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import constantField from '@/api/home'
import TabBar from '@/components/TabBar'
import { authMenu } from '@/utils/index'
import { mapGetters } from 'vuex'
import CommonHead from '@/components/head/CommonHead'
export default {
  data() {
    return {
      authTables: [],
      params: this.$route.params,
      isRouterAlive: true,
      showTables: true,
      authMenu,
      title: '智慧建管',
      scrollerHeight: ''
    }
  },
  components: {
    TabBar,
    CommonHead
  },
  computed: {
    menuCookie: function() {
      return this.$store.state.userinfo.id
    },
    ...mapGetters([
      'qualityEventCount',
      'safeEventCount',
      'agencytaskEventCount', // 待办任务
      'copytaskEventCount', // 抄送任务
      'delayQualityEventCount',
      'delaySafeEventCount',
      'doRectificationQualityEventCount',
      'doRectificationSafeEventCount',
      'processFillingCount'
    ])
  },
  watch: {
    menuCookie: function(nv) {
      // nv && this.init()
    },
    qualityEventCount: function() {
      this.init()
    },
    safeEventCount: function() {
      this.init()
    },
    // 待办任务
    agencytaskEventCount: function() {
      this.init()
    },
    // 抄送任务
    copytaskEventCount: function() {
      this.init()
    },
    delayQualityEventCount: function() {
      this.init()
    },
    delaySafeEventCount: function() {
      this.init()
    },
    doRectificationQualityEventCount: function() {
      this.init()
    },
    doRectificationSafeEventCount: function() {
      this.init()
    },
    processFillingCount: function() {
      this.init()
    }
  },
  mounted() {
    this.scrollerHeight = this.$refs.mainMenu.offsetHeight - this.$refs.head.$el.offsetHeight + 'px'
    this.$store.state.currentProject = constantField.projectTypes[0]
    this.init()
  },
  methods: {
    async init() {
      await this.$store.dispatch('getRealtimeMessage')
      let menus = this.$store.state.userinfo.userAuth.menuCookie
      let messageMap = {
        processAudit: this.processFillingCount,
        check: this.delayQualityEventCount,
        modify: this.qualityEventCount,
        verify: this.doRectificationQualityEventCount,
        securityReport: this.delaySafeEventCount,
        securityReportRecord: this.safeEventCount,
        agencytask: this.agencytaskEventCount, // 待办任务
        copytask: this.copytaskEventCount, // 抄送任务
        securityDealRecord: this.doRectificationSafeEventCount
      }
      let authMenus = []
      menus.forEach(menu => {
        if (menu?.children?.length > 0) {
          let authMenuItem = {
            title: menu.NAME,
            sub: []
          }
          menu.children.forEach(child => {
            let sub = {
              name: child.NAME,
              path: child.URL,
              icon: require(`@/assets/image/menu/${child.ICON}.png`)
            }
            messageMap[child.MENUCODE] && (sub.message = messageMap[child.MENUCODE])
            authMenuItem.sub.push(sub)
          })
          authMenus.push(authMenuItem)
        }
      })
      this.authTables = authMenus
    }
  }
}
</script>
<style lang="scss">
.main-menu {
  height: 100%;
  padding: 0 12px;
  overflow: hidden;
  .menu-container {
    .container-name {
      height: 24px;
      font-size: 18px;
      font-family: AlibabaPuHuiTiM;
      color: #191919;
      line-height: 24px;
    }
  }
  .menu-item {
    padding: 10px 0;
    .van-grid-item__content {
      background-color: transparent !important;
      padding: 20px 0;
    }
    .van-grid-item__icon {
      // background: linear-gradient(360deg, #5cccf2 0%, #6199f4 100%);
      // padding: 7px;
      // border-radius: 20px;
      font-size: 26px;
    }
    .van-grid-item__text {
      font-size: 13px;
      font-family: AlibabaPuHuiTiR;
      color: #191919;
    }
    .van-grid-item__icon + .van-grid-item__text {
      margin-top: 0px;
    }
    .van-grid-item0 {
      .van-grid-item__icon {
        background: linear-gradient(360deg, #5cccf2 0%, #6199f4 100%);
      }
    }
    .van-grid-item1 {
      .van-grid-item__icon {
        background: linear-gradient(360deg, #5cd8b4 0%, #22b984 100%);
      }
    }
    .van-grid-item2 {
      .van-grid-item__icon {
        background: linear-gradient(180deg, #8572e4 0%, #b0b0eb 100%);
      }
    }
    .van-grid-item3 {
      .van-grid-item__icon {
        background: linear-gradient(360deg, #ecbb46 0%, #ef9145 100%);
      }
    }
  }
}
</style>
