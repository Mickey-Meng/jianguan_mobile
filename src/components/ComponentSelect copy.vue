<template>
  <div class="component-select">
    <van-cell-group inset class="common-card" style="margin-bottom: 0">
      <van-field
        class="condition"
        v-model="gongquItem.name"
        label="工区名称"
        readonly
        @click="showGongQu = true"
        right-icon="arrow"
      />
      <van-field
        class="condition"
        v-model="typeItem.name"
        label="项目名称"
        readonly
        @click="show = true"
        right-icon="arrow"
      />
      <van-field
        label="构件选择"
        v-model="fieldValue"
        is-link
        readonly
        placeholder="请选择构件"
        @click="showLocationSelect = true"
        :rules="[{ required: true, message: '请选择所在地区' }]"
      />
    </van-cell-group>
    <van-list
      :finished="finished"
      finished-text="我也是有底线的~~"
      @load="onLoad"
      :style="{ height: scrollerHeight }"
      class="common-list common-card"
    >
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="'item ' + (index === list.length - 1 ? 'last' : '')"
        @click="itemClick(item, index)"
      >
        <div class="content">
          <span class="name">工序名称：</span>
          <span class="value">{{ item.name }}</span>
        </div>
        <div class="content">
          <span class="name">完成时间：</span>
          <span class="value">{{ item.finish || '未录入' }}</span>
        </div>
        <div class="operate center-in-vertical">
          <van-button v-if="item.finish" class="button" type="primary" size="small" @click.stop="previewPic(item)"
            >照片</van-button
          >
          <van-button v-if="item.finish" class="button" type="primary" size="small" @click.stop="previewPdf(item)"
            >PDF</van-button
          >
        </div>
      </div>
    </van-list>
    <van-action-sheet v-model="showGongQu" :actions="gongquActions" @select="onGongQuSelect" />
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    <van-popup v-model="showLocationSelect" round position="bottom">
      <van-cascader
        v-model="cascaderValue"
        title="请选择构件"
        :options="options"
        @close="showLocationSelect = false"
        @change="onChange"
        :field-names="fieldNames"
      />
    </van-popup>
    <PdfPreview ref="pdfPreview"></PdfPreview>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
import PdfPreview from '@/components/PdfPreview'
import { formatISO8601Time } from '@/utils/index'
import { mapGetters } from 'vuex'
import {
  getprojectBygongqu,
  getProjectTree,
  getCheckDataByConponentId,
  getGongQu,
} from '@/api/project.js'
export default {
  components: {
    PdfPreview,
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  props: {
    onComponentSelect: {
      type: Function
    }
  },
  data() {
    return {
      show: false,
      showDetail: false,
      typeItem: {},
      showLocationSelect: false,
      fieldNames: {
        text: 'name',
        value: 'id',
        children: 'child'
      },
      fieldValue: '',
      cascaderValue: '',
      options: [],

      code: '',
      actions: [],
      list: [],
      finished: false,
      refreshing: false,
      map: {},
      detailList: [],
      detailName: '',

      currentComponent: null,
      formatISO8601Time,
      checkData: null,
      pdfUrl: '',
      showPdf: false,
      pdfHeight: 0,

      gongquItem: {},
      showGongQu: false,
      gongquActions: []
    }
  },
  computed: {
    ...mapGetters(['currentProject']),
    scrollerHeight: function() {
      return window.innerHeight - 81 - 130 - 92 + 'px'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let that = this
      getGongQu().then(data => {
        that.gongquActions = data
        data && data.length !== 0 && that.onGongQuSelect(data[0])
      })
    },
    onGongQuSelect(gongqu) {
      this.showGongQu = false
      this.gongquItem = gongqu
      getprojectBygongqu({ id: gongqu.sort }).then(data => {
        this.actions = []
        data.forEach((item, index) => {
          index === 0 && (this.typeItem = item)
          this.actions.push({
            ...{
              value: item.id
            },
            ...item
          })
        })
        this.onSelect(this.typeItem)
      })
    },
    onChange({ selectedOptions }) {
      this.fieldValue = selectedOptions.map(option => option.name).join('/')
      let last = selectedOptions[selectedOptions.length - 1]
      if (last.conponetcode) {
        this.currentComponent = last
        this.onLoad()
      }
      if (!last.child || last.child.length === 0) {
        return (this.showLocationSelect = false)
      }
    },
    onSelect(item) {
      this.show = false
      this.typeItem = item
      this.getprojectDetailInfo()
    },
    getprojectDetailInfo() {
      this.typeItem.id &&
        getProjectTree({ id: this.typeItem.id }).then(data => {
          this.fieldValue = ''
          this.cascaderValue = ''
          this.options = data ? data.child : []
        })
    },
    onLoad() {
      this.currentComponent &&
        getCheckDataByConponentId({ id: this.currentComponent.id }).then(data => {
          this.list = data.check
          this.checkData = data.data
          this.refreshing = false
          this.finished = true
        })
    },
    previewPic(item) {
      this.$refs['pdfPreview'].showPic(item.recordid)
    },
    previewPdf(item) {
      this.$refs['pdfPreview'].show(item.recordid)
    },
    itemClick(item, index) {
      let obj = null
      if (index !== 0) {
        obj = this.list[index - 1]
      }
      //0 没填报 3已填报待审核 1已确认 2审核未通过
      let { status } = item

      if (status === 3) {
        this.$notify({
          message: '请联系监理审核',
          type: 'warning'
        })
        return
      } else if (status === 2) {
        this.$notify({
          message: '审核未通过，请联系监理',
          type: 'warning'
        })
        return
      }
      if (obj && obj.status !== 1) {
        this.$notify({
          message: '请填报上个工序或联系监理审核上个工序',
          type: 'warning'
        })
        return
      }

      //0 没填报 3已填报待审核 1已确认 2审核未通过
      if (item.status === 0) {
        this.onComponentSelect(item, this.checkData)
      }
    }
  }
}
</script>
<style lang="scss">
.component-select {
  height: 100%;
  overflow-y: auto;
  .condition {
    margin-top: 5px;
  }
  .van-field__control {
    text-align: right !important;
  }
}
</style>
