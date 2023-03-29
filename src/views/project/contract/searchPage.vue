<template>
  <div :style="{ height: scrollerHeight }" class="">
    <van-cell-group inset>
      <van-field
        v-model="beginDate"
        is-link
        readonly
        name="calendar"
        label="开始时间"
        placeholder="点击选择日期"
        @click="showBeginCalendar = true"
      />
      <van-field
        v-model="endDate"
        is-link
        readonly
        name="calendar"
        label="结束时间"
        placeholder="点击选择日期"
        @click="showEndCalendar = true"
      />
      <van-calendar v-model:show="showBeginCalendar" :min-date="minDate" @confirm="beginConfirm" />
      <van-calendar v-model:show="showEndCalendar" :min-date="minDate" @confirm="endConfirm" />
    </van-cell-group>
    <div class="btn-con">
      <van-button type="default" @click="cancel">取消</van-button>
      <van-button type="primary" @click="search">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    scrollerHeight: function () {
      return window.innerHeight - 85 + 'px'
    }
  },
  data() {
    return {
      showBeginCalendar: false,
      showEndCalendar: false,
      beginDate: '',
      endDate: '',
      minDate: new Date(2020, 0, 1)
    }
  },
  methods: {
    beginConfirm(date) {
      this.showBeginCalendar = false
      let m = date.getMonth() + 1
      let d = date.getDate()
      this.beginDate = `${date.getFullYear()}-${this.checkDate(m)}-${this.checkDate(d)}`
    },
    endConfirm(date) {
      this.showEndCalendar = false
      let m = date.getMonth() + 1
      let d = date.getDate()
      this.endDate = `${date.getFullYear()}-${this.checkDate(m)}-${this.checkDate(d)}`
    },
    checkDate(t) {
      let r = ''
      t < 10 ? (r = '0' + t) : (r = t)
      return r
    },
    search(){
      this.$router.push({name:'clockIn',params:{'startTime':this.beginDate,'endTime':this.endDate}})
    },
    cancel(){
        this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-con {
  text-align: center;
  position: absolute;
  bottom: 10px;
  width: 100%;
  .van-button--normal{
      padding: 0px 40px;
      margin:0 10px
  }
}
</style>