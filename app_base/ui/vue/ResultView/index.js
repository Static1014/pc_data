let RESULT_VIEW_BTN_BACK = '退&emsp;&emsp;出'
/**
 * 结果展示页组件
 * @type {{template: string, computed: {getBtnText(): (string|{default: string, type: StringConstructor}|*)}, methods: {clickBtn(): void, clickBg()}, name: string, emit: string[], props: {msg: {type: StringConstructor}, isSuc: {type: BooleanConstructor, required: boolean}, title: {type: StringConstructor, required: boolean}, btn: {default: string, type: StringConstructor}}}}
 */
let ResultView = {
  name: 'ResultView',
  props: {
    isSuc: {type: Boolean, required: true},
    title: {type: String, required: true},
    msg: {type: String},
    btn: {type: String, default: RESULT_VIEW_BTN_BACK},
  },
  emit: ['click-btn'],
  computed: {
    getBtnText() {
      return this.btn
    },
    isBtnVisible() {
      return !isEmptyOrNull(this.btn)
    }
  },
  methods: {
    clickBg() {
      // 拦截点击事件不穿透
    },
    clickBtn() {
      if (!this.btn || this.btn === '' || this.btn === RESULT_VIEW_BTN_BACK) {
        // 默认退出
        tjsw_app.common_utils.closeByJs()
      } else {
        // 自定义按钮
        this.$emit('click-btn')
      }
    }
  },
  template: `
        <div class="full-result" @click.stop="clickBg">
        <div class="r-top">
          <div :class="[isSuc?'suc':'fail', 'ic-result']"></div>
          <span class="r-title" v-html="title"></span>
          <span class="r-msg" v-if="msg && msg.length > 0" v-html="msg"></span>
          <slot name="special-reason"></slot>
        </div>
        <div class="r-bottom">
          <span class="welcome">欢迎下次使用</span>
          <div class="btn" v-if="isBtnVisible" @click="clickBtn" v-html="getBtnText"></div>
          <span class="time">天津市税务局&nbsp;&nbsp;{{ formatDate() }}</span>
        </div>
        </div>`
}