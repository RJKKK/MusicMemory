const express = require('express');
const { validate, ValidationError, Joi } = require('express-validation');
({admin} = require('../../api'));
let router = express.Router();
//管理员登录接口
router.post('/admin/login',function(req,res){
    admin.adminLogin(req,res);
})
//管理系统获取用户数据接口
router.post('/admin/getClients',validate({
    body:Joi.object({
        pageSize:Joi.number().min(5),
        index:Joi.number().min(1),
        // session: Joi.string().required()
    })
},{},{}),function(req,res){
    admin.getUsrList(req,res);
});
//管理系统增添用户接口
router.post('/admin/addClient',function(req,res){
    admin.addclient(req,res);
})
//管理系统删除用户接口
router.post('/admin/delclient',validate({
    body:Joi.object({
        account:Joi.string().required(),
    })
},{},{}),function(req,res){
    admin.delclient(req,res)
})
//修改用户数据接口
router.post('/admin/updateclient',validate({
    body:Joi.object({
        account:Joi.string().required(),
        name:Joi.string(),
        password:Joi.string(),
        email:Joi.string(),
        logoId:Joi.string()
    })
},{},{}),function(req,res){
    admin.updateclient(req,res)
})
module.exports = router