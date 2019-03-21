const mongoose = require('mongoose');
const baseUrl = 'mongodb://localhost:27017/test';
// mongoose.connect(baseUrl);
// mongoose.connection.on('connected',function(){
//     console.log('数据库已经连接');
// })
// mongoose.connection.on('error',function(err){
//     console.log('连接错误',+err)
// })
// mongoose.connection.on('disconnected',function() {
//     console.log('mongo连接中断');
// });
mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser:true}, function(err){

　　if(err){

　　　　console.log('mongo连接失败' + err)

　　}else{

　　　　console.log('mongo 已经连接成功!')

　　}

})
module.exports = mongoose;