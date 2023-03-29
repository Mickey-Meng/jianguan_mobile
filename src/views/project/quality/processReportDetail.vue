<template>
  <div class="process-report-detail">
    <van-form v-if="show" :v-model="editData" class="common-card" :style="{ height: scrollerHeight }">
      <van-cell title="报验信息" class="common-title"/>
      <upload label="举牌照片" :fileList="urlList" :editable="false"></upload>
      <upload v-if="accrecodeurlList.length > 0" label="验收报告" :fileList="accrecodeurlList" :editable="false"></upload>
      <upload v-if="testurllList.length > 0" label="测试报告" :fileList="testurllList" :editable="false"></upload>
      <upload v-if="keydataList.length > 0" label="关键数据" :fileList="keydataList" :editable="false"></upload>
      <div v-if="showSubmit">
        <van-cell title="审核信息" class="common-title" />
        <upload label="现场照片" :fileList="nowurlList" :editable="false"></upload>
      </div>
    </van-form>
  </div>
</template>
<script>
import Upload from '@/components/common/Upload'
import { getCheckDataByConponentId } from '@/api/project.js'
export default {
  components: {
    Upload
  },
  computed: {
    scrollerHeight: function () {
      return window.innerHeight - 90 + 'px'
    }
  },
  data() {
    return {
      urlList: [],
      accrecodeurlList: [],
      testurllList: [],
      keydataList: [],
      nowurlList: [],
      editData: {},
      show: false,
      showSubmit: false
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
        let params = data.find(item => item.produceid == that.$route.query.produceid)
        let { recode, upload, submit } = params
        if (upload && upload.picurl) {
          that.urlList = that.formatUrl(upload.picurl)
        }
        if (recode) {
          if (recode.accrecodeurl) {
            that.accrecodeurlList = this.formatUrl(recode.accrecodeurl)
          }
          if (recode.keydata) {
            that.keydataList = this.formatUrl(recode.keydata)
          }
          if (recode.testurl) {
            that.testurllList = this.formatUrl(recode.testurl)
          }
        }
        if (submit) {
          that.nowurlList = this.formatUrl(submit.picurl)
          that.showSubmit = true;
        }
        that.show = true
      })
    },
    formatUrl(str) {
      let urls = []
      str.split(',').forEach(url => {
        urls.push({ url: url })
      })
      return urls
    }
  }
}
</script>
