import cookies from 'js-cookie'
import cookiesFunctions from './commonFunctions'
import {pitchInterval} from '@/data'
let pitchIntervalDetails = {
    get(){
        if (cookies.get('trainingInterval')){
            return JSON.parse(cookies.get('trainingInterval'))
        }
        else {
            cookies.set('trainingInterval',pitchInterval)
            return JSON.parse(cookies.get('trainingInterval'))
        }

},
 set(obj,time){
    return cookies.set('trainingInterval',obj,time||cookiesFunctions.getTimeAtDay())
}}
export default pitchIntervalDetails