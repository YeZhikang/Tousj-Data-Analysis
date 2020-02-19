// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import store from "./store";
import './static/index.css'
import hljs from 'highlight.js' //导入代码高亮文件
import 'highlight.js/styles/github.css'  //导入代码高亮样式
import marked from 'marked'

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://127.0.0.1:5000/';
Vue.prototype.$axios = axios;
Vue.prototype.$marked = marked;
Vue.prototype.$echarts = echarts;
Vue.directive('highlight',function (el) {
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block)=>{
    hljs.highlightBlock(block)
  })
});

Vue.filter("numCap",function (val) {
  val = val.toString()
  let newNum = ""
  for(let i = val.length-1;i>=0;i--){
    if((val.length - i -1 )%3 === 0 && i+1 !== val.length){
      newNum = ","+newNum
    }
    newNum = val[i] + newNum
  }
  let dashedSplit = newNum.split(',')
  let dashedCount = dashedSplit.length-1;
  if(dashedCount >= 1){
    return dashedSplit.slice(0,-1).join("")+"K"
  }
  return newNum
});

Vue.filter("changeToMDY",(val)=>{
  return new Date(val).toString().split(" ").slice(0,4).join(" ")
})

router.beforeEach((to,from,next)=>{
  let bool = false
  let ua = navigator.userAgent;
  let isMobileAgent_Re = [/(iPad).*OS\s([\d_]+)/,/(iPhone\sOS)\s([\d_]+)/,/(Android)\s+([\d.]+)/];
  // isMobileAgent_Re.forEach(item => {
  for(let item of isMobileAgent_Re){
    if(ua.match(item) && store.state.isMobile !== true){
      bool = true
      break
    }
  }
  if(to.name !== "register" && to.name !== "index" && to.name !== 'login' && to.name !== "NotLogin" && to.name !== "MobileLogin" && to.name !== "MobileIndex" && to.name !== "MobileRegister"
    && to.name !== 'illness'
  ){
    let userName = localStorage.getItem("userName");
    if(!userName){
      router.push({name:"NotLogin"})
    }
  }
  store.commit("judgeIsMobile",bool);

  next()
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store:store,
  router,
  components: { App },
  template: '<App/>'
})
