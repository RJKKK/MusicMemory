import Vue from 'vue'
import mobile from './mobile.vue';
import router from './router';
import store from "../../store";
import 'assets/css/normalize.css'
import 'assets/css/common.css'
import 'vant/lib/index.css';
import 'font-awesome/css/font-awesome.min.css'
Vue.use(require('vue-wechat-title'))
// 阻止启动生产消息
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(mobile)
}).$mount('#mobile')
