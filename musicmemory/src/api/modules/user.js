import {get,post} from '@/utils'
import {userDetails} from '@/Cookies'
import {pitchIntervalDetails} from '@/localStorage'
export default {
    async userLogin(from){
        let res = await post('/user/login',{...from})
        if(res.data.result==='ok') {
            userDetails.set(res.data.msg)
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
        pitchIntervalDetails.seTotal(account,result)
        return result
    },
    async setPitchInterval(account,obj) {
        let result= await post('/user/setPitchInterval',{
            account,
            pitchInterval:obj
        })
        return result
    },
    async getClockInDetails(account){
        let res = await get('/user/getClockInDetails',{
            account,
        })
        return res.data
    },
    async clockIn(obj){
        let res = await post('/user/clockIn',
            obj
        )
        return res.data
    }
}
