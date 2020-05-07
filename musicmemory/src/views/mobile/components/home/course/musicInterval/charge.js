import MusicInterval from './MusicInterval.js'
import {PITCH_DATA} from '@/data'
import {pitchIntervalDetails} from '@/localStorage'
import {userDetails} from '@/Cookies'
import {voiceUrl} from '@/config'
class ChargeInterval{
    constructor(options){
        let res =  userDetails.get()
        console.log(res)
        this.account = res.account
        userDetails.isCleanLocalStorage(this.account)
        let defaults = {};
        this.opts = Object.assign(defaults, options);
        //先从浏览器中获取cookies，如果没有则创建今天的cookies
        this.trainingInterval = pitchIntervalDetails.get(this.account)
        console.log(this.trainingInterval)
        this.len = this.trainingInterval.length
        this.player = new MusicInterval()
    }

    correctChange(id){
      let num = this.trainingInterval.find(val=>val.id===id).current++;
      if(num>3) {
          this.trainingInterval.find((val, index) => val.id === id && this.trainingInterval.splice(index, 1))
          this.len--;
      }
        pitchIntervalDetails.set(this.account,this.trainingInterval)
        return this.trainingInterval
    }

    errorChange(id){
        this.trainingInterval.find(val=>val.id===id).current = 0;
        pitchIntervalDetails.set(this.account,this.trainingInterval)
        pitchIntervalDetails.del(this.account)
        return this.trainingInterval
    }

    prePlay(){
        console.log(this.trainingInterval)
        let index = Math.floor(Math.random()*this.len);
        let distance = this.trainingInterval[index].id;
        // console.log(this.trainingInterval[index].name)
        let random = Math.floor(Math.random()*(75-12)+12+1)
        let url1 = `${voiceUrl}${this.index2name(random)}`;
        let url2 = `${voiceUrl}${this.index2name(random + distance)}`;
        return {
            url1,url2,distance
        }
    }
    index2name(id){
        return PITCH_DATA[id]["inter"]+'.mp3'
    }
    play(url1,url2){
        this.player.createSound(url1,url2)
    }
    setError(set){
        this.trainingInterval.find((val,index)=>index === set).current = 0;
        pitchIntervalDetails.set(this.account,this.trainingInterval)

    }
}
export default ChargeInterval