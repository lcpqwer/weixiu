// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import axios from 'axios'
import importDirective from '@/directive'
import installPlugin from '@/plugin'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'
import qs from 'qs';
import VueCookie from 'vue-cookie'

Vue.use(VueCookie)
//图片放大
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
let options = {
  fullscreenEl: false
};
Vue.use(preview, options)

// import BaiduMap from 'vue-baidu-map'
// Vue.use(BaiduMap, {
//   ak: 'YOUR_APP_KEY'  //这个地方是官方提供的ak密钥
// })



import AMap from "vue-amap";
Vue.use(AMap);
AMap.initAMapApiLoader({
  key: "4af19d07ff6048f57ee8e8ab674151d7"
});


// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== '192.168.80.107/repair/public/') require('@/mock')
if (process.env.NODE_ENV !== 'http://54.223.48.127/repair/public/') require('@/mock')

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})

window.baseurl = 'http://54.223.48.127/repair/public/';
// window.baseurl = 'http://192.168.8.107/repair/public/';

axios.defaults.baseURL = baseurl
// axios.defaults.headers.post['Content-Type'] = 'application/json'

/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;
Vue.prototype.$axios = axios;
// Vue.prototype.$router = router;
Vue.prototype.$qs = qs;
Vue.prototype.$cookie = VueCookie;

/**
 * 注册指令
 */
importDirective(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App),
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      if (!this.getCookie('username')) {
        this.$router.push('/login')
      } else {
        this.$router.push('/mapPage')
      }
    }
  }
})
