<template>
    <div id="showData">
        <my-nav-bar myTitle="学习情况" :arrow="true"></my-nav-bar>
        <van-tabs v-model="active" >
            <van-tab title="音程练习">
                <br>
                <br>
                <ve-bar :data="intervalData"></ve-bar>
            </van-tab>
            <van-tab title="音高判别">
                <br>
                <br>
                <ve-line :data="chartData" :settings="chartSettings"></ve-line>
            </van-tab>
        </van-tabs>

    </div>
</template>

<script>
    import Vue from 'vue';
    import VCharts from 'v-charts'
    import myNavBar from '@/views/mobile/components/common/NavBar';
    import {userDetails} from '@/Cookies'
    import {pitchIntervalDetails} from '@/localStorage'
    import {intervalName} from '@/data'
    import { Tab, Tabs } from 'vant';
    import {user} from '@/api'

    Vue.use(Tab);
    Vue.use(Tabs);
    Vue.use(VCharts)
    export default {
        name: "showData",
        components:{
            myNavBar
        },
        created(){
            this.$parent.showtabbar=false;
        },
        mounted(){
            if(this.$route.query.account)
                this.userData = {...this.$route.query}
            else this.userData = {...userDetails.get()}
            this.dealIntervalPitch()
            this.dealComparePitch()

        },
        beforeRouteLeave (to, from,next) {
            this.$parent.showtabbar=true;
            next();
        },
        data(){
            this.chartSettings = {
                xAxisType: 'time'
            }
            return{
                active: 0,
                userData:null,
                intervalData: {
                    columns: ['音程名', '正确次数', '学习次数', '正确率'],
                    rows: []
                },
                chartData: {
                    columns: ['日期', '练习量', '正确数量', '正确率'],
                    rows: []
                }
            }
        },
        methods:{
           async dealIntervalPitch(){
                let nameArr = []
                let dataArr = await pitchIntervalDetails.getTotal(this.userData.account)
                let dataArr2 =[]
                let rowArr = []
                intervalName.forEach((val)=>{
                    nameArr.push(val.join('/'))
                })
               dataArr.forEach((val)=>{
                   if (val.id>=0)
                       dataArr2.push(val)
                   else{
                       dataArr2[Math.abs(val.id)].correct+=val.correct
                       dataArr2[Math.abs(val.id)].total+=val.total
                   }
                    // rowArr.push({'音程名':nameArr[index],'正确次数':val.correct,'学习次数':val.total,'正确率':val.correct/val.total})
                })
               dataArr2.forEach((val,index)=>{
                   rowArr.push({'音程名':nameArr[index],'正确次数':val.correct,'学习次数':val.total,'正确率':val.correct/val.total})
               })
               this.intervalData.rows = rowArr
            },
           async dealComparePitch(){
            let data = await user.getClockInDetails(this.userData.account)
            let rows = []
               data.forEach(val=>{
                   if(val['comparePitch']){
                       rows.push(
                           {
                               '日期':val.date,
                               '练习量':val['comparePitch'].total,
                               '正确数量':val['comparePitch'].correct,
                               '正确率':val['comparePitch'].correct/val['comparePitch'].total
                           }
                       )
                   }
               });
                this.chartData.rows = rows
           }
        }
    }
</script>

<style scoped>

</style>