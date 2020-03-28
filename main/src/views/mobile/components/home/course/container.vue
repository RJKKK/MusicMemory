<template>
<div id="training">
    <navbar myTitle="练习" :arrow="true"></navbar>
    <census pass="120" totals="160" learnTime="5"></census>
    <live2d  ref="live2d" :v-show="showLive2d"></live2d>
    <router-view></router-view>
</div>
</template>

<script>
    //该页面加载用户练习时的通用组件
    import navbar from '../../common/NavBar';
    import census from '../../common/census'
    import live2d from 'components/live2d'
    export default {
        name: "container",
        data(){
            return{
                showLive2d:true
            }
        },
        created() {
            this.$parent.showtabbar=false;
        },
        beforeRouteLeave (to, from,next) {
            this.$parent.showtabbar=true;
            next();
        },
            mounted() {
            if(this.$route.query.id)
            this.$router.replace({path:'/main/training/'+this.$route.query.id})
                else this.$router.replace({path:'/main/home'})
        },
        components:{
            navbar,census,live2d
        }
    }
</script>

<style scoped>

</style>
