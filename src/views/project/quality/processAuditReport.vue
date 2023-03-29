<template>
  <div class="report-detail">
    <div class="common-card" :style="{ height: scrollerHeight }">
      <van-form :v-model="editData" @submit="submit">
        <upload
          label="现场照片"
          name='url'
          :fileList="nowurlList"
          :editable="editable"
          :rules="[{ required: true, message: '请选择现场照片' }]"
        ></upload>
        <van-field
          v-model="editData.remark"
          label="审核备注"
          :readonly="!editable"
          :rules="[{ required: true, message: '审核备注' }]"
        />
        <van-field
          v-model="editData.standbyrecode"
          label="旁站记录"
          :readonly="!editable"
        />
        <div style="margin: 16px" class="submit-button" v-if="editable">
          <van-button class="pass" size="small" square type="info" @click="editData.result = 1">通过</van-button>
          <van-button class="reject" size="small" square type="danger" @click="editData.result = 2">驳回</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import Upload from '@/components/common/Upload'
import { getCheckDataById ,check } from '@/api/project.js'
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
      accrecodeurlList: [],
      testurllList: [],
      keydataList: [],

      editData: { remark: '', standbyrecode: '',result: 1 },
      editable: true,
      nowurlList: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.editable = this.$route.query.editable === "1";
    },
    submit(values) {
        let urls = [];
        values.url.forEach(item => {
            urls.push(item.url);
        });
        this.editData.url = urls.join(',');
        this.editData.recondid = this.$route.query.recondid;
        check(this.editData).then(data => {
            this.$router.go(-1)
        });
    },
  }
}
</script>
<style lang="scss">
.submit-button {
  .pass {
    width: 140px;
    float: left;
  }
  .reject {
    width: 140px;
    float: right;
  }
}
</style>
