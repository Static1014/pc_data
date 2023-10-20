/**
 * 5星评价组件
 * @type {{template: string, computed: {isStarOn(): function(*): boolean, isLabel(): *}, methods: {clickStar(*): void}, name: string, model: {prop: string, event: string}, props: {label: {default: string, type: StringConstructor}, maxCount: {default: number, type: NumberConstructor}, value: {default: number, type: NumberConstructor, required: boolean}}}}
 */
let IStarView = {
  name: 'IStarView',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    maxCount: {type: Number, default: 5},
    value: {type: Number, default: 0, required: true},
    label: {type: String, default: ''},
    isLabelStr: {type: Boolean, default: false} // 是否只作为kv展示
  },
  computed: {
    isStarOn() {
      return n => n <= this.value
    },
    isLabel() {
      return this.label && this.label.length > 0
    }
  },
  methods: {
    clickStar(n) {
      if (this.isLabelStr) {
        return
      }

      let result;
      if (n > this.value) {
        result = n
      } else if (n === this.value) {
        result = n - 1
      } else {
        result = n
      }

      this.$emit('change', result)
    }
  },
  template: `
        <div :class="['star-view', isLabelStr?'small':'']">
        <span class="label" v-if="isLabel">{{ label }}</span>
        <div :class="['star', isLabelStr?'small':'']" v-for="n in maxCount" @click="clickStar(n)">
          <svg v-show="isStarOn(n)" :class="['star-svg', 'on', isLabelStr?'small':'', isLabelStr?'unable':'']" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M565.228999 34.689634l112.062243 237.506364c8.702621 18.317097 25.411973 31.05108 44.816898 33.994614l250.736267 38.073966c48.688285 7.406826 68.213191 70.036902 32.930782 105.95921L824.307945 635.130487c-13.997782 14.237744-20.348775 34.810484-17.053298 54.927296l42.809217 261.086627c8.342678 50.687968-42.633244 89.441827-86.210339 65.50962l-224.276461-123.252469a57.030963 57.030963 0 0 0-55.271241 0l-224.276461 123.260467c-43.577095 23.91621-94.553017-14.82965-86.20234-65.509619l42.809216-261.094626c3.319474-20.116812-3.095509-40.697551-17.085293-54.927296L18.147691 450.223788C-17.126719 414.30148 2.326198 351.671404 51.070474 344.264578l250.704273-38.073966c19.348934-2.943534 36.074284-15.677516 44.752908-33.994614L458.63789 34.689634c21.820542-46.152687 84.826558-46.152687 106.58311 0z"></path>
          </svg>
          <svg v-show="!isStarOn(n)" :class="['star-svg', 'off', isLabelStr?'small':'']" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1020.14772 401.803156a73.692177 73.692177 0 0 0-59.004939-48.349491l-266.418179-39.613945-115.801993-240.435528A74.172152 74.172152 0 0 0 511.982081 31.99834c-28.670513 0-54.74916 16.159162-66.940527 41.405852l-115.801993 240.435528-266.450178 39.613945A73.596182 73.596182 0 0 0 3.848441 401.803156a70.620337 70.620337 0 0 0 17.183108 73.116208l195.253872 194.933887-45.277652 270.417972a71.164308 71.164308 0 0 0 30.334427 70.492344 75.228098 75.228098 0 0 0 78.363935 4.191782L511.982081 889.905836l232.307949 125.049513a75.740071 75.740071 0 0 0 78.363935-4.191782 71.196307 71.196307 0 0 0 30.302428-70.492344l-45.309649-270.417972 195.317868-194.933887c19.294999-19.294999 25.918655-47.517535 17.183108-73.116208z m-265.362234 217.780703a70.908322 70.908322 0 0 0-20.062959 61.88479l45.309649 270.417972-232.307949-124.985516a75.548081 75.548081 0 0 0-71.51629 0l-232.307949 124.985516 45.30965-270.417972a70.780328 70.780328 0 0 0-20.030961-61.88479L73.924806 424.649971l266.418179-39.677941a73.788172 73.788172 0 0 0 55.773107-40.573896L511.982081 104.026604l115.833991 240.403529a73.916166 73.916166 0 0 0 55.741109 40.573895l266.482176 39.677942-195.253871 194.901889z"></path>
          </svg>
        </div>
        </div>`
}