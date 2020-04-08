import {get,post} from '@/utils'
import store from '@/store'
export default {
    async userLogin(from){
        let res = await post('/user/login',{...from})
        if(res.data.result==='ok')
            store.commit('SET_USER',res.data.msg)
        return res
    },
    async userLogOut(){
        let result = await get('/user/logOut',{})

        return result
    },
    async isLogin(){
        let result = await get('/user/isLogin',{})
        console.log(store.getters.user)
        return result
    }
}
