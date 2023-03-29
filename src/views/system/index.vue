<template>
  <div class="sys-container">
    <div class="card">
      <div class="title">{{ title }}</div>
      <div class="oper">{{ getRoleName() }}</div>
    </div>

    <van-cell-group inset>
      <van-cell @click="checkUpdate" title="软件版本" :value="versionInfo.name" />
      <van-cell title="退出登录" is-link @click="logout" />
    </van-cell-group>
  </div>
</template>
<script>
import { appUpdate } from '@/utils/appUpdate.js'
import constantField from '@/api/home'
import CommonHead from '@/components/head/CommonHead'
import { mapGetters } from 'vuex'
export default {
  components: {
    CommonHead
  },
  data() {
    return {
      appUpdate,
      title: constantField.wholeName,
      params: this.$route.params,
      versionInfo: {},
      appType: process.env.VUE_APP_TYPE
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created() {
    this.versionInfo = appUpdate.getCurrentVersionInfo().version
  },
  methods: {
    getRoleName() {
      let name = [this.userinfo.name]
      this.userinfo?.roles?.forEach(item => {
        name.push(item.NAME)
      })
      return name.join(' | ')
    },
    checkUpdate() {
      appUpdate.checkUpdate()
    },
    logout() {
      this.$dialog
        .confirm({
          message: '是否退出当前账号?'
        })
        .then(() => {
          localStorage.clear()
          this.$store.state.userinfo = {}
          this.$router.push({ path: '/' })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.sys-container {
  height: 100%;
  overflow: hidden;
  background: url(../../assets/image/bg_sys.png) no-repeat;
  background-size: 100% 100%;
  .card {
    margin: 60px 18px 13px 18px;
    height: 160px;
    padding: 18px;
    background: linear-gradient(180deg, #0054ff 0%, rgba(52, 153, 255, 0.7) 60%, #0054ff 100%);
    border-radius: 6px;
    .title {
      font-size: 18px;
      font-family: AlibabaPuHuiTiM;
      color: #ffffff;
    }
    .oper {
      margin-top: 20px;
      font-size: 18px;
      font-family: AlibabaPuHuiTiR;
      color: #ffffff;
    }
    // }
    // & > div:nth-child(2) {
    //   height: 80px;
    //   background: linear-gradient(360deg, #0054ff 0%, rgba(52, 153, 255, 0.7) 100%);
    //   border-radius: 0px 0px 6px 6px;
    //   backdrop-filter: blur(10px);
    // }
  }
  .van-cell-group--inset {
    margin: 0px 18px;
    border-radius: 6px;
  }
}

// .header {
//   background: $head-color;
//   height: 160px;
//   position: relative;
//   padding: 15px;
//   .operate {
//     min-height: 300px;
//     position: relative;
//     .logout {
//       position: absolute;
//       bottom: 0;
//     }
//   }
//   .card {
//     margin-top: 30px;
//     border-radius: 6px;
//     padding: 60px 15px 15px;
//     background: #ffffff;
//     box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
//     .user {
//       width: 100px;
//       height: 100px;
//       margin: -100px auto 20px;
//       border-radius: 100px;
//       overflow: hidden;
//     }
//     li {
//       padding: 8px 0;
//       font-size: 15px;
//     }
//   }
// }
</style>
