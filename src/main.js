import objectAssign from 'object-assign'
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import {
  sync
} from 'vuex-router-sync'



Vue.use(VueRouter)
Vue.use(Vuex)

require('es6-promise').polyfill()
import {
  DatetimePlugin,
  CloseDialogsPlugin,
  ConfigPlugin,
  BusPlugin,
  LocalePlugin,
  DevicePlugin,
  ToastPlugin,
  AlertPlugin,
  ConfirmPlugin,
  LoadingPlugin,
  WechatPlugin,
  AjaxPlugin,
  AppPlugin
} from 'vux'

// global VUX config
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX' // global config for VUX, since v2.5.12
})

// plugins
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(BusPlugin)
Vue.use(DatetimePlugin)

import store from '@/store'
import api from '@/api'
import http from '@/http'
import util from '@/util'


Vue.prototype.$api = api
Vue.prototype.$http = http
Vue.prototype.$util = util

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(CloseDialogsPlugin, router)

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

import router from '@/router'
sync(store, router)

router.beforeEach(function(to, from, next) {
  store.commit('startLoading')

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('directionForward')
    } else {
      store.commit('directionReverse')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('directionForward')
  }

  if (/\/login/.test(to.path)) {
    next();
    return;
  }
  if (to.matched.some(record => !record.meta || !record.meta.requiresAuth)) {
    next()
    return;
  }
  let innerStore = store.state
  // 如果用户不存在
  if (!innerStore.user || !innerStore.user.loginToken) {
    store.commit('endLoading');
    next({
       path: '/login?to=' + to.fullPath
    });
  } else {

    if (!to.path || !to.name) {
      next({
        path: '/'
      });
    } else {
      next()
    }
  }
})

router.afterEach(function(to, from) {

  store.commit('endLoading');
  window.scrollTo(0, 0);
})

function initVue() {
  return new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
}

let vueInst = initVue();
if (window && !window.vue) {
  window.vue = vueInst;
}
export default vue;
