const Router = require('koa-router');
const User = require('../lib/user')

const login = new Router();
login.get('/',async (ctx)=>{
    let title = '登录';
    await ctx.render('index',{
        title
    })
}).post('/',async(ctx)=>{
    const data = ctx.request.body;
    // console.log(data)
    let queryUserName = await User.query({username:data.username});
    // let queryUserName = await User.save(data);
    if(queryUserName.length>0){
        if(queryUserName[0].password === data.password){
            ctx.body={
                code:1,
                msg:'登录成功'
            }
        }else {
            ctx.body = {
                code:0,
                msg:'密码错误'
            }
        }
    }else{
        ctx.body = {
            code:-1,
            msg:'账号不存在请注册'
        }
    }
})

const register = new Router();
register.get('/',async (ctx)=>{
    let title = '注册';
    await ctx.render('register',{
        title
    })
}).post('/',async(ctx)=>{
    const data = ctx.request.body;
    // console.log('data-register->>',data)
    let saveInfo = await User.save(data);
    // console.log("saveInfo-->>",saveInfo)
    if(saveInfo){
        ctx.body = {
            code:1,
            msg:'注册成功'
        }
    }else{
        ctx.body = {
            code:-1,
            msg:'注册失败'
        }
    }
})

const info = new Router();
info.get('/',async (ctx)=>{
    let title='信息查询';
    await ctx.render('info',{
        title
    })
})


let router = new Router();
//表格初始化+分页
router.get('/info/table',async (ctx,next)=>{
    // console.log(ctx.query)
    let limit = Number(ctx.query.length);//单页显示记录数
    let skip = Number(ctx.query.start);//每页开始序号
    let data = {};
    if(ctx.query.username){
        data = {
            username:ctx.query.username
        }
    }
    let search = await User.query(data,limit,skip);
    let count = await User.query(data);
    if(search){
        ctx.body = {
            aaData:search,
            iTotalDisplayRecords: count.length,
            iTotalRecords: count.length
        }
    }
})
// 删除操作
router.get('/info/del',async (ctx,next)=>{
    // console.log('del-->>',ctx.query.dataNo)
    let del = await User.del({_id:ctx.query.dataNo});
    if(del.deletedCount == 1){
        ctx.body = {
            code:1,
            msg:'删除成功'
        }
    }else{
        ctx.body = {
            code:0,
            msg:'删除失败'
        }
    }
       
})


// update更新编辑操作
router.get('/info/update',async (ctx,next)=>{
    console.log('updata-->>',ctx.query)
    let update = await User.update({"_id":ctx.query._id}, { $set: { 'username': ctx.query.username,'password':ctx.query.password } })
    console.log("--update->>",update)
    if(update){
        ctx.body = {
            code:1,
            msg:'更新成功'
        }
    }else{
        ctx.body = {
            code:0,
            msg:'更新失败'
        }
    }
})

// router.use('/',home.routes(),home.allowedMethods);
router.use('/',login.routes(),login.allowedMethods());
router.use('/register',register.routes(),register.allowedMethods());
// router.use('/register', register.routes());
router.use('/info',info.routes(),info.allowedMethods());

module.exports = router;

// select * from curse where 