<template>
  <div class="process-audit">
    <van-tabs>
      <van-tab title="工序审核">
        <van-list
          :finished="finished"
          finished-text="我也是有底线的~~"
          @load="onLoad"
          class="common-list common-card"
          :style="{ height: scrollerHeight }"
        >
          <div v-for="(item, index) in list" :key="index" :class="'item ' + (index === list.length - 1 ? 'last' : '')">
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
              <span class="name">填报人：</span>
              <span class="value">{{ item.updateusername }}</span>
            </div>
            <div class="content">
              <span class="name">填报时间：</span>
              <span class="value">{{ item.updatetime ? formatISO8601Time(item.updatetime) : '' }}</span>
            </div>
            <div class="content">
              <span class="name">填报信息：</span>
              <van-button class="button" type="primary" size="small" @click.stop="previewPic(item)"
                >举牌照片</van-button
              >
              <van-button
                style="margin-left:10px"
                class="button"
                type="primary"
                size="small"
                @click.stop="previewPdf(item)"
                >PDF</van-button
              >
            </div>
            <div class="operate center-in-vertical">
              <van-button
                v-if="item.checkresult === 3"
                class="button"
                type="warning"
                size="small"
                @click.stop="itemClick(item, 1)"
                >审核</van-button
              >
              <img
                :src="item.checkresult === 1 ? require(`assets/image/已通过.png`) : require(`assets/image/已驳回.png`)"
                v-if="item.checkresult !== 3"
              />
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="审核记录">
        <van-list
          :finished="recordFinished"
          finished-text="我也是有底线的~~"
          @load="onRecordLoad"
          class="common-list common-card"
          :style="{ height: scrollerHeight }"
        >
          <div
            v-for="(item, index) in recordList"
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
            <div class="content" style="text-align: center;">
              <van-button class="button" type="primary" size="small" @click.stop="previewPic(item)"
                >举牌照片</van-button
              >
              <van-button
                style="margin-left:10px"
                class="button"
                type="primary"
                size="small"
                @click.stop="previewPdf(item)"
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
      </van-tab>
    </van-tabs>

    <PdfPreview ref="pdfPreview"></PdfPreview>
    <van-dialog v-model="show" :closeOnClickOverlay="true" :showConfirmButton="false">
      <van-form @submit="onSubmit" :v-model="editData" class="common-card">
        <upload label="举牌照片" name="testurl"></upload>
        <upload
          diyButton="点击选择PDF"
          :max-count="1"
          accept="application/pdf"
          label="PDF"
          name="standbyrecode"
        ></upload>
        <van-field name="result" label="审核状态">
          <template #input>
            <van-radio-group v-model="checked" direction="horizontal">
              <van-radio name="1">通过</van-radio>
              <van-radio name="2">驳回</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!-- <van-field label="通知全资">
          <template #input>
            <div class="people">
              <span v-for="item in QZ" :key="item.id">{{ item.name }}</span>
            </div>
          </template>
        </van-field>
        <van-field label="通知建设集团">
          <template #input>
            <div class="people">
              <span v-for="item in JSDW" :key="item.id">{{ item.name }}</span>
            </div>
          </template>
        </van-field> -->
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-dialog>
  </div>
</template>
<script>
import Upload from '@/components/common/Upload'
import { formatISO8601Time } from '@/utils/index'
import { getAgency, check, getAllcheckData, getConAndReferPerson } from '@/api/project.js'
import PdfPreview from '@/components/PdfPreview'
import { mapGetters } from 'vuex'
export default {
  components: {
    PdfPreview,
    Upload
  },
  data() {
    return {
      list: [],
      finished: false,
      formatISO8601Time,
      pdfUrl: '',
      showPdf: false,
      pdfHeight: 0,
      recordList: [],
      recordFinished: false,
      show: false,
      editData: { testurl: '', standbyrecode: '' },
      currentItem: null,
      checked: '1',
      copyUsers: [],
      QZ: [],
      JSDW: []
    }
  },
  computed: {
    ...mapGetters(['currentBiaoDuan']),
    scrollerHeight: function() {
      return window.innerHeight - 146 + 'px'
    }
  },
  created() {},
  methods: {
    onLoad() {
      let that = this
      getAgency({ projectId: this.$store.state.currentBiaoDuan.id }).then(data => {
        that.list = data
        that.finished = true
      })
      this.getPerson()
    },
    itemClick(item) {
      this.currentItem = item
      this.show = true
    },
    onSubmit(values) {
      let params = { recondid: this.currentItem.recodeid, result: parseInt(values.result) }
      let temp = []
      values.testurl.forEach(item => {
        item.url && temp.push(item.url)
      })
      if (values.testurl.length !== temp.length) {
        return this.$notify({ type: 'warning', message: '请上传举牌照片或等待照片上传完成！' })
      }
      params.testurl = temp.join(',')

      let _temp = []
      values.standbyrecode.forEach(item => {
        item.url && _temp.push(item.url)
      })
      if (values.standbyrecode.length !== _temp.length) {
        return this.$notify({ type: 'warning', message: '请等待PDF上传完成！' })
      }
      params.standbyrecode = _temp.join(',')
      params.copyUsers = this.copyUsers.join(',')
      console.log(params)
      check(params).then(data => {
        this.$notify({
          message: '审核成功',
          type: 'success'
        })
        this.$store.dispatch('getRealtimeMessage')
        this.show = false
        this.onLoad()
        this.onRecordLoad()
      })
    },
    onRecordLoad() {
      let that = this
      getAllcheckData({ type: 1 }).then(data => {
        let temp = []
        data = data || []
        data.forEach(item => {
          if (item.checkresult !== 3 && item.checkresult !== 0 && item.checkresult !== null) {
            temp.push(item)
          }
        })
        that.recordList = temp
        that.recordFinished = true
      })
    },
    recordItemClick(item) {
      this.$refs['pdfPreview'].show(item.recodeid)
    },
    previewPic(item, field) {
      this.$refs['pdfPreview'].showPic(item.recodeid, field)
    },
    previewPdf(item, field) {
      this.$refs['pdfPreview'].show(item.recodeid, field)
    },
    getPerson() {
      getConAndReferPerson({ projectId: this.currentBiaoDuan.id }).then(data => {
        this.QZ = data.QZ || []
        this.JSDW = data.JSDW || []
        data.QZ.forEach(item => {
          this.copyUsers.push(item.id)
        })
        data.JSDW.forEach(item => {
          this.copyUsers.push(item.id)
        })
        console.log(this.copyUsers)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.process-audit {
  height: 100%;
  overflow-y: auto;
}
.people {
  span {
    display: inline-block;
    padding: 2px 6px;
  }
}
</style>
