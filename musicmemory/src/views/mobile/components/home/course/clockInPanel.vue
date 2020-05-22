<template>
    <div class="main">
        <my-Nav-Bar myTitle="每日打卡" :arrow="true" :isFixed="true" ></my-Nav-Bar>
        <div class="content">
            <div class="part_1">
                <p v-if="!testHaveClock" class="tip">今日未打卡</p>
                <p v-else class="tip">今日已打卡</p>
                <p class="tip1">已经连续打卡{{getClockInCount}}天，请继续坚持！</p>
            </div>
            <div class="tips">
                <p v-for="(val,objName) in testClock" :key="objName" style="text-align: center;color: orangered">今天的{{objName}}已经完成</p>
            </div>
            <clock-in-calendar class="calendar" selColor="green" :dateArr="getDateArr"></clock-in-calendar>
            <van-button color="#27BD9F" :disabled="(testHaveClock||!testClock)"  round class="clockIn" size="large" @click="submit">打卡</van-button>
        </div>

    </div>

</template>

<script>
    import myNavBar from '@/views/mobile/components/common/NavBar';
    import clockInCalendar from "@/views/mobile/components/common/clockInCalendar";
    import testClockIn from './checkClockDetails'

    import {user} from '@/api'
    import {userDetails,comparePitch,articles} from '@/Cookies'
    import Vue from 'vue';
    import { Button } from 'vant';

    Vue.use(Button);
    export default {
        name: "clockInPanel",
        data(){
            return{
                clockInData:[]
            }
        },
        components:{
            myNavBar,clockInCalendar
        },
        beforeRouteLeave (to, from,next) {
            this.$parent.showtabbar=true;
            next();
        },
        mounted(){
            console.log(testClockIn.test())
            this.getClockIn()
        },
        created(){
            this.$parent.showtabbar=false;
        },
        methods:{
            async getClockIn(){
                let res = await user.getClockInDetails(this.getUserDetails.account)
                this.clockInData = res
            },
            async submit(){
                let formObj ={
                    account:this.getUserDetails.account,
                    date:this.getDateToday
                }
                if(comparePitch.get(this.getUserDetails.account))
                    formObj.comparePitch = comparePitch.get(this.getUserDetails.account)
                if(articles.get(this.getUserDetails.account))
                    formObj.articles = articles.get(this.getUserDetails.account)
                    let res = await user.clockIn(formObj)
                    if(res.msg===0){
                        this.$dialog.alert({
                            title:'tips',
                            message:'打卡成功！'
                        }).then(()=>{
                            this.getClockIn()
                        })
                    }
            }
        },
        computed:{
            getDateArr(){
                return this.clockInData.map(val=>val.date)
            },
            testClock(){
                return testClockIn.test()
            },
            getClockInCount(){
                return this.clockInData.length
            },
            getUserDetails(){
                return userDetails.get()
            },
            getDateToday(){
                let date = new Date()
                return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
            },
            testHaveClock(){
                return this.getDateArr.find(val=>val===this.getDateToday)
            }
        }
    }
</script>

<style scoped lang="less">
    .main{
        position: relative;
        height: 100vh;
        .content{
            height: 100%;
            padding-top:46px;

            .part_1{
                height: 50%;
                background: #27BD9F;
                position: relative;
            }
            .calendar{
                position: absolute;
                top: 35%;
                left: 50%;
                transform: translateX(-50%);
                box-shadow: 1px -1px 3px 0px;
            }
            .tip{
                color: white;
                font-size: 2rem;
                font-weight: bolder;
                text-align: center;
                padding: 5vh 0;
            }
            .tip1{
                color: white;
                text-align: center;
            }
            .clockIn{
                position: absolute;
                bottom:4%;
            }
            .tips{
                position: absolute;
                bottom:15%;
                width: 100%;
            }
        }
    }
</style>