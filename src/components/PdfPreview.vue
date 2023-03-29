<template>
  <div>
    <van-dialog
      @close="onClose"
      v-model="showPdfContainer"
      :showConfirmButton="false"
      :closeOnClickOverlay="true"
      class="pdf-container"
      :style="{ height: scrollerHeight }"
    >
      <div id="pdfDiv" :style="{ height: scrollerHeight }"></div>
    </van-dialog>
  </div>
</template>

<script>
import { lookUrl, formatImgUrlListString } from '@/utils/index'
import Pdfh5 from 'pdfh5'
import 'pdfh5/css/pdfh5.css'
import { getCheckDataByrecod } from '@/api/project.js'
import { ImagePreview } from 'vant'
export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  data() {
    return {
      showPdfContainer: false,
      showPdf: false,
      pdfh5: null,
      lookUrl,
      formatImgUrlListString
    }
  },
  computed: {
    scrollerHeight: function() {
      return this.showPdf ? window.innerHeight * 0.8 + 'px' : 0
    }
  },
  methods: {
    showPic(recodeid, field) {
      field = field || 'accrecodeurl'
      getCheckDataByrecod({ recodeid }).then(data => {
        if (data.recode[field]) {
          let urlList = this.formatImgUrlListString(data.recode[field])
          ImagePreview({
            images: urlList,
            closeable: true
          })
        } else {
          this.$notify({ type: 'warning', message: '未提交照片！' })
        }
      })
    },
    show(recodeid, field) {
      field = field || 'remark'
      getCheckDataByrecod({ recodeid }).then(data => {
        if (data.recode[field]) {
          let url = this.lookUrl(data.recode[field])
          this.loadPdf(url)
        } else {
          this.showPdfContainer = false
          this.$notify({ type: 'warning', message: '未提交PDF！' })
        }
      })
    },
    show_otherPDF(fileId) {
      if (fileId) {
        let url = this.lookUrl(fileId)
        this.loadPdf(url)
      } else {
        this.showPdfContainer = false
        this.$notify({ type: 'warning', message: '未提交PDF！' })
      }
    },
    onClose() {
      this.showPdfContainer = false
      this.showPdf = false
    },
    loadPdf(url) {
      let that = this
      this.$toast.loading('文件加载中，请稍后！')
      this.showPdfContainer = true
      this.$nextTick(() => {
        this.pdfh5 = new Pdfh5('#pdfDiv', {
          pdfurl: url,
          zoomEnable: false
        })
        this.pdfh5.on('complete', function(status, msg, time) {
          if (status !== 'success') {
            that.$toast.clear()
            that.showPdfContainer = false
            that.showPdf = false
            that.$toast('PDF文件损坏，加载失败！')
          }
        })
        this.pdfh5.on('ready', function() {
          that.showPdf = true
          that.$toast.clear()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pdf-container {
  height: 0;
}

.van-dialog {
  top: 50% !important;
}

.pdfjs .viewerContainer {
  height: 100% !important;
}
</style>
