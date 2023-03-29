<template>
  <div class="process-audit-record">
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
          <span class="name">构件编码：</span>
          <span class="value">{{ item.conponentcode }}</span>
        </div>
        <div class="content">
          <span class="name">构件名称：</span>
          <span class="value">{{ item.conponentname }}</span>
        </div>
        <div class="content">
          <span class="name">工序名称：</span>
          <span class="value">{{ item.producename }}</span>
        </div>
        <div class="content">
          <span class="name">审核人：</span>
          <span class="value">{{ item.checkusername }}</span>
        </div>
        <div class="content">
          <span class="name">填报人：</span>
          <span class="value">{{ item.updateusername }}</span>
        </div>
        <div v-if="item.stime" class="content">
          <span class="name">填报时间：</span>
          <span class="value">{{ formatISO8601Time(item.stime) }}</span>
        </div>
        <div v-if="item.updatetime" class="content">
          <span class="name">完成时间：</span>
          <span class="value">{{ formatISO8601Time(item.updatetime) }}</span>
        </div>
        <div class="operate center-in-vertical">
          <img v-if="item.checkresult === 3" :src="require(`assets/image/待审核.png`)" />
          <img v-if="item.checkresult === 1" :src="require(`assets/image/已通过.png`)" />
          <img v-if="item.checkresult === 2" :src="require(`assets/image/已驳回.png`)" />
        </div>
      </div>
    </van-list>
    <PdfPreview ref="pdfPreview"></PdfPreview>
  </div>
</template>
<script>
import { formatISO8601Time } from '@/utils/index'
import { getAllcheckData } from '@/api/project.js'
import PdfPreview from '@/components/PdfPreview'

export default {
  components: {
    PdfPreview
  },
  data() {
    return {
      list: [],
      refreshing: false,
      finished: false,
      formatISO8601Time
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
      getAllcheckData({ type: 1 }).then(data => {
        let temp = []
        data = data || []
        data.forEach(item => {
          if (item.checkresult !== 0 && item.checkresult !== null) {
            temp.push(item)
          }
        })
        that.list = temp
        that.refreshing = false
        that.finished = true
      })
    },
    itemClick(item) {
      this.$refs['pdfPreview'].show(item.recodeid)
    }
  }
}
</script>
<style lang="scss" scoped>
.process-audit-record {
  height: 100%;
  overflow-y: auto;
}
</style>
