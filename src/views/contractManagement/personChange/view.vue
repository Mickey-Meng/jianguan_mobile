<template>
  <div class="info">
    <van-form :v-model="formData">
      <p class="title">基本信息</p>
      <van-cell-group inset>
        <van-field v-model="formData.projectChildName" label="标段" readonly />
        <van-field v-model="formData.recorder" label="填报人" readonly />
        <van-field v-model="formData.subDate" label="填报日期" readonly />
      </van-cell-group>
      <p class="title">变更信息</p>
      <van-cell-group inset>
        <van-field v-model="formData.projectName" label="项目" readonly />
        <van-field v-model="formData.projectChildName" label="标段" readonly />
        <van-field v-model="formData.changeTypeName" label="人员变更类型" readonly />

        <van-field v-model="formData.changePostName" label="变更岗位" readonly />

        <van-field v-model="formData.beforePerson" label="变更前人员" readonly />

        <van-field v-model="formData.beforeCode" label="变更前(执业)资格证书号" readonly />

        <van-field v-model="formData.afterPerson" label="变更后人员" readonly />

        <van-field v-model="formData.afterCode" label="变更后(执业)资格证书号" readonly />
        <van-field v-model="formData.changeUnitName" label="变更单位" readonly />
      </van-cell-group>
      <p class="title">附件</p>
      <van-cell-group inset class="file_list">
        <!-- <upload label="附件" :fileList="fileList" :editable="false"></upload> -->
        <img :src="item.url" alt="" v-for="(item, index) in fileList" :key="index" @click="preview(item)" />
      </van-cell-group>
      <!-- <div>
        <p class="title">审批记录</p>
        <van-cell-group inset>
          <van-steps direction="vertical" :active="0">
            <van-step v-for="(item, index) in logData" :key="index">
              <h3>{{ item.taskName }}</h3>
              <p>执行人：{{ item.createName }}</p>
              <p>操作：{{ item.approvalType }}</p>
              <p>审批意见：{{ item.comment }}</p>
              <p>处理时间：{{ item.createTime }}</p>
            </van-step>
          </van-steps>
        </van-cell-group>
      </div> -->
    </van-form>
    <van-popup v-model:show="imgpreview" @close="close"><img :src="previewUrl"/></van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { getPersonChangeByProcessId } from '@/api/project'
import Upload from '@/components/common/Upload'
import { lookUrl } from '@/utils/index'
export default {
  components: {
    Upload
  },
  computed: {
    ...mapGetters(['currentBiaoDuan']),
    scrollerHeight: function() {
      return window.innerHeight - 85 + 'px'
    }
  },
  data() {
    return {
      formData: [],
      logData: [],
      fileList: [],
      imgpreview: false,
      previewUrl: ''
    }
  },
  methods: {
    getDetail(id) {
      let type = getToken('taskType')
      let obj = {
        projectid: this.currentBiaoDuan.id,
        businessKey: id,
        type: type
      }
      getPersonChangeByProcessId(obj).then(res => {
        if (res) {
          this.formData = res.ZjPersonChange
          this.fileList = this.formatImgUrl(res.ZjPersonChangeFile)
        }
      })
    },
    formatImgUrl(arr) {
      let urls = []
      arr &&
        arr.forEach(item => {
          urls.push({ url: lookUrl(item.fileId), isImage: true })
        })
      return urls
    },
    preview(item) {
      this.imgpreview = true
      this.previewUrl = item.url
    },
    close() {
      this.imgpreview = false
      this.previewUrl = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  overflow: auto;
  p.title {
    font-size: 14px;
    padding-left: 15px;
  }
  .file_list {
    img {
      width: 80px;
      height: 80px;
      margin: 0px 5px;
    }
  }
}
</style>
