import axios from 'axios'
import {apiUrl} from "@/config";
import {fileUrl} from "@/config";

let instance = axios.create({
    baseURL:apiUrl,
    timeout:5000
})
let fileInstance = axios.create({
    baseURL:fileUrl,
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
    },
    fileGet(url,data){
        return fileInstance.get(url,{
            params:data
        })
    },
    filePost(url,data,dir='userLogo'){
        if(data instanceof File){
            let formData=new FormData();
            formData.append('file',data)
            formData.append('document',dir)
            return axios.post(fileUrl+url,formData)
        }
        else fileInstance.post(url,data)
    }
}
export default obj