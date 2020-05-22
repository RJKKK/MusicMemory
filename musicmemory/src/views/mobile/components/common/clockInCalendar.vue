<template>
        <vc-calendar :attributes='this.attrs' :color="this.selColor"></vc-calendar>
</template>

<script>
    import Vue from 'vue';
    import VCalendar from 'v-calendar'; // 引入日历插件
    Vue.use(VCalendar, {
        componentPrefix: 'vc',
    });
    export default {
        name: "clockInCalendar",
        props:["dateArr","selColor"],
        data(){
            return{
                attrs: [
                    {
                        key: 'today',
                        // 括号内传递日期可点亮指定日期，如new Date(2019, 6, 1)，也可传递多个日期：如dates: [ new Date(2018, 0, 1), new Date(2018, 0, 15) ]
                        dates: [],
                        highlight: true,
                        // popover 点亮的日期上出现提示内容
                        popover: {
                            label: '美好的一天！要开心呦！',
                        },
                    },]
            }
        },
        mounted() {
                let attributes = [...this.attrs];
                attributes[0].dates = this.dateArr
                this.attrs = attributes
        },
         watch:{
                 dateArr(){
                         let attributes = [...this.attrs];
                         attributes[0].dates = this.dateArr
                         this.attrs = attributes
                 }
         }
    }
</script>

<style scoped>

</style>