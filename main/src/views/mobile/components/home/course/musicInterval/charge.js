import MusicInterval from './MusicInterval.js'
import cookies from 'js-cookie'
class ChargeInterval{
    constructor(options){
        let defaults = {};
        this.opts = Object.assign(defaults, options);
        //先从浏览器中获取cookies，如果没有则创建今天的cookies
        if (cookies.get('trainingInterval')){
            this.trainingInterval = JSON.parse(cookies.get('trainingInterval'))
        }
        else{
            this.trainingInterval = [
                {id: 0, times: 0},{id: 1, times: 0}, {id: 2, times: 0}, {id: 3, times: 0}, {id: 4, times: 0},
                {id: 5, times: 0}, {id: 6, times: 0}, {id: 7, times: 0}, {id: 8, times: 0}, {id: 9, times: 0},
                {id: 10, times: 0}, {id: 11, times: 0}, {id: 12, times: 0}, {id: -1, times: 0},{id: -2, times: 0},
                {id: -3, times: 0},{id: -4, times: 0},{id: -5, times: 0},{id: -6, times: 0},{id: -7, times: 0},
                {id: -8, times: 0},{id: -9, times: 0},{id: -10, times: 0},{id: -11, times: 0},{id: -12, times: 0},
            ];
            //cookies数据保存
           this.saveData()
        }
        this.len = this.trainingInterval.length
        this.player = new MusicInterval()
    }
        saveData(){
        var curDate = new Date();
        //当前时间戳
        var curTamp = curDate.getTime();
        //当日凌晨的时间戳,减去一毫秒是为了防止后续得到的时间不会达到00:00:00的状态
        var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
        //当日已经过去的时间（毫秒）
        var passedTamp = curTamp - curWeeHours;
        //当日剩余时间
        var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
        var leftTime = new Date();
        leftTime.setTime(leftTamp + curTamp)
        cookies.set('trainingInterval',this.trainingInterval,{expires: leftTime})

    }
    changeData(id){
      let num = this.trainingInterval.find(val=>val.id===id).time++;
      if(num>3) {
          this.trainingInterval.find((val, index) => val.id === id && this.trainingInterval.splice(index, 1))
          this.len--;
      }
      this.saveData()
    }
    prePlay(){
        let index = Math.floor(Math.random()*this.len);
        let distance = this.trainingInterval[index].id;
        let random = Math.floor(Math.random()*(75-12)+12+1)
        let url1 = '/api/getPianoSource/'+ random;
        let url2 = '/api/getPianoSource/'+ (distance + random);
        return {
            url1,url2,distance
        }
    }
    play(url1,url2){
        this.player.createSound(url1,url2)
    }
    setError(set){
        this.trainingInterval.find((val,index)=>index === set).times = 0;
        this.saveData()
    }
}
export default ChargeInterval