/**
 * 带步进按钮的数字输入框
 * @type {{template: string, methods: {add(): void, minus(): void, countChange(*): void}, name: string, model: {prop: string, event: string}, props: {min: {default: number, type: NumberConstructor}, max: {default: number, type: NumberConstructor}, enable: {default: boolean, type: BooleanConstructor}, count: {default: number, type: NumberConstructor, required: boolean}, step: {default: number, type: NumberConstructor}, label: {type: StringConstructor}}}}
 */
let IStepNumber = {
  name: 'IStepNumber',
  model: {
    prop: 'count',
    event: 'change'
  },
  props: {
    label: {type: String},
    count: {type: Number, required: true, default: 0},
    max: {type: Number, default: Infinity},
    min: {type: Number, default: 0},
    step: {type: Number, default: 1},
    enable: {type: Boolean, default: false},
  },
  methods: {
    countChange(el) {
      let result = Math.min(el.value, this.max)
      result = Math.max(this.min, result)
      el.value = result
      this.count = result
      this.$emit('change', result)
    },
    onInput(el) {
      onlyNumber(el)
      this.countChange(el)
    },
    minus() {
      if (this.enable && this.count > this.min) {
        let result = Math.max(this.min, this.count - this.step);
        this.$emit('change', result)
      }
    },
    add() {
      if (this.enable && this.count < this.max) {
        let result = Math.min(this.max, this.count + this.step)
        this.$emit('change', result)
      }
    }
  },
  template: `
        <div class="input-number">
        <span :class="['label', enable?'':'readonly']">{{ label }}</span>
        <div class="action">
          <span :class="['minus', enable && count > min?'':'readonly']" @click="minus">-</span>
<!--          <input v-if="enable" class="count" v-model='count' type='tel' oninput='onlyNumber(this)' @change='countChange($event.target)'/>-->
          <input v-if="enable" class="count" v-model='count' type='tel' @input='onInput($event.target)' @change='countChange($event.target)'/>
          <span class="zero readonly" v-else>0</span>
          <span :class="['add', enable && max > count?'':'readonly']" @click="add">+</span>
        </div>
        </div>`
}