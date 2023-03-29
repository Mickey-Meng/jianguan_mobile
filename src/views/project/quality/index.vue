<template>
  <div class="process">
    <common-head ref="head" :title="$route.meta.title"> </common-head>
    <router-view></router-view>
  </div>
</template>
<script>
import CommonHead from '@/components/head/CommonHead'
export default {
  components: {
    CommonHead
  },
  data() {
    return {
      isLoading: false,
      isRouterAlive: true
    }
  },
  computed: {
    scrollerHeight: function () {
      return (window.innerHeight - 81) + 'px'
    }
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false
        this.reload()
      }, 1000)
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.process {
  height: 100%;
  overflow: hidden;
  .layout-content {
    overflow-y: auto;
  }
}
</style>
