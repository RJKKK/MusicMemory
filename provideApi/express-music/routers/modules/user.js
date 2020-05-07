const express = require('express');
const { validate, ValidationError, Joi } = require('express-validation');
({user} = require('../../api'))
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
router.get('/user/getPitchInterval',validate({
    query:Joi.object({
        account: Joi.string().required()
    })
},{},{}),(req,res)=>{
    user.userPitchInterval(req,res)
})
module.exports=router