<template>
  <div>
    <van-tabbar fixed route v-model="active">
      <van-tabbar-item
        v-for="(item, index) in data"
        :to="item.to"
        :icon-prefix="item.prefix"
        :icon="item.icon"
        :key="index"
        @click="onItemClick(item, index)"
        :class="active === index ? 'van-tabbar-item-active' : ''"
        :badge="hasMessage(item)"
      >
        {{ item.title }}
      </van-tabbar-item>
    </van-tabbar>
    <!-- <van-action-sheet v-model="show" :actions="actions" @select="onSelect" /> -->
    <van-action-sheet :description="title" v-model="show" @select="onSelect">
      <van-button class="van-action-sheet__item" v-for="(item, index) in actions" :key="index" @click="onSelect(item)">
        <van-badge :content="item.message === 0 ? '' : item.message">
          <span class="sheet-name">{{ item.name }}</span>
        </van-badge>
      </van-button>
    </van-action-sheet>
  </div>
</template>
<script>
export default {
  name: 'TabBar',
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
      show: false,
      actions: [],
      title: ''
    }
  },
  computed: {
    menuCookie: function() {
      return this.$store.state.userinfo.id
    }
  },
  watch: {
    menuCookie: function(nv) {
      nv && (this.active = 0)
    }
  },
  created() {},
  methods: {
    hasMessage(menu) {
      if (menu.sub && menu.sub.length > 0) {
        let count = 0
        menu.sub.forEach(item => {
          if (item.message) {
            count += item.message
          }
        })
        return count === 0 ? '' : count
      } else {
        return ''
      }
    },
    onItemClick(item, index) {
      this.active = index
      let { sub, title } = item
      if (!sub) {
        return
      }
      this.title = title
      this.actions = sub
      this.show = true
    },
    onSelect({ path }) {
      this.show = false
      this.$router.push({ path: path })
    }
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
.sheet-name {
  padding: 1px 16px;
}
</style>
