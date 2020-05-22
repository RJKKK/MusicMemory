const express = require('express');
const { validate, ValidationError, Joi } = require('express-validation');
({user} = require('../../api'));
({clockIn} = require('../../api'));
let router = express.Router();
//用户登录接口
router.post('/user/login',validate({
    body:Joi.object({
        account:Joi.string().required(),
        password:Joi.string().required(),
    })
},{},{}),(req,res)=>{

    user.userLogin(req,res);
});
//检测是否登录
router.get('/user/isLogin',(req,res)=>{
    user.isLogin(req,res);
})
//用户退出接口
router.get('/user/logOut',(req,res)=>{
    user.userlogout(req,res);
})
//用户获取音程练习信息接口
router.get('/user/getPitchInterval',validate({
    query:Joi.object({
        account: Joi.string().required()
    })
},{},{}),(req,res)=>{
    user.getUserPitchInterval(req,res)
})
//用户修改音程信息接口
router.post('/user/setPitchInterval',validate({
    body:Joi.object({
        account: Joi.string().required(),
        pitchInterval:Joi.required(),
    })
},{},{}),(req,res)=>{
    user.setUserPitchInterval(req,res)
})
//用户获取打卡信息
router.get('/user/getClockInDetails',validate({
    query:Joi.object({
        account: Joi.string().required()
    })
}),(req,res)=>{
    clockIn.getClockInDetails(req,res)
})
router.post('/user/clockIn',validate({
    body:Joi.object({
        account: Joi.string().required(),
        date:Joi.string().required(),
        comparePitch:Joi.object(),
        articles:Joi.object()
    })
}),(req,res)=>{
    clockIn.clockInByAccount(req,res)
})

module.exports=router