<template>
  <div>
    <common-head :title="title" :showIcon="true" @fun="add" @screen="screen"></common-head>
    <van-list
      :finished="finished"
      finished-text="我也是有底线的~~"
      @load="getPersonChangeList"
      class="common-list common-card"
      :style="{ height: scrollerHeight }"
    >
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="'item ' + (index === list.length - 1 ? 'last' : '')"
        @click="toDetail(item)"
      >
        <!-- <div class="item" @click="toDetail(item)"> -->
        <p>
          标段：<span>{{ item.projectChildName }}</span>
        </p>
        <p>
          人员变更类型：<span>{{ item.changeTypeName }}</span>
        </p>
        <p>
          变更岗位：<span>{{ item.changePostName }}</span>
        </p>
        <p>
          变更前人员：<span>{{ item.beforePerson }}</span>
        </p>
        <p>
          变更后人员：<span>{{ item.afterPerson }}</span>
        </p>
        <p>
          录入日期：<span>{{ item.subDate }}</span>
        </p>
        <!-- </div> -->
      </div>
    </van-list>
  </div>
</template>

<script>
import CommonHead from '@/components/head/CommonHead'
import { getPersonChange, getUserRoleAndCode } from '@/api/project'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['currentBiaoDuan']),
    scrollerHeight: function() {
      return window.innerHeight - 85 + 'px'
    }
  },
  components: {
    CommonHead
  },
  data() {
    return {
      title: '人员报审未开发',
      list: [],
      finished: true,

      flowTypes: [
        {
          key: 'shigongjihe', //施工单位人员变更
          flowKey: 'sgdwrybg'
        },
        {
          key: 'jianlijihe', //监理单位合同人员报审
          flowKey: 'jldwrybg'
        },
        {
          key: 'quanzijihe', //监理单位合同人员报审
          flowKey: 'qzdwrybg'
        }
      ],
      userRoleParentCode: ''
    }
  },
  mounted() {
    this.getPersonChangeList()
  },
  methods: {
    getPersonChangeList() {
      getPersonChange({ projectid: this.currentBiaoDuan.id }).then(res => {
        this.list = res
      })
      //获取用户角色
      getUserRoleAndCode({ projectId: this.currentBiaoDuan.id }).then(res => {
        if (res) {
          this.userRoleParentCode = res.parentCode
        }
      })
    },
    toDetail(item) {
      this.$router.push({ name: 'personnelChangeAdd', params: item })
    },
    // 添加人员变更
    add() {
      if (!this.userRoleParentCode) {
        return this.$notify({ type: 'warning', message: '没有权限，请联系管理员！' })
      }
      let flowObj = this.flowTypes.find(e => e.key === this.userRoleParentCode)
      if (!flowObj) {
        return this.$notify({ type: 'warning', message: '没有权限，请联系管理员！' })
      }
      this.$router.push({ name: 'personnelChangeAdd', params: { flowKey: flowObj.flowKey } })
    },
    screen() {}
  }
}
</script>

<style lang="scss" scoped>
.item {
  padding: 10px 10px;
  margin-bottom: 10px;
  border-bottom: #ebedf0 1px solid;
  background-color: #fff;
  border-radius: 3px;
  font-weight: 400;
  font-size: 14px;
  p {
    margin: 0;
    padding: 0;
    margin-bottom: 15px;
    color: #969799;
    span {
      color: #333;
    }
  }
}
</style>
