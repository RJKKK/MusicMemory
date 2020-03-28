const express = require('_express@4.16.4@express');
({admin} = require('../../api'))
let router = express.Router();
//管理员登录接口
router.post('/admin/login',(req,res)=>{
    admin.adminLogin(req,res);
})
//管理系统获取用户数据接口
router.post('/admin/getClients',(req,res)=>{
    admin.getUsrList(req,res);
});
//管理系统增添用户接口
router.post('/admin/addClient',(req,res)=>{
    admin.addclient(req,res);
})
//管理系统删除用户接口
router.post('/admin/delclient',(req,res)=>{
    admin.delclient(req,res)
})
//修改用户数据接口
router.post('/admin/updateclient',(req,res)=>{
    admin.updateclient(req,res)
})
module.exports = router