import cookies from 'js-cookie'
import cookiesFunctions from './commonFunctions'
let comparePitch = {
    get(account){
            return cookies.get(`comparePitch|${account}`)?cookies.getJSON(`comparePitch|${account}`):undefined
},
 set(obj,time){
    return cookies.set(`comparePitch|${obj.account}`,obj,time||cookiesFunctions.getTimeAtDay())
}}
export default comparePitch