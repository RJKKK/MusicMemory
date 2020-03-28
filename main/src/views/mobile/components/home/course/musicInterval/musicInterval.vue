<template>
<div id="musicInterval">
    <div class="main" style="width: 100%;height: 50vh;">
        <van-icon name="volume" size="6rem" @click="soundPlay"/>
        <p>点击听取音频</p>
    </div>
    <div class="button_group">
        <van-button round type="info" tag="div" id="pass" @click="right">我听懂了</van-button>
        <van-button round type="info" tag="div" id="fail">完全没搞懂</van-button>
    </div>
</div>
</template>

<script>
    import Vue from 'vue';
    import { Button } from 'vant';
    // import course from '@/data/musicInterval.js'
    import ChargeInterval from './charge.js'
    let test = new ChargeInterval();
    import { Icon } from 'vant';

    Vue.use(Icon);
    Vue.use(Button);
    export default {
        name: "musicInterval",
        mounted() {
            let urls =  test.prePlay()
            this.playData = urls

        },
        data(){
            return{
                playData:''
            }
        },
        methods:{
            soundPlay(){
                test.play(this.playData.url1,this.playData.url2)
            },
            right(){
               let urls = test.prePlay()
                this.playData = urls
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
