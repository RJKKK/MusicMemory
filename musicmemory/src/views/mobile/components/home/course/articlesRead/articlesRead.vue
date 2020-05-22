<template>
    <div>
        <van-progress :percentage="this.currentTime<this.doneTime?this.currentTime/this.doneTime*100:100"  color="#67D7A2"  class="my_progress"/>
        <van-dialog v-model="show" title="定下今天的阅读小目标" width  @confirm="submit" >
            <van-field v-model="digit" type="digit" label="我要阅读" />min
        </van-dialog>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Progress } from 'vant';
    import {userDetails,articles} from '@/Cookies'
    import { Field } from 'vant';
    Vue.use(Progress);
    Vue.use(Field);
    export default {
        name: "articlesRead",
        created() {
            if(!articles.get(this.getUserDetails.account)){
                this.showPopup()
            }
            else{
                this.getCookies()
            }
        },
        data(){
            return{
                done:false,
                show: false,
                digit:20,
                timerId:undefined,
                currentTime:0,
                doneTime:9999999999
            }
        },
        mounted() {
            this.countTimer()
        },
        methods:{
            submit(){
                this.doneTime = this.digit*60
                this.serCookies()
            },
            showPopup() {
                this.show = true;
            },
            serCookies(){
                articles.set({
                    account:this.getUserDetails.account,
                    currentTime:this.currentTime,
                    doneTime:this.doneTime,
                    done:this.done
                })
            },
            getCookies(){
                let cookiesObj = articles.get(this.getUserDetails.account);
                this.currentTime = cookiesObj.currentTime
                this.doneTime = cookiesObj.doneTime
                this.done = cookiesObj.done
            },
            countTimer(){
                this.timerId&&window.clearInterval(this.timerId)
                this.timerId = window.setInterval(()=>{
                    this.currentTime+=1
                },1000)
            }
        },
        computed:{
            getUserDetails(){
                return userDetails.get()
            },
        },
        watch:{
            currentTime(newD){
                if(newD>this.doneTime&&this.done!==true)
                    this.done = true
            },
            done(newD){
                if (newD===true&&this.currentTime>=this.doneTime){
                    this.$dialog.confirm({
                        title: '辛苦了',
                        message: '你已完成今天的阅读任务！',
                    }).then(() => {
                        this.$router.replace({path:"/main/panel"})
                    })
                }
            }
        },
        beforeRouteLeave(to, from,next){
            this.serCookies()
            next()
        }
    }
</script>

<style scoped lang="less">
    .my_progress{
        .van-progress__pivot{
            display: none;
        }
    }
</style>