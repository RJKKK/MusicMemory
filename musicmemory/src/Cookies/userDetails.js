import cookies from 'js-cookie'
import cookiesFunctions from './commonFunctions'
import {pitchIntervalDetails} from '@/localStorage'
let userDetails = {
   get(account=''){
        let userList = cookies.getJSON('userDetail')||[]
          return userList.find((val)=>val.account===account)||userList[0]
},
 async set(obj,time){
     let userList = cookies.getJSON('userDetail')||[]
    if(!userList.find((val)=>val.account===obj.account)){
        pitchIntervalDetails.del(obj.account)
        userList.unshift(obj);
     }

       else  userList.forEach((val,index)=>{
             if(val.account===obj.account){
                 userList.splice(index, 1);
                 userList.unshift(obj);
                 return true
             }
         })
    return cookies.set('userDetail',userList,time||cookiesFunctions.getTimeAtDay())
},
    isCleanLocalStorage(account){
        let userList = cookies.getJSON('userDetail')||[]
        if(!userList.find((val)=>val.account===account)){
            pitchIntervalDetails.del(account)
            return true
        }
        else return false
    }
}
export default userDetails