import Vue from 'vue'
import mobile from './mobile.vue';
import router from './router';
import store from "../../store";
import 'assets/css/normalize.css'
import 'assets/css/common.css'
import 'vant/lib/index.css';
import { Dialog } from 'vant';
import 'font-awesome/css/font-awesome.min.css'
Vue.use(Dialog);
Vue.use(require('vue-wechat-title'))
Vue.prototype.$dialog = Dialog
// 阻止启动生产消息
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(mobile)
}).$mount('#mobile')
