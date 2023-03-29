<template>
  <div class="login-container">
    <div class="bg">
      <div class="title">{{ constantField.wholeName }}</div>
      <div class="card">
        <div class="title">登录</div>

        <van-form @submit="onSubmit" class="operate">
          <van-field
            v-model="username"
            name="username"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
            size="large"
          />
          <van-field
            v-model="pwd"
            :type="passwordType"
            name="pwd"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            autocomplete="off"
          >
            <template slot="right-icon">
              <van-switch v-model="showPwd" @change="switchPasswordType" />
            </template>
          </van-field>

          <van-button color="#007AFF" block type="info" native-type="submit">登录</van-button>
        </van-form>
      </div>
    </div>
  </div>
</template>
<script>
import constantField from '@/api/home'
import { login } from '@/api/project.js'
import { getUserInfo } from '@/api/userauth.js'
import { appUpdate } from '@/utils/appUpdate.js'
import { overviewGroups } from '@/config'
export default {
  data() {
    return {
      constantField,
      username: '',
      pwd: '',
      bottomTitle: constantField.wholeName + '-' + constantField.name,
      appUpdate,
      appType: process.env.VUE_APP_TYPE,
      passwordType: 'password',
      showPwd: false
    }
  },
  mounted() {
    this.appUpdate.update()
  },
  methods: {
    onSubmit(values) {
      login(values).then(data => {
        if (data && data.groupid) {
          let groupid = data.groupid
          data = data.loginData
          data.groupid = groupid
          let { id, name, token } = data
          if (id && name && token) {
            this.userauth(id).then(({ userAuth, roles, userInfo }) => {
              data.userAuth = userAuth
              data.roles = roles
              data.groupname = userInfo.GROUPNAME
              data.userinfo = userInfo
              // if (userAuth.funCookie.indexOf(process.env.VUE_APP_TYPE) === -1) {
              //   return this.$toast.fail('用户无权限进入，请联系管理员！')
              // }
              this.$store.state.userinfo = data
              this.$store.state.loginCount++
              localStorage.setItem('userinfo', JSON.stringify(data))

              this.$store.dispatch('uploadOnlineState').then(() => {
                this.$store.dispatch('getRealtimeOnline')
              })
              if (overviewGroups.indexOf(userInfo.GROUPID) >= 0) {
                // this.$store.state.overviewAuth = true
                localStorage.setItem('overviewAuth', true)
                this.$router.push({ path: '/projectOverview' })
              } else {
                // this.$store.state.overviewAuth = false
                localStorage.setItem('overviewAuth', false)
                this.$router.push({ path: '/' })
              }
            })
          } else {
            this.$toast.fail(token || '登录失败')
          }
        } else {
          this.$toast.fail(data ? '该角色没有配置角色权限,请到运维系统进行配置！' : '账号或密码错误！')
        }
      })
    },
    userauth(id) {
      return new Promise(resolve => {
        getUserInfo({
          id,
          type: 'app',
          systemName: 'project'
        }).then(data => {
          resolve(data)
        })
      })
    },
    switchPasswordType() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    }
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url(../../assets/image/bg_login.png) no-repeat;
  background-size: 100% 100%;
  .bg {
    position: relative;
    width: 100%;
    height: 100%;
    .title {
      width: 100%;
      height: 44px;
      font-size: 19px;
      margin-top: 25px;
      text-align: center;
      font-family: SFPro-Semibold, SFPro;
      font-weight: 600;
      color: #fff;
      line-height: 44px;
    }
    .card {
      margin: 80px 40px 0px;
      .title {
        text-align: initial;
        height: 35px;
        margin-top: 0px;
        font-size: 25px;
      }
      ::v-deep .van-field {
        margin-top: 22px;
        height: 45px;
        border-radius: 3px;
        padding: initial;
        padding-left: 10px;
        .van-cell__value {
          height: 100%;
          .van-field__body {
            height: 100% !important;

            .van-field__control {
              height: 100%;
              background-color: transparent;
            }
            .van-field__right-icon {
              margin-right: 0px;
              display: flex;
              .van-switch {
                background: rgba(120, 120, 128, 0.32);
                width: 1.8em;
                border: 0px;
                .van-switch__node {
                  top: 0.1em;
                  left: 0.1em;
                  width: 0.8em;
                  height: 0.8em;
                }
              }
              .van-switch--on {
                background-color: #1989fa;
                .van-switch__node {
                  -webkit-transform: translateX(0.8em);
                  transform: translateX(0.8em);
                }
              }
            }
          }
        }
      }
      .van-button {
        margin-top: 40px;
        border-radius: 3px;
      }
    }
  }
}
</style>
