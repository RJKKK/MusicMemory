import cookies from 'js-cookie'
import cookiesFunctions from './commonFunctions'
let articlesRead = {
    get(account){
        return cookies.get(`articlesRead|${account}`)?cookies.getJSON(`articlesRead|${account}`):undefined
    },
    set(obj,time){
        return cookies.set(`articlesRead|${obj.account}`,obj,time||cookiesFunctions.getTimeAtDay())
    }}
export default articlesRead