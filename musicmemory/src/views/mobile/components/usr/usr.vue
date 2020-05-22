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
                    :src="getLogo"
                    round
                    @click="zoomImg"
            />
        </router-link>
        <div class="usr_info">
            <router-link class="usr_names" tag="div" to="">
                <p>{{getUserDetails.name}}</p>
                <p>账号：{{getUserDetails.account}}</p>
            </router-link>
            <div class="usr_days"  @click="showPopup">
                <span class="fa fa-calendar"> &nbsp;&nbsp;打卡</span>
                <span>&nbsp;&nbsp;{{getClockInCount}}&nbsp;&nbsp;</span>
                <span>天</span>
            </div>
        </div>
    </div>
    <div class="usr_meunItem">
        <van-cell-group>
            <van-cell title="编辑个人资料" value="" label=" " :to="{path:'/main/editInfo',query:{...getUserDetails}}"  size="large" is-link />
            <van-cell title="学习情况" is-link  :to="{path:'/main/showData',query:{...getUserDetails}}" size="large" />
            <van-cell title="联系作者" value="" label=" " size="large"/>
            <van-cell title="退出登录" value="" label=" " @click="logOut" size="large"/>
        </van-cell-group>
    </div>
    <van-popup v-model="popupShow">
        <clock-in-calendar :dateArr="getDateArr" selColor="green"></clock-in-calendar>
    </van-popup>
</div>
</template>

<script>
    import Vue from 'vue';
    import { Image } from 'vant';
    import myNavBar from '@/views/mobile/components/common/NavBar';
    import clockInCalendar from "@/views/mobile/components/common/clockInCalendar";
    import { ImagePreview } from 'vant';
    import { Cell, CellGroup } from 'vant';
    import {user} from '@/api'
    import {userDetails} from '@/Cookies'
    import {fileBaseUrl} from "@/config";
    import { Popup } from 'vant';

    Vue.use(Popup);
    Vue.use(Cell);
    Vue.use(CellGroup);
    Vue.use(Image);
    export default {
        name: "usr",
        data() {
            return {
                editShow:false,
                popupShow:false,
                username: '',
                text: '',
                clockInData:[]
            };
        },
        created(){

        },
        components:{
            myNavBar,clockInCalendar
        },
        methods:{
            async logOut(){
                this.$dialog.confirm({
                    title: '提示',
                    message: '确定退出吗',
                }).then(()=>{
                         user.userLogOut().then((res)=>{
                            this.$router.go(0)
                         })
                    }).catch(() => {
                    });

            },
            async getClockIn(){
                let res = await user.getClockInDetails(this.getUserDetails.account)
                console.log(res)
                this.clockInData = res
            },
            zoomImg(e){
                ImagePreview({images:[e.target.src], closeAble: true,})
            },
            showPopup() {
                this.popupShow = true;
            },

        },
        computed:{
            getUserDetails(){
                return userDetails.get()
            },
            getLogo(){
                return fileBaseUrl+ this.getUserDetails.logoId
            },
            getDateArr(){
                return this.clockInData.map(val=>val.date)
            },
            getClockInCount(){
                return this.clockInData.length
            }
        },
         mounted() {
            this.getClockIn()
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
        /*min-height: 60vh;*/
        /*align-items: center;*/
        justify-content: space-between;

    }
}
</style>
