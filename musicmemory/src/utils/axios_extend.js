import axios from 'axios'
let instance = axios.create({
    baseURL:'/api',
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