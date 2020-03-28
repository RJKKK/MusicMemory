//参考文章
//《教你用原生JS造“钢琴”》
//文章链接:https://www.jianshu.com/p/4f4c8bbd9775
//作者：前端王睿
class  MusicBox {
    constructor( options) {
        let defaults = {
            loop: false, // 循环播放
            musicText: '',  // 乐谱
            autoplay: 60, // 自动弹奏速度
            type: 'triangle',  // 音色类型  sine|square|triangle|sawtooth
            duration: 2,  // 键音延长时间
            volume: 1,     // 音量
            mixing: true,  // 混合立体音
            // keyboard: true, // 键盘控制
        };

        //音符
        this.arrNotes = ['c', 'c#','d', 'd#','e', 'f', 'f#','g', 'g#','a','a#','b',
                         'c!', 'c!#','d!', 'd!#','e!', 'f!', 'f!#','g!', 'g!#','a!','a!#','b!',
                         '1', '1#','2','2#','3', '4','4#', '5', '5#','6','6#','7',
                         '1!', '1!#','2!','2!#','3!', '4!','4!#', '5!', '5!#','6!','6!#','7!',
                         'C', 'C#', 'D','D#', 'E', 'F','F#', 'G','G#', 'A', 'A#','B',
                         'C!', 'C!#', 'D!','D!#', 'E!', 'F!','F!#', 'G!','G!#', 'A!', 'A!#','B!',
        ];
        // this.selector = selector;
        this.opts = Object.assign(defaults, options);
        // 创建新的音频上下文接口
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        this.allFrequency = [
            //0
            {id:-39,value: 27.50},
            {id:-38, value: 29.13},
            {id:-37,value: 30.87},
            //1
            {id:-36,value: 32.70},
            {id:-35, value: 34.65},
            {id:-34,value: 36.71},
            {id:-33, value: 38.89},
            {id:-32,value: 41.20},
            {id:-31,value: 43.65},
            {id:-30, value: 46.24},
            {id:-29,value: 49.00},
            {id:-28, value: 51.91},
            {id:-27,value: 55.00},
            {id:-26, value: 58.27},
            {id:-25,value: 61.73},
            //2
            {id:-24,value: 65.40},
            {id:-23, value: 69.30},
            {id:-22,value: 73.42},
            {id:-21, value: 77.78},
            {id:-20,value: 82.41},
            {id:-19,value: 87.31},
            {id:-18, value: 92.50},
            {id:-17,value: 98.00},
            {id:-16, value: 103.83},
            {id:-15,value: 110.00},
            {id:-14, value: 116.54},
            {id:-13,value: 123.47},
            //3
            {id:-12,value: 130.81},
            {id:-11, value: 138.59},
            {id:-10,value: 146.83},
            {id:-9, value: 155.56},
            {id:-8,value: 164.81},
            {id:-7,value: 174.61},
            {id:-6, value: 185.00},
            {id:-5,value: 196.00},
            {id:-4, value: 207.65},
            {id:-3,value: 220.00},
            {id:-2, value: 233.08},
            {id:-1,value: 246.94},

            //4
            {id:0,value: 261.63},
            {id:1, value: 277.18},
            {id:2,value: 293.66},
            {id:3, value: 311.13},
            {id:4,value: 329.63},
            {id:5,value: 349.23},
            {id:6, value: 370.00},
            {id:7,value: 392.00},
            {id:8, value: 415.30},
            {id:9,value: 440.00},
            {id:10, value: 466.16},
            {id:11,value: 493.88},
            //5
            {id:12,value: 523.25},
            {id:13, value: 554.37},
            {id:14,value: 587.33},
            {id:15, value: 622.25},
            {id:16,value: 659.26},
            {id:17,value: 698.46},
            {id:18, value: 740.00},
            {id:19,value: 784.00},
            {id:20, value: 830.61},
            {id:21,value: 880.00},
            {id:22, value: 932.33},
            {id:23,value: 987.77},
            //6
            {id:24,value: 1046.5},
            {id:25, value: 1108.7},
            {id:26,value: 1174.7},
            {id:27, value: 1244.5},
            {id:28,value: 1318.5},
            {id:29,value: 1396.9},
            {id:30, value: 1480.0},
            {id:31,value: 1568.0},
            {id:32, value:1661.2},
            {id:33,value: 1760.0},
            {id:34, value:1864.7},
            {id:35,value:1975.5},
            //7
            {id:36,value: 2093.0},
            {id:37, value: 2217.5},
            {id:38,value: 2349.3},
            {id:39, value: 2489.0},
            {id:40,value: 2637.0},
            {id:41,value: 2793.8},
            {id:42, value:2960.0},
            {id:43,value: 3136.0},
            {id:44, value:3322.4},
            {id:45,value: 3520.0},
            {id:46, value:3729.3},
            {id:47,value:3951.1},
            //8
            {id:48,value: 4186.0},
            {id:49,value: 4434.9},
            {id:50,value: 4698.6},
            {id:51,value: 4978.0},
            {id:52,value: 5274.0},
            {id:53,value: 5587.7},
            {id:54,value: 5919.9},
            {id:55,value: 6271.9},
            {id:56,value: 6644.9},
            {id:57,value: 7040.0},
            {id:58,value: 7458.6},
            {id:59,value: 7902.1},
        ];
        this.arrFrequency = this.allFrequency.slice(15,97)
        this.speed = 60;
        this.paused = true;
        // if(this.opts.autoplay){
        this.speed = this.opts.autoplay === true ? this.speed : this.opts.autoplay;
            // this.playMusic(this.opts.musicText);
        // }
    }
    // 创建声音
    createSound(freq){
        // 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
        let oscillator = this.audioCtx.createOscillator();
        // 创建一个GainNode,它可以控制音频的总音量
        let gainNode = this.audioCtx.createGain();
        // 把音量，音调和终节点进行关联
        oscillator.connect(gainNode)
        // this.audioCtx.destination返回AudioDestinationNode对象，表示当前audio context中所有节点的最终节点，一般表示音频渲染设备
        gainNode.connect(this.audioCtx.destination);
        // 指定音调的类型  sine|square|triangle|sawtooth
        oscillator.type = this.opts.type;
        // 设置当前播放声音的频率，也就是最终播放声音的调调
        oscillator.frequency.value = freq;
        // 当前时间设置音量为0
        gainNode.gain.setValueAtTime(0,this.audioCtx.currentTime);
        // 0.01秒后音量为this.opts.volume
        gainNode.gain.linearRampToValueAtTime(this.opts.volume, this.audioCtx.currentTime + 0.01);
        // 音调从当前时间开始播放
        oscillator.start(this.audioCtx.currentTime);
        // this.opts.duration秒内声音慢慢降低，是个不错的停止声音的方法
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + this.opts.duration);
        // this.opts.duration秒后完全停止声音
        oscillator.stop(this.audioCtx.currentTime + this.opts.duration);
    }
    // 创建立体音（三和弦）,原理为x，x加高一个音阶，x降低一个音阶的音同时发生产生立体音效果
    // 一个音阶有12个半音，因此step为12
    //数字+15为弹奏音符在原始音符的相对偏移值
    createMusic(note){

        let index = this.arrNotes.indexOf(note);
        let step = 0;
        if(this.opts.mixing) step = 12;

        if(index !== -1){
            // this.createSound(this.arrFrequency.find(item => item.id === index - step).value);
            this.createSound(this.allFrequency.find((item,order) => order === index-step+15).value);
            this.createSound(this.allFrequency.find((item,order) => order === index+15).value);
            this.createSound(this.allFrequency.find((item,order) => order === index+step+15).value);
            // this.createSound(this.arrFrequency.find(item => item.id === index + step).value);
        }

    }
    // 播放乐谱
    playMusic(musicText) {

        let noteArr = musicText.split('|');
        let delayTime = 1000 * 60;

        (async () => {
            try{
                let i = 0;
                while (!this.paused) {
                    if(i >= noteArr.length){  // 停止或者循环
                        if(this.opts.loop){
                            i = 0;
                        }
                        else {
                            break;
                        }
                    }
                    let n = this.arrNotes.indexOf(noteArr[i]);  // 钢琴键位置
                    if(n !== -1){  // 发出乐音
                        this.createMusic(this.arrNotes[n]);
                    }
                    else{
                        switch (noteArr[i]) {
                            case '0': break; // 休止符
                            case '-': await sleep(delayTime / (2 * this.speed)); break; // 八分音符时值
                            case '=': await sleep(delayTime / (4 * this.speed)); break; // 十六分音符时值
                            case ' ': await sleep(delayTime / (this.speed)); break; // 四分音符时值
                            case '.': await sleep(delayTime*3 / (2*this.speed)); break; // 附点符时值
                            case '+': await sleep(delayTime*2 / (this.speed)); break; // 二分音符时值
                            case '++': await sleep(delayTime*4 / (this.speed)); break; // 全音符时值
                            default:  break; // 四分音符时值
                        }
                    }
                    i++;
                }
            }
            catch (e) {
                location.reload();
            }
        })();

    }
    // 停止播放
    setPause(flag){
        this.paused = flag;
    }
    //设置是否立体音
    setMixing(flag){
        this.opts.mixing=flag;
    }
    setLoop(flag){
        this.opts.loop=flag;
    }
    // 设置音乐类型
    setMusicType(type){

        this.opts.type = type;

    }
    //设置播放速度
    setPlaySpeed(speed){

        this.speed = speed;

    }
}
// 延迟执行
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

window.MusicBox = MusicBox;

export default MusicBox;
