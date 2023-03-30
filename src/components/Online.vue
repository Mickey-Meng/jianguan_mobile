<template>
  <div>
    <van-row class="online">
      <van-col span="6" @click="gotoPersonMap"><span class="label">地图</span></van-col>
      <!-- <van-popover v-model="showUser" :actions="users">
        <template #reference> </template>
      </van-popover> -->
      <van-col span="6" @click="showUserDetail('YZ')">
        <div class="name yz center-in-vertical">业</div>
        <div class="content">
          <span class="online">{{ isNotG235() ? 0 : onlineYZCount || 0 }}</span>
          <span class="unit">人</span>
        </div>
      </van-col>
      <van-col span="6" @click="showUserDetail('JL')">
        <div class="name jl center-in-vertical">监</div>
        <div class="content">
          <span class="online">{{ isNotG235() ? 0 : onlineJLCount || 0 }}</span>
          <span class="unit">人</span>
        </div>
      </van-col>
      <van-col span="6" @click="showUserDetail('SG')">
        <div class="name sg center-in-vertical">施</div>
        <div class="content">
          <span class="online">{{ isNotG235() ? 0 : onlineSGCount || 0 }}</span>
          <span class="unit">人</span>
        </div>
      </van-col>
    </van-row>
    <van-action-sheet v-model="showUser">
      <div class="van-action-sheet__content" style="overflow: hidden;text-align: center;">
        <van-cell-group inset>
          <van-field v-model="searchValue" placeholder="搜索" input-align="center" clearable />
        </van-cell-group>
        <div style="max-height:330px;text-align: center;overflow-y: auto;">
          <button
            v-for="(item, index) in tempUsers"
            :key="index"
            type="button"
            class="van-action-sheet__item"
            @click="gotoPerson(item)"
          >
            <span v-if="item.online" class="van-action-sheet__name">{{ item.name }}</span>
            <span v-else class="van-action-sheet__name" style="color:#C7CCD5">{{ item.name }}</span>
          </button>
        </div>

        <span style="height:200px;line-height: 200px;font-size: 16px" v-if="tempUsers.length === 0"
          >没有相关数据！</span
        >
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import router from '@/router'
export default {
  data() {
    return {
      time: 0,
      online: {},
      showUser: false,
      users: [],
      tempUsers: [],
      searchValue: '',
      isUpdateOk: true,
      interval: null
    }
  },
  watch: {
    searchValue: function() {
      this.watchFunc(500, () => {
        this.search()
      })
    }
  },
  mounted() {
    this.initOnline()
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.initOnline()
      }, 1000 * 60)
    }
  },
  computed: {
    ...mapGetters(['onlineYZCount', 'onlineJLCount', 'onlineSGCount', 'onlineInfo', 'curProject'])
  },
  methods: {
    gotoPersonMap() {
      this.$router.push('/personMap')
    },
    gotoPerson(item) {
      this.showUser = false
      this.$store.state.locatePersonName = item.name
      this.$router.push('/personMap')
    },
    isNotG235() {
      // return this.curProject?.id !== 2
      return false
    },
    initOnline() {
      console.log(this.onlineYZCount)
      let that = this
      this.$store.dispatch('updateLocation')
      this.$store.dispatch('uploadOnlineState').then(isChange => {
        if (isChange) {
          that.resetLogin()
        } else {
          that.$store.dispatch('getRealtimeOnline')
        }
      })
    },
    resetLogin() {
      localStorage.clear()
      this.$store.state.userinfo = {}
      this.$router.push({ path: '/login' })
    },
    watchFunc(delayTime, func) {
      if (!this.lastTime) {
        this.lastTime = setTimeout(() => {
          func()
        }, delayTime)
      } else {
        clearTimeout(this.lastTime)
        this.lastTime = setTimeout(() => {
          func()
        }, delayTime)
      }
    },
    search() {
      this.tempUsers = []
      this.users.forEach(item => {
        item.name.includes(this.searchValue) && this.tempUsers.push(item)
      })
    },
    showUserDetail(type) {
      let info = this.onlineInfo?.[type]
      if (!info) {
        this.$toast.fail('未获取到活跃人员信息！')
      }
      let users = []
      info?.onlineUser.forEach(name => {
        users.push({
          name,
          online: true
        })
      })
      info?.allUser.forEach(name => {
        !users.find(item => item.name === name) &&
          users.push({
            name,
            online: false
          })
      })
      this.users = users
      this.tempUsers = this.users
      this.showUser = true
    }
  }
}
</script>
<style lang="scss" scoped>
.online {
  margin: 12px 0;
  background: rgba(255, 255, 255, 0.86);
  border-radius: 6px;
  backdrop-filter: blur(10px);
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 16px;
  width: 100%;
  color: black;
  position: relative;
  .name {
    border-radius: 50%;
    color: white;
    width: 26px;
    height: 26px;
    line-height: 26px;
  }
  .content {
    text-align: right;
    padding-left: 26px;
    text-align: center;
  }
  .online {
    font-weight: bold;
  }
  .unit {
    margin-left: 4px;
  }
  .yz {
    background-color: #1989fa;
  }
  .jl {
    background-color: #07c160;
  }
  .sg {
    background-color: #ff6034;
  }
}
</style>
