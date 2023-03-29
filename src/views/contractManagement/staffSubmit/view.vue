<template>
  <div class="info">
    <van-form :v-model="formData">
      <p class="title">基本信息</p>
      <van-cell-group inset>
        <van-field v-model="formData.projectName" label="标段" readonly />
        <van-field v-model="formData.recorder" label="记录人" readonly />
        <van-field v-model="formData.subDate" label="报审日期" readonly />
        <van-field v-model="formData.isContract" label="人员类型" readonly />
        <van-field v-model="currentBiaoDuan.isauto" label="是否自管" readonly/>
      </van-cell-group>
      <p class="title">报审信息</p>
      <van-cell-group inset>
        <div
          class="list"
          v-for="(item, index) in tableData"
          :key="index"
          :class="'item ' + (index === tableData.length - 1 ? 'last' : '')"
        >
          <p>
            姓名：<span>{{ item.name }}</span>
          </p>
          <p>
            身份证号：<span>{{ item.identityId }}</span>
          </p>
          <p>
            有效期：<span>{{ item.identityTime }}</span>
          </p>
          <p>
            性别：<span>{{ item.gender == 1 ? '男' : '女' }}</span>
          </p>
          <p>
            岗位：<span>{{ item.post }}</span>
          </p>
          <p>
            证件名称：<span>{{ item.certificateName }}</span>
          </p>
          <p>
            证件编号：<span>{{ item.certificateCode }}</span>
          </p>
          <p>
            发证单位：<span>{{ item.issuer }}</span>
          </p>
          <p>
            文化程度：<span>{{ item.education }}</span>
          </p>
          <p style="display: flex; justify-content: flex-start">
            <span style="color: #969799">脸部照片：</span>
            <img
              v-if="item.peoplePic !== ''"
              :src="item.peoplePic"
              alt=""
              style="width: 80px; height: 80px"
              @click="preview(item)"
            />
          </p>
        </div>
      </van-cell-group>
    </van-form>
    <van-popup v-model:show="imgpreview" @close="close"><img :src="previewUrl" /></van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getStaffByProcessIdAndProjectId } from '@/api/project'
import { getToken } from '@/utils/auth'
import { lookUrl } from '@/utils/index'
export default {
  computed: {
    ...mapGetters(['currentBiaoDuan'])
  },
  data() {
    return {
      formData: {},
      tableData: [],
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
        type
      }
      if (this.currentBiaoDuan.isauto === 1) {
        this.currentBiaoDuan.isauto = '自管'
      }else{
        this.currentBiaoDuan.isauto = '非自管'
      }
      getStaffByProcessIdAndProjectId(obj).then(res => {
        if (res) {
          this.formData = Object.assign({}, res.person)
          if (this.formData.isContract == 1) {
            this.formData.isContract = '合同人员'
          } else {
            this.formData.isContract = '非合同人员'
          }
          let data = res.personSub
          if (data && data.length > 0) {
            this.tableData = data.map(item => {
              if (item.peoplePic != '') {
                item.peoplePic = lookUrl(item.peoplePic)
              }
              return item
            })
          }
        }
      })
    },
    preview(item) {
      console.log(item)
      this.imgpreview = true
      this.previewUrl = item.peoplePic
    },
    close() {
      this.previewUrl = ''
      this.imgpreview = false
    }
  }
}
</script>

<style lang="scss" scoped>
p.title {
  font-size: 14px;
  padding-left: 15px;
}
.item {
  padding: 10px 10px;
  margin-bottom: 10px;
  border-bottom: #ebedf0 1px solid;
  background-color: #fff;
  border-radius: 3px;
  font-weight: 400;
  font-size: 14px;
  p {
    margin: 0;
    padding: 0;
    margin-bottom: 15px;
    color: #969799;
    span {
      color: #333;
    }
  }
}
</style>