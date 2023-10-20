/**
 * tab标签
 * @type {{template: string, methods: {clickTab(*, *): void}, name: string, model: {prop: string, event: string}, props: {curTab: {default: number, type: NumberConstructor}, tabs: {default: *[], type: ArrayConstructor}}}}
 */
let TabLayout = {
  name: 'TabLayout',
  model: {
    prop: 'curTab',
    event: 'tab-changed'
  },
  data: {
    from: 0
  },
  props: {
    curTab: {type: Number, default: 0},
    size: {type: String, default: ''},
    tabs: {type: Array, default: () => [], required: true},
  },
  emits: ['before-change', 'after-change'],
  computed: {
    isSmall() {
      return this.size === 'small'
    },
    selectedTab() {
      let index
      if (this.curTab < 0) {
        // 太小
        index = 0
      } else if (this.curTab >= this.tabs.length) {
        // 太大
        index = this.tabs.length - 1
      } else {
        index = this.curTab
      }

      this.moveToIndex(index);
      return index
    }
  },
  methods: {
    clickTab(index) {
      this.moveToIndex(index)
    },
    moveToIndex(index) {
      let left = 0
      try {
        left = $('.tab-item').eq(index).offset().left
      } catch (e) {
      }
      if (this.from !== index) {
        this.$emit('before-change', {from: this.from, to: index})
        this.$emit('tab-changed', index)
        $('.tab-layout').animate({scrollLeft: left + 'px'}, 300)
        this.$emit('after-change', {from: this.from, to: index})
        this.from = index
      }
    }
  },
  template: `
        <div :class="['tab-layout', isSmall?'small':'']">
        <div :class="['tab-item', index === selectedTab ? 'selected' : '', isSmall?'small':'']" v-for="(tab, index) in tabs" :key="index" @click="clickTab(index)">
          {{ tab.name }}
          <span class="tab-count" v-show="tab.count && tab.count>0">{{ tab.count }}</span>
        </div>
        </div>`
}