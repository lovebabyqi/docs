# node相关

[node官方文档地址](http://nodejs.cn/api/)

## 1.fs(file system)模块

### 1.1 读

```javascript
fs.readFile(文件的路径,回调函数)
	//回调函数    异步的
	err  //如果文件的路径不存在 则err就是一个错误对象
	data //如果文件的路径存在 则data就是读取出的数据  数据是Buffer格式的
	Buffer//格式的数据可以使用toString()转成字符串

const data = fs.readFileSync(文件的路径)  
	//这个函数是同步的 函数的返回值是读取文件的数据
```

fs模块读取到的内容是Buffer格式

**示例:fs存取一张图片,读取到的内容是buffer**

```javascript
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname,'/public/uploads/001.jpg')

const bufferData = fs.readFileSync(filePath);
//得到的是buffer格式字符串
//buffer展示为16进制<Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 00 48 00 48...

//bufferData.toString('base64')方法可以将buffer转为字符串 base64位

const base64Data = bufferData.toString('base64')

//再从base64转回buffer,并存图片,看什么效果
const newBufferData = new Buffer(base64Data,'base64')

const newFilePath = path.join(__dirname,'/public/uploads/003.jpg')

fs.writeFileSync(newFilePath,newBufferData);
//这么做是因为目前只知道fs存图片用Buffer
```

### 1.2 写

```javascript
异步 
fs.writeFile('./1.txt','我是海文',function(err){
	console.log(err)
})
	参数1:路径,参数二:数据,参数3:回调函数
同步
fs.writeFileSync('路径',数据)
//需要注意,写文件操作时,如果路径存在(即文件存在),是修改文件内容
//如果路径不存在(文件不存在),才是创建文件,写入内容
```

### 1.3 其余方法

```javascript
//删除文件
fs.unlinkSync('D:/Windows 7 Documents/Desktop/正则题目答案1.html')

//创建新的空文件夹
fs.mkdirSync('D:/Windows 7 Documents/Desktop/day02')

//删除指定的文件夹
fs.rmdirSync('D:/Windows 7 Documents/Desktop/day02')


//读取指定文件夹的数据
fs.readdir('D:/Windows 7 Documents/Desktop/test',function(err,data){
    console.log(err,data)
})

//查看文件/文件夹的状态
console.log(fs.statSync('D:/Windows 7 Documents/Desktop/1.mp4'));


//判断文件是否存在
console.log(fs.existsSync('./buffer1.js'));

//rename(老路径,新路径,回调函数)  把原来的文件从老路径移到新路径 并且修改文件名
fs.rename('D:/Windows 7 Documents/Desktop/1.js','./buffer.js',function (err,data) {
    console.log(err, data);
})


/*
*   只要文件的状态改变了就会触发回调函数  nextStat是改变后的文件状态 preStat改变前的文件状态
*   watchFile(文件的路径,监听的频率,回调函数)
* */

console.log('执行')
fs.watchFile('./1.txt',{interval:23},function(nextStat,preStat){
    console.log(nextStat.size,preStat.size)
})
```

## 2. path

### 2.1.常用来读取或上传文件时设置路径

```javascript
console.log(path.join(__dirname,'images'))
//当前所处目录拼接上'/images'  /会自动处理
```

```javascript
//这个模块专门用来处理路径
const path = require('path')

console.log(__filename)

//序列化路径 返回一个对象
console.log(path.parse(__filename))

//查看文件的后缀名
console.log(path.extname(__filename))

//返回最后一个\后面的数据
console.log(path.basename(__filename))

//返回最后一个\前面的数据
console.log(path.dirname(__filename))
```

### 2.2 快速创建自定义目录

```javascript
const fs = require('fs')
const path = require('path')
exports.file = function(data){
    let {name,fileData} = data
    //如果heaven文件夹已经存在  就不创建了
    if(!fs.existsSync(name)){    //如果文件夹不存在  就创建文件夹
        fs.mkdirSync(name);
        fileData.forEach(item=>{
            const {type} = item;
            const fullpath = path.join(__dirname,name,item.name)
            if(type==='dir'){   //如果type是dir 就创建文件夹
                fs.mkdirSync(fullpath)
            }else{
                fs.writeFileSync(fullpath,'我是html文件')
            }
        })

    }
}
```

```javascript
const {file} = require('./file')
let programeData = {
    name:'heaven',  //heaven文件夹
    fileData:[
        {
            name:'css',
            type:'dir'
        },
        {
            name:'js',
            type:'dir'
        },
        {
            name:'images',
            type:'dir'
        },
        {
            name:'index.html',
            type:'file'
        }
    ]
}
file(programeData);
```

## 2.3 包管理器

### 2.3.1 npm  全称：node package manager（node的包管理器）

**node的模块分类**
	核心模块：**fs path http url querystring**
	自定义模块：自己写的模块
	第三方模块：别人写的模块

```javascript
npm
    开发环境：在开发阶段运行的代码    --save-dev  -D
    生产环境：当代码开发完毕 投放给用户使用时运行的代码  --save  -S  默认

    -g 全局安装 在任何目录下都可以使用cnpm指令 相当于环境变量

    npm init -y 初始化项目文件
    npm install 包名      下载包
    npm uninstall 包名     删除包
    npm install     自动下载package.json文件中的依赖
```

## 2.4 cmd简单命令

```javascript
cmd命令  command

window+R 打开命cmd窗口(命令行窗口 黑窗口)

d:  切到d盘目录
cd  --> change directory 跳转目录
cd ../  跳到上一级目录
cd /    跳到根目录
mkdir -->  make directory 创建目录
rmdir -->  remove directory 删除目录

cd.> 1.txt      创建1.txt文件
del 1.txt       删除1.txt文件
1.txt          打开当前的目录中的1.txt文件
```

## 2.5 express

### 2.5.1 express模块动态路由

**get数据:req.params**

**post数据 req.body**

**返回数据给前台 res.send**

```javascript
//引入express包
const express = require('express')
const app = express()
//前台的多个路径都可以匹配到后台的一个路径	动态路由
app.get('/article/:id/:xxx',function(req,res){
    // let {id} = req.params
    console.log(req.params)
    res.send(req.params)
})

//自动为public目录中的文件设置路由
app.use(express.static('public'))
app.listen(3002,()=>{
    console.log('3002端口成功运行');
})
```

### 2.5.2 experss获取post数据

解析post数据需要用到body-parser

```javascript
//引入express包
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//使用bodyParser
app.use(bodyParser.urlencoded({extended: false}))

//接受post方式发送的数据
app.post('/heaven', function (req, res) {
    console.log('post请求过来了');
    console.log(req.body)
    // res.end({name:'heaven'})
    //send函数是express新增的 这个方法可以发送数组和对象给前台
    res.send([1, 2, 3])
})

//自动为public目录中的文件设置路由	静态资源访问
app.use(express.static('public'))
app.listen(3001, () => {
    console.log('3001端口成功运行');
})
```

### 2.5.3 洋葱模型

```javascript
//引入express包
const express = require('express')

const app = express()

app.get('/',function(req,res,next){
    console.log(1)
    next()  //触发下个一个中间件函数
    console.log(2)
})

app.get('/',function(req,res,next){
    console.log(3)
    next()
    console.log(4)
})

app.get('/',function(req,res,next){
    console.log(5)
    // next()
    console.log(6)
})

app.get('/new',function(req,res,next){
    console.log(7)
    next()
    console.log(8)
})

app.listen(3003,()=>{
    console.log('3003端口成功运行');
})
```

## 2.6 koa

**get数据: cxt.params**

**post数据 cxt.request.body**

**返回数据给前台 cxt.body**

安装依赖:

```javascript
yarn add --save koa koa-static koa-router koa-bodyparser 
```

### 2.6.1 koa示例:

```javascript
const Koa = require('koa')
const static = require('koa-static');   //管理静态资源
const Router = require('koa-router');   //管理路由
const bodyParser = require('koa-bodyparser')
const path = require('path')//设置绝对路径需要用到
const app = new Koa()
const router = new Router();

//解析post数据
app.use(bodyParser());
//配置路由
app.use(router.routes()).use(router.allowedMethods());
app.use(static( path.join(__dirname,'public') ))

router.post('/heaven',cxt=>{
    console.log('执行',cxt.request.body)
    //返回数据
    cxt.body = {
        status:0,
        data:{}
    }
})
//动态路由
router.get('/:id',cxt=>{
    //  console.log('执行',cxt.params)
    const {id} = cxt.params;
    console.log(id);
})
app.listen(5001,()=>{
    console.log('5001端口成功运行');
})
```

**koa可以使用koa-cors包,允许跨域请求**

```javascript
yarn add koa-cors
```

```javascript
app.use(cors());//允许跨域请求
```

## 2.7 使用koa-multer上传图片

### 2.7.1 form表单提交(form提交可以跨域)

```html
<form action="http://localhost:3000/img/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="image" id='input'/>
    <input type="submit" value='submit'>
</form>
```

### 2.7.2multer配置

**相关依赖:**

```javascript
koa koa-bodyparser koa-static koa-multer koa-router
```

**上传成功后,返回图片url**

```javascript
const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const Static = require('koa-static')
const multer = require('koa-multer')
const router = new Router()
const path = require('path')
const fs = require('fs')
const app = new Koa()

const {imgUpload} = require('./controller/imgController')

app.use(BodyParser());
app.use(router.routes())
app.use(Static(path.join(__dirname,'public')))

//文件上传配置
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname);  //拿到后缀名
        cb(null, Date.now()  + extname);
        // cb(null, file.originalname);
    }
})
//加载配置
var upload = multer({ storage: storage });

//上传地址,这里的images和form表单提交保持一致
router.post('/img/upload',upload.single('image'),imgUpload)

app.listen(3000,()=>{
    console.log('3000端口开启成功')
})
```

**imgUpload**

```javascript
exports.imgUpload =  cxt=>{
    //拿到保存的文件名,拼接目录路径
    const {filename} = cxt.req.file
    cxt.body = {
        status:0,
        msg:'图片上传成功',
        data:{
            name:filename,
            url:`/uploads/${filename}`
        }
    }
}
```

## 2.8 Node.js Buffer 缓冲区

### 2.8.1 Buffer

Buffer 是存放二进制数据容器，类似 Python 的 Byte 类型。参考 - [字符编码](https://www.jmjc.tech/tutorial/python/sub-1) & [Base64](https://www.jmjc.tech/tutorial/python/86)。

```javascript
// utf-8 编码 
jmjc_utf8 = new Buffer('简明教程', 'utf-8')
console.log(jmjc_utf8) // <Buffer e7 ae 80 e6 98 8e e6 95 99 e7 a8 8b>

// utf-8 解码
jmjc = jmjc_utf8.toString()
console.log(jmjc) // 简明教程
```

### 2.8.2 缓冲区

Buffer 除了转码的作用外，它更多时候还用作缓冲区，用于数据的缓存。

```javascript
var buf = new Buffer(10) // 定义一个10字节的 Buffer
buf.write('...') // 缓存数据

console.log(buf) // <Buffer 2e 2e 2e 00 00 00 00 00 00 00>
console.log(buf.toString()) // ...
```

### 2.8.3 Base64

**Buffer 的 toString 方法，还提供了 Base64 数据的转换。**

```javascript
var b = new Buffer('JavaScript')
var s = b.toString('base64')
// SmF2YVNjcmlwdA==

var b = new Buffer('SmF2YVNjcmlwdA==', 'base64')
var s = b.toString()
// JavaScript
```

## 2.9 node事件循环机制

### 2.9.1 异步任务的分类

1.闳任务  macrotask

- setTimeout的回调

- setInterval的回调


2.微任务  microtask

- Promise.then的回调


### 2.9.2 执行机制

#### 1.node中

先执行完 本次遇到的所有的闳任务

再执行本次遇到的微任务

#### 2.浏览器端

先执行闳任务 并且把本次闳任务遇到的微任务执行完

再执行下一次的闳任务  并且把本次闳任务遇到的微任务执行完

如此循环

```javascript
setTimeout(()=>{  //宏1
    console.log('timer1');
    Promise.resolve().then(function() { //微1
        console.log('promise1')
    })
    Promise.resolve().then(function() { //微3
        console.log('promise3')

        setTimeout(()=>{
            console.log('timer3')
        },0)
    })

}, 0)
setTimeout(()=>{        //宏2
    console.log('timer2')
    Promise.resolve().then(function() {  //微2
        console.log('promise2')
    })
    Promise.resolve().then(function() { //微4
        console.log('promise4')
    })
}, 0)
```

## 2.10 cookie和session

### 2.10.1 概念

#### cookie和session

都是把数据储存起来**储存时间的自已定义的，即使浏览器关闭了数据依旧会储存**

**cookie的原理**

在用户第一次访问某个网站的时候，是不会携带cookie的，服务器会让浏览器再一次访问的时候必须携带指定的cookie。再第二次访问服务器的时候，如果浏览器携带的cookie和服务器要求的cookie是一样，则服务器就认识了指定的用户。

**session的原理**

在用户第一次访问某个网站的时候，是不会携带cookie的，服务器会让浏览器再一次访问的时候必须携带指定的cookie（A），同时还会在服务端生成一个session，这个session是以指定的cookie(A)为属性名的。再第二次访问服务器的时候，如果浏览器携带的cookie和服务器session中cookie属性名是一样。则服务器就认识了指定的用户

**cookie特点**

- 存储在浏览器
- 不安全
- 存储数据的量比较小 4M

**session特点**

- 依赖于cookie实现的
- 存储在服务端
- 安全
- 存储数据的量比较大

Storage也可以存储数据

**localStorage**

*   存储数据的时间：永久
*   如果浏览器卸载，数据才会消失

**sessionStorage**

*   存储数据的时间：一次浏览器窗口周期 ，打开浏览器窗口到关闭浏览器窗口的时间差

### 2.10.2 express的cookie

依赖:

```javascript
yarn add --save cookie-parser
```

示例:

```javascript
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())

app.get('/',(req,res)=>{
    //获取所有去过的城市
    if(req.url==='/favicon.ico')return
    const cityArr =JSON.parse(req.cookies.express_cookie_city||'[]')
    res.send(`你的足迹是${cityArr}`)
})

app.get('/:city',(req,res)=>{
    if(req.url==='/favicon.ico')return
    //获取当前city
    const {city} = req.params
    //读取cookie
    const cityArr = JSON.parse(req.cookies.express_cookie_city||'[]')
    
    cityArr.push(city)
    
    //使用res响应体对象  来让前台存储cookie
    //res.cookie(属性名，属性值，cookie的存储时长)
    res.cookie('express_cookie_city',JSON.stringify(cityArr),{
        maxAge:1000*60*60*60,//存储时间为60个小时
    })
    res.send(`你今天去的城市是${city}`)
})

app.listen(3000,()=>{
    console.log('3000端口成功运行');
})
```

### 2.10.3 express的session

```javascript
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    name:'heaven',  //设置的cookie的属性名
    saveUninitialized: true,
    cookie: {
        secure: false,//可以不写
        maxAge:80000,//必须
    }
}))

app.get('/',(req,res)=>{
    //获取所有去过的城市
    if(req.url==='/favicon.ico')return
    const cityArr = JSON.parse(req.session.express_session_city||'[]')
    res.send(`你的足迹是${cityArr}`)
})
app.get('/:city',(req,res)=>{
    if(req.url==='/favicon.ico')return
    //获取当前city
    const {city} = req.params
    //读取session
    const cityArr = JSON.parse(req.session.express_session_city||'[]')
    //把这次去的地方添加到上次去的数组中
    cityArr.push(city)
    //设置session
    req.session.express_session_city = JSON.stringify(cityArr)
    res.send(`你今天去的城市是${city}`)
})

app.listen(3004,()=>{
    console.log('3004端口成功运行');
})
```

### 2.10.4 koa2的cookie

```javascript
const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()

//配置路由
app.use(router.routes()).use(router.allowedMethods())

router.get('/', async cxt => {
    //读取cookie
    const cityArr = JSON.parse(cxt.cookies.get('koa2_cookie_city') || '[]')
    console.log(cityArr);
    cxt.body = `你今天去的城市是${cityArr}`
})

router.get('/:city', async cxt => {
    const {city} = cxt.params
    //读取cookie
    const cityArr = JSON.parse(cxt.cookies.get('koa2_cookie_city') || '[]')
    //把这次去的地方添加到上次去的数组中
    cityArr.push(city)
    //cxt.cookies.set(属性名,属性值,时长)
    cxt.cookies.set('koa2_cookie_city', JSON.stringify(cityArr), {
        maxAge: 1000 * 60 * 60 * 60,   //存储60个小时
    })
    cxt.body = `你今天去的城市是${city}`
})

app.listen(3000, () => {
    console.log('3000端口成功启动')
})
```

### 2.10.5 koa2的session

```javascript
const Koa = require('koa')
const router = require('koa-router')()
const session = require('koa-session')
const app = new Koa()

//配置koa-session
app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'heaven', /** (string) cookie key (default is koa:sess) **/
    /** (number || 'session') maxAge in ms (default is 1 days) **/
    /** 'session' will result in a cookie that expires when session/browser is closed **/
    /** Warning: If a session cookie is stolen, this cookie will never expire **/
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) **/
    overwrite: true, /** (boolean) can overwrite or not (default true) **/
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) **/
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) **/
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)**/
};
app.use(session(CONFIG, app));

//配置路由  在中间件的最下面
app.use(router.routes()).use(router.allowedMethods())
router.get('/',async cxt=>{
    if(cxt.url==='/favicon.ico')return
    //读取session
    const cityArr = JSON.parse(cxt.session.koa2_session_city||'[]')
    cxt.body = `你今天去的城市是${cityArr}`
})
router.get('/:city',async cxt=>{
    if(cxt.url==='/favicon.ico')return
    const {city} = cxt.params
    //读取session
    const cityArr = JSON.parse(cxt.session.koa2_session_city||'[]')
    //把这次去的地方添加到上次去的数组中
    cityArr.push(city)
    // console.log(cityArr);
    //设置session
    cxt.session.koa2_session_city = JSON.stringify(cityArr)
    cxt.body = `你今天去的城市是${city}`
})

app.listen(3002,()=>{
    console.log('3002端口成功启动')
})
```

## 2.11 SPA单页应用刷新404问题

React,Vue都是单页面SPA应用，前台路由是不会发起网络请求的，但是F5刷新会发起请求。此时由于后台根本没有对应的中间件处理函数，刷新引起的请求得不到响应，404。

解决方案：模拟脚手架功能。本地开发的时候F5刷新，脚手架给我们返回了一个index.html

项目整合后，我们可以在后台代码中模拟

```javascript
// 配置前台路由 把前台打包放到Public目录下,可解决单页面刷新问题
app.use(cxt=>{
    cxt.set('Content-Type','text/html;charset=UTF-8')
    const data = fs.readFileSync(__dirname+'/public/index.html')
    cxt.body = data
})
```

## 2.12 linux下快速删除

当我们在`linux`系统中要删除数万或者数十万甚至数百万的文件时使用`rm -rf *`就不太好用，因为要等待很长一段时间。在这种情况之下我们可以使用`linux`系统命令`rsync`来巧妙的处理。`rsync`实际上用的是替换原理，处理数十万个文件也是秒删。 

1.先新建一个空目录用于替换

```nginx
mkdir /data/blank 
```

2.用rsync快速替换实现清空文件夹(绝对路径)

```nginx
rsync --delete-before -d -a -H -v --progress --stats /data/blank/ /var/edatacache/
# 或者
rsync --delete-before -d /data/blank/ /var/edatacache/
```

这样edatacache就被清空了

```nginx
选项说明：
–delete-before 接收者在传输之前进行删除操作
–progress          在传输时显示传输过程
-a                       归档模式，表示以递归方式传输文件，并保持所有文件属性
-H                      保持硬连接的文件
-v                       详细输出模式
–stats                给出某些文件的传输状态
-d                      transfer directories without recursing
```

3.也可以用来删除大文件

> 假如我们在/root/下有一个几十G甚至上百G的文件data，现在我们要删除它

创建一个空文件

```nginx
 touch /root/empty
```

用rsync清空/root/data文件

```nginx
 rsync --delete-before -d --progess --stats /root/empty /root/data
```

> 当SRC和DEST文件性质不一致时将会报错 
> 当SRC和DEST性质都为文件【f】时，意思是清空文件内容而不是删除文件 
> 当SRC和DEST性质都为目录【d】时，意思是删除该目录下的所有文件，使其变为空目录 