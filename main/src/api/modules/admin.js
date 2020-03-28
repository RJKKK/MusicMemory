import {get,post} from '@/utils'
export default {
    getDate(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year+'年'+month+'月'+day+'日 '+hour+':'+minute+':'+second;
    },//生成实时时间

    async loginAdmin(ID,pwd){
        let res = await post('/admin/login', {"account":ID, "pwd":pwd})
        return res.data
    },
    async getClients(pageSize,index){
       let res = await post('/admin/getClients',{pageSize:pageSize,index:index})
        return res.data
    },
    async addclient(formObj){
        let res = await post('/admin/addClient',formObj)
        return res.data
    },
    async delclient(formObj){
        let res = await post('/admin/delClient',formObj)
        return  res.data
    },
}
