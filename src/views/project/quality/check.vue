<template>
  <div class="report">
    <van-tabs>
      <van-tab title="质量检查">
        <van-form @submit="onSubmit" :v-model="editData" class="common-card" :style="{ height: scrollerHeight }">
          <van-field
            readonly
            clickable
            :value="editData.qualityfirstname"
            label="质量大类"
            placeholder="质量大类"
            @click="showFirst = true"
            :rules="[{ required: true, message: '请选质量大类' }]"
          />
          <van-field
            readonly
            clickable
            :value="editData.qualitysecondname"
            label="质量小类"
            placeholder="质量小类"
            @click="showSecond = true"
            :rules="[{ required: true, message: '请选质量小类' }]"
          />
          <van-field
            v-model="editData.uploadtime"
            is-link
            readonly
            name="uploadtime"
            label="检查日期"
            placeholder="点击选择检查日期"
            @click="showPicker = true"
            :rules="[{ required: true, message: '请选择检查日期' }]"
          />
          <van-field
            type="textarea"
            rows="2"
            v-model="editData.uploadremark"
            name="uploadremark"
            label="问题描述"
            placeholder="问题描述"
          />
          <upload
            label="照片"
            name="uploadurl"
            :fileList="urlList"
            :rules="[{ required: true, message: '请选择照片' }]"
          ></upload>
          <van-field
            readonly
            clickable
            :value="editData.gongquName"
            label="工区"
            placeholder="工区"
            @click="showGongQu = true"
            :rules="[{ required: true, message: '请选工区' }]"
          />
          <van-field
            readonly
            clickable
            :value="editData.projectName"
            label="单位工程"
            placeholder="单位工程"
            @click="showProject = true"
            :rules="[{ required: true, message: '请选单位工程' }]"
          />
          <Selecter
            readonly
            clickable
            :value="editData.modifyname"
            label="责任人"
            placeholder="责任人"
            :rules="[{ required: true, message: '请选责任人' }]"
            :actions="checkActions"
            :onSelect="onSelectCheck"
          ></Selecter>
          <van-field
            type="digit"
            v-model="editData.modifydate"
            name="modifydate"
            label="整改期限"
            placeholder="整改期限"
            :rules="[{ required: true, message: '请填整改期限' }]"
          />

          <div style="margin: 4px 16px">
            <van-button size="small" round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="延期审核">
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
                @click.stop="doDelayQualityEvent(item, 1)"
                >通过</van-button
              >
              <van-button
                v-if="item.delayresult === 1"
                class="button"
                type="danger"
                size="small"
                @click.stop="doDelayQualityEvent(item, 2)"
                >不通过</van-button
              >
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
    <van-action-sheet v-model="showFirst" :actions="firstActions" @select="onSelectFirst" />
    <van-action-sheet v-model="showSecond" :actions="secondActions" @select="onSelectSecond" />
    <van-action-sheet v-model="showGongQu" :actions="gongQuActions" @select="onSelectGongqu" />
    <van-action-sheet v-model="showProject" :actions="projectActions" @select="onSelectProject" />
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker v-model="currentDate" type="datetime" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>

    <van-dialog v-model="show" :title="title" show-cancel-button :beforeClose="submit">
      <van-form v-model="delayItem">
        <van-field type="textarea" v-model="delayItem.reason" name="uploadremark" label="原因" placeholder="原因" />
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
import Upload from '@/components/common/Upload'
import Selecter from '@/components/common/Selecter'
import {
  getQualityTree,
  getSafeCheck,
  uploadQualityData,
  getGongQuNew,
  getGongQuProject,
  getDelayQualityEvent,
  doDelayQualityEvent
} from '@/api/project.js'
import { formatISO8601Time } from '@/utils/index'
import { mapGetters } from 'vuex'
export default {
  components: {
    Upload,
    Selecter
  },
  data() {
    return {
      editData: {
        safefirstname: '',
        safesecondname: '',
        modifyname: '',
        modifydate: 3
      },
      firstActions: [],
      secondActions: [],
      checkActions: [],
      showFirst: false,
      showSecond: false,
      urlList: [],
      showPicker: false,
      formatISO8601Time,
      gongQuActions: [],
      showGongQu: false,
      projectActions: [],
      showProject: false,
      currentDate: new Date(),
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
      return window.innerHeight - 146 + 'px'
    },
    ...mapGetters(['currentBiaoDuan'])
  },

  mounted() {},

  created() {
    let userInfo = JSON.parse(localStorage.getItem('userinfo'))
    this.editData.uploadid = userInfo.id
    this.editData.uploadname = userInfo.name
    this.requestFirst()
    getGongQuNew(this.$store.state.curProject.child[0].id).then(data => {
      this.gongQuActions = data
      data && data.length !== 0 && this.onSelectGongqu(data[0])
    })
  },

  methods: {
    onSelectFirst(item) {
      this.showFirst = false
      this.editData.qualityfirstname = item.name
      this.editData.qualityfirst = item.id
      this.requestSecond(item.id)
    },
    onSelectSecond(item) {
      this.showSecond = false
      this.editData.qualitysecondname = item.name
      this.editData.qualitysecond = item.id
    },
    onSelectCheck(item) {
      this.editData.modifyname = item.name
      this.editData.modifyid = item.id
    },
    onSelectGongqu(item) {
      this.showGongQu = false
      this.editData.gongquName = item.name
      this.editData.gongquid = item.sort

      getGongQuProject({ id: item.sort }).then(data => {
        this.projectActions = data
      })

      this.requestChecker()
    },
    onSelectProject(item) {
      this.showProject = false
      this.editData.projectName = item.name
      this.editData.singleProjectId = item.id
    },
    onConfirm(time) {
      this.showPicker = false
      this.editData.uploadtime = this.formatISO8601Time(new Date(time).toJSON())
    },
    requestChecker() {
      let that = this
      getSafeCheck({ group: this.editData.gongquid,projectId: this.$store.state.curProject.child[0].id }).then(data => {
        that.checkActions = data
        this.onSelectCheck(that.checkActions[0])
      })
    },
    requestFirst() {
      let that = this
      getQualityTree().then(data => {
        that.firstActions = data
        this.onSelectFirst(data[0])
      })
    },
    requestSecond(id) {
      let that = this
      getQualityTree({ id: id }).then(data => {
        that.secondActions = data
        that.editData.safesecondname = data[0].name
        that.editData.safesecond = data[0].id
      })
    },
    onSubmit(values) {
      let data = JSON.parse(JSON.stringify(this.editData))
      data.projectId = this.$store.state.currentBiaoDuan.id
      data.modifydate = parseInt(data.modifydate)
      let temp = []
      values.uploadurl.forEach(item => {
        item.url && temp.push(item.url)
      })
      if(values.uploadurl.length !== temp.length){
         return this.$notify({ type: 'warning', message: '请上传文件或等待文件上传完成！' })
      }
      data.uploadurl = temp.join(',')
      uploadQualityData(data).then(() => {
        this.$notify({
          message: '提交成功！',
          type: 'success'
        })
        this.$router.go(-1)
      })
    },
    onLoad() {
      let that = this
      getDelayQualityEvent({'projectId':this.currentBiaoDuan.id}).then(data => {
        that.list = data || []
        that.refreshing = false
        this.finished = true
      })
    },
    itemClick(item) {
      this.$router.push({
        name: 'detail',
        params: item
      })
    },
    doDelayQualityEvent(item, result) {
      this.title = result === 1 ? '通过' : '不通过'
      this.show = true
      this.delayItem.result = result
      this.delayItem.eventid = item.id
    },
    submit(action, done) {
      if (action === 'cancel') {
        done()
      } else {
        doDelayQualityEvent(this.delayItem).then(data => {
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
