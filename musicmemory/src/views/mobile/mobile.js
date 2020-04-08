import Vue from 'vue'
import mobile from './mobile.vue';
import router from './router';
import 'assets/css/normalize.css'
import 'assets/css/common.css'
import 'vant/lib/index.css';
import 'font-awesome/css/font-awesome.min.css'
Vue.use(require('vue-wechat-title'))

new Vue({
    router,
    render: h => h(mobile)
}).$mount('#mobile')
