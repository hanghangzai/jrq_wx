import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoading: false,
    direction: 'forward',
    user: {
      loginToken: null,
      userMobile: null,
    },
    customerMr: {
      customerMrId: null,
      customerMrDisplayName: null,
      customerMrMobile: null,
    },
  },
  getters: {
    user: state => state.user,
    customerMr: state => state.customerMr,
    isLoading: state => state.isLoading,
    direction: state => state.direction,
  },
  mutations: {
    setCustomerMrId(state, customerMrId) {
      state.customerMr.customerMrId = customerMrId 
    },
    loginIn(state, loginUser) {
      state.user.loginToken = loginUser.loginToken
      state.user.userMobile = loginUser.userMobile
      state.customerMr.customerMrId = loginUser.customerMrId
      state.customerMr.customerMrDisplayName = loginUser.customerMrDisplayName
      state.customerMr.customerMrMobile = loginUser.customerMrMobile
    },
    loginOut(state) {
      state.user.loginToken = ''
      state.user.userMobile = ''
      state.customerMr.customerMrId = ''
      state.customerMr.customerMrDisplayName = ''
      state.customerMr.customerMrMobile = ''
    },
    startLoading(state) {
      state.isLoading = true
    },
    endLoading(state) {
      state.isLoading = false
    },
    directionForward(state) {
      state.direction = 'forward'
    },
    directionReverse(state) {
      state.direction = 'reverse'
    }
  }
})
export default store
