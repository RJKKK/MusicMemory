import Vue from 'vue'
import VueRouter from 'vue-router'
import {userDetails} from '@/Cookies'
Vue.use(VueRouter)
import {user} from '@/api'
const routes = [
    { path: '/',redirect:'main'},
    { path:'/register',component:()=>import ('./mobile_register')},
    { path:'/login',component:()=>import ('./mobile_login')},
    { path:'/main',component:()=>import('./mobile_main.vue'),children:[
            { path: '/',redirect:'home'},
            { path: 'home', component: ()=>import('./components/home/home.vue'),},
            { path: 'panel', component: ()=>import('./components/home/course/clockInPanel.vue'),},
            { path: 'musicBox', component: ()=>import('./components/musicBox/musicBox.vue')},
            { path: 'usr', component: ()=>import('./components/usr/usr.vue')},
            { path: 'showData', component: ()=>import('./components/usr/showData.vue')},
            { path: 'editInfo', component: ()=>import('./components/usr/editInfo.vue')},
            { path:'voiceTest',component:()=>import('./components/voiceTest/voiceTest.vue')},
            //在此添加课程路由
            { path:'training',props:true, component:()=>import('./components/home/course/container'),
                children:[{path:'0',component:()=>import('./components/home/course/musicInterval/musicInterval.vue')},
                          {path:'1',component:()=>import('./components/home/course/comparePitch/comparePitch.vue')},
                          {path:'2',component:()=>import('./components/home/course/articlesRead/articlesRead.vue')},
                ]
            },
        ]},

]
var router = new VueRouter({
    routes: routes,
    // mode: 'history'
})
router.beforeEach( async (to,from,next)=>{
    if((/main/).test(to.path)===true) {
        let result = await user.isLogin()
        if(result.data.msg!==0||!userDetails.get()){
            next({path:'/login'})
        }

        else next()
    }
    else next()
})


export default router
