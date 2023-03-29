<template>
  <div class="delay-record">
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
          <span class="value">{{ item.modifydate }} 天</span>
        </div>
        <div class="content">
          <span class="name">申请延期：</span>
          <span class="value">{{ item.delayday }} 天</span>
        </div>
        <div class="content">
          <span class="name">延期原因：</span>
          <span class="value">{{ item.delayreason }}</span>
        </div>
        <div class="operate center-in-vertical">
          <van-button
            v-if="item.delayresult === 1"
            class="button"
            type="primary"
            size="small"
            @click.stop="doDelaySafeEvent(item, 1)"
            >通过</van-button
          >
          <van-button
            v-if="item.delayresult === 1"
            class="button"
            type="danger"
            size="small"
            @click.stop="doDelaySafeEvent(item, 2)"
            >不通过</van-button
          >
        </div>
      </div>
    </van-list>
    <van-dialog v-model="show" :title="title" show-cancel-button :beforeClose="submit">
      <van-form v-model="delayItem">
        <van-field type="textarea" v-model="delayItem.reason" name="uploadremark" label="原因" placeholder="原因" />
      </van-form>
    </van-dialog>
  </div>
</template>
<script>
import { getDelaySafeEvent, doDelaySafeEvent } from '@/api/project.js'
export default {
  components: {},
  data() {
    return {
      list: [],
      finished: false,
      refreshing: false,
      show: false,
      delayItem: { reason: '' },
      title: '通过'
    }
  },
  computed: {
    scrollerHeight: function() {
      return window.innerHeight - 91 + 'px'
    }
  },
  created() {},
  methods: {
    onLoad() {
      let that = this
      getDelaySafeEvent().then(data => {
        that.list = data || []
        that.refreshing = false
        this.finished = true
      })
    },
    itemClick(item) {
      this.$router.push({
        name: 'securityDetail',
        params: item
      })
    },
    doDelaySafeEvent(item, result) {
      this.title = result === 1 ? '通过' : '不通过'
      this.show = true
      this.delayItem.result = result
      this.delayItem.eventid = item.id
    },
    submit(action, done) {
      if (action === 'cancel') {
        done()
      } else {
        doDelaySafeEvent(this.delayItem).then(data => {
          this.$toast('处理成功')
          this.$store.dispatch('getRealtimeMessage')
          done()
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
