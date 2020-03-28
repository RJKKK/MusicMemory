const DAO = require('../../database');
const user = new DAO('mongodb://localhost:27017/','MusicMemory','clients');
function testUserStatus(req){
    if (req.session.user) return true;
    else return false;
}
module.exports = {
    async userLogin(req, res) {
        console.log(req.body)
        if (!req.body || !req.body.account) return res.sendStatus(400);
        user.query({account: req.body.account, password: req.body.password}).then((arr => {
            if (arr[0]) {
                var user = {'username': req.body.account};
                req.session.user = user;
                return testUserStatus(req) ? res.send({result: 'success'}) : res.send({result: 'fail'})
            } else {
                res.send({result: 'fail'})
            }
        }))
    },
    async userLogout(req, res) {
        // 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
        // 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
        // 然后去查找对应的 session 文件，报错
        // session-file-store 本身的bug
        req.session.destroy(function (err) {
            if (err) {
                res.json({ret_code: 2, ret_msg: '退出登录失败'});
                return;
            }
            // req.session.loginUser = null;
            res.clearCookie(connect.sid);
            res.redirect('/');
        })
    }
}