/**
 * 下拉菜单选项对象
 * @type {{reason: string, disable: boolean, name: string, value: string}}
 */
let ISelectOption = {
  value: '',      // 值
  name: '',       // 文本
  disable: false, // 是否不可选
  reason: ''      // 不可选原因
}

// 未选择时的value
let UNSELECT_VALUE = ''

/**
 * 下拉菜单组件
 */
let ISelect = {
  name: 'ISelect',
  model: {
    prop: 'v',
    event: 'change'
  },
  emits: ['after-change'], // 新增选择回调after-change(item)
  props: {
    // id，通过唯一id找到位置
    id: {type: String, required: true},
    // 选项列表
    data: {type: Array, required: true},
    // label
    k: {type: String},
    // 选中项的value
    v: {
      type: String,
      required: true,
      default: UNSELECT_VALUE,
      validator: function (v) {
        if (typeof v !== 'string') {
          logE('ISelect组件使用错误，value属性必须是字符串类型')
        }
        return typeof v === 'string'
      }
    },
    // 未选择显示文字
    placeholder: {type: String, default: '请选择'},
    // 是否可选
    enable: {type: Boolean, default: true},
    // 是否显示多行文本
    multiline: {type: Boolean, default: true},
    // 是否允许点击选中项取消选择
    unselectEnable: {type: Boolean, default: false},
    // 是否正在选择
    isSelecting: {type: Boolean, default: false},
    // key默认6个字换行
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
    },
    unselected() {
      return this.v === UNSELECT_VALUE
    },
    getSelectedOption() {
      if (this.unselected) {
        // 未选择
        return {
          value: UNSELECT_VALUE,
          name: this.placeholder,
        }
      }
      return this.data.filter(item => item.value === '' + this.v)[0]
    },
    isSelected() {
      // 原则上属性value必须是字符串，所有前面加上个空强转字符串，防止出入了int
      return v => this.v + '' === v
    }
  },
  methods: {
    clickSelect() {
      if (this.enable) {
        this.isSelecting = true
        let optionsCover = $('.i-options-dialog-cover')
        stopBodyScroll(optionsCover)

        // 计算位置，位置不够时如何处理
        let vh = getDeviceSize().bodyHeight
        // 上下分界线
        let upDownLine = vh / 4
        let el = $('#' + this.id)
        let list = el.find('.i-options-list');
        let {x, y, width, height} = getPositionInScreen(el)
        let bottom = vh - y - height
        // logI(bottom + '，' + maxOptionListHeight + ', ' + vh)
        // logI({x, y, width, height})
        if (bottom < upDownLine) {
          // 在上面
          list.css({
            left: x,
            bottom: vh - y,
            top: 'auto',
            width: width,
            maxHeight: y - 20
          })
        } else {
          // 在下面
          list.css({
            left: x,
            top: y + height,
            bottom: 'auto',
            width: width,
            maxHeight: bottom - 20
          })
        }
      }
    },
    clickOptionsCover() {
      this.isSelecting = false
      let optionsCover = $('.i-options-dialog-cover')
      enableBodyScroll(optionsCover)
    },
    clickOption(item) {
      if (item.disable) {
        // 选项不可选
        if (item.reason && item.reason.length > 0) {
          toastError(item.reason)
        }
      } else {
        // 选项可选
        if (item.value === this.v) {
          // 取消选择
          if (this.unselectEnable) {
            this.$emit('change', UNSELECT_VALUE)
            this.$emit('after-change', {
              value: UNSELECT_VALUE,
              name: this.placeholder,
            })
          }
        } else {
          // 选中某项
          this.$emit('change', item.value)
          this.$emit('after-change', item)
        }
      }
      this.clickOptionsCover()
    }
  },
  mounted() {
    let that = this
    if (platform_util.isApple() && !tjsw_app.common_utils.isInTjswApp()) {
      // 苹果手机safari和chrome上e.stopPropagation()无效；在APP内有效
      $(document).scroll(() => {
        if (that.isSelecting) {
          that.clickOptionsCover()
        }
      })
    }
  },
  template: `
        <div class="i-container">
        <div :class="['i-label', must?'i-must':'']" :style="calcKeyWidthCss">{{ k }}</div>
        {{isKey?':':''}}
        <div class="i-value" :style="!isKey?'margin-left:0':''">
        <div :id="id" :class="['i-select', !enable?'unable':'']" @click="clickSelect">
          <span :class="['i-selected-name', !enable?'unable':'',unselected?'placeholder':'', !multiline?'single-line':'']">{{ getSelectedOption.name }}</span>
          <transition name="fade">
            <div class="i-options-dialog-cover" v-show="isSelecting" @click.stop="clickOptionsCover">
              <transition name="slide">
                <div class="i-options-list">
                  <div class="item-option" v-for="(item, index) in data" :key="index" @click.stop="clickOption(item)" :class="[item.disable?'unselectable':'', isSelected(item.value)?'selected':'']">
                    {{ item.name }}
                  </div>
                </div>
              </transition>
            </div>
          </transition>
        </div>
        </div>
        </div>
`
}
