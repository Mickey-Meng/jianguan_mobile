<template>
  <div class="common-center" ref="main">
    <div class="main-fixed" ref="fixed">
      <ProjectSelect :projectInitOk="projectInitOk"></ProjectSelect>
      <Online></Online>
      <Days></Days>
      <ProjectTypeSelect></ProjectTypeSelect>
    </div>
    <div class="main-other" ref="other" :style="{ height: otherHeight }" v-if="showOther && showProjectComponents">
      <Overview></Overview>
      <!-- <Report> </Report> -->
      <qualityAndSafetyOverview></qualityAndSafetyOverview>
      <Cumulative> </Cumulative>
    </div>
    <!-- <Constructionschedule> </Constructionschedule>
    <Civilization> </Civilization> -->
  </div>
</template>
<script>
import ProjectSelect from '@/components/ProjectSelect'
import ProjectTypeSelect from '@/components/ProjectTypeSelect'
import Days from '@/components/Days'
import Online from '@/components/Online'
import Overview from '@/components/Overview'
import Cumulative from '@/components/Cumulative'
// import Civilization from '@/components/Civilization'
import Report from '@/components/Report'
// import Constructionschedule from '@/components/Constructionschedule'
import qualityAndSafetyOverview from '@/components/qualityAndSafetyOverview'
import { mapGetters } from 'vuex'
export default {
  components: {
    ProjectSelect,
    ProjectTypeSelect,
    Days,
    Online,
    Overview,
    Cumulative,
    // Civilization,
    // Constructionschedule,
    Report,
    qualityAndSafetyOverview
  },
  inject: ['reload'],
  computed: {
    ...mapGetters(['loginCount'])
  },
  watch: {
    loginCount: function(value) {
      this.onRefresh(value)
    }
  },
  data() {
    return {
      isLoading: false,
      showOther: false,
      otherHeight: '',
      showProjectComponents: false
    }
  },
  mounted() {
    // console.log(this.$route.query)
    this.init()
  },
  methods: {
    init() {
      this.otherHeight = this.$refs.main.offsetHeight - this.$refs.fixed.offsetHeight - 10 + 'px'
      this.$nextTick(() => {
        this.showOther = true
      })
    },
    onRefresh(value) {
      setTimeout(() => {
        this.isLoading = false
        this.reload()
      }, 1000)
    },
    projectInitOk() {
      this.showProjectComponents = true
    }
  }
}
</script>
<style lang="scss">
.common-center {
  height: 100%;
  padding: 0 4px;
  overflow: hidden;
  .main-fixed {
    margin-bottom: 10px;
  }
  .main-other {
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
