// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
import router from './router'
import button from './components/button'
import select from './components/select'
import modal from './components/modal'
import rippleDirective from './directives/ripple'

import './styles/app.scss'

Vue.config.productionTip = false
Vue.directive('ripple', rippleDirective)
Vue.component('av-button', button)
Vue.component('av-select', select)
Vue.component('av-modal', modal)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
