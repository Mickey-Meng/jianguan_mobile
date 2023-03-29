<template>
  <div id="app" class="common-bg">
    <keep-alive>
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  created() {
    if (localStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(localStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('store', JSON.stringify(this.$store.state))
    })
    if (localStorage.getItem('overviewAuth') === 'true') {
      this.$router.push({ path: '/projectOverview' })
    }
  }
}
</script>
<style lang="scss"></style>
