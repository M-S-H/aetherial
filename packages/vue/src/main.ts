import Button from '@/components/Button.vue'
import Ripple from '@/directives/ripple'
import Checkbox from '@/components/Checkbox.vue'
import CheckboxGroup from '@/components/CheckboxGroup.vue'
import RadioButton from '@/components/RadioButton.vue'
import RadioButtonGroup from '@/components/RadioGroup.vue'
import Input from '@/components/Input.vue'
import Modal from '@/components/Modal.vue'
import Switch from '@/components/Switch.vue'

export default {
  install (vue: any, options: any) {
    vue.component('av-button', Button)
    vue.directive('av-ripple', Ripple)
    vue.component('av-checkbox', Checkbox)
    vue.component('av-checkbox-group', CheckboxGroup)
    vue.component('av-radio-button', RadioButton)
    vue.component('av-radio-group', RadioButtonGroup)
    vue.component('av-input', Input)
    vue.component('av-modal', Modal)
    vue.component('av-switch', Switch)
  }
}
