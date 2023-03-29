<template>
  <div>
    <van-list
      :finished="finished"
      finished-text="我也是有底线的~~"
      @load="onLoad"
      class="news-list"
      :style="{ height: scrollerHeight }"
    >
      <div
        @click="itemClick(item)"
        v-for="(item, index) in list"
        :key="index"
        :class="'common-card list-item ' + (index === list.length - 1 ? 'last' : '')"
        style="background-color: white;"
      >
        <img :src="item.pic" />
        <div class="content">
          <div class="name">{{ item.title }}</div>
          <div class="time">{{ item.sttime }}</div>
        </div>
      </div>
    </van-list>
    <van-dialog
      class="dialog"
      v-model="show"
      :title="title"
      confirmButtonText="退出！"
      confirmButtonColor="#00c587"
      closeOnClickOverlay
    >
      <!-- <img :src="image" style="max-width: 100%" /> -->
      <div v-html="content" class="ql-editor" :style="{ maxHeight: newsDetailHeight }"></div>
    </van-dialog>
  </div>
</template>
<script>
import { lookUrl, replaceBaseApi } from '@/utils/index'
import { getNews } from '@/api/project.js'
export default {
  props: {
    type: {
      type: Number
    }
  },
  computed: {
    scrollerHeight: function() {
      return window.innerHeight - 82 + 'px'
    },
    newsDetailHeight: function() {
      return window.innerHeight * 0.8 - 100 + 'px'
    }
  },
  data() {
    return {
      refreshing: false,
      finished: false,
      list: [],
      show: false,
      title: '',
      image: '',
      lookUrl,
      replaceBaseApi,
      content: ''
    }
  },
  methods: {
    onLoad() {
      this.request()
    },
    request() {
      this.list = []
      getNews({ type: this.type, projectId: this.$store.state.currentBiaoDuan.id }).then(data => {
        data.forEach(item => {
          item.pic = this.lookUrl(item.pic)
          if (process.env.NODE_ENV === 'production') {
            item.content = this.replaceBaseApi(item.content)
          }
        })
        this.list = data
      })
      this.refreshing = false
      this.finished = true
    },
    itemClick(item) {
      this.title = item.title
      this.image = item.pic
      this.content = item.content
      this.show = true
    }
  }
}
</script>
<style lang="scss">
.news-list {
  overflow-y: auto;
  .list-item {
    overflow: hidden;
    height: 90px;
    line-height: 90px;
    .content {
      float: right;
      width: calc(100% - 140px);
      height: 100%;
      line-height: 100%;
      padding: 10px 20px 5px 10px;
      .name {
        height: 66%;
        font-size: 0.37333rem;
        line-height: 120%;
        overflow-y: auto;
        margin-bottom: 5%;
      }
      .time {
        height: 20%;
        font-family: 'time', serif;
        font-size: 20px;
        color: $hover-color;
      }
    }
    img {
      width: 120px;
      height: 80px;
      margin-top: 5px;
      margin-left: 5px;
      border-radius: 5px;
    }
  }
}
.van-dialog__header {
  margin: 0 10px 10px 10px;
}
.dialog {
  max-height: 88%;
  overflow: auto;
  .ql-editor {
    overflow: auto;
  }
}
</style>
