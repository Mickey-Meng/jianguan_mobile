<template>
  <div class="process-filling">
    <van-tabs>
      <van-tab title="工序填报">
        <component-select ref="componentSelect" :onComponentSelect="onComponentSelect"> </component-select>
      </van-tab>
      <van-tab title="填报记录">
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
              <span class="name">填报时间：</span>
              <span class="value">{{ item.stime ? formatISO8601Time(item.stime) : '' }}</span>
            </div>
            <div class="content" v-if="item.checkusername">
              <span class="name">审核人：</span>
              <span class="value">{{ item.checkusername }}</span>
            </div>
            <div class="content" v-if="item.updatetime">
              <span class="name">审核时间：</span>
              <span class="value">{{ item.updatetime ? formatISO8601Time(item.updatetime) : '' }}</span>
            </div>
            <div class="content">
              <span class="name">审核状态：</span>
              <span :class="'value ' + ['common-state-1', 'common-state-2', 'common-state-0'][item.checkresult - 1]">{{
                ['审核通过', '监理驳回', '正在审核'][item.checkresult - 1]
              }}</span>
            </div>
            <div class="content" style="text-align: center;">
              <!-- <span class="name">操作：</span> -->
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
                v-if="item.checkresult != 3"
                style="margin-left:10px"
                class="button"
                type="primary"
                size="small"
                @click.stop="previewPic(item, 'testurl')"
                >审核照片</van-button
              >
              <van-button
                v-if="item.checkresult != 3"
                style="margin-left:10px"
                class="button"
                type="primary"
                size="small"
                @click.stop="previewPdf(item, 'standbyrecode')"
                >审核PDF</van-button
              >
            </div>
            <!-- <div class="operate center-in-vertical">
              <van-button class="button" type="primary" size="small" @click.stop="previewPic(item)">照片</van-button>
              <van-button class="button" type="primary" size="small" @click.stop="previewPdf(item)">PDF</van-button>
            </div> -->
          </div>
        </van-list>
      </van-tab>
    </van-tabs>

    <van-dialog v-model="show" :title="componentName" :showConfirmButton="false" :closeOnClickOverlay="true">
      <van-form @submit="onSubmit" :v-model="editData" class="common-card">
        <van-field
          v-model="editData.uploadtime"
          is-link
          readonly
          name="uploadtime"
          label="完成时间"
          placeholder="点击选择时间"
          @click="showPicker = true"
          :disabled="!editable"
          :rules="[{ required: true, message: '请选择时间' }]"
        />
        <van-field
          readonly
          clickable
          name="checkusername"
          :value="editData.checkusername"
          label="指定监理"
          :placeholder="editable ? '点击选监理' : '无'"
          @click="editable && (showCheckMan = true)"
          :rules="[{ required: true, message: '请选择监理' }]"
          :disabled="!editable"
        />
        <upload label="举牌照片" name="accrecodeurl" :rules="[{ required: true, message: '请选择照片' }]"></upload>
        <upload diyButton="点击选择PDF" :max-count="1" accept="application/pdf" label="PDF" name="remark"></upload>
        <div style="margin: 16px" v-if="editable">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-dialog>
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker v-model="currentDate" type="datetime" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
    <van-action-sheet v-model="showCheckMan">
      <van-cell-group inset>
        <van-field v-model="searchValue" placeholder="搜索" input-align="center" clearable />
      </van-cell-group>
      <div class="van-action-sheet__content" style="max-height:330px;text-align: center;">
        <button
          v-for="(item, index) in selects"
          :key="index"
          type="button"
          class="van-action-sheet__item"
          @click="onSelect(item)"
        >
          <span class="van-action-sheet__name">{{ item.name }}</span>
        </button>
        <span style="height:200px;line-height: 200px;font-size: 16px" v-if="selects.length === 0">没有相关数据！</span>
      </div>
    </van-action-sheet>
    <PdfPreview ref="pdfPreview"></PdfPreview>
  </div>
</template>
<script>
import Selecter from '@/components/common/Selecter'
import PdfPreview from '@/components/PdfPreview'
import Upload from '@/components/common/Upload'
import ComponentSelect from '@/components/ComponentSelect'
import { formatISO8601Time } from '@/utils/index'
import { getChecker, addRecode, updateRecode, getAllcheckData } from '@/api/project.js'
export default {
  components: {
    ComponentSelect,
    Upload,
    PdfPreview,
    Selecter
  },
  computed: {
    scrollerHeight: function() {
      return window.innerHeight - 146 + 'px'
    }
  },
  data() {
    return {
      show: false,
      componentName: '',
      urlList: [],
      accrecodeurlList: [],
      editable: true,
      editData: {},
      showCheckMan: false,
      checkMans: [],
      showPicker: false,
      formatISO8601Time,
      component: null,
      checkData: null,
      currentDate: new Date(),

      list: [],
      finished: false,
      refreshing: false,

      searchValue: '',
      selects: [],

      isUpdate: false
    }
  },
  watch: {
    searchValue: function() {
      this.watchFunc(500, () => {
        this.search()
      })
    }
  },
  methods: {
    watchFunc(delayTime, func) {
      if (!this.lastTime) {
        this.lastTime = setTimeout(() => {
          func()
        }, delayTime)
      } else {
        clearTimeout(this.lastTime)
        this.lastTime = setTimeout(() => {
          func()
        }, delayTime)
      }
    },
    search() {
      let temps = []
      this.checkMans.forEach(item => {
        let name = item.name
        if (name.indexOf(this.searchValue) !== -1) {
          temps.push(item)
        }
        this.selects = temps
      })
    },
    onComponentSelect(item, checkData, isUpdate) {
      this.isUpdate = isUpdate
      this.show = true
      this.componentName = item.name
      this.component = item
      this.checkData = checkData
      this.getAllChecker()
    },
    onConfirm(time) {
      this.showPicker = false
      this.editData.uploadtime = this.formatISO8601Time(new Date(time).toJSON())
    },
    onSelect(item) {
      this.showCheckMan = false
      this.editData.checkusername = item.name
      this.editData.checkid = item.id
    },
    getAllChecker() {
      getChecker({ group: this.checkData.conponentcode,projectId: this.$store.state.currentBiaoDuan.id }).then(data => {
        this.checkMans = []
        data.forEach(item => {
          this.checkMans.push(item)
        })
        this.selects = this.checkMans
      })
    },
    onSubmit(values) {
      let temp = []
      values.accrecodeurl.forEach(item => {
        item.url && temp.push(item.url)
      })
      if (values.accrecodeurl.length !== temp.length) {
        return this.$notify({ type: 'warning', message: '请上传举牌照片或等待照片上传完成！' })
      }
      values.accrecodeurl = temp.join(',')

      let _temp = []
      values.remark.forEach(item => {
        item.url && _temp.push(item.url)
      })
      if (values.remark.length !== _temp.length) {
        return this.$notify({ type: 'warning', message: '请等待PDF上传完成！' })
      }
      values.remark = _temp.join(',')
      values = {
        ...{
          projectId: this.$store.state.currentBiaoDuan.id,
          conpoentid: this.checkData.conponentid,
          conponentname: this.checkData.conponenttypename,
          conponenttype: this.checkData.conponenttype,
          projectcode: this.checkData.projectcode,
          produceid: this.component.produceid,
          produceidname: this.component.name,
          updateusername: this.$store.state.userinfo.nickName
        },
        ...values
      }
      values = { ...values, ...this.editData }
      if (this.isUpdate) {
        values.recodeid = this.component.recordid
        updateRecode(values).then(data => {
          this.$refs['componentSelect'].onLoad()
          this.show = false
          this.$notify({ type: 'success', message: '提交成功！' })
        })
      } else {
        addRecode(values).then(data => {
          this.$refs['componentSelect'].onLoad()
          this.show = false
          this.$notify({ type: 'success', message: '提交成功！' })
        })
      }
      // console.log(values)
    },

    onLoad() {
      let that = this
      getAllcheckData({ type: 2 }).then(data => {
        that.list = data.sort(function(a, b) {
          return Date.parse(b['uploadtime']) - Date.parse(a['uploadtime'])
        })
        that.refreshing = false
        this.finished = true
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
<style lang="scss">
.process-filling {
  height: 100%;
  overflow-y: auto;
  // .common-list {
  //   background-color: transparent;
  //   .item {
  //     background-color: #fff;
  //     border-radius: 3px;
  //   }
  // }
}
</style>
