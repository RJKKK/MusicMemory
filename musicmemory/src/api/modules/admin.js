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
    /****************用户管理*******************/
    //管理员登录
    async loginAdmin(ID,pwd){
        let res = await post('/admin/login', {"account":ID, "password":pwd})
        return res.data
    },
    //获取所有普通用户的数据
    async getClients(pageSize,index){
       let res = await post('/admin/getClients',{pageSize:pageSize,index:index})
        return res.data
    },
    //添加一个普通用户
    async addclient(formObj){
        let res = await post('/admin/addClient',formObj)
        return res.data
    },
    //删除一个普通用户
    async delclient(formObj){
        let res = await post('/admin/delClient',formObj)
        return  res.data
    },
    //编辑一个普通用户的数据
    // @params account
    async editclient(formObj){
        let res = await post('/admin/updateclient',formObj)
        return  res.data
    },

    /****************文章管理*******************/
    async getArticlesList(pageSize,index){
        let res = await get('/admin/getArticlesList',{pageSize:pageSize,index:index})
        return res.data
    },
    async getArticleById(_id){
        let res = await get('/admin/getArticleById',{_id})
        return res.data
    },
    async saveArticle(formObj){
        let res = await post('/admin/saveArticle',formObj)
        return res.data
    },
    async delArticleById(_id){
        let res = await post('/admin/delArticleById',{_id})
        return res.data
    },

    /**********************乐谱管理*********************/

    async getMusicScoresList(pageSize,index){
        let res = await get('/admin/getMusicScoresList',{pageSize:pageSize,index:index})
        return res.data
    },
    async getMusicScoreById(_id){
        let res = await get('/admin/getMusicScoreById',{_id})
        return res.data
    },
    async saveMusicScore(formObj){
        let res = await post('/admin/saveMusicScore',formObj)
        return res.data
    },
    async delMusicScoreById(_id){
        let res = await post('/admin/delMusicScoreById',{_id})
        return res.data
    },
}
