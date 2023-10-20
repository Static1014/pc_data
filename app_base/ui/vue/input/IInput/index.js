/**
 * 输入框类型
 * @type {{NUMBER: string, POSTCODE: string, PHONE: string, TEXT: string}}
 */
let I_INPUT_TYPE = {
  TEXT: 'text',           // 普通文本
  PHONE: 'phone',         // 最多11位纯数字
  POSTCODE: 'postcode',   // 最多6位纯数字
  NUMBER: 'number',       // 数字，可小数负数
  PASSWORD: 'password',   // 密码
}

/**
 * 文本输入框
 */
let IInput = {
  name: 'IInput',
  model: {
    prop: 'v',
    event: 'change'
  },
  props: {
    // 输入类型
    type: {type: String, default: I_INPUT_TYPE.TEXT},
    // label
    k: {type: String},
    // 值
    v: {type: String, required: true},
    // 不可编辑时显示的值
    unEditableVal: {type: String},
    placeholder: {type: String, default: '请输入'},
    maxlength: {type: Number, default: 100},
    editable: {type: Boolean, default: true},
    // key默认6个字换行
    keyWrapCount: {type: Number, default: 6},
    // 小数位数，type为NUMBER时有效
    decimalCount: {type: Number, default: 2},
    // 是否可为负数，type为NUMBER时有效
    negativeEnable: {type: Boolean, default: false},
    // label前是否带星号，标注必填项目
    must: {type: Boolean, default: false},
  },
  computed: {
    isKey() {
      return this.k && this.k.length > 0
    },
    calcKeyWidthCss() {
      if (this.isKey) {
        // 计算key一行最多几个字，多0.3是防止中文宽度超出
        return 'width: ' + this.keyWrapCount + '.3em'
      } else {
        return 'width: 0'
      }
    },
    getType() {
      switch (this.type) {
        case I_INPUT_TYPE.PHONE:
        // this.maxlength = 11
        // return 'tel'
        case I_INPUT_TYPE.POSTCODE:
        // this.maxlength = 6
        // return 'tel'
        case I_INPUT_TYPE.NUMBER:
          // 输入数字时，不能用number键盘，系统会自动判断非数字自动清空
          return 'text'

        case I_INPUT_TYPE.PASSWORD:
          return 'password'
        case I_INPUT_TYPE.TEXT:
          return 'text'
        default:
          return this.type
      }
    }
  },
  methods: {
    vChange(event) {
      let el = event.target
      this.v = el.value
      this.$emit('change', el.value)
    },
    vInput(event) {
      let el = event.target
      switch (this.type) {
        case I_INPUT_TYPE.PHONE:
          this.v = onlyPhone(el)
          let loc1 = el.selectionStart
          el.value = this.v
          this.$emit('change', this.v)
          el.selectionStart = loc1
          el.selectionEnd = loc1
          break
        case I_INPUT_TYPE.POSTCODE:
          this.v = onlyPostCode(el)
          let loc2 = el.selectionStart
          el.value = this.v
          this.$emit('change', this.v)
          el.selectionStart = loc2
          el.selectionEnd = loc2
          break
        case I_INPUT_TYPE.NUMBER:
          this.v = onlyNumber(el, this.decimalCount, this.negativeEnable)
          let loc3 = el.selectionStart
          el.value = this.v
          this.$emit('change', this.v)
          el.selectionStart = loc3
          el.selectionEnd = loc3
          break
        default:
          // 普通文本输入不走oninput监听，否则iOS设备上使用系统输入法输入中文时，会出现拼音和中文一同出现、输入下标错乱问题
          // this.v = el.value
          // let loc4 = el.selectionStart
          // el.value = this.v
          // this.$emit('change', this.v)
          // el.selectionStart = loc4
          // el.selectionEnd = loc4
          break
      }
    }
  },
  template: `
        <div class="i-container">
        <div :class="['i-label', must?'i-must':'']" :style="calcKeyWidthCss">{{ k }}</div>
        {{isKey?':':''}}
        <input :style="!isKey?'margin-left:0':''"
                  :class="['i-value', !editable?'readonly':'']"
                  v-model="editable?v:unEditableVal"
                  :type="getType"
                  :maxlength="maxlength"
                  :placeholder="placeholder"
                  :disabled="!editable" 
                  @input="vInput($event)"
                  @change="vChange($event)"/>
        </div>
`
}