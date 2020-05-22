<template>
<div id="census">
<div class="run_data">
    <van-grid :border="false" :column-num="1">
        <van-grid-item>
            <p >学习进度</p>
            <p><span>{{pass}}</span><span> / </span><span>{{totals}}</span></p>
        </van-grid-item>

    </van-grid>
</div>
        <van-progress :percentage="this.pass/this.totals*100"  color="#67D7A2"  class="my_progress"/>
</div>
</template>

<script>
    import Vue from 'vue';
    import { Progress } from 'vant';
    import { Grid, GridItem } from 'vant';

    Vue.use(Grid).use(GridItem);
    Vue.use(Progress);
    export default {
        name: "census",
        props:["pass","totals","learnTime"],

    }
</script>

<style lang="less">
    .my_progress{
        .van-progress__pivot{
            display: none;
        }
    }
    .run_data{
        .van-grid-item__content{
            >p:nth-of-type(1){
                color:#BFC2CA;
                font-size: .8rem;
            }
            >p:nth-of-type(2){
                color: #3D3D3D;
                padding-top: .3rem;
                font-weight: 500;
            }
        }
    }
</style>
