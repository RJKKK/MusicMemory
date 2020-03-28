<template>
<div>
<button @click="startRecord">开始</button>
</div>
</template>

<script>
    export default {
        name: "pitchTraining",
        mounted(){
            controller.mic.start()
        },
        data(){
            return{
                iframeData:'',
                timeOut:false
            }
        },
        methods:{
           startRecord(){
                this.timeOut&&clearInterval(this.timeOut);
                this.timeOut = setInterval(()=>{
                    console.log(window.controller.pitch)
                },500)
           }
        }
    }
</script>

<style scoped>

</style>