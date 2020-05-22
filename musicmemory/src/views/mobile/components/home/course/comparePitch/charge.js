import MusicInterval from '../MusicInterval.js'
import {userDetails,comparePitch} from '@/Cookies'
import {voiceUrl} from '@/config'
import {PITCH_DATA} from '@/data'
class Charger{
    constructor(options){
        let defaults = {
            count:10,
            correct:0,
            total:0,
            done:false,
            len:10
        };
        this.account = userDetails.get().account
        this.player = new MusicInterval()
        this.opts = Object.assign(defaults, options);
        if (!comparePitch.get(this.account)){
            this.cookieObj = {
                account:this.account,
                ...this.opts
            }
            comparePitch.set( this.cookieObj)
        }
        else this.cookieObj = comparePitch.get(this.account)
    }
    prePlay(){
        let ran1 = Math.floor(Math.random()*80);
        let ran2 = Math.floor(Math.random()*80);
        let url1 = `${voiceUrl}${this.index2name(ran1)}.mp3`;
        let url2 = `${voiceUrl}${this.index2name(ran2)}.mp3`;
        let answer = 0;
        if(ran1>ran2){
            answer = 1
        }
        if (ran1<ran2){
            answer = 2
        }
        return {
            answer,url1,url2,
            pitch1:this.index2name(ran1),
            pitch2:this.index2name(ran2)
        }
    }
    index2name(id){
        return PITCH_DATA[id]["inter"]
    }
    play(url1,url2){
        this.player.createSound(url1,url2)
    }
    correctChange(){
        this.cookieObj.correct++
        this.cookieObj.total++
        this.cookieObj.count--
        console.log(this.cookieObj)
        comparePitch.set(this.cookieObj)
        return this.cookieObj.count
    }
    errorChange(){
        this.cookieObj.total++
        console.log(this.cookieObj)
        comparePitch.set(this.cookieObj)
        return this.cookieObj.count
    }
    setDone(){
        this.cookieObj.done = true;
        this.cookieObj.count = this.opts.count;
        console.log(this.cookieObj)
        comparePitch.set(this.cookieObj)
    }
    getDone(){
        return this.cookieObj.done
    }
}
export default Charger