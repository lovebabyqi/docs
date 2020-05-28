# 记录一些方法实现。

## 1. 函数防抖节流

函数防抖，函数节流，听起来非常厉害，其实厉害的不是他的功能，也不是他的名字，而是他的设计思想，要学的也是他的设计思想。

### 场景

在进行窗口的resize、scroll，输入框内容校验等操作时，如果事件处理函数调用的频率无限制，会加重浏览器的负担，导致用户体验非常糟糕。此时我们可以采用**debounce（防抖）**和**throttle（节流）**的方式来减少调用频率，同时又不影响实际效果。 

### 1. 防抖

**当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。**

持续触发scroll事件时，并不执行handle函数，当1000毫秒内没有触发scroll事件时，才会延时触发scroll事件。

```javascript
 function debounce(fn,time) {
	// 创建一个标记用来存放定时器的返回值
	let timer = null;
	return function() {
		//每次当滚动的时候，把前一个定时器清除
		clearTimeout(timer);
		// 然后创建一个新的 setTimeout，
		// 这样就能保证滚动触发后的 interval 间隔内
		// 如果用户还滚动了的话，就不会执行 fn 函数
		timer = setTimeout(() => {
			fn.apply(this, arguments);
		}, time);
	}
}
// 处理函数
function handle() {
    console.log(Math.random()); 
}
// 滚动事件
window.addEventListener('scroll', debounce(handle, 1000));
```

### 2. 节流

**当持续触发事件时，保证一定时间段内只调用一次事件处理函数。**

持续触发scroll事件时，并不立即执行handle函数，每隔1000毫秒才会执行一次handle函数。

#### 1. 时间戳节流

```javascript
var throttle = function(func, delay) {
    var prev = Date.now();
    //let prev = 0	//让初始时间为0,可以确保第一次正常执行
    return function() {
        var context = this;
        var args = arguments;
        var now = Date.now();
        if (now - prev >= delay) {
            func.apply(context, args);
            prev = Date.now();
            //可以让prev = now 两种写法误差几乎不计,减少一次Date.now()
        }
    }
}
function handle() {
    console.log(Math.random());
}
window.addEventListener('scroll', throttle(handle, 2000));
```

#### 2. 定时器节流

当触发事件的时候，我们设置一个定时器，再次触发事件的时候，如果定时器存在，就不执行，直到delay时间后，定时器执行执行函数，并且清空定时器，这样就可以设置下个定时器。当第一次触发事件时，不会立即执行函数，而是在delay秒后才执行。而后再怎么频繁触发事件，也都是每delay时间才执行一次。当最后一次停止触发后，由于定时器的delay延迟，可能还会执行一次函数。

```javascript
var throttle = function(func, delay) {
    var timer = null;
    return function() {
        var context = this;
        var args = arguments;
        if (!timer) {
            timer = setTimeout(function() {
                func.apply(context, args);
                timer = null;
            }, delay);
        }
    }
}
function handle() {
    console.log(Math.random());
}
window.addEventListener('scroll', throttle(handle, 1000));
```

### 总结:

**函数防抖：**将几次操作合并为一此操作进行。原理是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。

**函数节流：**使得一定时间内只触发一次函数。原理是通过判断是否到达一定时间来触发函数。

## 2. 封装方法

### 2.1 深拷贝函数

浅拷贝：Object.assign()拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只拷贝那个引用。

```javascript
Object.assign()
Array.prototype.slice()
扩展运算符 ...
```

深拷贝：

```javascript
JSON.parse(JSON.stringify());
```

函数递归实现。

```javascript
//深拷贝函数
function deepCopy(newObj,oldObj){
    for(var k in oldObj){
    	// console.log(k)
        let item = oldObj[k]
        if(item instanceof Array){
        	newObj[k] = []
        	deepCopy(newObj[k],item)
        }else if(item instanceof Object){
        	newObj[k] = {}
        	deepCopy(newObj[k],item)
        }else{
        	newObj[k] = item
        }
    }
}
var obj = {
    id:1,
    name:'andy',
    msg:{age:18},
    likeColor:['pink','blue']
}
var o = {}
deepCopy(o,obj)
console.log(o,obj)
```

### 2.2 实现Object.create()

Object.create()方法，接收一个对象作为参数，创建对象，创建的对象隐式原型指向参数对象的显示原型

```javascript
Object.myCreate = function(obj){
    let xxx = {};
    xxx.__proto__ = obj;
    return xxx;
}
let obj = {name:'xiaoxiannv'};
let newObj = Object.myCreate(obj);
```

### 2.3 模拟instanceof

A instanceof B 

作用:

1.判断对象A的原型链上有没有构造函数B的显示原型

2.如果A是原始值,直接返回false

```javascript
{} instanceof Array		//false
//{} 的原型链 Object.prototype
//Array的显示原型	Array.proptype
```

```javascript
[] instanceof Array		//true
//[] 的原型链 Array.prototype
//Array的显示原型	Array.proptype
```

用模拟函数实现

```javascript
function myInstanceof(){
    let [obj,Fn] = arguments;
    if(typeof obj!=='object')return false;//如果传入的数据是原始值,直接返回false
    let value = null;
    while(value=obj.__proto__){
        if(value === Fn.prototype)return true;
        obj = value
    }
    return false;
}
console.log(myInstanceof(2,Object))
```

### 2.4 数组方法封装

#### 2.4.1 forEach

遍历数组，传递一个回调函数，对数组的每一项执行一次回调函数操作

```javascript
Array.prototype.myForEach = function(cb){
    for(let i=0;i<this.length;i++){
		cb(this[i],i)	//第三个参数可以传数组本身,在这里是this
    }
}
let arr = [5,6,8]
arr.myForEach(function(item,index){
    console.log(item,index)
})
```

#### 2.4.2 filter

过滤,遍历数组，创建一个新数组,该新数组包含源数组通过提供回调函数测试的所有元素.

```javascript
Array.prototype.myFilter = function(cb){
    let _arr = [];
    for(let i=0;i<this.length;i++){
        if(cb(this[i],i)){	//回调函数执行有返回值,说明符合回调函数条件//第三个参数可选
            _arr.push(this[i]);
        }
    }
    return _arr;
}
let arr = [2,5,3,4,8,5];
let result = arr.myFilter(function(item,index){
    return item > 3;
})
//result	[5,4,8,5]
```

#### 2.4.3 map

map方法，创建一个新数组,该新数组包含源数组的每一项执行回调函数的结果

```javascript
Array.prototype.myMap = function(cb){
    let _arr = [];
    for(let i=0;i<this.length;i++){
        _arr.push(cb(this[i],i));//第三个参数可选
    }
    return _arr;
}
let arr = [1,2,5];
let result = arr.myMap(function(item,index){
    return item*2
})
```

#### 2.4.4 reduce聚合

arr.reduce(reducer,initValue)

reducer函数接收4个参数(pre,next,index,数组本身)

pre上次reducer函数的返回值，next当前循环的项，index可选(当前项的索引),第四个参数数组本身

特点：initValue不传，reducer函数执行**arr.length-1**圈

传递initValue，可以为任意数据类型，作为第一次pre的值，reducer执行**arr.length**圈

```javascript
Array.prototype.myReduce = function(cb,value){
    if(value||value===0){
        for(let i=0;i<this.length;i++){
            value = cb(value,this[i]);
        }
    }else{
		for(let i=0;i<this.length-1;i++){
            value = cb(i===0?this[i]:value,this[i+1]);
        }
    }
    return value;
}
let arr = [1,2,3,4,5];
arr.myReduce(function(pre,next){
    return pre + next;
})
```

#### 2.4.5 数组去重

去重之所以Array.prototype没有，就是因为去重要根据实际数据结构实现。

**数组中每一项都是原始值**

```javascript
let arr = [2,5,8,'st',6,'st',2,5]
```

1.利用Set数据结构特点实现数组去重

```javascript
Array.prototype.uniqe = function(){
    return [...new Set(this)]
}
let arr = [2,5,8,'st',6,'st',2,5];
let newArr = arr.uniqe();//newArr	[2,5,8,'st',6]
```

2.利用reduce方法

```javascript
Array.prototype.uniqe = function(){
    return this.reduce((pre,next)=>{
        if(!pre.includes(next)){
           pre.push(next);
        }
        return pre;
    },[])
}
let arr = [2,5,8,'st',6,'st',2,5];
let newArr = arr.uniqe();//newArr	[2,5,8,'st',6]
```

3.indexOF,lastIndexOf方法

indexOf返回查询参数所在数组索引位置,从左往右

lastIndexOf返回查询参数所在数组索引位置,从右往左,索引仍然是正常索引,只是检索时从右边开始

```javascript
Array.prototype.uniqe = function(){
    for(let i=0;i<this.length;i++){
        let item = this[i];
        if(this.indexOf(item)!==this.lastIndexOf(item)){//找到的索引不等,即该项重复了
            this[i] = this[this.length-1];//将最后一项赋值到重复项位置,避免删除某项,造成数组项前移
            this.length--;//length--,删除最后一项
            i--;//前面操作将最后一项放到了重复项位置,i--防止跳过该项
        }
    }
    return this;
}
let arr = [2,5,8,'st',6,'st',2,5];
let newArr = arr.uniqe();//newArr [2,5,8,'st',6]
```

**针对数组每一项都是对象的**

```javascript
let arr2 = [
    {name:'xiaoxiannv',age:21},
    {name:'Andy',age:18},
    {name:'Andy',age:17},
    {name:'Jane',age:18},
    {name:'SuperMan',age:18}
]
```

```javascript
//基于某个属性进行去重
Array.prototype.uniqe = function(prop){
    let arr = [];
    return this.reduce((pre,next)=>{
        if(!arr.includes(next[prop])){
            arr.push(next[prop])
            pre.push(next)
        }
        return pre;
    },[])
}
```

#### 2.4.6 数组扁平化

一维数组[1,2,3,4,5]，多维数组[,1,2,3,[4,5,[6],7],8]

多维数组转化为一维数组就是数组扁平化

```javascript
let arr = [1,2,3,[4,5,[6],7],8]
```

扁平化方法很多

**1. arr.flat(Initfinty )**方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。 

```javascript
let arr2 = arr.flat(2)//接收一个参数描述数组深度,默认为1
console.log(arr2)//[1, 2, 3, 4, 5, 6, 7, 8]
```

**2. toSring()降维变成字符串	.split(','),逗号分割转为数组	 再将每一项转为数字.map(Number)**

```javascript
let arr3 = arr.toString().split(',').map(Number)
```

**3. JSON.stringify() 再用正则去掉方括号	`str.replace(/\[|\]/g,'')`**

```javascript
let arr4 = JSON.stringify(arr).replace(/\[|\]/g,'').split(',').map(Number)
```

**4. [ ].concat(...arr)**

```javascript
Array.prototype.myFlat = function(){
    let _this = this;
    while(_this.some(Array.isArray)){
        _this = [].concat(..._this);
    }
    return _this;
}
```

**5. reduce**

```javascript
Array.prototype.myFlat = function(){
    return this.reduce((_arr,item)=>{
        if(!Array.isArray(item)){//如果item不是数组,直接push
            _arr.push(item);
        }else{
            _arr.push(...item.myFlat());//如果是数组,进行递归方法类似深拷贝
        }
        return _arr;
    },[])
}
```

## 3. 赋值运算符理解

**1.赋值运算符的作用是把等号右侧的值给左侧的变量**

**2.并且该赋值运算返回的结果是等号右侧的值**

*示例1:*

```javascript
var a = 1;
var b = 2[a,b] = [b,a]
console.log(a,b)
```

```javascript
var a = 1
var b
a:1	,	b:undefined
b =  2[1,undefined] = [undefined,1]
b = 2[undefined] = [undefined,1]
2[undefined]是undefined
第二个等号赋值给undefined,有返回结果[undefined,1]
然后把返回结果赋值给b
因此b:[undefined,1]
```

*示例2:*

```javascript
var a = {n:1}	//地址1
var b = a		//地址1
a.n = a = {m:1}	//地址2 	.运算符优先级19比赋值运算符高
//所以理解为:地址1需要添加n属性
console.log(a,b);
//第一步	地址1需要添加n属性
//第二步	a-->地址2	{m:1}	并且该赋值运算符返回值啊地址2
//第三步	地址1.n= {m:1}	地址1{n:{m:1}}
//第三行第一个等号左侧由于.运算符优先级高,所以左侧的a还是地址1
a:{m:1}
b:{n:{m:1}}
```

## 4. 封装call，apply，bind

### 4.1 call()

call方法作用:修改this,调用函数执行,传递参数

```javascript
Function.prototype.myCall = function(){
    let [context,...args] = arguments;
    //console.log(this,context,args)
    //this指向test函数,context是obj,args接收到的参数数组
    context = context || window;//不传参,或传null,指向window
    context.__proto__.xxx = this;//将test函数添加到obj的对象原型
    context.xxx(...args);//通过obj调用test方法,this指向了obj//args是数组,扩展运算传递
    delete context.__proto__.xxx;//删除对象原型上的过渡方法
}
function test(){
    console.log(this,arguments)
}
var obj = {
    name:'Andy',
    age:18
}
test.myCall(obj,2,3)
test.myCall(null,4,5)
test.myCall()
```

### 4.2 apply

apply方法:修改this,调用函数,传递数组作为参数

同call相似,区别在于传递的参数

```javascript
Function.prototype.myApply = function(){
    let [context,args] = arguments;
    args = args || [];//不传参args应该是空数组,避免...args报错
    context = context || window;
    context.__proto__.xxx = this;
    context.xxx(...args);
    delete context.__proto__.xxx;
}
function test(){
    console.log(this,arguments);
}
var obj = {
    name:'Andy',
    age:18
}
test.myApply(obj,[2,3])
test.myApply(null,[4,5])
test.myApply()
```

### 4.3 bind

bind方法:修改this指向,不会自动执行函数,返回一个新函数

```javascript
Function.prototype.myBind = function(){
    console.log(this)
    let [context,...outterArgs] = arguments
    return (...innerArgs)=>{
        this.call(context,...outterArgs,...innerArgs)
    }
}
function test(){
    console.log(this,arguments);
}
var obj = {
    name:'Andy',
    age:18
}
var test1 = test.myBind(obj,2);
test1(4);
var test2 = test.myBind(null,3);
test2(5);
var test3 = test.myBind();
test3(6);
```

## 5. 模拟Vue事件车

#### 事件车对象

概念:

1.事件车是一个对象.

2.事件车上on方法绑定一个事件xxx,并且还有回调函数(**此时未执行**)

3.事件车上emit方法触发一个事件xxx,(**此时执行**on绑定的xxx事件回调函数,传递参数)

```javascript
class EventBus{
    constructor(){
        this.events = {}
    }
    on(type,Fn){
        if(!this.events[type]){//容错处理,重复绑定相同事件,只让第一次生效
            this.events[type] = Fn
        }
    }
    emit(){
        let [type,...args] = arguments;
        this.events[type].call(this,...args);//调用对应事件绑定的回调函数,修正this指向
    }
}
let bus = new EventBus()
bus.on('xxx',function(){console.log(this,arguments)})
bus.emit('xxx','传递的参数','传递多个参数')
```

## 6. vscode配置模板

这里以配置vue模板为例

文件-->首选项-->用户代码片段 找到vue.json，换行空串，空格缩进。

prefix是使用模板的指令

```json
{
  "Print to console": {
    "prefix": "vue",
    "body": [
      "<template>",
      "    <div class='$0'></div>",
      "</template>",
      "",
      "<script>",
      "",
      "export default {",
      "    name:'$1',",
      "    data(){",
      "        return {",
      "            ",
      "        }",
      "    },",
      "    methods:{",
      "        ",
      "    },",
      "}",
      "",
      "</script>",
      "",
      "<style scoped>",
      "    ",
      "</style>"
  ],
    "description": "Log output to console"
  },
}
```

配置好之后新建`vue`,输入`vue+tab`就能快捷生成模板,刀乐0,刀乐1是生成后鼠标位置.

注意：**`vue`指令可能会与其他指令名冲突,vscode识别不到**。

vue+tab生成模板不成功，tab以后变成其他指令，这时候需要更改vue文件语言模式。

打开一个.vue文件，ctrl+shift+p 找到Change Language Mode，选择.vue的配置文件关联，找到vue关联成功。

## 7. 异步任务理解

### 7.1 任务队列

首先我们需要明白以下几件事情：

- JS分为同步任务和异步任务
- 同步任务都在主线程上执行，形成一个执行栈
- 主线程之外，事件触发线程管理着一个任务队列，只要异步任务有了运行结果，就在任务队列之中放置一个事件。
- 一旦执行栈中的所有同步任务执行完毕（此时JS引擎空闲），系统就会读取任务队列，将可运行的异步任务添加到可执行栈中，开始执行。

根据规范，事件循环是通过任务队列的机制来进行协调的。一个 `Event Loop` 中，可以有一个或者多个任务队列(task queue)，一个任务队列便是一系列有序任务(task)的集合；**每个任务都有一个任务源(task source)，源自同一个任务源的 task 必须放到同一个任务队列，从不同源来的则被添加到不同队列。** `setTimeout/Promise` 等API便是任务源，而进入任务队列的是他们指定的具体执行任务。

<img src='/docs/images/任务队列.png' alt='任务队列'>

### 7.2 宏任务

(macro)task（又称之为宏任务），可以理解是每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）。

浏览器为了能够使得JS内部(macro)task与DOM任务能够有序的执行，**会在一个(macro)task执行结束后，在下一个(macro)task 执行开始前，对页面进行重新渲染**，流程如下：

```
(macro)task->渲染->(macro)task->...
```

**(macro)task主要包含：`script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、postMessage、MessageChannel、setImmediate`(Node.js 环境)**

### 7.3 微任务

microtask（又称为微任务），**可以理解是在当前 task 执行结束后立即执行的任务**。也就是说，在当前task任务后，下一个task之前，在渲染之前。

所以它的响应速度相比setTimeout（setTimeout是task）会更快，因为无需等渲染。也就是说，在某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕（在渲染前）。

**microtask主要包含：`Promise.then、MutaionObserver、process.nextTick`(Node.js 环境)**

### 7.4 运行机制

在事件循环中，每进行一次循环操作称为 tick，每一次 tick 的任务处理模型]是比较复杂的，但关键步骤如下：

- 执行一个宏任务（栈中没有就从事件队列中获取）
- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
- 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
- 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
- 渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）

流程图如下：

<img src='/docs/images/执行栈流程图.jpg' alt='流程图'>

### 7.5 Promise和async中的立即执行

我们知道Promise中的异步体现在`then`和`catch`中，所以写在Promise中的代码是被当做同步任务立即执行的。而在async/await中，在出现await出现之前，其中的代码也是立即执行的。那么出现了`await`时候发生了什么呢？

### 7.6 await做了什么

从字面意思上看await就是等待，`await` 等待的是一个表达式，这个表达式的返回值可以是一个`promise`对象也可以是其他值。

很多人以为await会一直等待之后的表达式执行完之后才会继续执行后面的代码，**实际上`await`是一个让出线程的标志。`await`后面的表达式会先执行一遍，将await后面的代码加入到`microtask`中，然后就会跳出整个`async`函数来执行后面的代码。**

浏览器端，同步任务执行完，才会执行异步，异步顺序,微任务早于宏任务。

```javascript
async function async1() {
    console.log('1');    //同步
    await async2();
    console.log('2');      //  进入异步微任务队列01 这句代码会包裹在async2的then回调中,成为异步
}
async function async2() {
	console.log('3');     //同步
}
console.log('4');        //	同步
setTimeout(function () {
	console.log('5');      //   进入异步宏任务队列01
}, 0)
async1();
new Promise(function (resolve) {
	console.log('6');       //同步   
	resolve();
}).then(function () {
	console.log('7');        //     进入异步微任务队列02
});
console.log('8');          //	同步
//41368275
```

## 8. 创建对象的多种方法

### 8.1 字面量创建对象

```javascript
var obj = {
    name:'Andy',
    age:18
}
```

字面量形式生成对象,该对象的对象原型指向Object.prototype

### 8.2 Object.create( )方法

```javascript
var obj2 = {
    name:'Toy',
    age:17
}
Object.create(obj2)//{}
```

Object.create( )方法生成的是空对象,这个空对象的对象原型指向参数对象obj2

### 8.3 new 操作符创建实例化对象

```javascript
function Star(name,age){
    this.name = name
    this.age =age
}
var obj3 = new Star('刘德华','18')
//obj3是实例化对象,该对象的对象原型指向构造函数Star.prototype
```

## 9. 函数模拟new操作符功能

由于new是操作符，并不是函数方法，所以我们只能实现，模拟函数功能达到new类似效果。

**new操作符作用:**

**1.生成一个空对象.**

**2.将构造函数内部的this指向该对象**

**3.,执行构造函数里的方法,给这个对象添加属性和方法**

**3.返回该对象**

```javascript
function myNew(){
    let [Fn,...args] = arguments
    let obj = {};
    obj.__proto__ = Fn.prototype;//把obj的对象原型指向Fn的原型对象
    Fn.call(obj,...args);
    return obj;
}
function Star(name,age){
    this.name = name;
    this.age = age;
}
let Andy = myNew(Star,'Andy',18)
```

## 10. 图片懒加载实现

**懒加载图片原理**

​	1.给每个图片都设置自定义属性data-image 图片的真正地址

​	2.页面滚动时,检测每个图片的位置.

​		如果图片在浏览器的可视区域之内,那就取出图片的自定义属性,赋值给src,加载图片

```javascript
<div class='container'>
	<img src='' data-image=''>*30	//30假设30张图片    
</div>
```

img需要设置宽高,

```css
html,body{
    height:500%;
}
.container{
    width:250px;
}
.container img{
    display:inline-block;
    width:100px;
    height:100px;
    background-color:darkgrey;
}
```

初始化给图片添加data-image属性,监听滚动

```javascript
async function init() {
    let result = await axios.get('http://47.100.98.54:9020/api/goods')
    result = result.data.data;
    let imgs = document.querySelectorAll('.container img[data-image]');
    imgs.forEach((img, index) => {
        img.dataset.image = result[index].picurl
    })
}
init().then(lazyLoad);
//监听滚动
function lazyLoad() {
    let imgs = document.querySelectorAll('.container img[data-image]');
    //再次触发lazyLoad应该获取有data-image属性的节点,没有data-image,图片已经加载
    if (!imgs.length) return;
    imgs.forEach(img => {
        let isIn = window.innerHeight - img.getBoundingClientRect().top > 0;
        if (isIn) {
        //如果图片位置在浏览器可视区域内,就将data-image赋值给src加载图片
        img.src = img.dataset.image
        img.onload = function () {
            delete this.dataset.image
            // img.removeAttribute('data-image')
            }
        }
    })
}
document.addEventListener('scroll', lazyLoad)
```

## 11. Object方法

### 11.1 Object.keys()

返回值:一个表示给定对象的所有**可枚举属性**的字符串数组。 

```javascript
Object.keys(obj)
//obj要枚举属性的对象
```

```javascript
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']
```

```javascript
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']
```

### 11.2 Object.values()

方法返回一个给定对象自身的所有**可枚举属性值**的数组 

```javascript
var obj = { foo: 'bar', baz: 42 };
console.log(Object.values(obj)); // ['bar', 42]
```

### 11.3 Object.entries()

方法返回一个给定对象自身可枚举属性的键值对数组

```javascript
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
```

**将Object转换为Map**
new Map() 构造函数接受一个可迭代的entries。借助Object.entries方法你可以很容易的将Object转换为Map:

```javascript
var obj = { foo: "bar", baz: 42 }; 
var map = new Map(Object.entries(obj));
console.log(map); // Map { foo: "bar", baz: 42 }
```

**分析**

```javascript
var obj = {name:'seven',age:18}
obj[{}] = 'asd'
console.log(obj)//{name:'seven',age:18,[object Object]:'asd'}
```

**对象的属性名是字符串,不是字符串会隐式转换为字符串**

### 11.4 Object.assign()

合并对象,Object.assign()合并后的对象指向第一个参数对象

```javascript
var obj1 = {a:1}
var obj2 = {b:2}
var obj3 = Object.assign(obj1,obj2)
obj3 === obj1	//true
```

**浅拷贝**,Object.assign()拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。

**封装深拷贝**(递归实现)

```javascript
//深拷贝函数
function deepCopy(newObj,oldObj){
    for(var k in oldObj){
    	// console.log(k)
        item = oldObj[k]
        if(item instanceof Array){
        	newObj[k] = []
        	deepCopy(newObj[k],item)
        }else if(item instanceof Object){
        	newObj[k] = {}
        	deepCopy(newObj[k],item)
        }else{
        	newObj[k] = item
        }
    }
}
var obj = {
    id:1,
    name:'andy',
    msg:{age:18},
    likeColor:['pink','blue']
}
var o = {}
deepCopy(o,obj)
console.log(o,obj)
```

### 11.5 Object.defineProperty()

字面量形式对象的特点

```javascript
var obj = {
	name:'heaven'
}
obj.name = '海文'     //可以重新赋值
for(var key in obj){    //可以枚举
	console.log(key)
}
delete obj.name   //可以删除
//obj name属性的特性  使用对象字面量形式声明的对象中  属性的特点
//1.可以重新赋值
//2.可以枚举
//3.可以删除
```

**Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。**

```javascript
Object.defineProperty(对象,给对象添加/修改的属性名,属性描述符)
```

属性描述符分为**数据描述符**和**存取描述符**

**1.数据描述符和存取描述符均具有**以下可选键值(默认值是在使用Object.defineProperty()定义属性的情况下)： 

1.1`configurable`

当且仅当该属性的 configurable 为 true 时，该属性`描述符`才能够被改变，同时该属性也能从对应的对象上被删除。**默认为 false**

1.2`enumerable`

当且仅当该属性的`enumerable`为`true`时，该属性才能够出现在对象的枚举属性中。**默认为 false**。

2.数据描述符

**数据描述符同时具有以下可选键值**： 

2.1`value`

该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。**默认为 undefined**。

2.2`writable`

当且仅当该属性的`writable`为`true`时，`value`才能被[赋值运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment_Operators)改变。**默认为 false**。

3.存取描述符

**存取描述符同时具有以下可选键值**： 

3.1`get`

```javascript
get  默认值 undefined
触发时间：获取对象的属性时触发
this指向：对象
回调函数的参数:无参数
```

**默认为 undefined**。

3.2`set`

```javascript
set  默认值 undefined
触发时间：给对象设置属性时触发
this指向：对象
回调函数的参数:给对象设置属性时,赋值运算符右侧的值。
```

```javascript
var person = {};
Object.defineProperty(person,'age',{	//注意属性名age是字符串
    get:function(){
        console.log('getter',this)
        return '18'
    },
    set:function(newValue){
        this.age = newValue		//set设置的属性必须同上,不然不会触发
    }
})
console.log(person);//{age:18}
person.age//	18
person.age = 20	//20
```

描述符可同时具有的键值

|            | configurable | enumerable | value | writable | get  | set  |
| ---------- | :----------: | :--------: | :---: | :------: | :--: | :--: |
| 数据描述符 |     Yes      |    Yes     |  Yes  |   Yes    |  No  |  No  |
| 存取描述符 |     Yes      |    Yes     |  No   |    No    | Yes  | Yes  |

## 12. parseInt补充

**parseInt(string, radix)**   将一个字符串 string 转换为 radix 进制的整数， radix 为介于2-36之间的数。

理解:string转换为一个radix进制的整数,**radix参数为n 将会把第一个参数看作是一个数的n进制表示，而返回的值则是十进制** 

有很多特殊情况:参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt) 

**示例:**

```javascript
parseint('22asd',8)
//2*8^1 + 2*8^0 -->18
-->18
```

parseInt会对string进行截取,**从左往右,遇到非数或小数点即停止**,字符串开头的空白符会被忽略

`'22asd'`截取到22

18的8进制数为22

```javascript
//控制台中
parseInt(1100,2)	//将2进制的1100转换为10 进制的数
-->12
```

**1.radix进制数只在2~36之间,不在范围内,直接返回NAN**

**2.第二个参数radix不给,默认是10进制**

**特例:radix进制数写个0 ,等价于10进制**



**示例1**

```javascript
parseInt(3,8)	//3
parseInt(3,2)	//NaN
parseInt(3,0)	//3
```

经典

```javascript
['1','2','3'].map(parseInt);
map遍历数组,parseInt接收到map的三个参数, 项,索引,本身
parseInt(1,0)	//1
parseInt(2,1)	//NaN
parseInt(3,2)	//NaN
1	Nan NaN
```

## 13. mock函数占位符

[mockjs官方文档地址](http://mockjs.com/)

------

### name占位符

  @name   英文姓名      @first    英文姓       @last      英文名

  @cname    中文姓名    @cfirst    中文姓     @clast     中文名

------

### 基础占位符

  @boolean   随机布尔值     

  @natural         随机自然数    

  @float            随机浮点数

  @charactor     随机单个字符     

  @string       随机多个字符串

  @range(start,stop,step)           随机生成数组   默认0开始

------

### date占位符

  @dateTime  随机的时间   年-月-日 时:分:秒

  @date          随机的时间  年-月-日

  @time          随机的时间  时:分:秒

  @nowTime  现在的时间  年-月-日 时:分:秒

  @now        

------

### image占位符

  @image(widthxheight,background,color,text)   随机创建图片的url地址

------

### 其他占位符   

@color          随机颜色     

@paragraph      随机英文段落      

@cparagraph     随机中文段落

@ip             随机ip

@id                  随机id 

@region               随机区域    华中

@province     随机省份

@city（true）      随机城市    无参数  长沙市             有参数   湖南省  长沙市

@county（true）随机县城 无参数  利辛市             有参数   安徽省  亳州市   利辛县

   

## 14. 数据绑定视图

**总觉得叫双向数据绑定，显得很浮夸。**

1.修改数据可以改变视图

2.视图改变可以修改数据（本质上也不是视图改变，input框数据本身也属于数据录入，还是相当于数据改变了视图）

**思路:通过Object.fefineProperty()实现,将input框value,span标签innerText和obj.text做绑定**

```javascript
<div>
    <input type='text' id='_input'>
    <span id='_span'></span>
</div>
```

```javascript
let obj = {};
Object.defineProperty(obj,'text',{
    get(){
        return _input.value
    },
    set(newValue){
         _span.innerText = _input.value = newValue;
    }
})
obj.text = '初始数据'	//初始化
_input.addEventListener('input',(e)=>{
    obj.text = e.target.value
})
```

## 15. Promise的特点

### 15.1 Promise的特点

当promise的状态是成功时,会触发所有then的第一个回调函数

当promise的状态是失败时,会触发所有then的第二个回调函数

**then**函数返回也是一个promise

​	值是执行的回掉函数的返回值

​	**状态默认是成功的,只有返回一个失败的promise,then返回的promise才是失败的**

**触发then函数时,then函数是同步执行的,then的实参(回调函数)是异步的**

​	**promise的状态可以是成功**

​	**promise的状态可以是失败**

​	**promise的状态可以是待机**

```javascript
let p = new Promise((resolve,reject)=>{
    console.log('promise内部的代码')
    setTimeout(()=>{
        resolve(20)
    },2000)
})
let x = p.then(
    res=>{
        console.log('resolve',res)
        return Promise.reject(23)//让promise失败
	},
    err=>{
        console.log('reject',err)
    }
)
console.log(p,x)
p.then(
    res=>{
        console.log('resolve2',res)
    },
    err=>{
        console.log('reject2',err)
    }
)
console.log('同步代码')
```

控制台中打印

<img src='/docs/images/promise01.png' alt='promise'>

### 15.2 实现Promise.then

promise特点:

​	Promise状态成功时,会触发所有then的第一个回调函数

​	Promise状态失败时,会触发所有then的第二个回调函数

Promise可以有多个then函数,then函数也是一个Promise

​	值是执行的回掉函数的返回值

​	状态默认是成功的,只有then回调返回一个失败的Promise,then返回的Promise才是失败的

```javascript
class MyPromise {
    constructor(cb) {
        this.status = 'pending' //定义初始状态
        this.value = undefined  //初始值
        this.tasks = [] //任务队列,存放then回调
        function resolve(value) {
            if (this.status !== 'pending') return   //防止重复定义状态
            this.status = 'resolved'
            this.value = value
            setTimeout(() => {  //延迟执行
                let item = null
                while (item = this.tasks.shift()) {
                    item.onResolve()
                }
            })
        }
        function reject(error) {
            if (this.status !== 'pending') return
            this.status = 'rejected'
            this.value = error
            setTimeout(() => {
                let item = null
                while (item = this.tasks.shift()) {
                    item.onReject()
                }
            })
        }
        cb(resolve.bind(this), reject.bind(this))
    }
    then(onResolve, onReject) {
        return new MyPromise((resolve, reject) => {
            let handle = callBack => {  //根据then的回调函数,确定then函数返回的Promise状态
                let result = callBack(this.value)
                if (result instanceof MyPromise) {
                    result.then(resolve, reject)
                } else {
                    resolve(result)
                }
            }
            this.tasks.push({
                onResolve: function () {
                    handle(onResolve)
                },
                onReject: function () {
                    handle(onReject)
                }
            })
        })
    }
}
```

执行观察:

```javascript
let p = new MyPromise(function(resolve,reject){
    console.log('同步代码1')
    setTimeout(()=>{
        reject(12)
    },3000)
})
let x = p.then(
    res=>{
        console.log('resolve1',res)
        return new MyPromise(function(resolve,reject){
            reject(22)
        })
    },
    error=>{
        console.log('reject1',error)
        return 122
    }
)
let y = p.then(
    res=>{
        console.log('resolve2',res)
        return new MyPromise(function(resolve,reject){
            reject(23)
        })
    },
    error=>{
        console.log('reject2',error)
        return 123
    }
)
console.log(p,x,y)
console.log('同步代码2')
```

<img src='/docs/images/MyPromise执行测试.png' alt='promise'>

## 16. 算法排序

### 数据准备

```javascript
function createArray(length){
    let _arr = new Array(length);
    for(let i=0,len=length;i<len;i++){
        _arr[i] = Math.floor(Math.random()*len);
    }
    return _arr;
}
let arr1 = createArray(20000);
let arr2 = arr1.slice(0);
let arr3 = arr1.slice(0);
let arr4 = arr1.slice(0);
let arr5 = arr1.slice(0);
let arr6 = arr1.slice(0);
let arr7 = arr1.slice(0);
let arr8 = arr1.slice(0);
let arr9 = arr1.slice(0);
let arr10 = arr1.slice(0);
```

### 一.冒泡排序

冒泡排序算法，它是最慢的排序算法之一，但也是一种最容易实现的排序算法。

**普通版:最简单(双层循环,比较,交换位置)**

```javascript
function bubbleSort1(arr){
    let length = arr.length;
    for(let i=0;i<length;i++){
        for(let j=0;j<length;j++){
            if(arr[i]>arr[j]){	//这是从大到小排序
                [arr[i],arr[j]] = [arr[j],arr[i]]
            }
        }
    }
    return arr;
}
console.time('标准冒泡排序运行时间')
bubbleSort1(arr1);
console.timeEnd('标准冒泡排序运行时间')
```

普通优化版:**(这版冒泡最快)**

```javascript
function bubbleSort2(arr){
    let length = arr.length;
    for(let i=0;i<length-2;i++){
        for(let j=0;j<length-1-i;j++){	//内层优化
            if(arr[i]>arr[j]){
                [arr[i],arr[j]] = [arr[j],arr[i]]
            }
        }
    }
    return arr;
}
console.time('标准优化版冒泡排序运行时间')
bubbleSort2(arr2);
console.timeEnd('标准优化版冒泡排序运行时间')
```

进化版:**最符合冒泡思路**

```javascript
function bubbleSort3(arr){
    let numElements = arr.length;
    let isDone = false;
    let isSort = 0;
    do{
        isDone = false;
        for(let i=0;i<numElements-1-isSort;i++){
            if(arr[i]>arr[i+1]){
                [arr[i],arr[i+1]] = [arr[i+1],arr[i]]
                isDone = true;
            }
        }
        isSort++;
    }while(isDone)
    return arr;
}
console.time('进化版冒泡排序运行时间')
bubbleSort3(arr3);
console.timeEnd('进化版冒泡排序运行时间')
```

数组长度2W比较耗时

<img src='/docs/images/冒泡排序耗时.png' alt='冒泡排序比较'>

### 二.选择排序

选择排序从数组的开头开始，将第一个元素和其他元素进行比较。检查完所有元素后，最小的元素会被放到数组的第一个位置，然后算法会从第二个位置继续。这个过程一直进行，当进行到数组的倒数第二个位置时，所有的数据便完成了排序。

```javascript
function selectSort(arr){
    let length = arr.length;
    let min;
    for(let i=0;i<length;i++){
        min = i;
        for(let j=i+1;j<length;j++){
            if(arr[min]>arr[j]){
                min = j;
            }
        }
        [arr[min],arr[i]] = [arr[i],arr[min]]
    }
    return arr;
}
console.time('选择排序运行时间')
selectSort(arr4);
console.timeEnd('选择排序运行时间')
```

选择排序相比于冒泡排序:**冒泡在不停地进行值的交换,选择排序只在每一圈内循环完成确定最小值位置后交换一次**

### 三.插入排序

插入排序有两个循环：外循环将数组元素挨个移动内循环则对外循环中选中的元素及它后面的那个元素进行比较。如果外循环中选中的元素比内循环中选中的元素小，那么数组元素会向右移动，为内循环中的这个元素腾出位置。

```javascript
function insertionSort(arr){
    let length = arr.length;
    let temp,inner;
    for(let outer=1;outer<length;outer++){
        temp = arr[outer];
        inner = outer;
        while(inner>0&&arr[inner-1]>=temp){
            arr[inner] = arr[inner-1];
            inner--;
        }
        arr[inner] = temp;
    }
    return arr;
}
console.time('插入排序运行时间')
insertionSort(arr5);
console.timeEnd('插入排序运行时间')
```

数组长度2W比较耗时

<img src='/docs/images/插入排序耗时.png' alt='插入排序'>

### 四.归并排序

归并排序是一种分而治之算法。其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。

```javascript
function mergeSort(arr){
    let length = arr.length;
    if(length>1){
        let middle = Math.floor(length/2);
        let left = mergeSort(arr.slice(0,middle));
        let right = mergeSort(arr.slice(middle,length));
        arr = merge(left,right)
    }
    return arr;
}
function merge(left,right){
    let i = 0;
    let j = 0;
    const result = [];
    while(i<left.length&&j<right.length){
        result.push((left[i]<right[j])?left[i++]:right[i++];
    }
    return result.concat(i<left.length?left.slice(i):right.slice(j));
}
console.time('归并排序运行时间')
mergeSort(arr6);
console.timeEnd('归并排序运行时间')
```

2W长度

<img src='/docs/images/归并排序耗时.png' alt='归并排序耗时'> 

### 五.快速排序

普通快排

```javascript
function quickSort1(arr){
    if(arr.length === 0){
        return [];
    }
    let lesser = [];
    let greater = [];
    let pivot = arr[0];
    for(let i=1;i<arr.length;i++){
        if(arr[i]<pivot){
            lesser.push(arr[i]);
        }else{
            greater.push(arr[i]);
        }
    }
    return quickSort1(lesser).concat(pivot,quickSort1(greater));
}
console.time('快速排序运行时间')
quickSort1(arr7);
console.timeEnd('快速排序运行时间')
```

**升级版本:**

```javascript
function quickSort2 (arr){
    return quick(arr,0,arr.length-1)
}
function quick(arr,left,right){
    let index;
    if(arr.length>1){
        index = partition(arr,left,right);
        if(left<index-1){
            quick(arr,left,index-1)
        }
        if(index<right){
            quick(arr,index,right);
        }
    }
    return arr;
}
function partition(arr,left,right){
    const pivot = arr[Math.floor((right+left)/2)];
    let i = left;
    let j = right;
    while(i<=j){
        while(arr[i]<pivot){
            i++;
        }
        while(arr[j]>pivot){
            j--;
        }
        if(i<=j){
            [arr[i],arr[j]] = [arr[j],arr[i]]
            i++;
            j--;
        }
    }
    return i;
}
console.time('快速升级版排序运行时间')
quickSort2(arr8 );
console.timeEnd('快速升级版排序运行时间')
```

**200W长度**

<img src='/docs/images/快速排序耗时.png' alt='快排轻易别用'>

## 17. sort排序

**有以下数组,根据条件实现排序**

```javascript
let arr = [
    { firstName: 'a12', lastName: 'b12', ext: 'k1', extType: 'VirtualUser', value: 12 },
    { firstName: 'g13', lastName: 'g2', ext: 'k9', extType: 'FaxUser', value: 11 },
    { firstName: 'f13', lastName: 'd3', ext: 'k6', extType: 'DigitalUser', value: 19 },
    { firstName: 'f12', lastName: 'c2', ext: 'k20', extType: 'DigitalUser', value: 17 },
    { firstName: 'f13', lastName: 'c6', ext: '', extType: 'AO', value: 17 },
    { firstName: 'f13', lastName: 'c2', ext: 'k18', extType: 'FaxUser', value: 17 },
    { firstName: 'f13', lastName: 'c1', ext: 'k22', extType: 'Dept', value: 17 },
    { firstName: 'k13', lastName: 'c1', ext: 'k', extType: 'VirtualUser', value: 20 }
]
```

**1.指定根据某一个属性排序,例根据firstName排序**

```javascript
function sortExtensionsByName(extensions,type) {
    extensions.sort(function (a, b) {
        return a[type].toUpperCase() - b[type].toUpperCase()
        ///let nameA = a[type].toUpperCase()
        // let nameB = b[type].toUpperCase()                
        // if (nameA < nameB) {
        //     return -1;
        // }
        // if (nameA > nameB) {
        //     return 1;
        // }
        // // names must be equal
        // return 0;
    })
    return extensions;
}
let newArr1 = sortExtensionsByName(arr,'firstName')
let newArr2 = sortExtensionsByName(arr,'ext')
let newArr3 = sortExtensionsByName(arr,'lastName')
console.log(arr, newArr1,newArr2,newArr3)
```

**2.根据firstName + lastName + ext 进行排序,方法同上**

```javascript
function sortExtensions(extensions) {
    extensions.sort(function(a,b){
        let nameA = (a.firstName + a.lastName + a.ext + '' ).toUpperCase();
        let nameB = (b.firstName + b.lastName + b.ext + '' ).toUpperCase();
        console.log(nameA,nameB);    //第一次nameA是数组中第[1]项,nameB是第[0]项
        return nameA>nameB?1:-1;      //第一项大于第0项 1 不交换顺序    否则-1交换顺序
    })
    return extensions;
}
let newArr4 = sortExtensions(arr);
console.log(newArr4);
```

**3.根据extType进行排序,指定顺序**    `'DigitalUser'<'VirtualUser'<'FaxUser'<'AO'<'Dept'`，`exType`只有这几个固定值

方法1.

指定规则数组,for循环，根据规则数组的书序及项，依次使用filter，concat连接得到结果

```javascript
let ruleArr = ['Dept','AO','FaxUser','VirtualUser','DigitalUser'];
let resultArr = [];
function sortExtensionsExtType(extensions){
	for(let i=0;i<ruleArr.length;i++){
		resultArr = resultArr.concat(arr.filter(item=>item.extType===ruleArr[i]));
	}
	return resultArr;
}
```

不用for循环,用reduce实现**简化**

```javascript
let result = ruleArr.reduce((pre,next)=>pre.concat(arr.filter(item=>itemm.extType===next)),[])
```

方法2 用sort( )实现,**根据规则数组项的索引进行判断排序**

```javascript
let arr = [
    { firstName: 'a12', lastName: 'b12', ext: 'k1', extType: 'VirtualUser', value: 12 },
    { firstName: 'g13', lastName: 'g2', ext: 'k9', extType: 'FaxUser', value: 11 },
    { firstName: 'f13', lastName: 'd3', ext: 'k6', extType: 'DigitalUser', value: 19 },
    { firstName: 'f12', lastName: 'c2', ext: 'k20', extType: 'DigitalUser', value: 17 },
    { firstName: 'f13', lastName: 'c6', ext: '', extType: 'AO', value: 17 },
    { firstName: 'f13', lastName: 'c2', ext: 'k18', extType: 'FaxUser', value: 17 },
    { firstName: 'f13', lastName: 'c1', ext: 'k22', extType: 'Dept', value: 17 },
    { firstName: 'k13', lastName: 'c1', ext: 'k', extType: 'VirtualUser', value: 20 }
]
```

比对数据

```javascript
let ruleArr = ['Dept','AO','FaxUser','VirtualUser','DigitalUser'];
let result = arr.sort((a,b)=> ruleArr.indexOf(a.extType)-ruleArr.indexOf(b.extType))
```

## 18. setTimeout模拟setInterval

为什么要用setTimeout模拟setInterval ？

### 18.1 简介

setTimeout 延迟一段时间执行一次 (Only one)；用clearTimeout()终止

```javascript
setTimeout(function(){··· }, n); // n毫秒后执行function
```

setInterval 每隔一段时间执行一次 (Many times)；用clearInterval()终止

```javascript
setInterval(function(){··· }, n); // 每隔n毫秒执行一次function
```

**注：setTimeout和setInterval的回调函数，都是经过n毫秒后被添加到队列中，而不是过n毫秒后立即执行。**

> W3C在HTML标准中规定，规定要求setTimeout中低于4ms的时间间隔算为4ms。 (不过也有一说是不同浏览器有不同的最小时间设定)。

### 18.2 知识储备

1、浏览器是个多进程应用。

首先你要知道 浏览器是个多进程应用，那这些进程里都包含哪些：

- Browser进程：浏览器的主进程（负责协调、主控），只有一个，作用：
  - 负责浏览器界面显示，与用户交互。如前进，后退等
  - 负责各个页面的管理，创建和销毁其他进程
  - 将Renderer进程得到的内存中的Bitmap，绘制到用户界面上
  - 网络资源的管理，下载等
- 第三方插件进程：每种类型的插件对应一个进程，仅当使用该插件时才创建
- GPU进程：最多一个，用于3D绘制等
- 浏览器内核（浏览器渲染进程，它内部是多线程的）：默认每个Tab页面一个进程，互不影响。

2、浏览器内核中的多线程。

- GUI渲染线程
- JS引擎线程：负责解析Javascript脚本，运行代码。
- 事件触发线程：归属于浏览器而不是JS引擎，用来控制事件循环（可以理解，JS引擎自己都忙不过来，需要浏览器另开线程协助），当JS引擎执行代码块如setTimeOut时（也可来自浏览器内核的其他线程,如鼠标点击、AJAX异步请求等），会将对应任务添加到事件线程中。由于JS的单线程关系，所以这些待处理队列中的事件都得排队等待JS引擎处理（当JS引擎空闲时才会去执行）。
- 定时触发器线程：因为JavaScript引擎是单线程的, 如果处于阻塞线程状态就会影响记计时的准确。计时完毕后，添加到事件队列中，等待JS引擎空闲后执行。
- 异步http请求线程。

### 18.3 setInterval缺点 与 setTimeout

> 再次强调，定时器指定的时间间隔，表示的是何时将定时器的代码添加到消息队列，而不是何时执行代码。所以真正何时执行代码的时间是不能保证的，取决于何时被主线程的事件循环取到，并执行。

```javascript
setInterval(function, N)  
//即：每隔N秒把function事件推到消息队列中
```

<img src="/docs/images/setinterval.png" alt='定时器'>

上图可见，setInterval每隔100ms往队列中添加一个事件；100ms后，添加T1定时器代码至队列中，主线程中还有任务在执行，所以等待，some event执行结束后执行T1定时器代码；又过了100ms，T2定时器被添加到队列中，主线程还在执行T1代码，所以等待；又过了100ms，理论上又要往队列里推一个定时器代码，**但由于此时T2还在队列中，所以T3不会被添加，结果就是此时被跳过**；这里我们可以看到，**T1定时器执行结束后马上执行了T2代码**，所以并没有达到定时器的效果。

综上所述，setInterval有两个缺点：

- 使用setInterval时，某些间隔会被跳过；
- 可能多个定时器会连续执行；

可以这么理解：**每个setTimeout产生的任务会直接push到任务队列中；而setInterval在每次把任务push到任务队列前，都要进行一下判断(看上次的任务是否仍在队列中)。**

因而我们一般用setTimeout模拟setInterval，来规避掉上面的缺点。

下面说个经典的例子：

```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
```

上面代码输出结果是：5个5，那么问题来了：是每隔1秒输出一个5 ？还是一秒后立即输出5个5？

答案是：一秒后立即输出5个5

setTimeout执行时：定时触发器线程、事件触发线程、JS引擎线程在干什么？

每个setTimeout都由定时触发器线程负责计时，计时完毕后，添加到事件队列中(即：事件触发线程)，等待JS引擎线程空闲后，再来依次执行。

为什么一秒后立即输出5个5？

首先JS引擎线程 要运行for循环，在每次循环中都会调用一个setTimeout函数，每个setTimeout计时结束后都会将其回调函数添加到 事件队列 中。等for循环结束后（即JS引擎线程空闲后），才开始按顺序执行事件队列中的函数。
每次循环都会在一秒后将回调函数添加到事件队列中，但由于两次相邻的循环时间是短到可以忽略不计的，所以表面看上去 一秒后立即执行了5次回调函数，即一秒后立即输出5个5。

当然为什么输出不是1到5，这个涉及到作用域的问题了，这里就不解释了。

### 18.4 setTimeout模拟setInterval

setTimeout模拟setInterval，也可理解为链式的setTimeout。

```javascript
var i = 0;
function time(){  //每隔1秒让++i
    console.log(++i);
    setTimeout(time,1000);
}
time(); //执行time函数
btn.onclick = function(){
    time = null; //重写time函数，从而起到关闭定时器的效果
}
```



上述函数每次执行的时候都会创建一个新的定时器，第二个setTimeout使用了arguments.callee()获取当前函数的引用，并且为其设置另一个定时器。好处：

- 在前一个定时器执行完前，不会向队列插入新的定时器（解决缺点一）
- 保证定时器间隔（解决缺点二）

## 19. 设计模式

### 1.什么是设计模式?

设计模式的定义:

​	**在面对对象软件设计过程中针对特定问题的简洁而优雅的解决方案**，通俗一点说就是在某种特定场合下对某个问题的一种解决方案。

​	在软件设计中，模式是一些经过了大量实际项目验证的优秀解决方案。熟悉这些模式的程序员，对某些模式的理解也许形成了条件反射。当适合的场景出现时，它们可以很快地找到某种模式作为解决方案。

**原则：找出程序中变化的地方，并将变化封装起来。**

### 2.基本概念

#### 2.1多态

​	多态的实际含义是：同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果。换句话说，给不同的对象发送同一消息的时候，这些对象会根据这个消息分别给出不同的反馈。

```javascript
var makeSound = function( animal ){
	if ( animal instanceof Duck ){
		console.log( '嘎嘎嘎' );
	}else if ( animal instanceof Chicken ){
		console.log( '咯咯咯' );
	}
};
var Duck = function(){};
var Chicken = function(){};
makeSound( new Duck() ); 
makeSound( new Chicken() ); 
```

当我们分别向鸭和鸡发出“叫唤”的消息时，它们根据此消息作出了各自不同的反应。但这样的“多态性”是无法令人满意的，如果后来又增加了一只动物，比如狗，显然狗的叫声是“汪汪汪”，此时我们必须得改动makeSound 函数，才能让狗也发出叫声。修改代码总是危险的，修改的地方越多，程序出错的可能性就越大，而且当动物的种类越来越多时，makeSound 有可能变成一个巨大的函数。

多态背后的思想是将“**做什么**”和“**谁去做以及怎样去做**”**分离开来**，**也就是将“不变的事物”与 “可能改变的事物”分离开来**。

```javascript
var makeSound = function( animal ){
	animal.sound();
};
var Duck = function(){}
Duck.prototype.sound = function(){
	console.log( '嘎嘎嘎' );
};
var Chicken = function(){}
Chicken.prototype.sound = function(){
	console.log( '咯咯咯' );
};
makeSound( new Duck() ); 
// 嘎嘎嘎
makeSound( new Chicken() ); 
// 咯咯咯
var Dog = function(){}
Dog.prototype.sound = function(){
	console.log( '汪汪汪' );
};
makeSound( new Dog() ); 
// 汪汪汪
// 这种情况下, makeSound和每个不同会叫的生物之间的关系就被完全分割
```

#### 2.2封装

封装的目的是将信息隐藏。一般而言，我们讨论的封装是封装数据和封装实现。

​	封装数据

```javascript
var myObject = (function(){
    var __name = 'sven'; // 私有（private）变量
    return {
        getName: function(){ // 公开（public）方法
            return __name;
        }
    }
})();
console.log( myObject.getName() ); // 输出：sven
console.log( myObject.__name ) // 输出：undefined
```

​	封装实现, 实现查找一个数组中的复合条件的对象的实现方法

```javascript
Array.prototype.find = function (findData) {
    let loaclKeys = [];
    for (let [index, elem] of this.entries()) {
        loaclKeys.push(...Object.keys(elem));
    }
    let argKeys = Object.keys(findData);
    let finalMatchData = [];
    argKeys.forEach(searchKey => {
        if (!loaclKeys.includes(searchKey)) {
            throw "没有符合条件的数据"; //简易判断
        }
    })
    return this.filter((item) => {
        let matchState = []
        for (let i = 0; i < argKeys.length; i++) {
            matchState.push(item[argKeys[i]] === findData[argKeys[i]]);
        }
        return !matchState.includes(false);
    })
}
```

### 3. 单例模式

单例模式的特点：**保证一个类仅有一个实例**，**并提供一个访问它的全局访问点**。

#### 1. 单例模式的简单实现

```javascript
var Singleton = function( name ){
    this.name = name;
    this.instance = null;
};
Singleton.prototype.getName = function(){
    alert ( this.name );
};
Singleton.getInstance = function( name ){ //提供一个访问Singleton类的实例的接口
    if ( !this.instance ){ // 检测是否已经存在这个实例
        this.instance = new Singleton( name ); //不存在则生成
    }
    return this.instance; // 已经存在则直接返回, 确保多次调用只会返回一次实例
};
var a = Singleton.getInstance( 'sven1' );
var b = Singleton.getInstance( 'sven2' );
alert ( a === b ); // true
```

#### 2. 透明的单例模式

​	“透明”的单例类: 用户从这个类中创建对象的时候，可以像使用其他任何普通类一样。 ( 这个所说的透明是指从外观上,看不出普通的类和透明的类之间的区别是啥 )

```javascript
let CreateUniqDiv = (function () {
    let instance;
    class createDiv{
        constructor(html){
            if (instance) {//是否已经创造一个实例, 如果已经创造过,则直接返回之前创造的
                return instance;
            }
            this.html=html;
            instance=this;//当第一次运行该函数后, 把生成的示例存储在闭包的数据之中
        }
        init(){
            let div = document.createElement("div");
            div.innerHTML = this.html;
            document.body.appendChild(div);
        }
    }
    return createDiv;
})();
let a = new CreateUniqDiv('sven1'); // 改类的全局访问点, 就是这个函数本身
let b = new CreateUniqDiv('sven2');
alert(a === b); // true
```

#### 3. 用代理实现单例模式

​	通过引入代理类的方式，我们同样完成了一个单例模式的编写，跟之前不同的是，现在我们把负责管理单例的逻辑移到了代理类proxySingletonCreateDiv 中。这样一来，CreateDiv 就变成了一个普通的类，它跟proxySingletonCreateDiv 组合起来可以达到单例模式的效果。

```javascript
class CreateDiv{
    constructor(html){
        this.html=html;
    }
    init(){
        let div = document.createElement("div");
        div.innerHTML = this.html;
        document.body.appendChild(div);
    }
}
var ProxySingletonCreateDiv = (function(){
    var instance;
    return function( html ){
        if ( !instance ){
	   //是否已经创造一个实例, 如果已经创造过,则直接返回之前创造的
            instance = new CreateDiv( html );
	   //当第一次运行该函数后, 把生成的示例存储在闭包的数据之中
        }
        return instance;
    }
})();
let a = new ProxySingletonCreateDiv('sven1'); // 改类的全局访问点, 就是这个函数本身
let b = new ProxySingletonCreateDiv('sven2');
alert(a === b); // true
```

#### 4. 惰性单例

​	**惰性单例指的是在需要的时候才创建对象实例。惰性单例是单例模式的重点，这种技术在实际开发中非常有用。**

​	前几个的案例从某种意义上来说也算是惰性的一种,但是还是有一些问题。

​	这段代码仍然是违反单一职责原则的，创建对象和管理单例的逻辑都放在createDiv对象内部。如果我们下次需要创建页面中唯一的iframe，或者script 标签，用来跨域请求数据，就必须得如法炮制，把createDiv函数几乎照抄一遍,然后在里面改一个元素的名称什么的。

```javascript
let CreateUniqDiv = (function () {
    let instance;
    class createDiv{
        constructor(html){
            if (instance) {//是否已经创造一个实例, 如果已经创造过,则直接返回之前创造的
                return instance;
            }
            this.html=html;
            instance=this;//当第一次运行该函数后, 把生成的示例存储在闭包的数据之中
        }
        init(){
            let div = document.createElement("div");
            div.innerHTML = this.html;
            document.body.appendChild(div);
        }
    }
    return createDiv;
})();
let a = new CreateUniqDiv('sven1'); // 改类的全局访问点, 就是这个函数本身
let b = new CreateUniqDiv('sven2');
alert(a === b); // true
```

​	**我们把创建实例对象的职责和管理单例的职责分别放置在两个方法里，这两个方法可以独立变化而互不影响，当它们连接在一起的时候，就完成了创建唯一实例对象的功能。**

```javascript
//要做到单例的复用性, 
//那么我们先把之前实现单例的那些代码中的变与不变的部分拆分开
//@param :管理单例
//@fn: 执行的业务函数
function getSingle(fn) {
    let result= null;
    return  function () {
        return result|| (result = fn.apply(this,arguments));
    }
}
//实验性的业务函数
let createSingleIframe = getSingle( function(){
    let iframe = document.createElement ( 'iframe' );
    document.body.appendChild( iframe );
    return iframe;
});
document.getElementById( 'loginBtn' ).onclick = function(){
    let loginLayer = createSingleIframe();
    loginLayer.src = 'http://baidu.com';
};
```

#### 5. 单例模式的应用

```javascript
//只绑定单次业务
var bindEvent = getSingle(function(){
    document.getElementById( 'div1' ).onclick = function(){
        alert ( 'click' );
    }
    return true;
});
var render = function(){
    console.log( '开始渲染列表' );
    bindEvent();
};
render();
render();
render();
```

### 4. 工厂模式

​	工厂模式就是使**同一类别**的**类**综合起来，以使接口统一方便调用，同时在修改以及扩展时更加方便。

```javascript
class Shop{
    constructor(name){
        return this[name].apply(this,[...arguments]);
    }
    Steak(name,price,time){
 	//内部很是自由, 可以随意使用各种方式
        this.name = name;
        this.price = price;
        this.time = time;
    }
    Grill(args){//烧烤
        this.price = 20;
        this.time = 15;
    }
    Noodles(args){//面条
        this.price = 15;
        this.time = 10;
    }
}
//统一方法调用
let a = new Shop("Steak",90,30); //老板来份牛排
let b = new Shop("Grill");//老板来份烧烤
let c = new Shop("Noodles");//老板来份面条
```

### 5. 建造者模式

​	**建造者模式（Builder）：将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。**过程部分可以独立的进行维护和修改，而不受构建部分的约束

​	看名称我们首先想到的就是造房子。建造者模式就像是施工团队，包工头和客户沟通了解了客户的建房需求后，在自己团队内部分发任务，将复杂的建房过程分解成若干小组，各小组分工合作最终得到需求的房子。

```javascript
//建造房子场景
//建造者 - 施工团队
let Builder = function(){
    //成员01 -- 决定厅室
    function Rooms(member){
        if( member <= 0 ){
            throw new Error("入住人数错误！");
        }
        this.rooms = member>=4?4:member;
    }
    //成员02 -- 决定面积
    function FloorSpace(budget){
        if( (typeof budget !== "number") || Number.isNaN(budget) || (budget < 60) ){
            throw new Error("预算过低或错误！");
        }
        this.budget = budget;
    }
    //成员03 -- 整体风格
    function Style(style){
        this.style = style || "常规风格";
    }
    return class {
        //住几人，预算多少(万)，风格
        constructor(member, budget, style) {
            Rooms.call(this,member);
            FloorSpace.call(this,budget);
            Style.call(this,style);
        }
    };
}();
//包工头获取客户需求，然后建造房子
let house1 = new Builder(1,100,"小清新");//客户1的需求
let house2 = new Builder(4,200,"欧美");//客户2的需求
```

建造者模式的**定义--将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示**。通过上面的例子我们对该解释也就有了一定的理解。其实类似于ajax的实现，发送请求返回数据与成功的处理函数这种也是分离状态，我们调用封装好的ajax传入不同的各类参数也可以看成建造者模式。

```javascript
let Builder = (function () {
    //表示部分
    //表示部分可以独立的进行维护和修改，而不受构建部分的约束
    function Rooms(){}
    function Space(){}
    function Style(){}
    //构建部分
    return class {
    
    }
})();

```

总结：**当我们构造的对象，内部结构较复杂时，使用建造者模式将内部各模块分开创建就非常合适。**

### 6. 原型模式

原型模式（Prototype）：用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。因为JavaScript的特性，这一点实现起来格外的简单。

```javascript
//父类
class Parent{
    constructor(x){
        this.x = x;
    }
    showX(){
        alert(this.x);
    }
}
//子类1 继承
class Child1 extends Parent{
    constructor(x,y){
        super(x);
        this.y = y;
    }
    showY(){
        alert(this.y);
    }
}
//子类2 继承
class Child2 extends Parent{
    constructor(x,z){
        super(x);//调用super传参
        this.z = z;
    }
    showZ(){
        alert(this.z);
    }
}
```

多个类使用到了相同的属性或方法，那我们就可以通过原型继承的方式来创造出类或者实例对象。

```javascript
let obj = {
	sayHello(){
		alert( "Hello" );
	}
};
let objA = Object.create(obj,{
    name :{
        writable:true,
        configurable :true,
        enumerable:true,
        value : "AA"
    }
});
let objB = Object.create(obj,{
    name :{
        writable:true,
        configurable :true,
        enumerable:true,
        value : "BB"
    }
});
objA.sayHello();
```

### 7. 策略模式



## 20. 分时函数

**当我们对大量数据进行处理的时候, 比如将一个数组里面的大量数据渲染出dom节点, 如果直接for循环实现**

**会在短时间内给浏览器的渲染引擎造成很大的压力,很有可能会造成假死, 卡顿等情况**

**所以我们开发这个分时函数, 目的就是为了使得大量的数据可以分时分段渲染, 这样, 性能就会更好一些**

@param: 分时函数

@array: 需要处理的数据

@fn   : 处理数据的函数

@step : 单次处理数据个数的步长

@interval : 每隔多长时间处理一次数据

```javascript
function timeChunk(array, fn, step = 10, interval = 200) {
    let timer;// 预存一个定时器
    function start() {
        // 每次激活只会处理step长度(如果数据剩余的数据少于step则以数组的剩余数据为准)的数据
        for (let i = 0; i < Math.min(step, array.length); i++) {
            console.log("业务函数被激活一次");
            fn(array.shift());
        }
    }
    return function () {
        timer = setInterval(() => {
            array.length === 0 ? clearInterval(timer) : start()
        }, interval);
    }
}
```

业务模拟函数

```javascript
let ary = [];
for (let i = 1; i <= 1000; i++) {
    ary.push(i);
};
let renderFriendList = timeChunk(ary, function (n) {
    let div = document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);
}, 8);
renderFriendList();
```

## 21. 完整节流

@param: 节流函数

@fn: 需要执行的业务函数

@interval: 每次函数执行时的间隔时间

```javascript
function throttle(fn,interval) {
    let _self= fn;// 保存待执行的业务函数, 方便在函数内部引用
    let timer = null;// 预留一个变量用作存储定时器
    let isFirst = true;// 判断是否是第一次执行业务函数
    return function () { // 返回待执行的加工后的业务函数
        let _args = arguments; // 存储加工后的业务函数的实参
        let _me = this; //调用该函数的对象
        console.log("_me",this);
        if (isFirst){
            _self.apply(_me,_args);//当第一执行业务函数时, 立即执行,避免因延迟导致的
            return isFirst = false; // 修改flag, 并退出函数
        }
        if (timer){ //如果timer存在, 则直接退出
            return  false;
        }
        timer = setTimeout(function () {
            console.log("延时器被激活");
            clearTimeout(timer); // 在500ms后清除掉这个定时器
            timer = null; // 同时把值还原成null
            _self.apply(_me,_args) // 调用一次业务函数, 下一次逻辑就是再重新生成一个定时器
        },interval||500);
    }
}
window.onresize=throttle(function () {
    console.log("浏览器的尺寸发生变化了");
});
```

## 22. js字符串与二进制相互转换

- 字符串转ascii码，用charCodeAt();
- ascii码转字符串，用fromCharCode();

```javascript
var str = "A";
var code = str.charCodeAt();
var str2 = String.fromCharCode(code);
```

- 数字，ascii码转二进制。

```javascript
var num = 2;
num.toString(2);//10

var a = "i";
console.log(a.charCodeAt()); //105
console.log(a.charCodeAt().toString(2)); //1101001

var a = "我";
console.log(a.charCodeAt()); //25105
console.log(a.charCodeAt().toString(2)); //110001000010001
```

**将字符串转换成二进制形式，中间用空格隔开**。

```javascript
function strToBinary(str){
    var result = [];
    var list = str.split("");
    for(var i=0;i<list.length;i++){
        if(i != 0){
            result.push(" ");
        }
        var item = list[i];
        var binaryStr = item.charCodeAt().toString(2);
        result.push(binartStr);
    }   
    return result.join("");
}
console.log(strToBinary("我们")); //110001000010001 100111011101100
console.log(strToBinary("@%$+")); //1000000 100101 100100 101011
```

**将二进制字符串转换成Unicode字符串**。

```javascript
function binaryToStr(str){
    var result = [];
    var list = str.split(" ");
    for(var i=0;i<list.length;i++){
         var item = list[i];
         var asciiCode = parseInt(item,2);
         var charValue = String.fromCharCode(asciiCode);
         result.push(charValue);
    }
    return result.join("");
}
console.log(binaryToStr("110001000010001 100111011101100")); //我们
console.log(binaryToStr("1000000 100101 100100 101011")); //@%$+ 
```

