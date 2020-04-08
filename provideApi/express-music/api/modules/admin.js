({DAO} = require('../../database'));
const myfunctions = require('../../commonFunction');
const admin = new DAO('mongodb://localhost:27017/','MusicMemory','admin');
const clients = new DAO('mongodb://localhost:27017/','MusicMemory','clients');
module.exports = {
	/*****************管理系统接口函数**********************/
	//管理员用户登录
	async adminLogin(req,res){
		admin.query({account:req.body.account,password:req.body.pwd}).then((arr=>{
			if (arr[0]) {
				var user = {'username':req.body.account};  
    			req.session.admin = user;
				res.send({result:'success'});
			}
			else{
				res.send({result:'fail'})
			}
		}))
	},
	//查询用户列表
	async getUsrList(req,res){
		// if (!testAdminStatus(req)) return res.send({result:false});
		let index = req.body.index;
		let pageSize = req.body.pageSize;
		let arr = await clients.query({},{_id:0},pageSize,(index-1)*pageSize)
		res.send(arr)
	},
	//添加用户
	async addclient(req,res){
				let result0 = await clients.query({$or:[{account:req.body.account},{email:req.body.email}]});
				if(!result0[0]){
					let name = req.body.name||"用户昵称未设置";
					let date=myfunctions.getDate();
					let result = await clients.insert({
						account:req.body.account,
						password:req.body.password,
						name:name,
						email:req.body.email,
						Date: date,
						logoId:req.body.logoId||''
					});
					result?res.send('ok'):res.send('datebaseError')
				}
			else  res.send('fail');
	},
	//删除用户
	async delclient(req,res){
			let result = await clients.delete({account:req.body.account});
			if(!result) res.send('fail');
			else  res.send('ok')
	},
	//修改用户数据
	async updateclient(req,res){
		let result = await clients.update({account:req.body.account},req.body)
		if(!result) res.send('fail');
		else res.send('ok');
	}
	//
}