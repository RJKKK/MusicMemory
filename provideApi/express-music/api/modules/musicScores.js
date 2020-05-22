({DAO} = require('../../database'));
const musicScores = new DAO('mongodb://localhost:27017/','MusicMemory','musicScores');
const url = require('url');
var ObjectID = require('mongodb').ObjectID;
module.exports = {
    async getMusicScoresList(req, res) {
        let params = url.parse(req.url, true).query;
        let index = Number(parse.index);
        let pageSize = Number(parse.pageSize);
        let arr = await musicScores.query({}, {content: 0}, pageSize, (index - 1) * pageSize)
        res.json(arr)
    },
    async getMusicScoreById(req, res) {
        let params = url.parse(req.url, true).query;
        let arr = await musicScores.query({_id:ObjectID(params._id)})
        res.json(arr)
    },
    async saveMusicScore(req, res) {
        let result = await musicScores.update({title: req.body.title}, req.body, true)
        if (result) res.json('ok')
        else res.json('DataBase error!')
    },
    async delMusicScoreById(req,res){
        let result = await musicScores.delete({_id:ObjectID(req.body._id)})
        if (result) res.json('ok')
        else res.json('DataBase error!')
    }
}