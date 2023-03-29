<template>
  <div>
    <van-button @click="getFlowPeople" icon="friends-o" type="primary" class="operate" size="mini">流程图</van-button>
    <van-dialog
      @close="showFlowPeople = false"
      v-model="showFlowPeople"
      :showConfirmButton="false"
      :closeOnClickOverlay="true"
      class="pdf-container"
      title="流程详情"
    >
      <van-steps direction="vertical" :active="step">
        <van-step v-for="(item, index) in flowPeoples" :key="index">
          <h3>{{ item.group }}</h3>
          <p>{{ item.name }}</p>
        </van-step>
      </van-steps>
    </van-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserRoleAndCode } from '@/api/project'
import { getFlowAuditEntry } from '@/api/quality'
export default {
  computed: {
    ...mapGetters(['userinfo', 'currentBiaoDuan', 'curProject'])
  },
  props: {
    flowTypes: {
      type: Array,
      default: []
    },
    step: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showFlowPeople: false,
      flowPeoples: [],
      userRoleParentCode: ''
    }
  },
  methods: {
    getParent() {
      return new Promise(resolve => {
        getUserRoleAndCode({ projectId: this.currentBiaoDuan.id }).then(data => {
          if (data) {
            this.userRoleParentCode = data.parentCode
            resolve()
          }
        })
      })
    },
    getFlowPeople() {
      this.getParent().then(() => {
        let flowObj = this.flowTypes.find(e => e.key === this.userRoleParentCode)
        getFlowAuditEntry({
          flowKey: flowObj.flowKey,
          buildSection: this.currentBiaoDuan.id,
          projectId: this.curProject.id
        }).then(data => {
          if (data && data.data) {
            let flowPeoples = []
            for (let key in data.data) {
              data.data[key].forEach(item => {
                item.userInfo &&
                  item.userInfo.length > 0 &&
                  flowPeoples.push({
                    group: item.entryName,
                    name: item.userInfo[0].name
                  })
              })
            }
            this.flowPeoples = flowPeoples
            this.showFlowPeople = true
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.operate {
  margin-left: 20px;
  margin-top: 10px;
}
// ::v-deep .van-steps {
//   .van-steps__items {
//     display: flex;
//     flex-direction: initial;
//   }
// }
</style>
