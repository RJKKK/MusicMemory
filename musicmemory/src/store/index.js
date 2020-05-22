import Vue from "vue";
import Vuex from "vuex";
import user from './modules/user'
import details from './modules/details'
import getters from './getters'
Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        user,details
    },
    getters
});
export default store;