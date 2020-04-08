const MongoClient = require('mongodb').MongoClient;
class DAO{
	constructor(url,dbName,collectionName){
		this.url = url;
		this.dbName = dbName;
		this.collectionName =collectionName;
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
					resolve(res);
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
				db.collection(this.collectionName).delete(obj).then(
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
	query(obj){
		let arr = [];
		obj = obj||{};
		return new Promise((resolve,reject)=>{
			this._connect().then(client=>{
				let db = client.db(this.dbName);
				let queryRes = db.collection(this.collectionName).find(obj)
				queryRes.foreach((err,data)=>{
					data===null?resolve(arr):arr.push(data);
				})
				client.close();
			})
		})
	}
}
