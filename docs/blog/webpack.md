# webpack

## 1. 安装使用

```javascript
npm install webpack webpack-cli -D	//安装到开发环境
```

使用时用npx 指令 会去node_modules/bin目录下找指令

```javascript
npm webpack -v //查看安装的webpack 版本
npx webpack 文件名	//默认会将文件打包到dist目录下
```

可在`package.json` 中`scripts`配置 	`webpack`的指令

## 2. webpack作用

​	1.可以解析文件之间的依赖关系`(ESModule / CommonJS)`进行打包，`webpack`是运行于`node`环境中。

## 3. 常见loader

**`url-loader`**

使用时需要`file-loader`把图片解析成base64位格式的字符串，解析成base64格式字符串 可以减少网络请求（只针对小图片）.

**`css-loader`**

处理css文件 ，并解析css代码。

**`style-loader`**

生成style标签，并把style标签插入到head标签后面。

**`less-loader`**

处理less文件，并解析less代码。

注意！！！！！！！

loader有使用顺序，例如less,less-loader-->css-loader-->style-loader，从后往前依次加载loader。

**`postcss-loader`**

处理兼容前缀,使用时安装配置**autoprefixer**

配置示例:

```javascript
//webpack.config.js
const path = require('path')
module.exports = {
    mode:'development',//打包后的代码在开发环境中 打包后的代码不会被压缩
    entry:'./src/index.js',//打包的文件
    output:{        //打包后文件的输入地址
        path:path.join(__dirname,'bundle'),//path必须是个绝对路径
    },
    //处理非js之外的文件
    module:{
        rules:[
            {
                test:/\.(gif|png|jpg)$/,//匹配到gif结尾
                use:[
                    {
                        loader: 'url-loader',
                        options: {   //在使用url-loader时可以进行的配置
                            limit: 8192 , //小于8K将图片解析成base64 大于8K则处理成图片
                            name:'[name][hash:8].[ext]',//设置打包后文件的名字
                        }
                    }
                ]
            },
            {
                test:/\.css$/,//匹配到css结尾
                use:['style-loader','css-loader']
            },
            {
                test:/\.less/,//匹配到less结尾
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    }
}
```

## 4. 打包css文件

需要的插件：

**`mini-css-extract-plugin`**

打包输出CSS文件

**`optimize-css-assets-webpack-plugin`**

优化打包后的CSS文件  压缩

**`html-webpack-plugin`**

创建html文件

示例配置:

```javascript
 // 把css代码打包成一个css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 优化打包后的css文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
    mode:'development',//打包后的代码在开发环境中 打包后的代码不会被压缩
    entry:'./src/index.js',//打包的文件
    output:{        //打包后文件的输入地址
        filename:'js/main.js',
        path:path.join(__dirname,'bundle'),//path必须是个绝对路径
    },
    //处理非js之外的文件
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    {loader:'css-loader',options:{importLoaders:1}},
                    //importLoaders代表import进来的资源；2代表css-loader后还需要使用几个loader
                    {loader: 'postcss-loader',options:{plugins:[require("autoprefixer")("last 100 versions")]}}
                ],
                exclude:path.resolve(__dirname,'/node_modules'),
                include:path.resolve(__dirname,'src')
            },
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'css/index.css'
        }),
        new OptimizeCssAssetsPlugin(),
        new HtmlWebpackPlugin({
            filename:'index.html',  //打包后文件的名字
            template:'./src/template.html',//   模板文件的名字
            // inject:false,   //是否将打包的css js文件注入到html中
            minify:{
                collapseWhitespace:true,    //压缩打包后的html代码
            },
            removeComments:true,//去掉注释
        })
    ]
}
```

## 5. 配置多页打包

### 多页打包

打包前

```javascript
a.css	a.js	对应html
b.css	b.js
template.html
```

`template.html`模板中可食用ejs语法`<%= htmlWebpackPlugin.options.属性%>`

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
<%= htmlWebpackPlugin.options.date %>
    我是模板
<!--我是注释-->
</body>
</html>
```

多页打包配置多入口，多出口，生成对应`html`。

打包配置

```javascript
// 把css代码打包成一个css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 优化打包后的css文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
    mode:'development',//打包后的代码在开发环境中 打包后的代码不会被压缩
    // entry:'./src/index.js',//打包的文件
    entry:{
        a:'./src/a.js',
        b:'./src/b.js'
    },
    output:{        //打包后文件的输入地址
        filename:'js/[name].js',
        path:path.join(__dirname,'bundle'),//path必须是个绝对路径
    },
    //处理非js之外的文件
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    {loader:'css-loader',options:{importLoaders:1}},
                    //importLoaders代表import进来的资源；2代表css-loader后还需要使用几个loader
                    {loader: 'postcss-loader',options:{plugins:[require("autoprefixer")("last 100 versions")]}}
                ],
                exclude:path.resolve(__dirname,'/node_modules'),
                include:path.resolve(__dirname,'src')
            },
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({//输出css文件
            filename:'css/[name].css'
        }),
        new OptimizeCssAssetsPlugin(),//压缩css文件
        new HtmlWebpackPlugin({
            filename:'a.html',  //打包后文件的名字
            template:'./src/template.html',//   模板文件的名字
            // minify:{
            //     collapseWhitespace:true,    //压缩打包后的html代码
            // }
            inject:true,//打包后css,js文件注入对应html
            chunks:['a'],
            title:'我是a.html的标题',
            date:new Date()
        }),
        new HtmlWebpackPlugin({
            filename:'b.html',  //打包后文件的名字
            template:'./src/template.html',//   模板文件的名字
            // minify:{
            //     collapseWhitespace:true,    //压缩打包后的html代码
            // },
            inject:true,//打包后css,js文件注入对应html
            chunks:['b'],
            title:'我是b.html的标题'
        })

    ]
}
```

## 6. devServer

安装`webpack-dev-server`

```javascript
npm install webpack-dev-server -D
```

`package.json`配置`scripts`

```javascript
"dev":"webpack-dev-server"
```

webpack.config.js配置

### 6.1 前台5000，后台3000。

index.js发起请求

```javascript
import axios from 'axios'
axios.get('/api/user')
axios.get('/api/home')
axios.get('/api/lala')
//向/api发起请求,devServer转发到3000端口
```

webpack.config.js配置

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
    mode:'development',//打包后的代码在开发环境中 打包后的代码不会被压缩
    entry:'./src/index.js',
    output:{        //打包后文件的输入地址
        filename:'js/main.js',
        path:path.join(__dirname,'bundle'),//path必须是个绝对路径
    },
    devServer:{
        // open:true,//自动打开浏览器
        port:5000,//本地服务端口
        contentBase:'./build',//开启的服务能够访问bundle目录下的资源
		//proxy配置端口转发
        proxy:{
            '/api':{
                target:'http://localhost:3000',//api开头的路径就转发
                pathRewrite:{'/api':'/'},    //路径重写
            },
            // '/home':'http://localhost:3000',
            // '/lala':'http://localhost:3000'
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/template.html'
        })
    ]
}
```

### 6.2 前台5000，无后台，用`devServer`模拟响应数据。

`index.js`发起请求

```javascript
import axios from 'axios'
axios.get('/api/user')
axios.get('/api/home')
axios.get('/api/lala')
//向/api发起请求,devServer中有这个接口响应
```

data.json`模拟数据

```javascript
{
  "user":{
    "name":"我是user的数据"
  },
  "home":{
    "name":"我是home的数据"
  },
  "lala":{
    "name":"我是lala的数据"
  }
}
```

`webpack.config.js`

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
const data = require('./data.json')
console.log(data)
const path = require('path')
module.exports = {
    mode:'development',//打包后的代码在开发环境中 打包后的代码不会被压缩
    entry:'./src/index.js',
    output:{        //打包后文件的输入地址
        filename:'js/main.js',
        path:path.join(__dirname,'bundle'),//path必须是个绝对路径
    },
    devServer:{
        // open:true,
        port:5000,
        contentBase:'./build',//开启的服务能够访问bundle目录下的资源
        //前台5000端口  不牵扯到后台
        before(app){
            app.get('/api/user',(req,res)=>{
                res.send(data.user)
            })
            app.get('/api/home',(req,res)=>{
                res.send(data.home)
            })
            app.get('/api/lala',(req,res)=>{
                res.send(data.lala)
            })
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/template.html'
        })
    ]
}
```

### 6.3 `webpack`是运行在`node`环境中的,可以用后台代码启动`wenpack`配置文件

`webpack-dev-middleware`中间件

server.js后台服务

```javascript
const express = require('express')

//在node环境中启动webpack
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');

//导入webpack的配置
const config = require('./webpack.config.js')
const compiler = webpack(config);
const app = express()

//使用中间件
app.use( middleware(compiler));

app.get('/user',(req,res)=>{
    res.send({name:'我是user的数据'})
})
app.get('/home',(req,res)=>{
    res.send({name:'我是home的数据'})
})
app.get('/lala',(req,res)=>{
    res.send({name:'我是lala的数据'})
})
app.listen(3000,()=>{
    console.log('3000端口运行了')
})
```

`webpack.config.js`

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
    mode:'development',//打包后的代码在开发环境中 打包后的代码不会被压缩
    entry:'./src/index.js',
    output:{        //打包后文件的输入地址
        filename:'js/main.js',
        path:path.join(__dirname,'bundle'),//path必须是个绝对路径
    },
    devServer:{
        // open:true,
        port:5001,
        contentBase:'./build',//开启的服务能够访问bundle目录下的资源
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/template.html'
        })
    ]
}
```

只需要启动`sever.js`，服务就能启动`webpack`配置。

## 7. webpack解析Vue

### 7.1 解析Vue

```javascript
vue-loader   //解析vue文件
vue-template-compiler //解析vue文件的结构template,script,style
vue-loader-plugin //确保使用了VueLoader    下载vue-loader就会有
```

index.js入口文件

```javascript
//依赖vue
import Vue from 'vue'
import App from './App.vue'
const vm = new Vue({
    // template:'<App/>',       //选择runtime+compiler 构建方式
    // components:{
    //     App
    // },
    render:h=>h(App)          //选择runtime 构建方式
}).$mount('#app')
```

App.vue

```javascript
<template>
    <div>
        {{msg}}
        <button @click="handleClick">按钮</button>
    </div>
</template>

<script>
    export default {
        methods:{
            handleClick(){
                console.log(this.msg)
            }
        },
        data(){
            return {
                msg:'我是根组件的数据'
            }
        }
    }
</script>

<style>
</style>
```

webpack.config.js

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
module.exports = {
    mode:'development',//打包后的代码在开发环境中 打包后的代码不会被压缩
    entry:'./src/index.js',
    output:{        //打包后文件的输入地址
        filename:'js/main.js',
        path:path.join(__dirname,'bundle'),//path必须是个绝对路径
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:['vue-loader']
            }
        ]
    },
    devServer:{
        open:true,
        port:5000,
        contentBase:'./build',//开启的服务能够访问bundle目录下的资源
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/template.html'
        }),
        new VueLoaderPlugin()////确保使用了VueLoader
    ],
    // resolve:{
    //     alias:{     //vue.esm.js该文件有 template compiler
    //   如果根组件有template选项  则必须配置  alias
    //   如果根组件没有template选项  则不需要配置  alias
    //         'vue$':'vue/dist/vue.esm.js'
    //     }
    // }
}
```

## 8. `babel`

`babel`解析js代码，例`ES6`转`ES5`，`babel/polyfill`的作用是填充高版本的js方法。

示例:

`index.js`中有map方法，导入`babel/polyfill`插件，就能实现给没有`map`方法的填充`map`方法,这里填充的不只是`map`方法,填充了所有数组方法，缺点，打包文件会变很大，必须配置按需打包。

```javascript
//babelrc配置了 useBuiltIns index.js就不需要导入插件了
//import "@babel/polyfill";
const arr = [1,2,3]
arr.map((item)=>{
    console.log(item)
})
```

### 8.1 babel使用

1.安装依赖

```javascript
npm install --save-dev babel-loader @babel/core
```

2.配置loader

```javascript
module: {
  rules: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  ]
}
```

3.创建`.babelrc`

`@babel/preset-env`将`ES6`代码，转为`ES5`

```javascript
npm install @babel/preset-env --save-dev
```

```javascript
{
  "presets": ["@babel/preset-env"]
}
```

示例：配置按需打包，`babelrc`:

```javascript
{
    "presets":[
        ["@babel/preset-env", {   //配置项
            "targets":{     //打包后代码的运行平台
                //"chrome": "79",
                "ie":"8"
            },
            "useBuiltIns":"usage"   // 默认值是false  表示不按需打包
        }]
    ]
}
//按需打包就能为了支持ie8填充部分方法,打包体积较小
//配置了 useBuiltIns index.js就不需要导入插件了
```

### 8.2 插件

**clean-webpack-plugin**	每次打包自动清除输出目录下的文件

**webpack.DefinePlugin**	webpack自带插件,可以注入变量

index.js

```javascript
const a = 1
const b = ()=>{
    console.log(2)
}
const arr = [1,2,3]
arr.map((item)=>{
    console.log(item)
})
console.log(DEV)//从webpack注入变量
console.log(HEAVEN)
```

## 9. webpack配置文件分离

### `webpack-merge`开发环境生产环境配置分离，合并多个配置文件。

管理webpack配置文件

```javascript
//新建build目录Vue2脚手架就是build目录存放配置文件
/build
	webpack.base.js
	webpack.dev.js
	webpack.pro.js
```

安装依赖

```javascript
npm install webpack-merge --save-dev
```

配置paceage.json scripts

```javascript
"build": "webpack --config ./build/webpack.pro.js",
"dev": "webpack-dev-server --config ./build/webpack.dev.js"
```

webpack.base.js

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
//清空  打包后的文件夹的所有资源
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')
const path = require('path')
module.exports = {
    entry:'./src/index.js',
    output:{        //打包后文件的输入地址
        filename:'js/main.js',
        path:path.join(__dirname,'../dist'),//path必须是个绝对路径
    },
    module:{
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/template.html'
        }),
        new CleanWebpackPlugin(),
        //该插件的作用是自动给入口文件  注入变量
        new webpack.DefinePlugin({
            DEV:JSON.stringify('development'),//或者双层引号写法
            HEAVEN:JSON.stringify({name:'heaven'})
        })
    ],
}
```

webpack.dev.js

```javascript
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const devConfig = {
    mode:'development',//打包后的代码在开发环境中 打包后的代码不会被压缩
    devServer:{
        // open:true,
        port:5000,
        contentBase:'./build',//开启的服务能够访问bundle目录下的资源
    },
}
module.exports = merge(baseConfig,devConfig)
```

webpack.pro.js

```javascript
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const proConfig =  {
    mode:'production',//打包后的代码在生产环境中 打包后的代码会被压缩
}
module.exports = merge(baseConfig,proConfig)
```

