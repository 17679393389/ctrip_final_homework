const express = require('express');
const glob = require('glob');
const path = require('path');

const app = express(); 
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})
// 配置解析请求体
app.use(express.urlencoded());
// 挂载静态资源
app.use(express.static(path.join(__dirname, 'dist')));
// 统一自动化挂载路由
glob.sync("./routes/**/*.js").forEach(item => typeof require(item) === 'function' && app.use(require(item)));
// 监听端口号
app.listen(8000,()=> {
    console.log('http://127.0.0.1:8000');
});
