import Button from '@/components/Button.vue'
import Ripple from '@/directives/ripple'
import Checkbox from '@/components/Checkbox.vue'

export default {
  install (vue: any, options: any) {
    vue.component('av-button', Button)
    vue.directive('av-ripple', Ripple)
    vue.component('av-checkbox', Checkbox)
  }
}
