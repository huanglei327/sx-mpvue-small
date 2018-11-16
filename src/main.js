import Vue from 'vue'
import App from './App'
import * as common from './utils/js/common'
import * as cartManager from './utils/js/cart'
import store from './store'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$common = common
Vue.prototype.$cart = cartManager
Vue.prototype.$store = store

const app = new Vue(App)

app.$mount()

