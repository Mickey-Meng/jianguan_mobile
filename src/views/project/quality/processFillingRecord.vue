<template>
  <div class="process-audit">
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
          <span class="name">填报时间：</span>
          <span class="value">{{ item.stime ? formatISO8601Time(item.stime) : '' }}</span>
        </div>
        <div class="operate center-in-vertical">
          <img v-if="item.checkresult === 0" :src="require(`assets/image/待审核.png`)" />
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
  components: { PdfPreview },
  data() {
    return {
      list: [],
      finished: false,
      refreshing: false,
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
      getAllcheckData({ type: 2 }).then(data => {
        that.list = data
        that.refreshing = false
        this.finished = true
      })
    },
    itemClick(item) {
      this.$refs['pdfPreview'].show(item.recodeid)
    }
  }
}
</script>
<style lang="scss" scoped>
.process-audit {
  height: 100%;
  overflow-y: auto;
}
</style>
