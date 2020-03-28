<template>
    <div id="home">
        <div class="date_detail">
            <!--获取数据 -->
            <span>353</span>
            <!--            -->
            &nbsp;&nbsp;<span>天</span>
            <div>
            <span class="fa fa-calendar-o "></span>&nbsp;&nbsp;&nbsp;
                <span>打卡日历</span>&nbsp;&nbsp;
                <span>&gt;</span>
            </div>
        </div>
        <div class="course">
<!--           轮播图课程选择器 记得在此替换图片-->
            <van-swipe  indicator-color="white" :touchable="true"  tag="div" class="choose" @change="onChoose">
                <van-swipe-item >
                    <img src="https://media-image1.baydn.com/storage_media_image/kvhfgj/3e41a7d6f1aa20a3890f6846e67ed3c5.2e5a6a8972bd08fd521e09099ec16eea.png?x-oss-process=image/format,jpg/quality,q_80" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img src="https://static.baydn.com/media/media_store/image/feeee16e97407bbca8957702a674e421.png" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img src="https://static.baydn.com/media/media_store/image/0121935e7513b1e001d04a39c62b6247.png" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img src="https://static.baydn.com/media/media_store/image/0121935e7513b1e001d04a39c62b6247.png" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="usr_learn_data">
            <div id="title">
                <p>- 学习情况 -</p>
            </div>
            <div class="detail">
                <div>
                    <p>30</p>
                    <p>非常熟悉</p>
                </div>
                <div>
                    <p>10</p>
                    <p>需要复习</p>
                </div>
                <div>
                    <p>5</p>
                    <p>比较陌生</p>
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

    Vue.use(Button);
    Vue.use(Swipe).use(SwipeItem);
    export default {
        name: "home",
        mounted(){

        },
        data() {
            return {
                current: 0
            }
        },
        methods: {
            onChoose(index) {
                this.current = index;
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
