({DAO} = require('../../database'));
const clockIn = new DAO('mongodb://localhost:27017/','MusicMemory','clockIn');
const url = require('url')
module.exports = {
    //获取用户在表内的所有打卡记录
    async getClockInDetails(req,res){
        let params = url.parse(req.url, true).query;
        let arr = await clockIn.query({account:params.account},{})
        res.json(arr)
},
    //通过用户名和日期进行打卡
    async clockInByAccount(req,res){
        let query = await clockIn.query({account:req.body.account,date:req.body.date})
        if(query[0]) return res.json({msg:1,text:'have done!'});
        let result = await clockIn.insert({...req.body})
        res.json({msg:0,text:'done'})
    }
}