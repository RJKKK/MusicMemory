<template>
<div id="training">
    <navbar myTitle="练习" :arrow="true"></navbar>
    <census v-if="this.showCensus===0" :pass="25-getPitchIntervalDetails['pitchInterval'].length" :totals="25" learnTime="5"></census>
    <census v-if="this.showCensus===1&&getComparePitch&&!getComparePitch.done" :pass="getComparePitch.correct" :totals="getComparePitch.len" learnTime="5"></census>
    <live2d  ref="live2d" :v-show="showLive2d"></live2d>
    <router-view></router-view>
</div>
</template>

<script>
    //该页面加载用户练习时的通用组件
    import navbar from '../../common/NavBar';
    import census from '../../common/census'
    import live2d from 'components/live2d'
    import {userDetails,comparePitch} from '@/Cookies'
    import {pitchIntervalDetails} from '@/localStorage'
    export default {
        name: "container",
        data(){
            return{
                showLive2d:true,
                showCensus:3,
                getComparePitch:null,
                getPitchIntervalDetails:null

            }
        },
        methods:{
        },

        created() {
            this.$parent.showtabbar=false;
        },
        computed:{
            getUserDetails(){
                return userDetails.get()
            },

        },
        beforeRouteLeave (to, from,next) {
            window.clearInterval(this.clockId)
            this.$parent.showtabbar=true;
            next();
        },
        // eslint-disable-next-line no-dupe-keys
        mounted() {
            if(this.$route.query.id)
            this.$router.replace({path:'/main/training/'+this.$route.query.id})
                else this.$router.replace({path:'/main/home'})
            this.clockId =  window.setInterval(()=>{
                this.getComparePitch = comparePitch.get(this.getUserDetails.account)
                this.getPitchIntervalDetails = pitchIntervalDetails.get(this.getUserDetails.account)
            },500)
        },
        watch:{
            '$route.path':function(newVal){
                if (newVal.indexOf('/0')!==-1)
                    this.showCensus = 0
                if (newVal.indexOf('/1')!==-1)
                    this.showCensus = 1
            },
            deep:true
        },
        components:{
            navbar,census,live2d
        }
    }
</script>

<style scoped>

</style>
