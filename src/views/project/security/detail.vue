<template>
  <div class="detail">
    <van-form :v-model="editData" class="common-card" :style="{ height: scrollerHeight }">
      <van-cell title="安全检查信息" class="common-title" />
      <van-field readonly v-model="editData.gongquname" label="工区名称" />
      <van-field readonly v-model="editData.projectname" label="工程名称" />
      <van-field readonly v-model="editData.uploadtime" label="检查时间" />
      <van-field readonly v-model="editData.safefirstname" label="问题大类" />
      <van-field readonly v-model="editData.safesecondname" label="问题小类" />
      <van-field readonly v-model="editData.modifyname" label="处理人" />
      <van-field readonly v-model="editData.modifydate" label="整改期限" />
      <upload label="照片" :fileList="urlList" :editable="false"></upload>
      <van-field type="textarea" readonly v-model="editData.uploadremark" rows="2" autosize label="备注" />

      <div v-if="editData.delayday !== null">
        <van-cell title="延期申请信息" class="common-title" />
        <van-field readonly v-model="editData.delayday" label="延期时长" />
        <van-field readonly v-model="editData.delayreason" label="延期原因" />
        <van-field readonly v-model="editData.delayresult" label="审核状态" />
      </div>

      <div v-if="editData.status > 1">
        <van-cell title="整改记录信息" class="common-title" />
        <van-field readonly v-model="editData.modifytime" label="整改时间" />
        <upload label="照片" :fileList="moList" :editable="false"></upload>
        <van-field type="textarea" readonly v-model="editData.modifyremark" rows="2" autosize label="备注" />
      </div>
    </van-form>
  </div>
</template>

<script>
import Upload from '@/components/common/Upload'
import { formatImgUrl } from '@/utils/index'
export default {
  components: {
    Upload
  },
  data() {
    return {
      editData: {},
      urlList: [],
      moList: [],
      formatImgUrl
    }
  },

  computed: {
    scrollerHeight: function() {
      return window.innerHeight - 91 + 'px'
    }
  },

  mounted() {},

  created() {
    this.editData = this.$route.params
    if (this.editData.delayresult !== null) {
      this.editData.delayresult = ['申请中', '审核通过', '审核未通过'][this.editData.delayresult - 1]
    }
    this.urlList = this.formatImgUrl(this.editData.uploadurl)
    this.moList = this.formatImgUrl(this.editData.modifyurl)
  }
}
</script>
