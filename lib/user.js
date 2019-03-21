const mongoose = require('./db');
const Schema = mongoose.Schema;
//表结构
const userSchema = new Schema({
    username:String,
    password:String
});
const myModel = mongoose.model('User',userSchema);

class Userdb{
    //查询
    query(obj={},limit,skip){
        return new Promise((resolve,reject)=>{
            myModel.find(obj,(err,res)=>{
                // console.log("res-->>",res)
                if(err){
                    reject(err)
                }
                resolve(res)
            }).limit(limit).skip(skip)
        })
    }

    // 保存
    save(obj){
        const m = new myModel(obj);
        return new Promise ((resolve,reject)=>{
            m.save((err,res)=>{
                if(err){
                    reject(err);
                }
                resolve(res);
            })
        })
    }

    //删除
    del(obj){
        return new Promise((resolve,reject)=>{
            myModel.deleteOne(obj,(err,res)=>{
                if(err){
                    reject(err);
                }
                resolve(res)
            })
        })
    }

    // 更新
    update(obj,update){
        return new Promise((resolve,reject)=>{
            myModel.updateOne(obj,update,(err,res)=>{
                if(err){
                    reject(err);
                }
                resolve(res)
            })
        })
    }
}
module.exports = new Userdb;