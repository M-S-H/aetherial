// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
import router from './router'
import button from './components/button'
import select from './components/select'
import modal from './components/modal'
import buttonGroup from './components/button-group'
import buttonGroupItem from './components/button-group-item'
import rippleDirective from './directives/ripple'
import switchcomp from './components/switch'
import checkbox from './components/checkbox'
import checkboxGroup from './components/checkbox-group'
import radioButton from './components/radio-button'
import radioButtonGroup from './components/radio-button-group'

import './styles/app.scss'

Vue.config.productionTip = false
Vue.directive('ripple', rippleDirective)
Vue.component('av-button', button)
Vue.component('av-select', select)
Vue.component('av-modal', modal)
Vue.component('av-button-group', buttonGroup)
Vue.component('av-button-group-item', buttonGroupItem)
Vue.component('av-switch', switchcomp)
Vue.component('av-checkbox', checkbox)
Vue.component('av-checkbox-group', checkboxGroup)
Vue.component('av-radio-group', radioButtonGroup)
Vue.component('av-radio-button', radioButton)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
