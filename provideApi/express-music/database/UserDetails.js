const DAO = require('./DAO')
const user = new DAO('mongodb://localhost:27017/','MusicMemory','client_detail');
({pitchInterval} = require('../staticData'))
class UserDetails{
    constructor(account){
       this.account= account
    }
    async setup(){
        let res = await user.update({account:this.account},{pitchInterval:pitchInterval})
        return res
    }
}
module.exports = UserDetails