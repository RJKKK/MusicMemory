<template>
    <div id="musicBox">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <my-nav-bar myTitle="音乐盒"></my-nav-bar>
        <van-dropdown-menu id="chooseMenu" >
            <van-dropdown-item  :options="option1" @change="selectMenu" />
        </van-dropdown-menu>
        <van-icon name="wap-nav" id="openMenu" />
        <div id="playBox">
            <div class="box_main">
                <img src="@/assets/imgs/musicBox/音乐盒ui_m3.png" alt="">
                <img src="@/assets/imgs/musicBox/音乐盒ui_m2.png" alt="" :class="{'move':boxPlay.isPlay,'move_pause':boxPlay.isPause}">
                <img src="@/assets/imgs/musicBox/音乐盒ui_m1.png" alt="">
            </div>
            <div class="chooseType">
                <van-tabs v-model="boxPlay.chooseType" type="card" color="#27BD9F" @click="setType">
                    <van-tab title="sine"></van-tab>
                    <van-tab title="square"></van-tab>
                    <van-tab title="triangle"></van-tab>
                    <van-tab title="sawtooth"></van-tab>
                </van-tabs>
            </div>
            <div class="setBpm" style="margin:1rem 0 .0rem 0;padding: 0 1rem" >
                <van-slider  v-model="boxPlay.bpm" @change="setBpm" style="margin-bottom:1rem" active-color="#27BD9F" :min="0" :max="150"/>
                <span>BPM值：</span><span>{{boxPlay.bpm}}</span>
            </div>
            <div class="box_handle" style="margin: 0 2rem">
                <van-grid :border="false" :column-num="5" square>
                    <van-grid-item>
                        <div :class="{'fa':true, 'fa-repeat':true,'set':boxPlay.isloop}" @click="setLoop"></div>
                    </van-grid-item>
                    <van-grid-item>
                        <div class="fa fa-step-backward"></div>
                    </van-grid-item>
                    <van-grid-item >
                        <div style="width: 2.5rem;height: 2.5rem; border: 1px solid #27BD9F;border-radius: 50%"
                        ><van-icon :name="boxPlay.isPause?'play':'pause'" @click="play" tag="div" size="2rem" color="#27BD9F" style="margin: 0 auto"/></div>
                    </van-grid-item>
                    <van-grid-item>
                        <div class="fa fa-step-forward "></div>
                    </van-grid-item>
                    <van-grid-item>
                        <div :class="{'fa':true, 'fa-magic':true, 'set':boxPlay.ismixing}" @click="setMixing"></div>
                    </van-grid-item>
                </van-grid>
            </div>

<!--            自定义键盘组件-->
            <keyboard @getInput="getInput" ref="mykeyboard"></keyboard>
        </div>
</template>

<script>
    import myNavBar from '@/views/mobile/components/common/NavBar';
    import 'abcjs/abcjs-audio.css'
    import Music_box from './musicBox.js'
    import keyboard from './keyboard'
    import ABCJS from 'abcjs'
    import Vue from 'vue';
    import { DropdownMenu, DropdownItem } from 'vant';
    import { Icon } from 'vant';
    import { Switch } from 'vant';
    import { Grid, GridItem } from 'vant';
    import { Tab, Tabs } from 'vant';
    import { Slider } from 'vant';

    Vue.use(Slider);
    Vue.use(Tab).use(Tabs);
    Vue.use(Grid).use(GridItem);
    Vue.use(Switch);
    Vue.use(Icon);
    Vue.use(DropdownMenu).use(DropdownItem);

    export default {
        name: "musicBox",
        components:{
            myNavBar,keyboard
        },
        mounted(){
            window._musicBox = new Music_box({autoplay: 83,volume: 0.5
            });


        },
        data() {
            return {
                value1: 0,//下拉菜单的点击返回值
                //下拉菜单的选项
                option1: [
                    { text: '选择曲谱', value: 0 },
                    { text: '上传曲谱', value: 1 },
                    { text: '编写曲谱', value: 2 }
                ],
                show: false,//自定义键盘控制值
                //音乐盒旋转动画的控制对象
                boxPlay:{
                    isPlay:false,
                    isPause:true,
                    ismixing: true,
                    isloop:false,
                    chooseType:2,
                    bpm:83,
                },
                keyCodes: '',
            }
        },
        methods:{
            //获取键盘的数据调用的方法
            getInput(val){
                console.log(val)
            },
            clickListener(abcElem) {
        var lastClicked = abcElem.midiPitches;
        if (!lastClicked)
            return;

        ABCJS.synth.playEvent(lastClicked, abcElem.midiGraceNotePitches, this.abcjsEditor.millisecondsPerMeasure()).then(function (response) {
            console.log("note played");
        }).catch(function (error) {
            console.log("error playing note", error);
        });
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
            //音乐盒控制函数
            play(){
                this.synth.start()

                // console.log(controller)
                // controller.mic.start()
                // if (!window._musicBox) return;
                // if(this.boxPlay.isPause){
                //     window._musicBox.setPause(!this.boxPlay.isPause);
                //     window._musicBox.playMusic('g!|-|g!|-|a!| |g!| |1| |b!|+|g!|-|g!|-|a!| |g!| |2| |1|+' +
                //         '|g!|-|g!|-|5| |3| |1| |b!| |a!| |4|-|4|-|3| |1| |2| |1|a!|+|g!|-|g!|-|a!| |g!| |1| |b!|+|g!|-|g!|-|a!| |g!| |2| |1|+' +
                //         '|g!|-|g!|-|5| |3| |1| |b!| |a!| |4|-|4|-|3| |1| |2| |1|a!|+');
                //     window._musicBox.playMusic('e!|-|e!|-|f!| |e!| |1| |b!|+|e!|-|e!|-|f!| |e!| |2| |1|+' +
                //         '|g!|-|g!|-|3| |3| |1| |b!| |a!| |a!|-|a!|-|g!| |a!| |b!| |1|+|e!|-|e!|-|f!| |e!| |1| |b!|+|e!|-|e!|-|f!| |e!| |2| |1|+' +
                //         '|g!|-|g!|-|3| |3| |1| |b!| |a!| |a!|-|a!|-|g!| |a!| |b!| |1|+')
                //     // window._musicBox.playMusic(
                //     //     'A|-|G|-|C!| |C!| |D!| |D!| |E!| |C!| |G| |A|-|G|-|C!| |C!| |D!| |D!| |E!| |C!|+|' +
                //     //         'A|-|G|-|C!| |C!| |D!| |D!| |E!| |C!| |G| |A|-|G|-|C!| |C!| |D!| |C!|++|' +
                //     //         '6!|-|5!|-|C| |C| |D| |D| |E| |C| |5!| |6!|-|5!|-|C| |C| |D| |D| |E| |D|+|' +
                //     //         '6!|-|5!|-|C| |C| |D| |D| |E| |C| |5!| |6!|-|5!|-|C| |C| |D| |C|+|5!|+|' +
                //     //         '6!|-|5!|-|C| |C| |D| |D| |E| |C| |5!| |6!|-|5!|-|C| |C| |D| |D| |E| |D|+|' +
                //     //         '6!|-|5!|-|C| |C| |D| |D| |E| |C| |5!| |6!|-|5!|-|C| |C| |D| |C|+|5!|+|'+'4!|-|3!|-|1!|-|6| |1!|-|2!|-|6|-|1!| |5| |6| |1!| |4!|-|3!|-|1!|-|6| |1!|-|2!|-|6|-|1!|++|4!|-|3!|-|1!|-|6| |1!|-|2!|-|6|-|1!| |5| |6| |1!|-|5|-|.|1!|-|4|.|4|-|5|-|4|-|5|-|4|-|2|-|5|-|1!|-|2!|-|2!| |1!|-|6| |1!|-|2!|-|3!|-|5!|-|2!|-|3!| |1!|-|5|-|1!|-|2!|-|2!| |1!|-|6| |2!|-|1!|-|5!|-|3!|+|2|-|5|-|1!|-|2!|-|2!| |1!|-|6| |1!|-|2!|-|3!|-|5!|-|2!|-|3!| |1!| |7| |6|+|7| |1!|-|7| |1!|-|1|-|5|-|2|-|5|-|1!|-|2!|-|2!| |1!|-|6| |1!|-|2!|-|3!|-|5!|-|2!|-|3!| |1!|-|5|-|1!|-|2!|-|2!| |1!|-|6| |2!|-|1!|-|5!|-|3!|+|2|-|5|-|1!|-|2!|-|2!| |1!|-|6| |1!|-|2!|-|3!|-|5!|-|2!|-|3!| |1!| |7| |6|+|7| |1!|-|7| |1!|.|+')
                //     // window._musicBox.playMusic('0| |0| |0| |0| |0| |0| |0| |0| |0| |0| |0| |0| |0| |0| |0| |0| |' +
                //     //         '0| |0| |0| |0| |0| |0| |0| |0| |0| |0| |0| |0| |0| |0| |0| |0| |' +
                //     //         'f!|+|a!|+|e!|+|a!|+|f!|+|a!|+|e!|+|b!|+|' +
                //     //         'f!|+|a!|+|e!|+|a!|+|f!|+|a!|+|1|+|b!|+|' +
                //     //         'f!|+|a!|+|e!|+|a!|+|f!|+|a!|+|e!|+|b!|+|' +
                //     //         'f!|+|a!|+|e!|+|a!|+|f!|+|a!|+|1|+|b!|+|'+ 'a!#|+|2|+|1|+|g!|+|a!|+|1|+|1| |g!| |a!| |1| |a!#|+|2|+|1|+|g!|+|a!|++|+|d!|g!|b!|+|f|+|c!|+|e|+|g!| |e!| |f|+|f!|a!|+|e|+|b|g!|+|f|+|c!|+|e|+|g!| |e!| |f|-|c!|-|f!| |g|+|c|-|g|-|c!|-|g!|-|b|+|f|+|c!|+|e|+|g!| |e!| |f|+|f!|a!|+|e|+|a|g!|+|f|+|c!|+|e|+|g!| |e!| |f|-|c!|-|f!| |g|-|d|-|g!| |c|-|g|-|c!|-|e!#|-|d!|-|e!|-| ')
                // }else window._musicBox.setPause(!this.boxPlay.isPause);
                // if (!this.boxPlay.isPlay) this.boxPlay.isPlay=true;
                // this.boxPlay.isPause=!this.boxPlay.isPause;
            },//播放开关
            setType(name,title){
                if (!window._musicBox) return;
                window._musicBox.setMusicType(title)
            },//设置音乐盒声音类型（波形）
            setBpm(val){
                if (!window._musicBox) return;
                window._musicBox.setPlaySpeed(val)
            },//设置音乐盒曲速
            setMixing(){
                if (!window._musicBox) return;
                window._musicBox.setMixing(!this.boxPlay.ismixing);
                this.boxPlay.ismixing=!this.boxPlay.ismixing;
            },
            setLoop(){
                if (!window._musicBox) return;
                window._musicBox.setLoop(!this.boxPlay.isloop);
                this.boxPlay.isloop=!this.boxPlay.isloop;
            }
        },
        beforeDestroy(){
            if (window._musicBox)window._musicBox.setPause(true);
        },
        watch:{
            deep:true,


            },

    }
</script>

<style scoped lang="less">
    @keyframes changDeg {
        0% {
            transform: rotateZ(0deg);
        }
        100% {
            transform: rotateZ(360deg);
        }
    }//动画样式
    .move{
        animation:changDeg 20s linear 0.2s infinite;
    }//设置动画
    .move_pause{
        animation-play-state:paused;
        -webkit-animation-play-state:paused;
    }//暂停动画
        #musicBox{
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
        #playBox{
            /*width: 100%;*/
            .box_main{
                position: relative;
                left: 50%;
                margin-left: -150px ;
                width: 300px;
                height: 300px;
                /*transform: translateX(-37.25%);*/
                >img{
                    /*width: 100%;*/
                    position: absolute;
                    display: block;
                }
            }
        }
            .setBpm{
               span{
                   font-size: 0.9rem;
                   color: #A1A1A1;

               }
            }
            .box_handle{
                .van-icon::before{
                    /*position: absolute;*/
                    /*top:50%;*/
                    /*left: 50%;*/
                    transform: translate(10%,10%);
                }
                .fa{
                    color: #27BD9F;
                    width: 2rem;
                    height: 2rem;
                    border-radius: 50%;
                }
                [class*='fa-']:before{
                    left: 50%;
                    top: 50%;
                    position: absolute;
                    transform: translate(-50%, -50%);
                }
                .fa.set{
                    background: #27BD9F;
                    color: white;
                }
            }
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
