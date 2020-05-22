<template>
<div id="musicInterval">
    <div class="main" style="width: 100%;height: 50vh;">
        <van-icon name="volume" size="6rem" @click="soundPlay"/>
        <p>点击听取音频</p>
    </div>
    <div class="button_group">
        <van-button round type="info" tag="div"  @click="answer(1)">第一个音高</van-button>
        <van-button round type="info" tag="div"  @click="answer(2)">第二个音高</van-button>
        <van-button round type="info" tag="div"  @click="answer(0)">两个音一样高</van-button>
    </div>
    <van-dialog v-model="show" title="请输入练习量" width  @confirm="submit" >
        <van-field v-model="digit" type="digit" label="练习题数:" />
    </van-dialog>

</div>
</template>

<script>
    import Vue from 'vue';
    import { Button } from 'vant';
    // import course from '@/data/pitchInterval.js'
    import Charger from './charge.js'
    import { Icon } from 'vant';
    import {userDetails,comparePitch} from '@/Cookies'
    import { Field } from 'vant';

    Vue.use(Field);
    Vue.use(Icon);
    Vue.use(Button);
    export default {
        name: "musicInterval",
        created() {
            if(!comparePitch.get(this.getUserDetails.account)){
                this.showPopup()
            }
            else{
                this.charger = new Charger();
                let urls =  this.charger.prePlay()
                this.playData = urls
                this.done = this.charger.getDone()
            }
        },
        data(){
            return{
                playData:'',
                charger:null,
                testCount:undefined,
                done:undefined,
                show: false,
                digit:20
            }
        },
        methods:{
            soundPlay(){
                this.charger.play(this.playData.url1,this.playData.url2)
            },
            submit(){
                this.charger = new Charger({len:this.digit,count:this.digit});
                let urls =  this.charger.prePlay()
                this.playData = urls
                this.done = this.charger.getDone()
            },
            showPopup() {
                this.show = true;
            },
            answer(choose){
                if (choose===this.playData.answer){
                    this.testCount = this.charger.correctChange()
                    this.$dialog.alert({
                        title: '答对了',
                        message: `第一个音是：${this.playData.pitch1}\n第二个音是：${this.playData.pitch2}`,
                    }).then(() => {
                        this.playData = this.charger.prePlay()
                    })
                }
                else {
                    this.testCount =  this.charger.errorChange()
                    this.$dialog.alert({
                        title: '答错了',
                        message: `第一个音是：${this.playData.pitch1}\n第二个音是：${this.playData.pitch2}`,
                    }).then(() => {
                        this.playData = this.charger.prePlay()
                    })
                }
            },
        },
        computed:{
            getUserDetails(){
                return userDetails.get()
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
