<template>
  <div class="report-record">
    <van-list
      :finished="finished"
      finished-text="我也是有底线的~~"
      @load="onLoad"
      class="common-list common-card"
      :style="{ height: scrollerHeight }"
    >
      <div
        @click="itemClick(item, 0)"
        v-for="(item, index) in list"
        :key="index"
        :class="'item ' + (index === list.length - 1 ? 'last' : '')"
      >
        <div class="content">
          <span class="name">检查时间：</span>
          <span class="value">{{ item.uploadtime }}</span>
        </div>
        <div class="content">
          <span class="name">检查人：</span>
          <span class="value">{{ item.uploadname }}</span>
        </div>
        <div class="content">
          <span class="name">检查备注：</span>
          <span class="value">{{ item.uploadremark }}</span>
        </div>
        <div class="content">
          <span class="name">整改期限：</span>
          <span class="value">{{ item.modifydate }}</span>
        </div>
        <div class="content" v-if="item.delayresult > 1">
          <span class="name">延期申请：</span>
          <span :class="'value ' + getStateColor(item)">{{ item.delayresult === 2 ? '通过' : '未通过' }}</span>
        </div>

        <div class="content" v-if="item.dodelayreason !== null && item.dodelayreason !== ''">
          <span class="name">审核意见：</span>
          <span class="value">{{ item.dodelayreason }}</span>
        </div>
        <div class="content" v-if="item.delayday !== null">
          <span class="name">延期时长：</span>
          <span class="value">{{ item.delayday }}</span>
        </div>
        <div class="content">
          <span class="name">是否超期：</span>
          <span :class="'value ' + getOverdueColor(item)">{{ ['未超期','超期'][item.isOverdue] }}</span>
        </div>
        <div class="operate center-in-vertical">
          <van-button v-if="item.status === 0" class="button" type="primary" size="small" @click.stop="deal(item)"
            >处理</van-button
          >
          <van-button v-if="item.status === 0" class="button" type="warning" size="small" @click.stop="delay(item)"
            >延期</van-button
          >
        </div>
      </div>
    </van-list>
    <van-dialog v-model="showDelay" title="延期申请" show-cancel-button :beforeClose="delaySubmit">
      <van-form v-model="delayItem">
        <van-field type="digit" v-model="delayItem.delay" name="delay" label="延期天数" placeholder="延期天数" />
        <van-field v-model="delayItem.reason" name="uploadremark" label="延期原因" placeholder="延期原因" />
      </van-form>
    </van-dialog>
  </div>
</template>
<script>
import { getQualityEvent, submitDelayQuality } from '@/api/project.js'
import { mapGetters } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapGetters(['currentBiaoDuan']),
    scrollerHeight: function() {
      return window.innerHeight - 91 + 'px'
    }
  },
  data() {
    return {
      list: [],
      refreshing: false,
      finished: false,
      showDelay: false,
      delayItem: {}
    }
  },
  created() {},
  methods: {
    onLoad() {
      let that = this
      getQualityEvent({'projectId':this.currentBiaoDuan.id}).then(data => {
        let temps = []
        data.data.forEach(item => {
          temps.push({
            ...item,...item.zjQualityEvent
          })
        })
        that.list = temps
        that.refreshing = false
        that.finished = true
      })
    },
    itemClick(item) {
      this.$router.push({
        name: 'detail',
        params: item
      })
    },
    getStateColor(item) {
      return item.delayresult === 2
        ? 'common-state-1'
        : item.delayresult === 3
        ? 'common-state-2'
        : 'common-state-default'
    },
    getOverdueColor(item) {
      return ['common-state-1','common-state-2'][item.isOverdue]
    },
    deal(item) {
      this.$router.push({
        path: 'deal',
        query: {
          eventid: item.id
        }
      })
    },
    delay(item) {
      this.showDelay = true
      this.delayItem = {
        delay: 3,
        reason: '',
        eventid: item.id
      }
    },
    delaySubmit(action, done) {
      if (action === 'cancel') {
        done()
      } else {
        submitDelayQuality(this.delayItem).then(data => {
          this.$toast('处理成功')
          done()
          this.$store.dispatch('getRealtimeMessage')
          this.onLoad()
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.report-record {
  height: 100%;
  overflow-y: auto;
}
</style>
