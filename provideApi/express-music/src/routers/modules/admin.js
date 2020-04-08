const DAO = require('../../database');
const myfunctions = require('../../commonFunction');
const express = require('express');
const path = require('path')
var fs = require('fs');
import Joi from 'joi';
require('joi-router');
import dataSource from '../../config/baseUrl';
const admin = new DAO(dataSource.dev,'MusicMemory','admin');
const clients = new DAO(dataSource.dev,'MusicMemory','clients');
// let fs_mkdir = thunkify(fs.mkdir)
// import {admin} from '../../api'
let router = express.Router();
//管理员登录接口
router.post('/admin/login', {
    body:{
        account:Joi.string().required(),
        password:Joi.string().required(),
    }
    }, async function(req,res){
    let arr = await admin.query({account:req.body.account,password:req.body.pwd})
        if(arr[0]){
            let user = {'username':req.body.account};
            req.session.admin = user;
            res.json({msg:0,data:'ok'})
        }
    // admin.adminLogin(req,res);
});
//管理系统获取用户数据接口
router.post('/admin/getClients',{
    body:{
        session:{
            admin:Joi.string().required(),
        },
        index:Joi.number().integer().min(1).default(1),
        pageSize:Joi.number().integer().default(10)
    }
}, async (req,res)=>{
    let arr = await clients.query({},{_id:0},pageSize,(index-1)*pageSize)
    res.json({data:arr})
    // admin.getUsrList(req,res);
});
//管理系统增添用户接口
router.post('/admin/addClient',{
    body:{
        session:{
            admin:Joi.string().required(),
        },
        account:Joi.string().required(),
        password:Joi.string().required(),
        email:Joi.string().required(),
        name:Joi.string(),
    }
},async(req,res)=>{
    let result0 = await clients.query({$or:[{account:req.body.account},{email:req.body.email}]});
    if(!result0[0]) {
        let name = req.body.name || "用户昵称未设置";
        let date = myfunctions.getDate();
        let result = await clients.insert({
            account: req.body.account,
            password: req.body.password,
            name: name,
            email: req.body.email,
            Date: date,
            // logoUrl:logoUrl
        });
        if (result){
            res.send('ok')
        }else{
            res.send('fail');
        }
    }
    else{
        res.json({msg:'用户名已存在'})
    }
    // admin.addclient(req,res);
});
//管理系统删除用户接口
router.post('/admin/delclient',{
    body:{
        session:{
            admin:Joi.string().required(),
        },
        account:Joi.string().required(),
    }},async(req,res)=>{
    let result = await clients.delete({account:req.body.account});
    if(!result) res.send('fail');
    else res.send('ok');
    // admin.delclient(req,res)
})
//修改用户数据接口
router.post('/admin/updateclient',{
    body:{
        session:{
            admin:Joi.string().required(),
        },
        account:Joi.string().required(),
    }
},async (req,res)=>{
    // admin.updateclient(req,res)
    let result = await clients.update({account:req.body.account},req.body)
    if(!result) res.send('fail');
    else res.send('ok');
})
module.exports = router