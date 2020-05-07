import axios from 'axios'
import {apiUrl} from "@/config";
let instance = axios.create({
    baseURL:apiUrl,
    timeout:5000
})
let obj = {
    get(url,data){
        return instance.get(url,{
            params:data
        })
    },
    post(url,data){
        return instance.post(url,data)
    }
}
export default obj