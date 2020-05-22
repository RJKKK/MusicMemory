<template>

    <van-nav-bar
            :title="myTitle"
            :left-arrow="arrow"
            @click-left="onClickLeft"
            :fixed="this.isFixed"
            class="bar"
    />

</template>


<script>
    import Vue from 'vue';
    import { NavBar } from 'vant';

    Vue.use(NavBar);
    export default {
        name: "myNavBar",
        props: ["myTitle","arrow","isFixed"],
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="less">
    .van-nav-bar__title{
        font-size: 14px;
        color: black;
    }
    .van-icon-arrow-left:before{
        color: grey;
        font-size: 1.4rem;
        font-weight: 600;
    }
</style>
