<template>
    <div id="mobile">
        <router-view />
        <keep-alive>
            <van-tabbar route v-model="active" active-color="#4b4b4b" v-show="showtabbar"
                        inactive-color="#A1A1A1" id="nav">
                <van-tabbar-item
                        replace
                        to="/main/home"
                        icon="wap-home"
                >
                    主页
                </van-tabbar-item>
                <van-tabbar-item
                        replace
                        to="/main/musicBox"
                        icon="audio"
                >
                    音乐盒
                </van-tabbar-item>
                <van-tabbar-item
                        replace
                        to="/main/voiceTest"
                        icon="music"
                >
                    测试音高
                </van-tabbar-item>
                <van-tabbar-item
                        replace
                        to="/main/usr"
                        icon="manager"
                >
                    个人中心
                </van-tabbar-item>
            </van-tabbar>
        </keep-alive>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Tabbar, TabbarItem } from 'vant';
    Vue.use(Tabbar).use(TabbarItem);

    export default {
        name: "mobile",
        data() {
            return {
                active: 0,
                showtabbar:false,
                icon: {
                    normal: '//img.yzcdn.cn/icon-normal.png',
                    active: '//img.yzcdn.cn/icon-active.png'
                }
            }
        },
        mounted() {
            this.showtabbar=true
        }

    }
</script>

<style >
    ul,li,dd,dt,div,a,s,span,ol,h5,h3,p {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin:0;
        padding: 0;
        box-sizing: border-box;
    }

    #nav{
        border-top: 1px solid #D5D5D5;
    }
</style>
