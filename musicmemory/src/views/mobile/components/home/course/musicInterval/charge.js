import MusicInterval from '../MusicInterval.js'
import {PITCH_DATA,intervalName} from '@/data'
import {pitchIntervalDetails} from '@/localStorage'
import {userDetails} from '@/Cookies'
import {voiceUrl} from '@/config'
class ChargeInterval{
    constructor(options){
        let res =  userDetails.get()
        this.account = res.account
        userDetails.isCleanLocalStorage(this.account)
        let defaults = {count:2};
        this.opts = Object.assign(defaults, options);
        //先从浏览器中获取cookies，如果没有则创建今天的cookies
        this.trainingInterval = pitchIntervalDetails.get(this.account)['pitchInterval']
        this.done = pitchIntervalDetails.get(this.account)['done']
        this.len = this.trainingInterval.length
        this.player = new MusicInterval()
    }

    correctChange(id){
      let num = this.trainingInterval.find(val=>val.id===id).current++;
      if(num+1>=this.opts.count) {
          this.trainingInterval.forEach((val, index) => {
              if(val.id === id){
                  this.trainingInterval.splice(index, 1)
                  return true
              }
          })
          this.len--;
      }
        pitchIntervalDetails.set(this.account,this.trainingInterval,this.done)
        return this.trainingInterval
    }

    errorChange(id){
        this.trainingInterval.find(val=>val.id===id).current = 0;
        pitchIntervalDetails.set(this.account,this.trainingInterval,this.done)
        return this.trainingInterval
    }

    setDone(){
        this.done = true;
        this.trainingInterval = pitchIntervalDetails.get(this.account)['pitchInterval'];
        console.log( this.trainingInterval)
        pitchIntervalDetails.set(this.account,this.trainingInterval,this.done)
    }
    getDone(){
        return this.done
    }

    prePlay(){
        let index = Math.floor(Math.random()*this.len);
        let distance = this.trainingInterval[index].id;
        // console.log(this.trainingInterval[index].name)
        let random = Math.floor(Math.random()*(75-24)+24+1)
        let url1 = `${voiceUrl}${this.index2name(random)}.mp3`;
        let url2 = `${voiceUrl}${this.index2name(random + distance)}.mp3`;
        let tips=''
        if(distance>0) tips = '由低音到高音'
        if(distance<0) tips = '由高音到低音'
        return {
            url1,url2,distance, pitch1:this.index2name(random),
            pitch2:this.index2name(random + distance),
            answer:`${intervalName[Math.abs(distance)].join('/')}(${tips})`
        }
    }
    index2name(id){
        return PITCH_DATA[id]["inter"]
    }
    play(url1,url2){
        this.player.createSound(url1,url2)
    }

}
export default ChargeInterval