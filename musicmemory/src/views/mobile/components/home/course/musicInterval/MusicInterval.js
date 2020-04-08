import axios from 'axios/index'
class MusicInterval {
    constructor(options) {
        let defaults = {};
        this.opts = Object.assign(defaults, options);
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext);
        this.gainNode=this.audioCtx[this.audioCtx.createGain?'createGain':'createGainNode']();
    }

    async createSound(url1,url2){
       axios.post(url1,null,{responseType:'arraybuffer'}).then(res=>{
           this.audioCtx.decodeAudioData(res.data,(buffer)=>{
                   var bufferSource=this.audioCtx.createBufferSource();
                   bufferSource.buffer=buffer;
                   bufferSource.connect(this.audioCtx.destination);
                   bufferSource[bufferSource.start?'start':'noteOn'](0)
               },function (err) {
                   console.log(err)
               })
       });
        await sleep(1500);
        axios.post(url2,null,{responseType:'arraybuffer'}).then(res=>{
            this.audioCtx.decodeAudioData(res.data,(buffer)=>{
                var bufferSource=this.audioCtx.createBufferSource();
                bufferSource.buffer=buffer;
                bufferSource.connect(this.audioCtx.destination);
                bufferSource[bufferSource.start?'start':'noteOn'](0)
            },function (err) {
                console.log(err)
            })
        });
    }

}
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

window.MusicBox = MusicInterval;

export default MusicInterval;