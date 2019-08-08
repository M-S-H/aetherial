import button from './components/button'
import modal from './components/modal'
import select from './components/select'
import ripple from './directives/ripple'
import buttonGroup from './components/button-group'
import buttonGroupItem from './components/button-group-item'
import checkbox from './components/checkbox'
import checkboxGroup from './components/checkbox-group'
import avswitch from './components/switch'
import radioButton from './components/radio-button'
import radioButtonGroup from './components/radio-button-group'

import './styles/lib.scss'

// export {
//   ripple,
//   button,
//   modal,
//   select,
//   buttonGroup,
//   buttonGroupItem,
//   checkbox,
//   checkboxGroup,
//   radioButton,
//   radioButtonGroup,
//   avswitch
// }

export default function installAv (vue) {
  vue.directive('ripple', ripple)
  vue.component('av-button', button)
  vue.component('av-select', select)
  vue.component('av-modal', modal)
  vue.component('av-button-group', buttonGroup)
  vue.component('av-button-group-item', buttonGroupItem)
  vue.component('av-switch', avswitch)
  vue.component('av-checkbox', checkbox)
  vue.component('av-checkbox-group', checkboxGroup)
  vue.component('av-radio-group', radioButtonGroup)
  vue.component('av-radio-button', radioButton)
}
