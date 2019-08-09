// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import reset from "reset-css";

import ElementUI from "element-ui";

import 'element-ui/lib/theme-chalk/index.css';

import "./assets/font/iconfont.js"; //symbol字体

import https from "./axios/https.js";

Vue.config.productionTip = false

Vue.use(reset);
Vue.use(ElementUI);
Vue.prototype.$request = https;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
 let token = JSON.parse(localStorage.getItem("user")).token;
  if(token){
    next();
  }else{
    this.$router.pash("/");
  }
})
