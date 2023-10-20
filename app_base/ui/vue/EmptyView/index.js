/**
 * 空视图、错误视图
 * @type {{template: string, computed: {isIconVisible(): *}, methods: {clickRetry(): void}, name: string, emit: string[], props: {msg: {default: string, type: StringConstructor}, iconSrc: {default: string, type: StringConstructor}, btn: {default: string, type: StringConstructor}}}}
 */
let EmptyView = {
  name: 'EmptyView',
  props: {
    iconSrc: {type: String, default: ''},
    isError: {type: Boolean, default: false},
    msg: {type: String, default: '未找到数据'},
    btn: {type: String, default: '重  试'},
  },
  emit: ['click-retry'],
  computed: {
    isIconVisible() {
      return this.iconSrc && this.iconSrc.length > 0
    },
    msgText() {
      return this.msg
    }
  },
  methods: {
    clickRetry() {
      this.$emit('click-retry')
    }
  },
  template: `
        <div class="empty-view">
        <img v-if="isIconVisible" :src="iconSrc" alt="空状态" class="e-icon">
        <div class="e-msg" v-html="msgText"></div>
        <div :class="['btn', 'low', isError?'bg-red':'']" @click="clickRetry">{{ btn }}</div>
        </div>`
}