# gulp构建项目

全局安装`gulp-cli`

```nginx
npm install gulp-cli -g
```

## gulp3

安装gulp, 3和4版本配置差异较大

```nginx
yarn add gulp -D
```

## 1. gulp配置文件

```javascript
//gulpfile.js
const gulp = require('gulp')

//注册任务
gulp.task('taskName',callBack)
```

## 2. 常用`glup`插件

```javascript
gulp-concat //合并文件(js/css)

gulp-uglify //压缩js文件

gulp-rename //文件重命名

gulp-less	//编译less

gulp-sass	//编译sass

gulp-clear-css//压缩css

gulp-livereload//实时自动编译刷新

gulp-htmlmin	//压缩html

gulp-connect	//热加载, 配置一个服务器

gulp-load-plugins//打包插件(里边包含其他插件)
```

## 3. 重要API

```javascript
gulp.src(filePath/pathArr);
//指向指定路径的所有文件, 返回文件流对象
//用于读取文件

gulp.dest(dirPath/pathArr);
//指向指定的所有文件夹
//用于向文件夹中输出文件

gulp.task(name,[deps],fn)
//定义一个任务  通过gulp + 任务名调用

gulp.watch()
//监视文件的变化
```

## 4. 实例

目录结构， `gulpfile.js` 是 `gulp` 配置文件

```javascript
/src
	/css
	/js
		test1.js
		test2.js
	/less
	index.html
gulpfile.js
```

### 4.1 合并js

安装依赖，导入依赖

```javascript
yarn add gulp-concat gulp-uglify gulp-rename -D
```

创建任务

```javascript
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

//注册合并压缩js的任务
gulp.task('js',function(){
    return gulp.src('src/js/**/*.js')//两个**可深度遍历找到js目下深层目录js文件
        .pipe(concat('build.js'))//临时合并文件
        .pipe(gulp.dest('dist/js/'))//指定输出目录
        .pipe(uglify())         //压缩文件
        .pipe(rename({suffix:'.min'}))//可指定加上.min
    	//.pipe(rename('build.min.js'))//可直接命名
        .pipe(gulp.dest('dist/js/'))
});
```

需要注意的是，`gulp-ugify` 压缩js代码会移除未引用的代码。

### 4.3 编译less

安装依赖

```nginx
yarn add gulp-less gulp-clean-css -D
//gulp-less 编译less
//gulp-clean-css 压缩css
```

创建任务，这里只是将`less`编译为`css`输出到`src/css`目录下

```javascript
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');

//编译less任务
gulp.task('less',function(){
    return gulp.src('src/less/**/*.less')
        .pipe(less())//编译less
        .pipe(gulp.dest('src/css/'))//先输出到css目录下，此时还未压缩输出到dist
});
```

### 4.4 打包`css`

```javascript
//注册合并压缩css任务
gulp.task('css',function(){
    return gulp.src('src/css/**/*.css')
        .pipe(concat('build.css'))//合并, 先压缩, 先合并都可以，js也是一样，先重命名都可以
        .pipe(rename({suffix:'.min'}))//重命名
        .pipe(cleanCss({compatibility:'ie8'}))//压缩, 并提供兼容
        .pipe(gulp.dest('dist/css/'))//输出至dist
})
```

### 4.5 默认任务

一条命令完成以上操作

```javascript
gulp.task('default',['js','less','css'])//gulp3的异步任务可能导致问题见4.6

gulp.task('default',gulp.series(['js','less','css']))//gulp4 的写法, gulp4会严格按照指定顺序执行任务
```

### 4.6 task注意事项

`task`任务中使用`return`，使用默认任务时，可以观察到`terminal`中，所有任务同时开启，谁打包编译快，谁先结束，此时`gulp`是异步任务。

所以`gulp3`执行以上操作可能出现问题，假如`less`任务量很大，`less`还没执行完，`css`任务已经开始执行了，导致`less`任务白干活了。理想状态是必须保证`less`任务执行完毕再执行`css`任务，这样才能保证不出错。

```javascript
gulp.task('css',['less'],function(){}   //gulp3指定任务顺序方法
//css任务, 第二个参数, 指定当less任务结束, 再开始css任务, 保证任务的有效性
//less finished ; start css
```

### 4.7 处理html(压缩)

安装依赖

```nginx
yarn add gulp-htmlmin -D
```

创建任务，压缩`html`，这里需要注意的是压缩前`html`内导入`js css`资源的路径写法，需要按照压缩后`dist/*.html`的路径写法

```javascript
const htmlMin = require('gulp-htmlmin');

//注册压缩html的任务
gulp.task('html',function () {
    return gulp.src('src/index.html')
        .pipe(htmlMin({collapseWhitespace:true}))//压缩html, 主要去除空格
        .pipe(gulp.dest('dist/'))
        .pipe(rename('index'))
});
```

### 4.8 半自动进行项目构建

半自动是自动编译, 需要手动刷新页面

安装依赖

```nginx 
yarn add gulp-livereload -D
```

在需要执行的任务里面加上

```javascript
.pipe(liveReload())
```

创建任务

`gulp3` 写法

```javascript
const liveReload = require('gulp-livereload')
//半自动
gulp.task('watch',['default'],function(){
    liveReload.listen();//开启监听
    gulp.watch('src/js/*.js',['js'])//监听到js变化只需执行js任务
    gulp.watch(['src/less/*.less','src/css/*.css'],['css'])
})

//执行一次指令 gulp watch开始半自动项目构建
```

`gulp4` 写法

### 4.9 全自动进行项目构建

安装依赖

```nginx
yarn add gulp-connect gulp-open -D
```

在需要执行的任务中加上

```javascript
.pipe(connect.reload())
```

创建任务

```javascript
const connect = require('gulp-connect');
const open = require('gulp-open');
gulp.task('server',['default'],function(){
    //配置服务, 服务会读取所有当前配置
    connect.server({
        root:'dist/',//输出根目的
        livereload:true,
        port:5000
    })
    //启动server时open可以自动打开指定链接
    open('http://localhost:5000/')
})
//启动 gulp server
```

## gulp4

`gulp4` 较 `gulp3`配置差异。插件用法大致相同，`gulp4`不推荐使用`task`注册任务。

### 1. 合并js

安装依赖

```javascript
yarn add gulp-concat gulp-uglify gulp-rename -D
```

注册任务

```javascript
const {src,dest} = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const gulpJs = ()=>{
    return src('src/js/**/*.js',{sourcemaps:true})
        .pipe(concat('build.js'))//临时合并文件
        .pipe(dest('dist/js/'))//指定输出目录,输出build.js
        .pipe(uglify())//压缩js文件
        .pipe(rename({suffix:'.min'}))//min后缀
        .pipe(dest('dest/js/'))//输出build.min.js
}
exports.gulpJs = gulpJs;//gulp gulpJs指令调用
```

### 2. 编译less

安装依赖

```nginx
yarn add gulp-less gulp-clean-css -D
```

注册任务

```javascript
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');//下一步压缩css使用

const gulpLess = ()=>{
    return src('src/less/**/*.less')
        .pipe(less())//编译less
        .pipe(dest('src/css/'))////先输出到css目录下，此时还未压缩输出到dist
}
exports.gulpLess = gulpLess;
```

### 3. 打包css

```javascript
const gulpCss = ()=>{
    return src('src/css/**/*.css')
        .pipe(concat('build.css'))//合并 先压缩先合并都可以，js也是一样，先重命名都可以
        .pipe(rename({suffix: '.min'}))//命名
        .pipe(cleanCss({compatibility: 'ie8'}))//压缩, 提供兼容
        .pipe(dest('dist/css/'))//输出至dist
}
exports.gulpCss = gulpCss;
```

### 4. 处理html(压缩)

安装依赖

```nginx
yarn add gulp-htmlmin -D
```

注册任务

```javascript
const htmlMin = require('gulp-htmlmin');
const gulpHtml = ()=>{
    return src('src/index.html')
        .pipe(htmlMin({collapseWhitespace: true}))//压缩html,去除空格
        .pipe(dest('dist/'))
        .pipe(rename('home'))
}
exports.gulpHtml = gulpHtml;
```

### 5. 默认任务

`gulp4`中`series`会严格按顺序执行任务

```javascript
const {series} = require('gulp')
exports.build = series(gulpJs, gulpLess, guleCss, gulpHtml);
//gulp build调用
```

### 6. 半自动构建

半自动是自动编译, 需要手动刷新页面

安装依赖

```nginx 
yarn add gulp-livereload -D
```

在需要执行的任务里面加上

```javascript
.pipe(liveReload())
```

创建任务

```javascript
const liveReload = require('gulp-livereload');
const {watch} = require('gulp');
const reLoad = ()=>{
    liveReload.listen();
    watch('src/less/*.less',gulpLess)
}
exports.reLoad = reLoad;
//gulp reLoad开始半自动构建, 代码自动编译, 需要手动刷新页面
```

### 7. 全自动构建

安装依赖

```nginx
yarn add gulp-connect gulp-open -D
```

在需要执行的任务中加上

```javascript
.pipe(connect.reload())
```

创建任务

```javascript
const connect = require('gulp-connect');
//注册监视任务
const gulpWatch = ()=>{
    watch(['src/less/**/*.less'],parallel(gulpLess));
    watch(['src/css/*.css'],series(gulpCss));
    watch(['src/js/*.js'],parallel(gulpJs))
    watch(['src/index.html'],parallel(gulpHtml))
}
//全自动编译刷新
const startServer = ()=>{
    connect.server({
        root:'dist/',
        livereload:true,
        port:5000
    })
    gulpWatch()
}
exports.dev = series(gulpLess,guleCss,gulpJs,gulpHtml,startServer)
//初次编译并开启服务 gulp dev
```

### 8. package.json

<show-code>

```json
{
  "name": "gulp",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {},
  "devDependencies": {
    "gulp": "^4.0.2",
    "gulp-autoprefixer": "^7.0.1",
    "gulp-clean-css": "^4.3.0",
    "gulp-concat": "^2.6.1",
    "gulp-connect": "^5.7.0",
    "gulp-htmlmin": "^5.0.1",
    "gulp-less": "^4.0.1",
    "gulp-livereload": "^4.0.2",
    "gulp-rename": "^2.0.0",
    "gulp-uglify": "^3.0.2"
  }
}
```

</show-code>

上代码

<show-code>

```javascript
//commonJS规范
const {src,dest,series,watch,parallel} = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const htmlMin = require('gulp-htmlmin');
const connect = require('gulp-connect');
const gulpJs = ()=>{
    return src('src/js/**/*.js',{sourcemaps:true})
        .pipe(concat('build.js'))//临时合并文件
        .pipe(dest('dist/js/'))//指定输出目录
        .pipe(uglify())//压缩js文件
        .pipe(rename({suffix:'.min'}))
        .pipe(dest('dist/js/'))
        .pipe(connect.reload())
}
exports.gulpJs = gulpJs;

const gulpLess = ()=>{
    return src('src/less/**/*.less')
        .pipe(less())//编译less
        .pipe(dest('src/css/'))////先输出到css目录下，此时还未压缩输出到dist
        .pipe(connect.reload())
}
exports.gulpLess = gulpLess;

//注册合并压缩css文件
const gulpCss = ()=>{
    return src('src/css/**/*.css')
        .pipe(concat('build.css'))//合并 先压缩先合并都可以，js也是一样，先重命名都可以
        .pipe(rename({suffix: '.min'}))//命名
        .pipe(cleanCss({compatibility: 'ie8'}))//压缩, 提供兼容
        .pipe(dest('dist/css/'))//输出至dist
        .pipe(connect.reload())
}
exports.gulpCss = gulpCss;

//注册压缩html的任务
const gulpHtml = ()=>{
    return src('src/index.html')
        .pipe(htmlMin({collapseWhitespace: true}))//压缩html,去除空格
        .pipe(dest('dist/'))
        .pipe(rename('home'))
        .pipe(connect.reload())
}
exports.gulpHtml = gulpHtml;

//注册监视任务
const gulpWatch = ()=>{
    watch(['src/less/**/*.less'],parallel(gulpLess));
    watch(['src/css/*.css'],series(gulpCss));
    watch(['src/js/*.js'],parallel(gulpJs))
    watch(['src/index.html'],parallel(gulpHtml))
}
// exports.gulpWatch = gulpWatch;

//全自动编译刷新
const startServer = ()=>{
    connect.server({
        root:'dist/',
        livereload:true,
        port:5000
    })
    gulpWatch()
}
// exports.startServer = startServer;
exports.dev = series(gulpLess,gulpCss,gulpJs,gulpHtml,startServer)
```

</show-code>