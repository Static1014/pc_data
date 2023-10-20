/**
 * 返回按钮样式
 * @type {{WHITE: number, BLUE: number, BLACK: number}}
 */
let BtnBackType = {
  BLACK: 0, // 白底黑字
  WHITE: 1, // 蓝底白字
  BLUE: 2,  // 白底蓝字
}

/**
 *  返回按钮
 */
let BtnBack = {
  name: 'BtnBack',
  props: {
    type: {type: Object, default: BtnBackType.BLACK},
    text: {type: String, default: '返回'},
  },
  emits: ['click'],
  computed: {
    frontClass() {
      switch (this.type) {
        case BtnBackType.BLACK:
          return 'black'
        case BtnBackType.WHITE:
          return 'white'
        case BtnBackType.BLUE:
          return 'blue'
      }
    }
  }, methods: {
    clickMe() {
      this.$emit('click')
    }
  },
  template: `
        <div :class="['btn-back', frontClass]" @click.stop="clickMe">
          <svg :class="['ic-back', frontClass]" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M259.497149 496.384347c-0.00307 0.005117-0.00614 0.010233-0.008186 0.01535-0.240477 0.438998-0.470721 0.88516-0.690732 1.336438-0.00921 0.01842-0.01842 0.035816-0.027629 0.053212-0.210801 0.432859-0.409322 0.87288-0.600681 1.316995-0.016373 0.037862-0.034792 0.074701-0.051165 0.112564-0.183172 0.429789-0.354064 0.865717-0.51984 1.305739-0.019443 0.053212-0.042979 0.104377-0.062422 0.157589-0.154519 0.418532-0.295735 0.842181-0.432859 1.2689-0.024559 0.076748-0.053212 0.152473-0.077771 0.230244-0.128937 0.413416-0.245593 0.831948-0.35918 1.252527-0.024559 0.092098-0.054235 0.183172-0.077771 0.275269-0.103354 0.398066-0.192382 0.801249-0.280386 1.205455-0.025583 0.118704-0.057305 0.23536-0.081864 0.354064-0.078795 0.381693-0.143263 0.769526-0.207731 1.156336-0.024559 0.143263-0.054235 0.285502-0.076748 0.428765-0.058328 0.3776-0.101307 0.759293-0.146333 1.140986-0.01842 0.156566-0.042979 0.311085-0.059352 0.467651-0.039909 0.394996-0.065492 0.793062-0.091074 1.192152-0.00921 0.147356-0.025583 0.292666-0.033769 0.440022-0.027629 0.547469-0.041956 1.098008-0.041956 1.65264s0.014326 1.105171 0.041956 1.65264c0.007163 0.147356 0.023536 0.292666 0.033769 0.440022 0.025583 0.399089 0.051165 0.797156 0.091074 1.192152 0.016373 0.157589 0.040932 0.311085 0.059352 0.467651 0.045025 0.381693 0.088004 0.763386 0.146333 1.140986 0.022513 0.144286 0.052189 0.285502 0.076748 0.428765 0.064468 0.38681 0.12996 0.773619 0.207731 1.156336 0.024559 0.118704 0.056282 0.23536 0.081864 0.354064 0.088004 0.404206 0.178055 0.807389 0.280386 1.205455 0.023536 0.093121 0.053212 0.183172 0.077771 0.275269 0.112564 0.420579 0.229221 0.839111 0.35918 1.252527 0.024559 0.077771 0.053212 0.152473 0.077771 0.230244 0.137123 0.426719 0.278339 0.850367 0.432859 1.2689 0.019443 0.053212 0.041956 0.104377 0.062422 0.157589 0.164752 0.438998 0.335644 0.87595 0.51984 1.305739 0.016373 0.037862 0.034792 0.074701 0.051165 0.112564 0.191358 0.444115 0.38988 0.883113 0.600681 1.316995 0.00921 0.01842 0.01842 0.035816 0.027629 0.053212 0.220011 0.451278 0.450255 0.89744 0.690732 1.336438 0.00307 0.005117 0.00614 0.010233 0.008186 0.01535 1.497097 2.728134 3.381004 5.213745 5.578042 7.384178l-0.022513 0.022513 383.934253 351.620289c5.78782 5.791913 13.785981 9.374508 22.621207 9.374508 17.662265 0 31.980365-14.3181 31.980365-31.980365 0-8.834202-3.582595-16.832364-9.373485-22.620184L334.406233 511.738034 694.213995 182.581362c5.79089-5.78782 9.373485-13.784958 9.373485-22.620184 0-17.662265-14.3181-31.980365-31.980365-31.980365-8.835226 0-16.833387 3.582595-22.621207 9.374508l-383.934253 351.620289 0.022513 0.022513c0 0 0 0 0 0C262.878153 491.170602 260.994246 493.65519 259.497149 496.384347z"></path>
          </svg>
          <span :class="[frontClass]">{{text}}</span>
        </div>`
}