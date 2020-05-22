<template>
<div id="musicInterval">
    <div class="main" style="width: 100%;height: 50vh;">
        <van-icon name="volume" size="6rem" @click="soundPlay"/>
        <p>点击听取音频</p>
    </div>
    <div class="button_group">
        <van-button round type="info" tag="div" id="pass" @click="rightAlert">我听懂了</van-button>
        <van-button round type="info" tag="div" id="fail" @click="errorAlert">完全没搞懂</van-button>
    </div>
    <van-dialog v-model="show" title="请输入通过所需要的连续听懂的次数" width  @confirm="submit" >
        <van-field v-model="digit" type="digit" label="次数:" />
    </van-dialog>
</div>
</template>

<script>
    import Vue from 'vue';
    import { Button } from 'vant';
    // import course from '@/data/pitchInterval.js'
    import ChargeInterval from './charge.js'
    import {userDetails} from '@/Cookies'
    import {pitchIntervalDetails} from '@/localStorage'
    import {user} from '@/api'
    import { Icon } from 'vant';
    import { Field } from 'vant';

    Vue.use(Field);
    Vue.use(Icon);
    Vue.use(Button);
    export default {
        name: "musicInterval",
        mounted() {
            this.showPopup()
        },
        beforeRouteLeave(to, from, next){
            this.updatePitchInterval()
            next()
        },
        data(){
            return{
                playData:'',
                charger:null,
                pitchArr:[],
                show: false,
                digit:2,
                testCount:undefined,
                done:undefined,
            }
        },
        methods:{
            submit(){
                this.charger = new ChargeInterval({count:this.digit});
                let urls =  this.charger.prePlay()
                this.playData = urls
                this.setupPitchInterval()
            },
            showPopup() {
                this.show = true;
            },
            soundPlay(){
                this.charger.play(this.playData.url1,this.playData.url2)
            },
            right(){
                this.testCount = this.charger.correctChange(this.playData.distance).length
                this.pitchArr.find(val=>val.id===this.playData.distance).correct++;
                this.pitchArr.find(val=>val.id===this.playData.distance).total++;
                pitchIntervalDetails.seTotal(userDetails.get().account,this.pitchArr)
                let urls = this.charger.prePlay()
                this.playData = urls

            },
            error(){
                this.testCount =  this.charger.errorChange(this.playData.distance).length
                this.pitchArr.find(val=>val.id===this.playData.distance).total++;
                console.log(this.pitchArr.find(val=>val.id===this.playData.distance))
                pitchIntervalDetails.seTotal(userDetails.get().account,this.pitchArr)
                let urls = this.charger.prePlay()
                this.playData = urls
            },
            rightAlert(){
                this.$dialog.confirm({
                    title:"你真的听对了吗",
                    message: `第一个音是：${this.playData.pitch1}\n第二个音是：${this.playData.pitch2}\n音程为:${this.playData.answer}`,
                    cancelButtonText:'听错了',
                    confirmButtonText:'听对了'
                }).then(()=>{
                    this.right()
                }).catch(()=>{
                    this.error()
                })
            },
            errorAlert(){
                this.$dialog.alert({
                    title:"答案如下",
                    message: `第一个音是：${this.playData.pitch1}\n第二个音是：${this.playData.pitch2}\n音程为:${this.playData.answer}`,
                }).then(()=>{
                    this.error()
                })
            },
           async setupPitchInterval(){
                this.pitchArr = await pitchIntervalDetails.getTotal(userDetails.get().account)
            },
            async updatePitchInterval(){
                let res = await user.setPitchInterval(userDetails.get().account,this.pitchArr)
                console.log(res)
            },
        },
        watch:{
            testCount(newD){
                if (newD===0)
                    this.charger.setDone()
                this.done = this.charger.getDone()
            },
            done(newD){
                if (newD===true&&this.testCount<=0){
                    this.$dialog.confirm({
                        title: '辛苦了',
                        message: '你已完成本日练习！',
                    }).then(() => {
                        this.$router.replace({path:"/main/panel"})
                    })
                }
            }
        }
    }
</script>

<style scoped lang="less">
#musicInterval{
    .main{
        .van-icon.van-icon-volume{
            display: block;
            position: relative;
            left: 50%;
            top:50%;
            width: 6rem;
            height: 6rem;
            transform: translate(-50%,-50%);
        }
        >p{
            position: relative;
            top: 50%;
            text-align: center;
        }
    }
    .button_group{
        position: absolute;
        bottom: 1rem;
        right: 50%;
        transform: translateX(16%);
        div{
            display: block;
            margin-top: .7rem;
            padding: 0 2rem;
            border: none;
            >span{
                text-decoration: underline;
            }
        }
        #pass{
            background: #27BD9F;
        }
        #fail{
            background: #FE925B;
        }
    }
}
</style>
