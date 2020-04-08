<template>
    <div id="musicBox">
        <my-nav-bar myTitle="音乐盒"></my-nav-bar>
        <van-dropdown-menu id="chooseMenu" >
            <van-dropdown-item  :options="option1" @change="selectMenu" />
        </van-dropdown-menu>
        <van-icon name="wap-nav" id="openMenu" />
        <!--            自定义键盘组件-->
        <keyboard @getInput="getInput" ref="mykeyboard"></keyboard>
        <!--        自定义播放器组件-->
        <player :playList="this.playList" ref="musicPlayer"></player>
    </div>
</template>

<script>
    import myNavBar from '@/views/mobile/components/common/NavBar';
    import keyboard from './keyboard';
    import player from './player'
    import ABCJS from 'abcjs'
    import Vue from 'vue';
    import { DropdownMenu, DropdownItem } from 'vant';

    Vue.use(DropdownMenu).use(DropdownItem);

    export default {
        name: "musicBox",
        components: {
            myNavBar, keyboard,player
        },
        beforeMount() {
            this.playList = ["X:1\nK:D\nDDAA|BBA2|\n"]
        },
        mounted() {

        },
        data() {
            return {
                playList:null,
                value1: 0,//下拉菜单的点击返回值
                //下拉菜单的选项
                option1: [
                    { text: '选择曲谱', value: 0 },
                    { text: '上传曲谱', value: 1 },
                    { text: '编写曲谱', value: 2 }
                ],
                show: false,//自定义键盘控制值
                //音乐盒旋转动画的控制对象

                keyCodes: '',
            }
        },
        methods:{
            //获取键盘的数据调用的方法
            getInput(val){
                console.log(val)
            },
            //下拉菜单选定时执行的方法，value为选定的选项值
            selectMenu(value){
                switch (value) {
                    case 0:break;
                    case 1:break;
                    case 2: this.$refs['mykeyboard'].show=true;break;//弹出键盘
                    default:break;
                }
            },
            Play(){
                this.$refs.musicPlayer.synthControl.play()
            }
        },
        watch:{
            deep:true,


            },

    }
</script>

<style scoped lang="less">
        #chooseMenu{
            position: absolute;
            right: 0;
            top:0;
           background: rgba(0,0,0,0);
            z-index: 100;
            width: 3rem;

        }
        #openMenu{
            position: absolute;
            top: 0.7rem;
            right: 2rem;
        }
        #openMenu:before{
            position: absolute;
            z-index: 98;
            font-size: 1.5rem;

        }
</style>
<style lang="less">
    .van-popup--top{
        width: 30%;
        position: absolute;
        right: 0;
        left: unset;
        .van-dropdown-item__option{
            text-align: center;
        }
    }
    .van-dropdown-menu__title::after{
        content: unset;
    }
</style>
