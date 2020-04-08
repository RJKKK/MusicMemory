import Vue from 'vue'
import Manage_main from './Manage_main.vue';
import router from './router'
import 'view-design/dist/styles/iview.css';
import ViewUI from 'view-design';
Vue.use(ViewUI);
Vue.use(require('vue-wechat-title'))
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'


new Vue({
    router,
    render: h => h(Manage_main)
}).$mount('#Manage')
