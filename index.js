const Koa = require('koa');
const app = new Koa();
const path = require('path');
const statics = require('koa-static');
const views = require('koa-views');
const router = require('./router');
const bodyparser = require('koa-bodyparser')
// const Router = require('koa-router');
// const route = new Router();
app.use(bodyparser())
// 配置静态资源
const staticPath = './static'
app.use(statics(path.join(__dirname,staticPath)));

//配置模板引擎ejs
app.use(views(path.join(__dirname,'./views'),{
    extension:'ejs'
}))

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods);

app.listen(3000,function(){
    console.log('服务启动')
})