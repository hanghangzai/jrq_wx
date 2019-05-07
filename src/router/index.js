
/**
 * 整个app的路由设置
 *https://github.com/javaSwing/NeteaseCloudWebApp/blob/master/src/router/router.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import LoanProductList from '@/views/loan/loanProductList.vue'
import Login from '@/views/system/login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: window.SITE_CONFIG.domain,
  routes: [{
      path: '/',
      name: 'loanProductList',
      title: '首页',
      component: LoanProductList,
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/loanProductInfo',
      name: 'loanProductInfo',
      title: '产品详情',
      component: () =>
        import ('@/views/loan/loanProductInfo.vue'),
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/loanProductInfo2',
      name: 'loanProductInfo2',
      title: '产品详情2',
      component: () =>
        import ('@/views/loan/loanProductInfo2.vue'),
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/loanRXDProduct',
      name: 'loanRXDProduct',
      title: '任性贷',
      component: () =>
        import ('@/views/loan/loanRXDProduct.vue'),
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/loanEnter',
      name: 'loanEnter',
      title: '进件',
      component: () =>
        import ('@/views/loan/loanEnter.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/loanEnterSucess',
      name: 'loanEnterSucess',
      title: '进件成功',
      component: () =>
        import ('@/views/loan/loanEnterSucess.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/loanProgress',
      name: 'loanProgress',
      title: '进度',
      component: () =>
        import ('@/views/loan/loanProgress.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      title: '系统登陆',
      component: Login,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      title: '修改密码',
      component: () =>
        import ('@/views/system/changePassword.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/error',
      name: 'error',
      title: '系统错误',
      component: () =>
        import ('@/views/system/error.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      title: '我的',
      component: () =>
        import ('@/views/system/profile.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
  // 让每个页面都滚动到顶部，改变模式为mode: history
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router
