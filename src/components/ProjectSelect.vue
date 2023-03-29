<template>
  <div class="con">
    <div class="home-icon" @click="toPreview()" v-if="showHomeIcon"></div>
    <div class="project-select">
      <div class="title-container" @click="show = true">
        <span class="project-name" v-if="showProjectName">{{ projectName }}</span>
      </div>
      <van-action-sheet v-model="show" :actions="projectList" @select="onSelect" />
    </div>
    <div class="biaoduan-select">
      <div class="title-container" @click="showBD = true">
        <span class="project-name bd-name" v-if="showBDName">{{ BDName }}</span>
      </div>
      <van-action-sheet v-model="showBD" :actions="BDList" @select="onSelectBD" />
    </div>
    <van-popover class="message" v-model="showMessage" placement="bottom-end" :overlay="true">
      <div role="menu" class="van-popover__content">
        <div
          role="menuitem"
          class="van-popover__action"
          v-for="(item, index) in actions"
          :key="index"
          @click="onSelectMessage(item)"
        >
          <van-badge :content="item.count === 0 ? '' : item.count" :offset="[0, 10]">
            <div
              class="van-popover__action-text van-hairline--bottom"
              style="width:100px;height:46px;line-height: 46px;"
            >
              {{ item.text }}
            </div>
          </van-badge>
        </div>
      </div>
      <template #reference>
        <van-icon name="bell" size="26" color="#388BF5" @click="openMessageDetail" :badge="totalMessage" />
      </template>
    </van-popover>
  </div>
</template>

<script>
import { getProjectList } from '@/api/project'
import { mapGetters } from 'vuex'
export default {
  props: {
    projectInitOk: {
      type: Function
    }
  },
  computed: {
    ...mapGetters([
      'qualityEventCount',
      'safeEventCount',
      'agencytaskEventCount', // 待办任务
      'copytaskEventCount', // 抄送任务
      'delayQualityEventCount',
      'delaySafeEventCount',
      'doRectificationQualityEventCount',
      'doRectificationSafeEventCount',
      'processFillingCount',
      'userinfo',
      'overviewAuth'
    ])
  },
  watch: {
    qualityEventCount: function() {
      this.calcTotalMessage()
    },
    safeEventCount: function() {
      this.calcTotalMessage()
    },
    agencytaskEventCount: function() {
      this.calcTotalMessage()
    },
    copytaskEventCount: function() {
      this.calcTotalMessage()
    },
    delayQualityEventCount: function() {
      this.calcTotalMessage()
    },
    delaySafeEventCount: function() {
      this.calcTotalMessage()
    },
    doRectificationQualityEventCount: function() {
      this.calcTotalMessage()
    },
    doRectificationSafeEventCount: function() {
      this.calcTotalMessage()
    },
    processFillingCount: function() {
      this.calcTotalMessage()
    }
  },
  data() {
    return {
      show: false,
      showBD: false,
      showHomeIcon: false,
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
      // project: {
      //   name: 'G235改建'
      // }
      projectName: '',
      BDList: [],
      BDName: '',
      showMessage: false,
      actions: [
        { text: '安全整改' },
        { text: '质量整改' },
        { text: '延期申请' },
        { text: '整改确认' },
        { text: '工序审核' }
      ],
      totalMessage: 0,

      projectFormQuery: false,
      queryProject: null,
      showProjectName: false,
      showBDName: false
    }
  },
  mounted() {
    if (this.$route.query?.project) {
      this.projectFormQuery = true
      this.queryProject = JSON.parse(this.$route.query?.project)
      this.$store.state.currentBiaoDuan = this.queryProject
    }
    console.log(this.userinfo)

    this.getProjects()
    this.calcTotalMessage()
    this.$store.dispatch('getRealtimeMessage')
    // if (this.userinfo?.userinfo.GROUPID == 6) {
    //   this.showHomeIcon = true
    // }
    // if (this.overviewAuth) {
    //   this.showHomeIcon = true
    // }
    if (localStorage.getItem('overviewAuth') === 'true') {
      this.showHomeIcon = true
    }
  },
  methods: {
    parseName(value) {
      if (!value) return ''
      if (value.length > 12) {
        return value.slice(0, 12) + '...'
      }
      return value
    },
    onSelect(item) {
      this.show = false
      this.$store.state.curProject = item
      this.projectName = this.parseName(item?.name)
      this.showProjectName = true
      if (item.child && item.child.length > 0) {
        this.BDList = item.child
        this.BDName = this.parseName(this.BDList[0]?.name)
        this.showBDName = true
        this.$store.state.currentBiaoDuan = this.BDList[0]
      }
    },
    onSelectBD(item) {
      this.showBD = false
      this.$store.state.currentBiaoDuan = item
      this.BDName = this.parseName(item?.name)
      this.showBDName = true
    },
    getProjects() {
      getProjectList().then(res => {
        if (res && res.length > 0) {
          this.projectList = res

          if (this.projectFormQuery) {
            res.forEach(item => {
              if (item.id == this.queryProject.parentid) {
                this.projectName = this.parseName(item?.name)
                this.showProjectName = true
                this.$store.state.curProject = item
                this.BDList = item.child
              }
            })
            this.BDName = this.parseName(this.queryProject?.name)
            this.showBDName = true
            // if (JSON.stringify(this.$store.state.currentBiaoDuan) === '{}') {
            //   this.$store.state.currentBiaoDuan = this.queryProject
            // }
          } else {
            this.projectName = this.parseName(res[0]?.name)
            this.showProjectName = true
            if (JSON.stringify(this.$store.state.curProject) === '{}') {
              this.$store.state.curProject = res[0]
            }
            if (res[0].child && res[0].child.length > 0) {
              this.BDList = res[0].child
              this.BDName = this.parseName(this.BDList[0]?.name)
              this.showBDName = true
              if (JSON.stringify(this.$store.state.currentBiaoDuan) === '{}') {
                this.$store.state.currentBiaoDuan = this.BDList[0]
              }
            }
          }
          this.projectInitOk()
        }
      })
    },
    openMessageDetail() {
      this.showMessage = true
    },
    calcTotalMessage() {
      this.actions = [
        { text: '工序审核', count: this.processFillingCount, path: '/processAudit' },
        { text: '质量检查', count: this.delayQualityEventCount, path: '/check' },
        { text: '质量整改', count: this.qualityEventCount, path: '/modify' },
        { text: '质量确认', count: this.doRectificationQualityEventCount, path: '/verify' },
        { text: '安全检查', count: this.delaySafeEventCount, path: '/securityReport' },
        { text: '安全整改', count: this.safeEventCount, path: '/securityReportRecord' },
        { text: '安全确认', count: this.doRectificationSafeEventCount, path: 'securityDealRecord' },
        { text: '待办任务', count: this.agencytaskEventCount, path: '/agencytask' },
        { text: '抄送列表', count: this.copytaskEventCount, path: '/copytask' }
      ]
      let temp = 0
      this.actions.forEach(item => {
        temp += item.count || 0
      })
      this.totalMessage = temp
    },
    onSelectMessage(params) {
      this.showMessage = false
      this.$router.push({ path: params.path })
    },
    toPreview() {
      this.$router.push({ path: '/projectOverview' })
    }
  }
}
</script>

<style lang="scss" scoped>
.con {
  padding-top: 20px;
  .project-select,
  .biaoduan-select {
    width: calc(100% - 100px);
    height: 40px;
    line-height: 40px;
    margin-left: 50px;
    margin-right: 50px;
    // margin-top: 20px;
    .title-container {
      height: 100%;
      text-align: center;
      width: 100%;
      // position: relative;
      .project-name {
        font-size: 18px;
        font-weight: 800;
        letter-spacing: 0.5px;
        position: relative;
        // display: inline-block;
        // width: 100%;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        &.bd-name {
          font-size: 16px;
          font-weight: 800;
        }

        &::after {
          position: absolute;
          top: 50%;
          right: -20px;
          margin-top: -7px;
          border: 5px solid;
          border-color: transparent transparent #0054ff #0054ff;
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
          opacity: 0.8;
          content: '';
        }
      }

      // &::after {
      //   position: absolute;
      //   top: 50%;
      //   right: -20px;
      //   margin-top: -7px;
      //   border: 5px solid;
      //   border-color: transparent transparent #0054ff #0054ff;
      //   -webkit-transform: rotate(-45deg);
      //   transform: rotate(-45deg);
      //   opacity: 0.8;
      //   content: '';
      // }
    }
  }
  .message {
    position: absolute;
    right: 26px;
    top: 28px;
    width: 18px;
    height: 20px;
    .van-icon {
      padding-right: 4px;
    }
  }
  .home-icon {
    position: absolute;
    top: 35px;
    left: 16px;
    width: 8px;
    height: 15px;
    background: url(../assets/image/home.png) no-repeat;
    background-size: 100% 100%;
  }
}
</style>
