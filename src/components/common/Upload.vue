<template>
  <van-field :label="label" :name="name" :rules="rules">
    <template #input>
      <van-uploader
        :preview-full-image="false"
        @click-preview="clickPreview"
        :max-count="maxCount"
        :accept="accept"
        v-model="list"
        :deletable="editable"
        :after-read="afterReadUrl"
        :class="editable ? '' : 'no-select'"
      >
        <van-button v-if="diyButton" icon="plus" type="primary">{{ diyButton }}</van-button>
        <template #preview-cover="{ file }" v-if="showFileName">
            <div class="preview-cover van-ellipsis">{{ file.name }}</div>
          </template>
      </van-uploader>
    </template>
  </van-field>
</template>
<script>
import { Toast } from 'vant'
import { uploadFile } from '@/api/project.js'
import { ImagePreview } from 'vant'
import { lookUrl } from '@/utils/index'
export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  props: {
    diyButton: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    maxCount: {
      type: Number,
      default: 9
    },
    label: {
      type: String
    },
    name: {
      type: String
    },
    fileList: {
      type: Array
    },
    rules: {
      type: Array,
      default: null
    },
    editable: {
      type: Boolean,
      default: true
    },
    showFileName:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      list: this.fileList,
      lookUrl
    }
  },
  methods: {
    validator() {
      return true
    },
    afterReadUrl(file) {
      // let formData = new FormData()
      // formData.append('file', file.file)
      // uploadFile(formData).then(url => {
      //   file.url = url
      // })
      // Toast.loading({
      //   message: '加载中...',
      //   forbidClick: true
      // })
      file.status = 'uploading'
      file.message = '上传中...'
      const reader = new FileReader()
      reader.readAsDataURL(file.file)
      reader.onload = e => {
        let base64 = e.target['result'].split('base64,')[1]
        uploadFile({ name: file.file.name, base64: base64 }).then(url => {
          file.url = url
          // Toast.clear()
          file.status = 'done'
          file.message = '上传成功'
        })
      }
    },
    clickPreview(file) {
      let url = this.lookUrl(file.url)
      ImagePreview({
        images: [url],
        closeable: true
      })
    }
  }
}
</script>
<style lang="scss">
.no-select {
  .van-uploader__upload {
    display: none !important;
  }
}
</style>
