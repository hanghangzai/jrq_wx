
import axios from 'axios'
import store from '../store'
import router from '../router'
import vue from "../main.js";

// axios 配置
axios.defaults.timeout = 5000000;
axios.defaults.baseURL = window.SITE_CONFIG['serverUrl'];
//axios.defaults.baseURL = 'http://192.168.1.131:8082'
axios.defaults.withCredentials = true
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.user.loginToken) {
      config.headers.LoanAdviceAuthorization = `${store.state.user.loginToken}`;
    }
    store.commit('startLoading');
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    store.commit('endLoading');
    return response.data;
  },
  error => {
    store.commit('endLoading');
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit('loginOut');
          // router.replace({
          //   path: 'login',
          //   query: {
          //     redirect: router.currentRoute.fullPath
          //   }
          // });
          redirect: router.currentRoute.fullPath
          break;
        case 8888:
          vue.$vux.toast.show({
            text: error.response.data.message,
            type: 'warn'
          });
          return Promise.reject(error.response.data.message)
          break;
        default:
          break;
      }
    }
    store.commit('endLoading');

    return Promise.reject("系统出现错误，请重试")
  });

export default axios;
