import Vue from 'vue'
import VueRouter from 'vue-router'
import handler from '../../api/modules/admin.js'
Vue.use(VueRouter)

const routes = [
    { path: '/', redirect:'main' },
    {path:'/login',component:()=> import('./login/login.vue') },
    {path:'/main',component:()=>import('./Manage.vue'),children:[
            { path: 'usr', name:'usr', component: () => import('./chargeUsr/users.vue'), meta: { title: 'console 登录' }},
            { path: 'articles',  },
            { path: 'course', },
        ]},


]

var Router = new VueRouter({
    routes: routes,
    mode:'hash'
});
// Router.beforeEach((to,from,next)=>{
//     handler.isAdminLogin((res)=>{
//         if(!res){
//             if(to.path!=='/login') return next('/login')
//                 }
//         next();
//     })
// })
export default Router;
