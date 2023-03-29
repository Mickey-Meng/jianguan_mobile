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

    }
  }
}
</script>
