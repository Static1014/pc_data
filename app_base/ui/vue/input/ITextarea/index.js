/**
 * 多行文本输入框
 */
let ITextarea = {
  name: 'ITextarea',
  model: {
    prop: 'v',
    event: 'change'
  },
  props: {
    k: {type: String},
    v: {type: String, required: true},
    placeholder: {type: String, default: '请输入'},
    maxlength: {type: Number, default: 200},
    rows: {type: Number, default: 5},
    editable: {type: Boolean, default: true},
    // 默认6个字换行
    keyWrapCount: {type: Number, default: 6},
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
    }
  },
  methods: {
    vChange(event) {
      this.$emit('change', event.target.value)
    }
  },
  template: `
        <div class="i-container multi-line">
        <div :class="['i-label', must?'i-must':'']" :style="calcKeyWidthCss">{{ k }}</div>
        {{isKey?':':''}}
        <textarea :style="!isKey?'margin-left:0':''" 
                  class="i-value leave-count"
                  v-model="v"
                  :maxlength="maxlength"
                  :rows="rows"
                  :placeholder="placeholder"
                  :disabled="!editable" 
                  @change="vChange($event)"></textarea>
        <span class="count">{{ v.length + '/' + maxlength }}</span>
        </div>`
}