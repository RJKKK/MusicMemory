<template>
    <div>
        <div id="playBox">
            <div class="box_main">
                <img src="@/assets/imgs/musicBox/音乐盒ui_m3.png" alt="">
                <img src="@/assets/imgs/musicBox/音乐盒ui_m2.png" alt="" :class="{'move':boxPlay.isPlay,'move_pause':boxPlay.isPause}">
                <img src="@/assets/imgs/musicBox/音乐盒ui_m1.png" alt="">
            </div>
            <div class="chooseType">
                <van-tabs v-model="boxPlay.chooseType" type="card" color="#27BD9F" >
                    <van-tab title="sine"></van-tab>
                    <van-tab title="square"></van-tab>
                    <van-tab title="triangle"></van-tab>
                    <van-tab title="sawtooth"></van-tab>
                </van-tabs>
            </div>
            <div class="setBpm" style="margin:1rem 0 .0rem 0;padding: 0 1rem" >
                <van-slider  v-model="boxPlay.bpm" style="margin-bottom:1rem" active-color="#27BD9F" :min="0" :max="150"/>
                <span>BPM值：</span><span>{{boxPlay.bpm}}</span>
            </div>
            <div class="box_handle" style="margin: 0 2rem">
                <van-grid :border="false" :column-num="5" square>
                    <van-grid-item>
                        <div :class="{'fa':true, 'fa-repeat':true,'set':boxPlay.isloop}" ></div>
                    </van-grid-item>
                    <van-grid-item>
                        <div class="fa fa-step-backward" @click="changePrevious"></div>
                    </van-grid-item>
                    <van-grid-item >
                        <div style="width: 2.5rem;height: 2.5rem; border: 1px solid #27BD9F;border-radius: 50%"
                        ><van-icon :name="boxPlay.isPause?'play':'pause'" @click="play" tag="div" size="2rem" color="#27BD9F" style="margin: 0 auto"/></div>
                    </van-grid-item>
                    <van-grid-item>
                        <div class="fa fa-step-forward " @click="changeNext"></div>
                    </van-grid-item>
                    <van-grid-item>
                        <div :class="{'fa':true, 'fa-magic':true, 'set':boxPlay.ismixing}" ></div>
                    </van-grid-item>
                </van-grid>
            </div>
        </div>
        <div ref='audio' class="render-audio"></div>
        <div id="paper" style="display: block"></div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Icon } from 'vant';
    import { Switch } from 'vant';
    import { Grid, GridItem } from 'vant';
    import { Tab, Tabs } from 'vant';
    import { Slider } from 'vant';
    import 'abcjs/abcjs-audio.css';
    import Abcjs from 'abcjs';
    Vue.use(Slider);
    Vue.use(Tab).use(Tabs);
    Vue.use(Grid).use(GridItem);
    Vue.use(Switch);
    Vue.use(Icon);
    export default {
        name: "render-audio",
        props: ["playList"],
        data() {
            return {
                synthControl: null,
                listIndex:0,
                tune:null,
                boxPlay:{
                    isPlay:false,
                    isPause:true,
                    ismixing: true,
                    isloop:false,
                    chooseType:2,
                    bpm:83,
                },
                myList:[]
            };
        },
        mounted() {

            Vue.nextTick(() => {
                this.updateList()
                this.synthControl = new Abcjs.synth.SynthController();
                this.synthControl.load(this.$refs.audio,{
                    onFinished:()=>this.boxPlay.isPause = true,
                }, {displayLoop: false, displayRestart: false, displayPlay: false, displayProgress: false, displayWarp: false});
                this.setupList()
            });
        },
        methods: {
            setTune() {
                console.log(this.tune)
                if (this.tune!==null)
                {
                    this.synthControl.setTune(this.tune, false)
                        if(!this.boxPlay.isPause) this.synthControl.play()
                }
                else {
                    setTimeout(() => {
                        this.setTune();
                    }, 100);
                }
            },
            //更新播放列表
            updateList(){
                this.myList = this.playList
            },
            setupList(){
                if(this.myList.length>0)
                    this.tune = Abcjs.renderAbc('paper',this.myList[0])[0];
            },
            play(){
                if(this.boxPlay.isPause&&!this.synthControl.isStarted){
                    this.boxPlay.isPause=false;
                    this.synthControl.play()
                }
                else{
                    this.boxPlay.isPause = true
                    this.synthControl.pause()
                }
            },
            changeNext(){
                if (this.myList.length&&this.myList.length<1) return;
                this.listIndex+1<this.myList.length?this.listIndex++:this.listIndex = 0;
                this.tune = Abcjs.renderAbc('paper',this.myList[this.listIndex])[0];
                // console.log(this.tune,this.myList)
            },
            changePrevious(){
                if (this.myList.length&&this.myList.length<1) return;
                this.listIndex-1<0?this.listIndex = this.myList.length-1:this.listIndex--;
                this.tune = Abcjs.renderAbc('paper',this.myList[this.listIndex])[0];
                // console.log(this.tune)
            }
        },
        watch:{
            deep:true,
            'tune':{
                handler(newData,oldData){
                    this.setTune()
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @keyframes changDeg {
        0% {
            transform: rotateZ(0deg);
        }
        100% {
            transform: rotateZ(360deg);
        }
    }//动画样式
    move{
           animation:changDeg 20s linear 0.2s infinite;
       }//设置动画
    move_pause{
              animation-play-state:paused;
              -webkit-animation-play-state:paused;
          }//暂停动画
    #musicBox{
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
<style  lang="less">
 .abcjs-inline-audio{
        display: none;
    }
</style>