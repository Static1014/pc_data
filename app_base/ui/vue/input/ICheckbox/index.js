/**
 * 自定义checkbox
 * @type {{template: string, computed: {isLabelVisible(): *, iconClass(): [string,string]}, methods: {clickCB(): void}, name: string, model: {prop: string, event: string}, props: {v: {default: boolean, type: BooleanConstructor}, enable: {default: boolean, type: BooleanConstructor}, k: {type: StringConstructor}}}}
 */
let ICheckbox = {
  name: 'ICheckbox',
  model: {
    prop: 'v',
    event: 'change'
  },
  props: {
    k: {type: String},
    v: {type: Boolean, default: false},
    enable: {type: Boolean, default: true}
  },
  computed: {
    isLabelVisible() {
      return !isEmptyOrNull(this.k)
    },
    iconClass() {
      return ['cb-icon', this.v ? 'on' : '']
    }
  },
  methods: {
    clickCB() {
      if (this.enable) {
        this.$emit('change', !this.v)
      }
    }
  },
  template: `
      <div class="i-checkbox" @click="clickCB">
        <div :class="iconClass"></div>
        <slot>
          <div :class="['cb-label', enable?'':'unable']" v-if="isLabelVisible">{{k}}</div>
        </slot>
      </div>
    `
}