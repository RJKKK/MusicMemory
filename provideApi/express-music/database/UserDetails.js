const DAO = require('./DAO')
const user = new DAO('mongodb://localhost:27017/','MusicMemory','client_detail');
({pitchInterval} = require('../staticData'))
class UserDetails{
    constructor(account){
       this.account= account
    }
     setup(){
        return new Promise((resolve, reject) => {
            user.insert({account:this.account,pitchInterval:pitchInterval}).then(res=>{
                resolve(res)
            },()=>{
                reject();
            })
        })
    }
    async delete(){
       let res = await user.delete({account:this.account})
        return res
    }
    async getPitchInterval(){
        // console.log(this.account)
        let res = await user.query({account:this.account},{_uid:false,account:false})
        return res[0]['pitchInterval']||{}
    }
}
module.exports = UserDetails