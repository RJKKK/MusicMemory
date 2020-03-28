const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    pages: {

        // 只有entry属性时，直接用字符串表示模块入口
        mobile: {
            entry: 'src/views/mobile/mobile.js',
            template: 'public/mobile.html',

            // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
            filename: 'mobile.html',

            // 标题，可选项，一般情况不使用，通常是在路由切换时设置title
            // 需要注意的是使用title属性template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            // title: 'mobile page',

            // 包含的模块，可选项
        },
        index: {
            entry:'src/views/main/main.js',
            template: 'public/index.html',
            filename: 'index.html',
        },
        PC: {
            // 应用入口配置，相当于单页面应用的main.js，必需项
            entry: 'src/views/Manage/Manage.js',

            // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
            template: 'public/Manage.html',

            // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
            filename: 'Manage.html',

        },
    },
    lintOnSave: true,
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('components',resolve('src/components'))
            .set('imgs',resolve('src/assets/imgs'))
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000', //对应自己的接口
                secure:false,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        port:8080
    }
}
