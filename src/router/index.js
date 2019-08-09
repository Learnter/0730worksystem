import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path:"/login",
      name:"login",
      component:resolve => require(['@/components/login'],resolve)
    },
    {
      path: '/workPage',
      name: 'workPage',
      component: resolve => require(['@/components/workPage'],resolve)
    }
  ]
})
