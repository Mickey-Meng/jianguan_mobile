<template>
  <div>
    <van-tabbar fixed route v-model="active">
      <van-tabbar-item
        v-for="(item, index) in data"
        :to="item.to"
        :icon-prefix="item.prefix"
        :icon="item.icon"
        :key="index"
        :class="active === index ? 'van-tabbar-item-active' : ''"
      >
        {{ item.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      active: 0,
      title: ''
    }
  },
  created() {
    
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.van-tabbar-item--active {
  color: initial !important;
}
.van-tabbar-item-active {
  color: $hover-color !important;
}
</style>
