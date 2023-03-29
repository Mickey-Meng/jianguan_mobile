<template>
  <div class="report-deal">
    <van-form @submit="onSubmit" class="common-card" :style="{ height: scrollerHeight }">
      <van-field
        v-model="modifydate"
        is-link
        readonly
        name="modifydate"
        label="整改时间"
        placeholder="点击选择时间"
        @click="showPicker = true"
        :rules="[{ required: true, message: '请选择时间' }]"
      />
      <upload
        :fileList="[]"
        label="整改照片"
        name="modifyurl"
        :rules="[{ required: true, message: '请选择整改照片' }]"
      ></upload>
      <van-field v-model="modifyremark" name="modifyremark" label="整改备注" placeholder="整改备注" />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker v-model="currentDate" type="datetime" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
  </div>
</template>
<script>
import Upload from '@/components/common/Upload'
import { submitDealWithSafeEvent } from '@/api/project.js'
import { formatISO8601Time } from '@/utils/index'
export default {
  components: {
    Upload
  },
  computed: {
    scrollerHeight: function() {
      return window.innerHeight - 90 + 'px'
    }
  },
  data() {
    return {
      formatISO8601Time,
      urlList: [],
      modifyremark: '',
      currentDate: new Date(),
      modifydate: '',
      showPicker: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    onConfirm(time) {
      this.showPicker = false
      this.modifydate = this.formatISO8601Time(new Date(time).toJSON())
    },
    init() {},
    onSubmit(values) {
      let temp = []
      values.modifyurl.forEach(item => {
        item.url && temp.push(item.url)
      })
      if (values.modifyurl.length !== temp.length) {
        return this.$notify({ type: 'warning', message: '请上传文件或等待文件上传完成！' })
      }
      values.modifyurl = temp.join(',')
      values.eventid = this.$route.query.eventid
      submitDealWithSafeEvent(values).then(data => {
        this.$store.dispatch('getRealtimeMessage')
        this.$toast('处理成功')
        this.$router.go(-1)
      })
    }
  }
}
</script>
