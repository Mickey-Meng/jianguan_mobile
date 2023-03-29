<template>
  <div class="process-report">
    <van-form @submit="onSubmit" :v-model="editData" class="common-card" :style="{ height: scrollerHeight }">
      <upload
        label="举牌照片"
        name="url"
        :fileList="urlList"
        :editable="editable"
        :rules="[{ required: true, message: '请选择举牌照片' }]"
      ></upload>
      <upload label="验收报告" name="accrecodeurl" :fileList="accrecodeurlList" :editable="editable"></upload>
      <upload label="测试报告" name="testurl" :fileList="testurllList" :editable="editable"></upload>
      <upload label="关键数据" name="keydata" :fileList="keydataList" :editable="editable"></upload>
      <van-field
        readonly
        clickable
        name="checkusername"
        :value="editData.checkusername"
        label="报验人"
        :placeholder="editable ? '点击选报验人' : '无'"
        @click="editable && (showCheckMan = true)"
        :rules="[{ required: true, message: '请选择报验人' }]"
        :disabled="!editable"
      />
      <div style="margin: 16px" v-if="editable">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <van-action-sheet v-model="showCheckMan" :actions="checkMans" @select="onSelect" />
  </div>
</template>
<script>
import Upload from '@/components/common/Upload'
import { getChecker, addRecode } from '@/api/project.js'
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
      params: {},
      editable: false,
      urlList: [],
      accrecodeurlList: [],
      testurllList: [],
      keydataList: [],
      showCheckMan: false,
      checkMans: [],
      editData: {
        checkusername: ''
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      console.log(this.$route.params)
      let params = this.$route.params
      this.params = params
      this.editable = params.editable

      this.editData.conpoentid = this.params.conpoentid
      this.editData.conponentname = this.params.conponentname
      this.editData.conponenttype = this.params.conponenttype
      this.editData.projectcode = this.params.projectcode

      this.editData.produceid = this.params.produceid
      this.editData.produceidname = this.params.produceName
      if (params.recode) {
        this.editData.recodeid = params.recode.id
      }

      if (!this.editable) {
        //详情
        let { recode, upload } = params
        if (upload && upload.picurl) {
          this.urlList = this.formatUrl(upload.picurl)
        }
        if (recode) {
          if (recode.accrecodeurl) {
            this.accrecodeurlList = this.formatUrl(recode.accrecodeurl)
          }
          if (recode.keydata) {
            this.keydataList = this.formatUrl(recode.keydata)
          }
          if (recode.testurl) {
            this.testurllList = this.formatUrl(recode.testurl)
          }
        }
      }else {
        //上报
        this.getAllChecker()
      }
    },
    getAllChecker() {
      getChecker({ conponentid: this.params.conpoentid }).then(data => {
        data.forEach(item => {
          this.checkMans.push(item)
        })
      })
    },
    onSelect(item) {
      this.showCheckMan = false
      this.editData.checkusername = item.name
      this.editData.checkid = item.id
    },
    formatUrl(str) {
      let urls = []
      str.split(',').forEach(url => {
        urls.push({ url: url })
      })
      return urls
    },
    onSubmit(values) {
      for (let key in values) {
        let url = []
        values[key].forEach &&
          values[key].forEach(item => {
            url.push(item.url)
          })
        values[key] = url.join(',')
      }

      values = { ...values, ...this.editData }
      values.updateusername = this.$store.state.userinfo.name
      console.log(values)

      addRecode(values).then(data => {
        this.$router.go(-1)
      })
    }
  }
}
</script>
