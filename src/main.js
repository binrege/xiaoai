import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http'
import axios from 'axios'
import dayjs from 'dayjs'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VCharts from 'v-charts'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import JsonExcel from 'vue-json-excel'

Vue.use(JsonExcel)
Vue.use(mavonEditor)
Vue.use(VCharts)
Vue.use(ElementUI);
Vue.component('downloadExcel', JsonExcel)
Vue.prototype.$axios = http
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false


axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.interceptors.response.use(
    response => {
        return response.data
    }, error => {
        return Promise.reject(error)
    })
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')