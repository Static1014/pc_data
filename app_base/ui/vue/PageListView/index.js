/**
 * ListView状态
 */
let ListState = {
  NORMAL: 0,
  LOADING: 1,
  EMPTY: -1,
  ERROR: -9
}

/**
 *Footer状态
 */
let FooterState = {
  INVISIBLE: 0,
  NO_MORE: -1,
  LOADING: 1,
  ERROR: 9
}

/**
 * 自带空页面、错误页、footer的可分页ListView
 *
 * 注意：PageListView依赖EmptyView组件，所以导入时必须两个同时导入，并且需要先导入EmptyView，如下：
 *   <script type="text/javascript" src="../../app_base/ui/vue/EmptyView/index.js"></script>
 *   <link rel="stylesheet" href="../../app_base/ui/vue/EmptyView/index.css">
 *   <script type="text/javascript" src="../../app_base/ui/vue/PageListView/index.js"></script>
 *   <link rel="stylesheet" href="../../app_base/ui/vue/PageListView/index.css">
 *
 * @type {{template: string, components: {"empty-view": {template: string, computed: {isIconVisible(): *}, methods: {clickRetry(): void}, name: string, emit: string[], props: {msg: {default: string, type: StringConstructor}, iconSrc: {default: string, type: StringConstructor}, btn: {default: string, type: StringConstructor}}}}, computed: {getFooterText(): ({default: string, type: String | StringConstructor}), showFooterLoading(): boolean, showFooterRetry(): boolean, showEmpty(): *, showFooter(): {default: boolean, type: Boolean | BooleanConstructor}, emptyIsError(): boolean}, methods: {clickFooter(): void, clickEmptyRetry(): void}, name: string, model: {prop: string, event: string}, emit: string[], mounted(): void, props: {listId: {type: StringConstructor, required: boolean}, listState: {default: number, type: NumberConstructor, required: boolean}, listEmptyMsg: {default: string, type: StringConstructor}, footerState: {default: number, type: NumberConstructor, required: boolean}, isPages: {default: boolean, type: BooleanConstructor}, footerErrorMsg: {default: string, type: StringConstructor}, footerLoadingMsg: {default: string, type: StringConstructor}, footerNoMoreMsg: {default: string, type: StringConstructor}}}}
 */
let PageListView = {
  name: 'PageListView',
  components: {
    'empty-view': EmptyView
  },
  model: {
    prop: 'footerState',
    event: 'change'
  },
  props: {
    listId: {type: String, required: true},
    isPages: {type: Boolean, default: true},
    listState: {type: Number, required: true, default: ListState.NORMAL},
    footerState: {type: Number, required: true, default: FooterState.NO_MORE},
    listEmptyMsg: {type: String, default: '未找到数据'},
    footerErrorMsg: {type: String, default: '未知错误'},
    footerNoMoreMsg: {type: String, default: '已经到底啦'},
    footerLoadingMsg: {type: String, default: '加载中'},
  },
  emit: ['click-empty-retry', 'click-footer-retry', 'touch-bottom'],
  computed: {
    showFooter() {
      return this.isPages
    },
    getFooterText() {
      switch (this.footerState) {
        case FooterState.NO_MORE:
          return this.footerNoMoreMsg
        case FooterState.LOADING:
          return this.footerLoadingMsg
        case FooterState.ERROR:
          return this.footerErrorMsg
      }
    },
    showFooterLoading() {
      return this.footerState === FooterState.LOADING
    },
    showFooterRetry() {
      return this.footerState === FooterState.ERROR
    },
    showEmpty() {
      return this.listState === ListState.EMPTY || this.listState === ListState.ERROR
    },
    emptyIsError() {
      return this.listState === ListState.ERROR
    }
  },
  methods: {
    clickEmptyRetry() {
      this.$emit('click-empty-retry')
    },
    clickFooter() {
      if (this.footerState === FooterState.ERROR) {
        this.$emit('change', FooterState.LOADING)
        this.$emit('click-footer-retry')
      }
    }
  },
  mounted() {
    let that = this
    if (that.showFooter) {
      // 分页，监听滚动
      let scroller = $('#' + that.listId)
      let content = scroller.find('.list-content')
      scroller.scroll(() => {
        // 监听滚动

        let divHeight = scroller.height()
        let scrollTop = scroller.scrollTop()
        let contentHeight = content.height()
        // logI(scrollTop + ' + ' + divHeight + ' = ' + (scrollTop + divHeight) + ' ?? ' + contentHeight)
        if (scrollTop + divHeight >= contentHeight) {
          // logI('到底了')
          if (that.footerState !== FooterState.ERROR
            && that.footerState !== FooterState.NO_MORE
            && that.footerState !== FooterState.LOADING) {
            that.$emit('change', FooterState.LOADING)
            that.$emit('touch-bottom')
          }
        }
      })
    }
  },
  template: `
        <div class="list-container" :id="listId">
        <div class="list-content">
          <slot name="list-items"></slot>
          <div v-if="showFooter" class="list-footer" @click.stop="clickFooter">
            <div class="f-ic-loading" v-if="showFooterLoading"></div>
            <span class="f-text">{{ getFooterText }}</span>
            <span class="f-retry" v-if="showFooterRetry">；<span class="btn-retry">点击重试</span></span>
          </div>
        </div>
        <empty-view v-if="showEmpty" :is-error="emptyIsError" :msg="listEmptyMsg" @click-retry="clickEmptyRetry"></empty-view>
        </div>`
}