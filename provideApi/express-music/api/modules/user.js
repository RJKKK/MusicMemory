({DAO} = require('../../database'));
const user = new DAO('mongodb://localhost:27017/','MusicMemory','clients');
module.exports = {
    async userLogin(req, res) {
        user.query({account: req.body.account, password: req.body.password}).then((arr => {
            console.log(arr)
            if (arr[0]) {
                var user = {account:arr[0]['account'],
                            name:arr[0]['name'],
                            logoId:arr[0]['logoId'],
                            email:arr[0]['email'],
                };
                req.session.user = user;
                res.send({result: 'ok',msg:user})
            } else {
                res.send({result: 'fail',msg:'用户名或密码错误'})
            }
        }))
    },
    async userlogout(req, res) {
        // 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
        // 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
        // 然后去查找对应的 session 文件，报错
        // session-file-store 本身的bug
        req.session.destroy(function (err) {
            if (err) {
                res.json({ret_code: 2, ret_msg: '退出登录失败'});
                return;
            }
            // if(req.session.user)
            //     req.session.user = null;
            res.clearCookie('myname');
            res.json({msg:'logOut Successfully',code:0})
        })
    },
    async isLogin(req,res){
        if (!req.session.user||req.session.user===null)res.send('fail')
        else res.send('ok')
    }
}