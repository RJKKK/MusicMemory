const DAO = require('../../database');
const myfunctions = require('../../commonFunction');
const path = require('path')
var fs = require('fs');
var thunkify = require("_thunkify@2.1.2@thunkify");
var logoSrc = path.join(__dirname,'../public/clientsLogo/')
const admin = new DAO('mongodb://localhost:27017/','MusicMemory','admin');
const clients = new DAO('mongodb://localhost:27017/','MusicMemory','clients');
let fs_mkdir = thunkify(fs.mkdir)
function testAdminStatus(req){
	if (req.session.admin) return true;
	else return false;
}
function testClientStatus(req){
	if (req.session.client) return true;
	else return false;
}
module.exports = {
	/*****************管理系统接口函数**********************/
	//管理员用户登录
	async adminLogin(req,res){
		if(!req.body||!req.body.account) return res.sendStatus(400);
		admin.query({account:req.body.account,password:req.body.pwd}).then((arr=>{
			if (arr[0]) {
				var user = {'username':req.body.account};  
    			req.session.admin = user;
				return testAdminStatus(req)? res.send({result:'success'}):res.send({result:'fail'})
			}
			else{
				res.send({result:'fail'})
			}
		}))
	},
	//查询用户列表
	async getUsrList(req,res){
		// if (!testAdminStatus(req)) return res.send({result:false});
		let index = (!req.body.index||req.body.index<=0)?1:req.body.index;
		let pageSize = (!req.body.pageSize||req.body.pageSize<=0)?1:req.body.pageSize;
		let arr = await clients.query({},{_id:0},pageSize,(index-1)*pageSize)
		res.send(arr)
	},
	//添加用户
	async addclient(req,res){
		// if (!testAdminStatus(req)) return res.send({result:false});
		let status = false;
			if (req.body.account&&req.body.password&&req.body.email) {
				let result0 = await clients.query({$or:[{account:req.body.account},{email:req.body.email}]});
				if(!result0[0]){
					let name = req.body.name||"用户昵称未设置";
					let date=myfunctions.getDate();
					let logoUrl = logoSrc + req.body.account
					var err = await fs_mkdir(logoUrl,'0777')
					if(err)console.log(err);
					let result = await clients.insert({
						account:req.body.account,
						password:req.body.password,
						name:name,
						email:req.body.email,
						Date: date,
						logoUrl:logoUrl
					});
					if(result) status = true
				}
			if(status) return res.send('ok')
			else return res.send('fail');
		}
	},
	//删除用户
	async delclient(req,res){
		// if (!testAdminStatus(req)) return res.send({result:'未登录不得调用接口'});
		if(!req.body||!req.body.account) return res.send('fail');
			let result = await clients.delete({account:req.body.account});
			let logoUrl = logoSrc + req.body.account
			if(!result) res.send('fail');
			else{
				myfunctions.delDir(logoUrl)
				res.send('ok')
			}
	},
	//修改用户数据
	async updateclient(req,res){
		// if (!testAdminStatus(req)) return res.send({result:'未登录不得调用接口'});
		if(!req.body||!req.body.account) return res.send('fail');
		let result = await clients.update({account:req.body.account},req.body)
		if(!result) res.send('fail');
		else res.send('ok');
	}
	//
}