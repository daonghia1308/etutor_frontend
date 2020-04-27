// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Antd from 'ant-design-vue';
import ElementUI from 'element-ui';
import Vuesax from 'vuesax';
import {io} from "../src/globalVar";
import 'ant-design-vue/dist/antd.css';
import 'vuesax/dist/vuesax.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css';
import 'material-icons/iconfont/material-icons.css';

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(Vuesax)
Vue.use(ElementUI);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    io.sails.url = "http://localhost:1337";
  }
})
