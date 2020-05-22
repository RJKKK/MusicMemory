const express = require('express');
const { validate, ValidationError, Joi } = require('express-validation');
({admin,articles,musicScores} = require('../../api'));
let router = express.Router();
/***************用户管理******************/

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

/***************文章管理******************/

router.get('/admin/getArticlesList',validate({
    query:Joi.object({
        pageSize:Joi.number().min(5),
        index:Joi.number().min(1),
    })
},{},{}),(req,res)=>{
    articles.getArticlesList(req,res)
})
router.get('/admin/getArticleById',validate({
    query:Joi.object({
        _id:Joi.string().required(),
    })
},{},{}),(req,res)=>{
    articles.getArticleById(req,res)
})
router.post('/admin/saveArticle',validate({
    body:Joi.object({
        content:Joi.string().required(),
        title:Joi.string().required(),
        author:Joi.string().required(),
        time:Joi.string().required()
    })
},{},{}),(req,res)=>{
    articles.saveArticle(req,res)
})
router.post('/admin/delArticleById',validate({
    body:Joi.object({
        _id:Joi.string().required(),
    })
},{},{}),(req,res)=>{
    articles.delArticleById(req,res)
})

/***************乐谱管理******************/

router.get('/admin/getMusicScoresList',validate({
    query:Joi.object({
        pageSize:Joi.number().min(5),
        index:Joi.number().min(1),
    })
},{},{}),(req,res)=>{
    musicScores.getMusicScoresList(req,res)
})
router.get('/admin/getMusicScoreById',validate({
    query:Joi.object({
        _id:Joi.string().required(),
    })
},{},{}),(req,res)=>{
    musicScores.getMusicScoreById(req,res)
})
router.post('/admin/saveMusicScore',validate({
    body:Joi.object({
        content:Joi.string().required(),
        title:Joi.string().required(),
        author:Joi.string().required(),
        time:Joi.string().required(),
        uploader:Joi.string().required()
    })
},{},{}),(req,res)=>{
    musicScores.saveMusicScore(req,res)
})
router.post('/admin/delMusicScoreById',validate({
    body:Joi.object({
        _id:Joi.string().required(),
    })
},{},{}),(req,res)=>{
    musicScores.delMusicScoreById(req,res)
})

module.exports = router