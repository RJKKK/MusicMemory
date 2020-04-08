/**
 * 关于登录和推出登录的一些方法
 * **/
var loginUtil = {
    // 去登录
    login: function (vue) {
        vue.$router.push('toLogin')
    },
    // 从oauth2获取用户的信息
    getUserInfo(vue, callback, error) {
        $.ajax({
            type: 'get',
            url: vue.$oauth2.user_info_url,
            data: {
                access_token: vue.$token.loadToken().access_token
            },
            dataType: 'json',
            success: function (res) {
                vue.$user.setUser(vue, res)
                vue.$store.commit('SET_USER', res)
                //请求两次
                vue.$session.setSession(vue, res.name);
                vue.$session.setSession(vue, res.name, callback, error);
            },
            error: () => {
                // 日志添加
                vue.$session.setSession(vue, "errorSession");
                vue.$user.removeUser(vue)
                //清除local的token
                vue.$token.deleteToken()
                // 清除后台session
                vue.$session.removeSession(vue)
                vue.$router.push('/')
            }
        })
    },
    // 退出
    logout: function (vue) {
        vue.$msgbox.confirm('是否退出?', '', {
            distinguishCancelAndClose: true,
            confirmButtonText: '是的',
            cancelButtonText: '再看看'
        })
            .then(() => {
                //跳转退出路由
                vue.$router.push('toLoginOut')
            })
            .catch(e => {
                console.log(e)
            })
    },
    // 检查登录是否有效，oauth2检查
    checkLogin: function (vue) {
        var tokenInfo = vue.$token.loadToken()
        return !!tokenInfo.access_token;
    },
    // 当之前的token过期时刷新token登录
    refreshLogin() {
        //公司oauth2还未做过这个操作 后面再加
    }
}

export default loginUtil