<template>
  <div class="process-filling">
    <span class="center-both" @click="count ++">{{$route.meta.title}}    {{count}}</span>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      count: 1
    }
  }
}
</script>
<style lang="scss" scoped>
.process-filling {
  height: 100%;
  overflow-y: auto;
  position: relative;
  span {
    font-size: 30px;
  }
}
</style>
