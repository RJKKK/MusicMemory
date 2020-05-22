import LocalStorage from 'localstorage'
import {pitchInterval} from '@/data'
import {pitchIntervalTotal} from '@/data'
import {user} from '@/api'
let pitchIntervalDetails = {
    get(account){
        let zone =  new LocalStorage(account)
        let [err,val] = zone.get('trainingInterval')
        if(err!==null){
            zone.put('trainingInterval',{pitchInterval,done:false})
            return {pitchInterval,done:false}
        }
         else return val['pitchInterval'][0]?val:{pitchInterval,done:true}
},
    set(account,obj,done){
        let zone =  new LocalStorage(account)
        return zone.put('trainingInterval',{pitchInterval:obj||pitchInterval,done:done||false})
    },
    del(account){
        let zone =  new LocalStorage(account)
        zone.del('trainingInterval')
    },
    async getTotal(account){
        let zone =  new LocalStorage(account)
        let [err,val] = zone.get('trainingIntervalTotal')
        let result = [];
        if(err!==null){
            let arr = await user.getPitchInterval(account)
            if(!arr.data[0]){
                zone.put('trainingIntervalTotal',pitchIntervalTotal)
                result = pitchIntervalTotal
            }
            else {
                zone.put('trainingIntervalTotal',arr.data)
                result = arr.data
            }
            return result
        }
        else return val
    },
    seTotal(account,obj){
        let zone =  new LocalStorage(account)
        return zone.put('trainingIntervalTotal',obj||pitchIntervalTotal)
    },
    delTotal(account){
        let zone =  new LocalStorage(account)
        zone.del('trainingIntervalTotal')
    },

}
export default pitchIntervalDetails