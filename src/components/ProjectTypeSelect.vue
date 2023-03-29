<template>
  <div class="project-type">
    <van-field class="project-type-field center-horizontal">
      <template #input>
        <van-radio-group v-model="projectType" direction="horizontal">
          <van-radio :name="item.value" v-for="(item, index) in projectTypes" :key="index">{{ item.name }}</van-radio>
        </van-radio-group>
      </template>
    </van-field>
  </div>
</template>

<script>
import constantField from '@/api/home'
export default {
  data() {
    return {
      projectTypes: constantField.projectTypes,
      projectType: ''
    }
  },
  watch: {
    projectType: function(value) {
      let project = constantField.projectTypes.find(item => item.value === value)
      this.$store.state.currentProject = project
    }
  },
  mounted() {
    this.projectType = this.projectTypes[0].value
  }
}
</script>

<style lang="scss">
.project-type {
  width: 100%;
  height: 44px;
  position: relative;
  .project-type-field {
    width: fit-content;
    border-radius: 6px;
    background: linear-gradient(180deg, #0054ff 0%, rgba(52, 153, 255, 0.7) 100%);
    color: white;
    .van-radio__label {
      color: white;
    }
  }
}
</style>
