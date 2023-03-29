<template>
  <div class="report-record">
    <van-cell-group inset class="common-card" style="margin-bottom: 0" ref="queryGroup">
      <van-field
        label="状态"
        v-model="queryItem.name"
        is-link
        readonly
        placeholder="请选择状态"
        @click="showStatusSelect = true"
      />
      <van-field
        label="构件名称"
        v-model="conponentname"
        placeholder="请输入构件名称"
        clearable
      />
      <van-field
        label="工序名称"
        v-model="producename"
        placeholder="请输入工序名称"
        clearable
      />
    </van-cell-group>
    <van-list
      :finished="finished"
      finished-text="我也是有底线的~~"
      @load="onLoad"
      class="common-list common-card"
      :style="{ height: scrollerHeight }"
    >
      <div
        v-for="(item, index) in listTemp"
        :key="index"
        :class="'item ' + (index === listTemp.length - 1 ? 'last' : '')"
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
        <div v-if="item.updatetime" class="content">
          <span class="name">系统录入：</span>
          <span class="value">{{ formatISO8601Time(item.updatetime) }}</span>
        </div>
        <div v-if="item.stime" class="content">
          <span class="name">工序填报：</span>
          <span class="value">{{ formatISO8601Time(item.stime) }}</span>
        </div>
        <div class="content" style="text-align: center;">
          <van-button class="button" type="primary" size="small" @click.stop="previewPic(item)">举牌照片</van-button>
          <van-button style="margin-left:10px" class="button" type="primary" size="small" @click.stop="previewPdf(item)"
            >PDF</van-button
          >
          <van-button
            style="margin-left:10px"
            class="button"
            type="primary"
            size="small"
            @click.stop="previewPic(item, 'testurl')"
            >审核照片</van-button
          >
          <van-button
            style="margin-left:10px"
            class="button"
            type="primary"
            size="small"
            @click.stop="previewPdf(item, 'standbyrecode')"
            >审核PDF</van-button
          >
        </div>
        <div class="operate center-in-vertical">
          <img v-if="item.checkresult === 3" :src="require(`assets/image/待审核.png`)" />
          <img v-if="item.checkresult === 1" :src="require(`assets/image/已通过.png`)" />
          <img v-if="item.checkresult === 2" :src="require(`assets/image/已驳回.png`)" />
        </div>
      </div>
    </van-list>
    <van-action-sheet v-model="showStatusSelect" :actions="statusActions" @select="onStatusSelect" />
    <PdfPreview ref="pdfPreview"></PdfPreview>
  </div>
</template>
<script>
import { getAllReverse } from '@/api/project.js'
import { formatISO8601Time } from '@/utils/index'
import PdfPreview from '@/components/PdfPreview'
export default {
  components: {
    PdfPreview
  },
  data() {
    return {
      list: [],
      listTemp: [],
      refreshing: false,
      finished: false,
      formatISO8601Time,
      scrollerHeight: '',
      queryItem: {},
      conponentname: '',
      producename: '',
      showStatusSelect: false,
      statusActions: [{name:'所有',status: -1},{name:'未填报',status: 0},{name:'待审核',status: 3},{name:'已通过',status: 1},{name:'已驳回',status: 2}]
    }
  },
  watch: {
    conponentname: function(){
      this.onStatusSelect(this.queryItem)
    },
    producename: function(){
      this.onStatusSelect(this.queryItem)
    },
  },
  mounted() {
    this.scrollerHeight = window.innerHeight - 100 - this.$refs['queryGroup'].offsetHeight + 'px'
  },
  created() {
  },
  methods: {
    onStatusSelect(item) {
      let that = this
      this.showStatusSelect = false
      this.queryItem = item
      if (item.status === -1 && that.conponentname === '' && that.producename === '') {
        this.listTemp = this.list
        return
      }
      let temp = []
      this.list.forEach(_item => {
        _item.conponentname = _item.conponentname || ''
        if ((_item.checkresult === item.status || item.status === -1) &&
        _item.conponentname.indexOf(that.conponentname) !== -1 &&
        _item.producename.indexOf(that.producename) !== -1) {
          temp.push(_item)
        }
      })
      this.listTemp = temp
    },
    onLoad() {
      let that = this
      let params = {}
      getAllReverse(params).then(data => {
        that.list = data
        that.listTemp = that.list
        that.refreshing = false
        that.finished = true
        that.onStatusSelect(JSON.parse(JSON.stringify(this.statusActions[0])))
      })
    },
    previewPic(item, field) {
      this.$refs['pdfPreview'].showPic(item.recodeid, field)
    },
    previewPdf(item, field) {
      this.$refs['pdfPreview'].show(item.recodeid, field)
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
