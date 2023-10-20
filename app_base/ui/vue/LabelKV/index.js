/**
 * key-value展示组件
 */
let LabelKV = {
  name: 'LabelKV',
  props: {
    k: {type: String, required: true},
    v: {type: String, required: true},
    // 默认10个字换行
    keyWrapCount: {type: Number, default: 10},
    vClass: {type: String},
    kClass: {type: String},
  },
  emits: ['click'],
  computed: {
    calcKeyWidthCss() {
      // 计算key一行最多几个字，多0.3是防止中文宽度超出
      return 'max-width: ' + this.keyWrapCount + '.3em'
    }
  },
  methods:{
    clickKv(){
      this.$emit('click')
    }
  },
  template: `
        <div class="l-container" @click="clickKv">
        <span :class="['l-label', kClass]" :style="calcKeyWidthCss" v-html="k"></span>
        <span :class="['l-value', vClass]" v-html="v"></span>
        </div>
      `
}