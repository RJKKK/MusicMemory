import {userDetails,comparePitch,articles} from '@/Cookies'
import {pitchIntervalDetails} from '@/localStorage'
const account = userDetails.get().account
let obj = {
    test(){
        let msg = {}
        if (comparePitch.get(account)&&comparePitch.get(account).done===true)
            msg["音高判别"] = 'done'
        if (pitchIntervalDetails.get(account)&&pitchIntervalDetails.get(account).done===true)
            msg["音程练习"] = 'done'
        if (articles.get(account)&&articles.get(account).done===true)
            msg["阅读文章"] = 'done'
        if(JSON.stringify(msg) == "{}")
            msg=undefined
        return msg
    }
}
export default obj