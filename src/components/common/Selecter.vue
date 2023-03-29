<template>
  <div>
    <van-field v-bind="$attrs" v-on="$listeners" @click="show = true"></van-field>
    <van-action-sheet v-model="show">
      <van-cell-group inset>
        <van-field v-model="searchValue" placeholder="搜索" input-align="center" clearable />
      </van-cell-group>
      <div class="van-action-sheet__content" style="max-height:330px;text-align: center;">
        <button
          v-for="(item, index) in selects"
          :key="index"
          type="button"
          class="van-action-sheet__item"
          @click="onItemClick(item)"
        >
          <span class="van-action-sheet__name">{{ item[nameFied] }}</span>
        </button>
        <span style="height:200px;line-height: 200px;font-size: 16px" v-if="selects.length === 0">没有相关数据！</span>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
export default {
  props: {
    actions: {
      type: Array
    },
    nameFied: {
      type: String,
      default: 'name'
    },
    onSelect: {
      type: Function
    }
  },
  data() {
    return {
      searchValue: '',
      show: false,
      selects: []
    }
  },
  watch: {
    actions: function(value) {
      this.selects = value
    },
    searchValue: function() {
      this.watchFunc(500, () => {
        this.search()
      })
    }
  },
  methods: {
    watchFunc(delayTime, func) {
      if (!this.lastTime) {
        this.lastTime = setTimeout(() => {
          func()
        }, delayTime)
      } else {
        clearTimeout(this.lastTime)
        this.lastTime = setTimeout(() => {
          func()
        }, delayTime)
      }
    },
    onItemClick(item) {
      this.show = false
      this.searchValue = ''
      this.onSelect && this.onSelect(item)
    },
    search() {
      let temps = []
      this.actions.forEach(item => {
        let name = item[this.nameFied]
        if (name.indexOf(this.searchValue) !== -1) {
          temps.push(item)
        }
        this.selects = temps
      })
    }
  }
}
</script>
