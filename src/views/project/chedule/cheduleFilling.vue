<template>
  <div class="chedule-filling">
    <component-select @onComponentSelect="onComponentSelect"> </component-select>
    <van-dialog v-model="show" :title="title" show-cancel-button :beforeClose="submit">
      <van-form v-model="editData">
        <van-field
          @click="(showCalendar = true) && (dateType = 'sTime')"
          readonly
          clickable
          v-model="editData.sTime"
          name="sTime"
          label="开始时间"
          placeholder="开始时间"
          required
        />
        <van-field
          @click="(showCalendar = true) && (dateType = 'eTime')"
          readonly
          clickable
          v-model="editData.eTime"
          name="eTime"
          label="结束时间"
          placeholder="结束时间"
          required
        />
      </van-form>
    </van-dialog>
    <van-calendar v-model="showCalendar" @confirm="onConfirm" />
  </div>
</template>
<script>
import ComponentSelect from '@/components/ComponentSelect'
export default {
  components: {
    ComponentSelect
  },
  data() {
    return {
      show: false,
      title: '计划填报',
      editData: {},
      showCalendar: false,
      dateType:''
    }
  },
  methods: {
    onComponentSelect(item) {
      this.show = true
    },

    submit(action, done) {
      done()
    },
    onConfirm(date) {
      date = this.moment(date).format('YYYY-MM-DD')
      this.editData[this.dateType] = date
      this.showCalendar = false
    }
  }
}
</script>
<style lang="scss">
.chedule-filling {
  height: 100%;
  overflow-y: auto;
}
</style>
