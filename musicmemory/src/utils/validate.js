/**
 * 一些校验的方法
 */
const validate = {
    /* 合法uri*/
    validateURL(textval) {
        const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
        return urlregex.test(textval);
    }

    /* 小写字母*/
    ,
    validateLowerCase(str) {
        const reg = /^[a-z]+$/;
        return reg.test(str);
    },

    /* 大写字母*/
    validateUpperCase(str) {
        const reg = /^[A-Z]+$/;
        return reg.test(str);
    },

    /* 大小写字母*/
    validatAlphabets(str) {
        const reg = /^[A-Za-z]+$/;
        return reg.test(str);
    },

    /* 是否存在 */
    validateExist(str, value) {
        return str.indexOf(value) != -1;
    },

    // 是否是http:// 或 https:// 开头
    validateHttp(str) {
        if (typeof str != 'string') {
            return false;
        }
        const valid_map = ["http://", "https://"];
        for (var i in valid_map) {
            var isHave = (str.trim()).indexOf(valid_map[i]) >= 0;
            if (isHave) {
                return isHave;
            }
        }
        // 不是链接
        return false;
    },
    // 判断空
    validateNaN(str) {
        if (typeof str == 'string') {
            return str != null && str.trim() != "";
        } else if (str instanceof Array) {
            return str != null && str.length > 0;
        } else {
            return str != null;
        }
    },
    // 显示字符的地方空就显示-
    validateNaNreturnLine(str) {
        if (!this.validateNaN(str)) {
            return '-'
        } else {
            return str;
        }
    },
    // 判断这个路径是不是内部跳转的链接 是就返回split的url
    validateCheckWebSelf(url, origin = location.origin) {
        // 判断空
        if (!this.validateNaN(url)) {
            return false;
        }
        // 判断下标
        if (url.indexOf(origin) == 0) {
            return url.split(origin)[1];
        } else {
            return false;
        }
    },
    // 判断登录显示
    validateNeedLogin(needLogin = null, user = null) {
        //needLogin是登录无关 1是需要登录 2是登录前显示 登录后不显示
        if (needLogin === 1) {
            return user != null
        } else if (needLogin === 2) {
            return user == null;
        }
        return true;
    },
}
export default validate;