import LocalStorage from 'localstorage'
import {pitchInterval} from '@/data'
import {pitchIntervalTotal} from '@/data'
let pitchIntervalDetails = {
    get(account){
        let zone =  new LocalStorage(account)
        let [err,val] = zone.get('trainingInterval')
        if(err!==null){
            zone.put('trainingInterval',pitchInterval)
            return pitchInterval
        }
         else return val
},
    set(account,obj){
        let zone =  new LocalStorage(account)
        return zone.put('trainingInterval',obj||pitchInterval)
    },
    del(account){
        let zone =  new LocalStorage(account)
        zone.del('trainingInterval')
    },
    getTotal(account){
        let zone =  new LocalStorage(account)
        let [err,val] = zone.get('trainingIntervalTotal')
        if(err!==null){
            zone.put('trainingIntervalTotal',pitchIntervalTotal)
            return pitchIntervalTotal
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