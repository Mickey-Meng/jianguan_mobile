<template>
  <div class="app-head">
      <div v-if="left" class="left-icon-container" @click="onClickLeft" >
        <van-icon class="center-both" size="40px" name="arrow-left" />
      </div>
      <span class="center-horizontal title" >{{$route.query.title || $route.params.title || this.title }}</span>
      <div v-if="showIcon" class="icon-container">
        <van-icon name="plus" @click="addClick"/>
        <van-icon name="filter-o" @click="screenClick" v-if="showSearch"/>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    },
    left: {
      type: Boolean,
      default: true
    },
    showIcon:{
      type:Boolean,
      default:false
    },
    showSearch:{
      type:Boolean,
      default:false
    }
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {

    },
    addClick(){
      this.$emit("fun")
    },
    screenClick(){
      this.$emit("screen")
    }
  }
}
</script>
<style lang="scss" scoped>
.app-head {
  .left-icon-container {
    position: relative;
    float: left;
    height: 100%;
    width: 60px;
  }
  .title {
    font-size: 19px;
    font-family: SFPro-Semibold, SFPro;
    font-weight: 600;
    color: #000000;
  }
  .icon-container{
    float: right;
    height: 100%;
    line-height: 88px;
    i{
      font-size: 28px;
    }
  }
}
</style>
