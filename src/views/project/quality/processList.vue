<template>
  <div class="process-list">
    <van-list finished-text="我也是有底线的~~" :style="{ height: scrollerHeight }" class="common-list common-card">
      <div v-for="(item, index) in list" :key="index" :class="'item ' + (index === list.length - 1 ? 'last' : '')">
        <div class="content">
          <span class="name">工序名称：</span>
          <span class="value">{{ item.produceName }}</span>
        </div>
        <div class="content">
          <span class="name">工序状态：</span>
          <span :class="'value ' + getStateColor(item)">{{ getState(item) }}</span>
        </div>
        <div v-if="item.recode && item.upload && item.upload.creatrtime" class="content">
          <span class="name">填报时间：</span>
          <span class="value">{{ item.upload.creatrtime }}</span>
        </div>
        <div v-if="item.submit && item.submit.creatrtime" class="content">
          <span class="name">审核时间：</span>
          <span class="value">{{ item.submit.creatrtime }}</span>
        </div>
        <div class="operate center-in-vertical">
          <van-button
            v-if="item.result === null || item.result === 2"
            class="button"
            type="primary"
            size="small"
            @click="itemClick(item, true)"
            >填报</van-button
          >
          <van-button
            v-if="item.recode && item.upload"
            class="button"
            type="info"
            size="small"
            @click="itemClick(item, false)"
            >详情</van-button
          >
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { getCheckDataByConponentId } from '@/api/project.js'
export default {
  data() {
    return {
      list: []
    }
  },
  computed: {
    scrollerHeight: function () {
      return window.innerHeight - 92 + 'px'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let that = this
      getCheckDataByConponentId({
        id: that.$route.query.conpoentid,
        type: that.$route.query.conponenttype
      }).then(data => {
        this.list = data
      })
    },
    itemClick(item, editable) {
      item.title = item.produceName
      item.editable = editable
      item = { ...item, ...this.$route.query }
      this.$router.push({
        name: 'processReport',
        params: item
      })
    },
    getState(item) {
      let state = '待填报'
      if (item.result === 0) {
        state = '已填报'
      } else if (item.result === 1) {
        state = '审核通过'
      } else if (item.result === 2) {
        state = '被驳回'
      }
      return state
    },
    getStateColor(item) {
      return item.result === null ? 'common-state-default' : ('common-state-' + item.result);
    }
  }
}
</script>
