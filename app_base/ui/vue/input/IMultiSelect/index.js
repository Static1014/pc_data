/**
 * 下拉菜单组件
 */
let IMultiSelect = {
  name: 'IMultiSelect',
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
    // 选中项列表
    v: {
      type: Array,
      required: true,
      default: []
    },
    // 未选择显示文字
    placeholder: {type: String, default: '请选择'},
    // 是否可选
    enable: {type: Boolean, default: true},
    // 是否显示多行文本
    multiline: {type: Boolean, default: true},
    // 是否允许点击选中项取消选择
    unselectEnable: {type: Boolean, default: true},
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
      return this.v.length < 1
    },
    getSelectedOptionsStr() {
      let str = ''
      let first = true
      for (const tmp of this.v) {
        str += (first ? '' : ',&emsp;') + tmp.name
        first = false
      }
      if (this.v.length < 1) {
        str = this.placeholder
      }
      return str;
    },
    isSelected() {
      // 判断某个选项是否选中
      return v => {
        for (const tmp of this.v) {
          if (tmp.value === v) {
            return true
          }
        }
        return false
      }
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
    removeItem(item) {
      // 取消选中
      let index = this.v.findIndex(tmp => {
        if (tmp.value === item.value) {
          return true
        }
      })
      if (index >= 0) {
        this.v.splice(index, 1)
      }
    },
    clickOption(item) {
      if (item.disable) {
        // 选项不可选
        if (item.reason && item.reason.length > 0) {
          toastError(item.reason)
        }
      } else {
        // 选项可选
        if (this.isSelected(item.value)) {
          // 取消选择
          if (this.unselectEnable) {
            this.removeItem(item)
            this.$emit('change', this.v)
            this.$emit('after-change', this.v)
          }
        } else {
          // 选中某项
          this.v.push(item)
          this.$emit('change', this.v)
          this.$emit('after-change', this.v)
        }
      }
      // this.clickOptionsCover()
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
          <span :class="['i-selected-name', !enable?'unable':'',unselected?'placeholder':'', !multiline?'single-line':'']" v-html="getSelectedOptionsStr"></span>
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
