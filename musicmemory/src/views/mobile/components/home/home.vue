<template>
    <div id="home">
        <div class="date_detail">
            <!--获取数据 -->
            <span>{{getClockInCount}}</span>
            <!--            -->
            &nbsp;&nbsp;<span>天</span>
            <router-link :to="{path:'/main/panel'}" tag="div">
            <span class="fa fa-calendar-o "></span>&nbsp;&nbsp;&nbsp;
                <span>打卡</span>&nbsp;&nbsp;
                <span>&gt;</span>
            </router-link>
        </div>
        <div class="course">
<!--           轮播图课程选择器 记得在此替换图片-->
            <van-swipe  indicator-color="white" :touchable="true"  tag="div" class="choose" @change="onChoose">
                <van-swipe-item >
                    <img src="@/assets/imgs/courseImg/音程练习.png" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img src="@/assets/imgs/courseImg/音高判别.png" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img src="@/assets/imgs/courseImg/音高判别.png" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="usr_learn_data">
            <div id="title">
                <p>- 学习情况 -</p>
            </div>
            <div class="detail" v-if="current===0">
                <div>
                    <p>{{getPitchIntervalDetailsData}}</p>
                    <p>今日已完成</p>
                </div>
                <div>
                    <p>25</p>
                    <p>今日目标训练量</p>
                </div>
            </div>
            <div class="detail" v-if="current===1">
                <div>
                    <p>{{getComparePitch&&getComparePitch.correct||0}}</p>
                    <p>今日已完成</p>
                </div>
                <div>
                    <p>{{getComparePitch&&getComparePitch.len||0}}</p>
                    <p>今日目标训练量</p>
                </div>
            </div>
            <div class="btn">
                <router-link :to="'/main/training?id='+current">
                <van-button color="linear-gradient(to right, #66CB95, #27D2AF)" round>开始学习</van-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Swipe, SwipeItem } from 'vant';
    import { Button } from 'vant';
    import {userDetails,comparePitch} from '@/Cookies'
    import {pitchIntervalDetails} from '@/localStorage'
    import {user} from '@/api'
    import { Popup } from 'vant';

    Vue.use(Popup);
    Vue.use(Button);
    Vue.use(Swipe).use(SwipeItem);
    export default {
        name: "home",
        mounted(){
            this.getClockIn()
        },
        data() {
            return {
                current: 0,
                popupShow:false,
                clockInData:[],

            }
        },
        methods: {
            onChoose(index) {
                this.current = index;
            },
            showPopup() {
                this.popupShow = true;
            },
            async getClockIn(){
                let res = await user.getClockInDetails(this.getUserDetails.account)
                console.log(res)
                this.clockInData = res
            },
        },

        computed:{
            getUserDetails(){
                return userDetails.get()
            },
            getDateArr(){
                return this.clockInData.map(val=>val.date)
            },
            getClockInCount(){
                return this.clockInData.length
            },
            getComparePitch(){
                return comparePitch.get(this.getUserDetails.account)
            },
            getPitchIntervalDetails(){
                return pitchIntervalDetails.get(this.getUserDetails.account)
            },
            getPitchIntervalDetailsData(){
                if(this.getPitchIntervalDetails.done===true)
                    return 25
                else return this.getPitchIntervalDetails['pitchInterval'].length?25-this.getPitchIntervalDetails['pitchInterval'].length:0
            }
        }
    }
</script>

<style scoped lang="less">
    @mainColor:#67D7A2;
.date_detail{
    box-sizing: content-box;
    padding: 1.5rem 1rem 1.5rem 1rem;
    height: 12vh;
    >span{
        font-size: 0.9rem;
        float: left;
        padding-top: 2.2rem;
}
    >span:nth-child(1){
        font-size: 3.5rem;
        font-weight: normal;
        padding-top: 0;
    }
    >div{
        float: right;
        font-size: 0.8rem;
        >span{
            padding-top: 2.5rem;
            color: #6B6B6B;
        }
        :nth-child(2){
            text-decoration: underline saddlebrown;
        }
        :nth-child(1){
            color:@mainColor;
        }
    }
}
.course{
    /*height: 14vh;*/
    padding: 0 1rem;
    /*background: #42b983;*/
    .choose{
        img{
            width: 100%;
            height: 100%;
            display: block;
            border-radius: 20px;
        }
    }
}
.usr_learn_data{
    padding: 0 1rem;
    height: 33vh;
    display: flex;
    flex-direction: column;
    >#title{
        >p{
            text-align: center;
            color: #B8BCC5;
            font-size: 0.7rem;
            padding-top: 5vh;
        }
        flex: 1
    }
    >.detail{
        flex: 1;
        display: flex;
        >div{
            flex: 1;
            >p{
                text-align: center;
            }
            :nth-child(1){
                font-size: 2.2rem;
            }
            >p:nth-of-type(2){
                font-size: 0.7rem;
            }
        }
    }
    >.btn{
        flex: 1;
        .van-button{
            left: 50%;
            top:50%;
            transform: translate(-50%,0);
        }
        .van-button--normal{
            padding: 0 4rem;
        }
    }
    }
</style>
