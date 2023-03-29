<template>
  <div class="con" :style="{ height: scrollerHeight }">
    <div class="over-view item">
      <p>多项目总览</p>
      <div class="btn" @click="overView">
        点击进入
        <!-- <van-button size="mini" @click="overView">点击进入</van-button> -->
      </div>
    </div>
    <div>
      <div class="item" v-for="(item, index) in projectList" :key="index">
        <p>{{ item.name }}</p>
        <div class="btn" @click="toHome(item)">
          点击进入
          <!-- <van-button size="mini" @click="toHome(item)">点击进入</van-button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProjectList } from '@/api/project'
export default {
  computed: {
    scrollerHeight: function() {
      return window.innerHeight + 'px'
    }
  },
  data() {
    return {
      projectList: []
    }
  },
  mounted() {
    this.getProject()
  },
  methods: {
    getProject() {
      this.projectList = []
      getProjectList().then(res => {
        if (res && res.length > 0) {
          res.forEach(item => {
            if (item.child.length > 0) {
              this.projectList.push.apply(this.projectList, item.child)
            }
          })
          this.$store.state.projectList = this.projectList
        }
      })
    },
    overView() {
      this.$router.push({ path: '/overViewMap' })
    },
    toHome(project) {
      // this.$router.push({ name: 'home', params: project })
      this.$store.state.loginCount++
      this.$router.push({ path: '/', query: { project: JSON.stringify(project) } })
    }
  }
}
</script>

<style lang="scss" scoped>
.con {
  height: 100%;
  padding: 20px;
  overflow: auto;
  .item {
    width: 100%;
    // height: 121px;
    min-height: 121px;
    background: url(../../assets/image/project/item_bg.png) no-repeat;
    background-size: 100% 100%;
    padding-left: 18px;
    padding-bottom: 18px;
    margin-top: 12px;
    border: 1px solid transparent;
    &.over-view {
      background: url(../../assets/image/project/total_bg.png) no-repeat;
      margin-top: initial;
      .btn {
        // background: url(../../assets/image/project/total_btn_bg.png) no-repeat;
        color: #388bf5;
        background: #d1e5fd;
      }
    }
    p {
      margin: 22px 0;
      padding: 0;
      color: #fff;
      font-size: 19px;
      font-family: PingFang SC;
      font-weight: bold;
      margin-top: 30px;
    }
    .btn {
      height: 23px;
      width: 87px;
      line-height: 23px;
      // background: url(../../assets/image/project/item_btn_bg.png) no-repeat;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: bold;
      text-align: center;
      color: #57be69;
      background: #d3fcdb;
      border-radius: 11px;
    }
  }
}
</style>
