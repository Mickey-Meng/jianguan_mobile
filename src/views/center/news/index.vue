<template>
  <div class="news">
    <van-tabs  color="#00c587">
      <van-tab title="工程新闻"><news-list :type="1"></news-list></van-tab>
      <van-tab title="活动新闻"><news-list :type="2"></news-list></van-tab>
      <van-tab title="安全新闻"><news-list :type="3"></news-list></van-tab>
    </van-tabs>
  </div>
</template>
<script>
import NewsList from './components/NewsList.vue'
export default {
    components: {
        NewsList
    },
    data() {
      return {
        active: 0
      }
    }
}
</script>
<style lang="scss" scoped>
.news {
    overflow: hidden;
}
</style>
