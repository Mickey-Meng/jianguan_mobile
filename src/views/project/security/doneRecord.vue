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
        <div class="content">
          <span class="name">整改人：</span>
          <span class="value">{{ item.modifyname }}</span>
        </div>
        <div class="content">
          <span class="name">整改时间：</span>
          <span class="value">{{ item.modifytime }}</span>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { getDoneSafeEvent } from '@/api/project.js'
export default {
  components: {},
  data() {
    return {
      list: [],
      finished: false,
      refreshing: false,
      showDelay: false,
      delayItem: {}
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
      getDoneSafeEvent().then(data => {
        that.list = data || []
        that.refreshing = false
        this.finished = true
      })
    },
    itemClick(item, editable) {
      this.$router.push({
        name: 'securityDetail',
        params: item
      })
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
