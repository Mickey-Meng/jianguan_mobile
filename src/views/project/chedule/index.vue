<!-- home -->
<template>
  <div class="index-container">
    <div class="warpper">
      <h1 class="demo-home__title"><span>{{$route.meta.title}}</span></h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },

  computed: {},

  mounted() { },

  methods: {},
  destroyed() {
    console.log('destroyed shedule');
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  .warpper {
    padding: 12px;
    background: #fff;
    .demo-home__title {
      margin: 0 0 6px;
      font-size: 32px;
      .demo-home__title img,
      .demo-home__title span {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        width: 32px;
      }
      span {
        margin-left: 16px;
        font-weight: 500;
      }
    }
  }
}
</style>
