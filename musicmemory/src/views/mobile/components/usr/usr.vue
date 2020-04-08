<template>
<div id="usr">
<!--    路由加载-->
    <my-nav-bar myTitle="我的主页"></my-nav-bar>
<!--    数据加载-->
    <div id="usr_zone">
        <router-link to="" tag="div" class="usr_logo">
            <van-image
                    width="75"
                    height="75"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                    round
            />
        </router-link>
        <div class="usr_info">
            <router-link class="usr_names" tag="div" to="">
                <p>beating</p>
                <p>ID:114514</p>
            </router-link>
            <div class="usr_days">
                <span class="fa fa-calendar"> &nbsp;&nbsp;打卡</span>
                <span>&nbsp;&nbsp;353&nbsp;&nbsp;</span>
                <span>天</span>
            </div>
        </div>
    </div>
    <div class="usr_meunItem">
        <van-cell-group>
            <van-cell title="学习情况" value="" label=" " size="large"/>
            <van-cell title="联系作者" value="" label=" " size="large"/>
            <van-cell title="退出登录" value="" label=" " @click="logOut" size="large"/>
        </van-cell-group>
    </div>
</div>
</template>

<script>
    import Vue from 'vue';
    import { Image } from 'vant';
    import myNavBar from '@/views/mobile/components/common/NavBar';
    import { Cell, CellGroup } from 'vant';
    import {user} from '@/api'
    Vue.use(Cell);
    Vue.use(CellGroup);
    Vue.use(Image);
    export default {
        name: "usr",
        components:{
            myNavBar
        },
        methods:{
            async logOut(){
                let res=  await user.userLogOut()
                console.log(res)
            }
        }
    }
</script>

<style scoped lang="less">
#usr{
    .van-nav-bar__title{
        font-size: 14px;
        color: black;
    }
    #usr_zone{
        height: 20vh;
        display: flex;
        >.usr_logo{
            flex: 3;
            >.van-image{
                left: 50%;
                top:50%;
                transform: translate(-45%,-50%);
            }
        }
        >.usr_info{
            flex: 7;
            display: flex;
            flex-direction: column;
            .usr_names{
                position: relative;
                display: flex;
                flex: 6;
                flex-direction: column;
                padding-right: 1rem;
                overflow: hidden;
                >p{
                    flex: 1;
                }
                >p:nth-of-type(1){
                    padding-top: 1.8rem;
                    font-size: 1rem;
                    font-weight: 600;
                }
                >p:nth-of-type(2){
                    padding-top: 0.1rem;
                    color: #AAAAAA;
                    font-size: 0.5rem;
                    border-bottom:#EFEFEF 1px solid;
                }
            }
            /*.usr_names:after{*/
            /*    display: block;*/
            /*    content: '>';*/
            /*    position: absolute;*/
            /*    right: 1.5rem;*/
            /*    top:50%;*/
            /*    color: #AAAAAA;*/
            /*}*/
            .usr_days{
                padding-right: 1rem;
                overflow: hidden;
                flex: 4;
                >span{
                    padding-top:1rem;
                    font-size: .8rem;
                    text-decoration: underline;
                    color: #5A5A5A;
                }
                >span:nth-of-type(1){

                }
                >span:nth-of-type(2){
                    color: #42b983;
                }
                >span:nth-of-type(3){

                }
            }
        }

    }
    .usr_meunItem{
        margin-top: 4vh;
        display: flex;
        flex-direction: column;
        min-height: 60vh;
        /*align-items: center;*/
        justify-content: space-between;

    }
}
</style>
