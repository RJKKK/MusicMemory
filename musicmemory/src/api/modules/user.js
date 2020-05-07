import {get,post} from '@/utils'
import {userDetails} from '@/Cookies'
export default {
    async userLogin(from){
        let res = await post('/user/login',{...from})
        if(res.data.result==='ok') {
            userDetails.set(res.data.msg)
            // cookies.set('userDetail',res.data.msg,{expires: 1000*60})
            // console.log(JSON.parse(cookies.get('userDetail')))
        }
        return res
    },
    async userLogOut(){
        let result = await get('/user/logOut',{})
        return result
    },
    async isLogin(){
        let result = await get('/user/isLogin',{})
        return result
    },
    async getPitchInterval(account) {
        let result= await get('/user/getPitchInterval',{
            account
        })
        return result
    }
}
