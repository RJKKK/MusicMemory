const MongoClient = require('mongodb').MongoClient;
class DAO{
	constructor(url,dbName,collectionName){
		this.url = url;
		this.dbName = dbName;
		this.collectionName = collectionName;
	}
	_connect(){
		return new Promise((resolve,reject)=>{
			MongoClient.connect(this.url,{useUnifiedTopology:true},
				(err,client)=>{
				if(err) return reject(err);
				resolve(client)
			})

		})
	}
	insert(obj,ismany){
		return new Promise((resolve,reject)=>{
		this._connect().then(client=>{
			let db = client.db(this.dbName)
			if(ismany){
				db.collection(this.collectionName).insertMany(obj).then(
					res=>{
					resolve(res);
					client.close();
				});
				
			}
			else{
				db.collection(this.collectionName).insertOne(obj).then(
					res=>{
					resolve(res.result);
					client.close();
				});
			}
		})
		})
	}
	delete(obj,ismany){
		return new Promise((resolve,reject)=>{
		this._connect().then(client=>{
			let db = client.db(this.dbName)
			if(ismany){
				db.collection(this.collectionName).deleteMany(obj).then(
					res=>{
					resolve(res);
					client.close();
				});
				
			}
			else{
				db.collection(this.collectionName).deleteOne(obj).then(
					res=>{
					resolve(res);
					client.close();
				});
			}
		})
		})
	}
	update(filter,updater){
		return new Promise((resolve,reject)=>{
			this._connect().then(client=>{
				let updateCpy = {$set:updater};
				let db = client.db(this.dbName);
				db.collection(this.collectionName).updateMany(filter,updateCpy).then(res=>{
					resolve(res);
					client.close()
				})
			})
		})
	}
	query(obj,obj2,limit,skip){
		let arr = [];
		obj = obj||{};
		obj2 = obj2||{};
		return new Promise((resolve,reject)=>{
			this._connect().then(client=>{
				let db = client.db(this.dbName);
				var queryRes = null;
				if (limit&&skip) 
					 queryRes = db.collection(this.collectionName).find(obj).project(obj2).limit(limit).skip(skip);
				if(limit&&!skip)
					 queryRes = db.collection(this.collectionName).find(obj).project(obj2).limit(limit);
				if(!limit&&skip)
					 queryRes = db.collection(this.collectionName).find(obj).project(obj2).skip(skip);
				if(!limit&&!skip)
					 queryRes = db.collection(this.collectionName).find(obj).project(obj2);
				queryRes.each((err,data)=>{
					// data===null?resolve(arr):arr.push(data);
					if(data!==null)arr.push(data)
						else{
							resolve(arr)
							client.close();
						}
				})
				
			})
		})
	}
}
module.exports = DAO