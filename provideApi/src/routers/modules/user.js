const express = require('_express@4.16.4@express');
({user} = require('../../api'))
let router = express.Router();
//用户登录接口
router.post('/user/login',(req,res)=>{
    user.userLogin(req,res);
});
//用户退出接口
router.post('/user/logOut',(req,res)=>{
    user.userlogout(req,res);
})
module.exports=router