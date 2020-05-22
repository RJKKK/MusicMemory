({DAO} = require('../../database'));
var ObjectID = require('mongodb').ObjectID;
const article = new DAO('mongodb://localhost:27017/','MusicMemory','articles');
const url = require('url')
module.exports = {
    async getArticlesList(req, res) {
        let params = url.parse(req.url, true).query;
        let index = Number(params.index);
        let pageSize = Number(params.pageSize);
        let arr = await article.query({}, {content: 0}, pageSize, (index - 1) * pageSize)
        res.json(arr)
    },
    async getArticleById(req, res) {
        let params = url.parse(req.url, true).query;
        let arr = await article.query({_id:ObjectID(params._id)})
        res.json(arr)
    },
    async saveArticle(req, res) {
        let result = await article.update({title: req.body.title,author:req.body.author}, req.body, true)
        if (result) res.json('ok')
        else res.json('DataBase error!')
    },
    async delArticleById(req,res){
        let result = await article.delete({_id:ObjectID(req.body._id)})
        if (result) res.json('ok')
        else res.json('DataBase error!')
    }
}