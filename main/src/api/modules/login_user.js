import {get,post} from '@/utils'
export default {
    async userLogin(from){
        let result = await post('/user/login',{...from})
        return result
    },
    async userLogOut(account){
        let result = await get('/user/logOut',account)
        return result
    }
}
