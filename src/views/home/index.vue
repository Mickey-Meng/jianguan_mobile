<template>
<!-- 首页 -->
  <div class="common-center" ref="main">
     <van-nav-bar  title="首页对对对对对对"/>
    <div class="main-fixed" ref="fixed"></div>
  </div>
</template>
<script>
export default {
  
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="scss">
.common-center {
  height: 100%;
  // padding: 0 4px;
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
