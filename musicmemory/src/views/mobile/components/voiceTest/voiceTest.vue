<template>
    <div>
<!--        切换男女生源按钮-->
        <div style="position: relative;margin-top:2vh" class="clearFloat">
            <div class="genderSelected" style="position: absolute;right: 0px;margin-right: 1ch">
            <span class="fa fa-venus" aria-hidden="true" style="color:#ffb0f2;font-size:30px"></span>
            <van-switch v-model="gender" active-color="#a3d0ef" inactive-color="#ffb0f2" style="float: left;margin:0 .3rem" />
            <span class="fa fa-mars" aria-hidden="true" style="color:#a3d0ef;font-size:30px"></span>
             </div>
        </div>
        <div class="page_main" style="position: relative;padding-top:4vh">
            <span class="">{{this.pitchText}}</span>
        </div>
<!--        <span style="line-height: 30px">声源设置</span>-->
        <button @touchstart="start" @touchend="stop">Start</button>
        <button @click="stop">Stop</button>


        <div id="paper" ></div>
        <div id="canvas"></div>
    </div>
</template>

<script>
    import p5 from "p5";
    import "p5/lib/addons/p5.sound";
    import abcjs from "abcjs";
    import 'abcjs/abcjs-audio.css';
    import {PITCH_DATA,RANGE_DATA,Locale} from '../../../../data/DEFAULT_DATA.js'
    import Top from './Top.js'
    import EqualLoud from './EqualLoud.js'
    function getPitch(freq) {
        'use strict';
        var minIndex = 0;
        var maxIndex = PITCH_DATA.length - 1;
        var currentIndex;
        var currentElement;
        if (freq > PITCH_DATA[maxIndex].value)
            return PITCH_DATA[maxIndex];
            // return maxIndex

        while (minIndex <= maxIndex) {
            currentIndex = (minIndex + maxIndex) / 2 | 0;
            currentElement = PITCH_DATA[currentIndex];

            if (currentElement.value < freq) {
                minIndex = currentIndex + 1;
            } else if (currentIndex < maxIndex) {
                maxIndex = currentIndex;
            } else {
                if (currentIndex > 0 && Math.abs(PITCH_DATA[currentIndex].value - freq) >
                    Math.abs(PITCH_DATA[currentIndex - 1].value - freq)) {
                    // console.log(PITCH_DATA[currentIndex - 1]);
                    // console.log(currentIndex-1)
                    // return(currentIndex-1)
                    return PITCH_DATA[currentIndex - 1];
                    // return currentIndex-1;
                }
                // console.log(currentElement)
                // return(currentIndex)
                return currentElement;
            }
        }
        // console.log(0)
        // return null
        return PITCH_DATA[0];
    }
    function getRange(name) {
        var range = RANGE_DATA[name];
        if (range && !range.name) {
            for (var i = 0; i < PITCH_DATA.length; ++i) {
                var pitch = PITCH_DATA[i];
                if (pitch.inter == range.low) {
                    range.low = pitch;
                } else if (pitch.inter == range.high) {
                    range.high = pitch;
                }
            }
            range.name = Locale.get(name);
        }
        return range;
    }
    var top_model = {
        getValue: function() {
            data.tops = new Array(data.fft_size);
            if (!data.lock_spec) {
                var fft = data.mic_fft;
                data.spectrum = fft.analyze('db');
                data.sample_rate = fft.input.context.sampleRate;
                var max_eng = 120;
                data.highest_index = 0;
                data.highest_eng = 0;
                data.ori_spectrum = new Array(data.spectrum.length);
                for (var i = 0; i < data.x_max; ++i) {
                    var value = data.spectrum[i] + 140;
                    data.ori_spectrum[i] = value;
                    data.spectrum[i] = data.equal_loud.adjust(i, value);
                    if (value > data.highest_eng) {
                        data.highest_eng = value;
                        data.highest_index = i;
                    }
                    max_eng = Math.max(max_eng, data.ori_spectrum[i]);
                }
                data.max_eng = max_eng;
                data.top_eng_range = (data.max_eng - data.min_eng) * data.top_eng_range_rate;
            }
        },
        guessPitch: function() {
            var spectrum = data.spectrum;
            data.pitch = null;
            data.max_top = null;
            // ====================== first loop
            {
                var last_up_index = 0;
                var low_eng = 1000;
                var last_top = null;
                for (var i = 0; i < spectrum.length; i++) {
                    var eng = spectrum[i];
                    if (i > 0) {
                        if (eng > spectrum[i - 1]) {
                            last_up_index = i;
                        } else if (eng < spectrum[i - 1] && last_up_index > 0) {
                            var top = null;
                            if (!data.tops[last_up_index]) {
                                top = new Top(last_up_index,data);
                                if (!top.valid) {
                                    top = null;
                                }
                            }
                            // check invalid top
                            if (top) {
                                while (last_top) {
                                    if (last_top.axios_extend * 2 <= top.axios_extend) break;

                                    if (top.eng - low_eng >
                                        data.fake_top_rate * (last_top.eng - low_eng)) {
                                        // delete last top.
                                        for (var k = last_top.left_index; k <= last_top.right_index; ++k) {
                                            data.tops[k] = null;
                                        }
                                        low_eng = Math.min(low_eng, last_top.left_low_eng);
                                        last_top = last_top.left_top;
                                    } else if (last_top.eng - low_eng >
                                        data.fake_top_rate * (top.eng - low_eng)) {
                                        top = null;
                                        break;
                                    } else {
                                        break;
                                    }
                                }
                            }


                            if (top) {
                                top.left_low_eng = low_eng;
                                top.left_top = last_top;
                                for (let k = top.left_index; k <= top.right_index; ++k) {
                                    data.tops[k] = top;
                                }
                                last_up_index = 0;
                                last_top = top;
                                low_eng = top.eng;
                            }
                            if (eng < low_eng) {
                                low_eng = eng;
                            }

                        }
                    }

                }
            }

            // Guess pitch.
            var max_top = null; {
                data.highest_top = data.tops[data.highest_index];
                if (data.highest_top) {
                    max_top = data.highest_top;
                    var max_top_eng = data.highest_top.calculate(1);
                    var highest_total_eng = data.highest_top.total_eng;
                    var highest_overtone_count = data.highest_top.overtone_count;

                    data.accept_eng = 0; //(data.highest_top.eng - data.min_eng) / 4 + data.min_eng;
                    for (let i = 2; i < 10; ++i) {
                        var top = data.getTop(data.highest_top.left_index / i, data.highest_top.right_index / i);
                        if (!top) continue;
                        if (top.axios_extend <= 6) break;
                        var total_eng = top.calculate(i);
                        if (top.overtone_count <= highest_overtone_count) continue;
                        if (top.total_eng < highest_total_eng) continue;

                        if (total_eng > max_top_eng) {
                            max_top_eng = total_eng;
                            max_top = top;
                        }
                    }
                }

                if (max_top) {
                    var freq = max_top.axios_extend * data.sample_rate / 2 / data.fft_size;
                    data.pitch = getPitch(freq);
                    data.max_top = max_top;
                }
            }
        },
    };
    var data = {
        mic: null,
        audio: null,
        fft: null,
        spectrum: null,
        tops: null,
        pitch:null,
        input_pane: true,
        show_spec: true,
        show_vspec: true,
        show_piano: true,
        show_pitch_on_spec: false,
        use_mic: true,
        no_mic: false,
        debug: false,

        sample_rate: 44100,
        fft_size: 1024,
        max_db: 140,

        lock_spec: false,

        width: 800,
        padding_right: 50,
        x_max: 1000,
        avg_spec: 0,
        min_eng: 60,
        max_eng: 140,
        eng_delta: 20,
        image_scale: 1,
        fft_scale: 2,
        smooth: 0.01,
        fps: 5,

        overtone_count: 5,
        overtone_accept_count: 3,
        overtone_accept_percent: 0.99,
        mix_overtone: false,
        top_eng_range_rate: 0.03,
        fake_top_rate: 4,

        pitch_name: 'inter',
        range_name: 'man_high',

        getTop: function(left, right) {
            var max_eng = 0;
            var max_top = null;
            left = Math.floor(left);
            right = Math.ceil(right);
            for (var i = left; i <= right; ++i) {
                var top = this.tops[i];
                if (top && top.eng > max_eng) {
                    max_eng = top.eng;
                    max_top = top;
                }
            }
            return max_top;
        },

        init: function() {
            if (!window.navigator.getUserMedia) {
                this.no_mic = true;
            }

            var is_safari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

            if (!is_safari) {
                this.fft_size = 2048;
                this.fft_scale = 1;
            }
            this.line_value /= this.fft_size / 1024 * this.fft_scale;

        },
    };
    import Vue from 'vue';
    import { Switch } from 'vant';
    Vue.use(Switch);

    export default {
        name: "SoundControls",
        data() {
            return {
                gender: true,
                myp5: null,
                audioSwitch:false,
                voiceData : data,
                usrData:{},
                script:null,
                editor:null,
                visalPitch:''
            };
        },

        methods: {
            setupCanvas(s) {
                s.createCanvas(100, 100);
                if (!window.AudioContext) {
                    window.alert(Locale.get('no_support'));
                }
                data.init();
                data.equal_loud = new EqualLoud(s,data);
                data.fft = new p5.FFT(data.smooth, data.fft_size);
                if (!data.no_mic) {
                    //创建音频频谱分析对象
                    data.mic_fft = new p5.FFT(data.smooth, data.fft_size);
                    //从麦克风中获取声音
                    data.mic = new p5.AudioIn();
                    this.context = s.getAudioContext();
                    //data.mic_fft为音频频谱分析对象
                    //setInput：把声源放到分析器中
                    data.mic_fft.setInput(data.mic);
                }
            },
            drawCanvas(s) {
                top_model.getValue();
                top_model.guessPitch();
            },
            start() {
                if (!this.myp5) {
                    console.log(123)
                    this.myp5 = new p5(this.script, "canvas");
                }
                this.context.resume();
                this.voiceData.mic.start()
            },
            stop() {
                this.voiceData.mic.stop()
            }
        },
        mounted(){

            const vm = this;
            this.script = function(s) {
                s.setup = () => {
                    vm.setupCanvas(s);
                };
                s.draw = () => {
                    vm.drawCanvas(s);
                };

            };
        },
        watch:{
            'voiceData.pitch':{
                deep:true,
                handler(ndata,odata){
                   this.prePitch=ndata===null?odata:ndata;
                   if(this.prePitch!==null){
                       abcjs.renderAbc("paper", "X: 1\nM:4/4\n|:"+this.gender?this.prePitch.man:this.prePitch.woman);
                   }
                }
            }
        },
        computed:{
            pitchText(){
                return this.voiceData.pitch === null?this.prePitch:this.voiceData.pitch
            }
        }
    };
</script>
<style lang="less">
    .genderSelected{
       >span {
           display: block;
           float: left;
       }
       }
</style>