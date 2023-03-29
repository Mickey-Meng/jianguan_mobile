<template>
  <div class="app-head">
    <van-image @click="goToSystem" class="img" round :src="headImg" />
    <span @click="goToSystem" class="user-name">{{ userinfo.name }}</span>
    <span class="center-both project-name" @click="show = true">{{ project.name }}</span>
    <div v-if="showMessageIcon && messageTotal > 0" class="message" @click="onMessageIconClick">
      <img class="message-img center-both" :src="img" />
      <van-badge v-if="messageTotal > 0" :content="messageTotal" max="99" style="float: right;margin: 6px 6px 0 0;">
      </van-badge>
    </div>
    <Weather v-else></Weather>
    <van-action-sheet description="消息通知" v-model="showMessage" @select="onMessageSelect">
      <van-button
        class="van-action-sheet__item"
        v-for="(item, index) in actions"
        :key="index"
        @click="onMessageSelect(item)"
      >
        <van-badge :content="item.message === 0 ? '' : item.message">
          <span class="sheet-name">{{ item.name }}</span>
        </van-badge>
      </van-button>
    </van-action-sheet>

    <van-action-sheet v-model="show" :actions="projectList" @select="onSelect" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Weather from '@/components/weather/Weather'
import { getProject } from '@/api/project'
export default {
  components: {
    Weather
  },
  name: '',
  data() {
    return {
      show: false,
      headImg: require(`assets/image/${process.env.VUE_APP_TYPE}.png`),
      projectList: [
        {
          name: 'G235改建'
        },
        {
          name: '项目2'
        },
        {
          name: '项目3'
        },
        {
          name: '项目4'
        },
        {
          name: '项目5'
        },
        {
          name: '项目6'
        },
        {
          name: '项目7'
        }
      ],
      project: {
        name: 'G235改建'
      },
      img: require(`assets/image/message.png`),
      messageTotal: 0,
      showMessage: false,
      actions: [],
      showMessageIcon: process.env.VUE_APP_TYPE === 'project'
    }
  },
  computed: {
    ...mapGetters([
      'userinfo',
      'currentProject',
      'qualityEventCount',
      'safeEventCount',
      'delayQualityEventCount',
      'delaySafeEventCount',
      'doRectificationQualityEventCount',
      'doRectificationSafeEventCount',
      'processFillingCount'
    ])
  },
  watch: {
    qualityEventCount: function() {
      this.updateTotal()
    },
    safeEventCount: function() {
      this.updateTotal()
    },
    delayQualityEventCount: function() {
      this.updateTotal()
    },
    delaySafeEventCount: function() {
      this.updateTotal()
    },
    doRectificationQualityEventCount: function() {
      this.updateTotal()
    },
    doRectificationSafeEventCount: function() {
      this.updateTotal()
    },
    processFillingCount: function() {
      this.updateTotal()
    }
  },
  created() {
    // getProject().then(data => {
    //   let temp = []
    //   data.forEach(item => {
    //     temp.push({...item,...{name:item.projectname}})
    //   })
    //   this.projectList = temp
    //   this.project = this.projectList[0]
    // })
    this.updateActions()
  },
  methods: {
    goToSystem() {
      this.$router.push({ name: 'system', params: this.currentProject })
    },
    onSelect(item) {
      this.show = false
      // this.$store.state.currentProject = item;
      this.project = item
    },
    onMessageIconClick() {
      this.messageTotal > 0 && (this.showMessage = true)
    },
    updateActions() {
      let temp = [
        {
          name: '安全整改',
          message: this.safeEventCount,
          path: 'securityReportRecord',
        },
        {
          name: '质量整改',
          message: this.qualityEventCount,
          path: 'modify',
        },
        {
          name: '安全延期申请',
          message: this.delaySafeEventCount,
          path: 'securityReport',
        },
        {
          name: '质量延期申请',
          message: this.delayQualityEventCount,
          path: 'check',
        },
        {
          name: '安全整改确认',
          message: this.doRectificationSafeEventCount,
           path: 'securityDealRecord',
        },
        {
          name: '质量整改确认',
          message: this.doRectificationQualityEventCount,
          path: 'verify',
        },
        {
          name: '工序审核',
          message: this.processFillingCount,
          path: 'processAudit',
        }
      ]

      this.actions = []
      temp.forEach(item => {
        item.message > 0 && this.actions.push(item)
      })
    },
    updateTotal() {
      this.messageTotal =
        this.qualityEventCount +
        this.safeEventCount +
        this.delayQualityEventCount +
        this.delaySafeEventCount +
        this.doRectificationQualityEventCount +
        this.doRectificationSafeEventCount +
        this.processFillingCount

      this.updateActions()
    },
    onMessageSelect(item) {
      this.showMessage = false
      this.$router.push({ path: item.path })
    }
  }
}
</script>
<style lang="scss" scoped>
.app-head {
  position: relative;
  .img {
    height: 50px;
    width: 50px;
    margin: 12px 5px 0 5px;
    float: left;
  }
  .user-name {
    font-size: 14px;
  }
  .project-name {
    font-size: 15px;
    line-height: initial;
  }
  .project-name::after {
    position: absolute;
    top: 50%;
    right: -20px;
    margin-top: -7px;
    border: 5px solid;
    border-color: transparent transparent #dcdee0 #dcdee0;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    opacity: 0.8;
    content: '';
  }
  .message {
    float: right;
    width: 80px;
    height: 100%;
    position: relative;
    .message-img {
      height: 42px;
    }
  }
  .sheet-name {
    padding: 1px 16px;
  }
}
</style>
