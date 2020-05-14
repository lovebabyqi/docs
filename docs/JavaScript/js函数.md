# js函数

## 1. 函数的定义及调用

### 1.1 函数的定义方式

函数声明方式

1. `function`关键字(命名函数)。
2. 函数表达式(匿名函数赋值给变量)。
3. `new Function()`


```javascript
var fn = new Function('参数1','参数2','函数体')
```

`Function`里面的参数都必须是字符串格式

```javascript
var f = new Function('a','b','console.log(a+b)')
f(1,2);
console.dir(f)//有对象原型__proto__属性
console.log(f instanceof Object)//true
```

结论：所有的函数都是Function的实例(对象)，函数也属于对象。

### 1.2 函数的调用方式及this指向

**1.普通函数**	this指向window

```javascript
function fn(){
    console.log('人生巅峰',this)
}
//fn();  fn.call()
//window.fn()//完整调用方式
```

**2.对象的方法**		this指向的是函数调用者o

```javascript
var o = {
    sayHi:function(){
        console.log('人生巅峰',this)
    }
}
//o.sayHi()
```

**3.构造函数**		this指向ldh这个实例对象	原型对象里面的this指向的也是ldh这个实例对象

```javascript
function Star (){}
Star.prototype.sing = function(){
    console.log('人生巅峰',this)
}
var ldh = new Star();
```

**4.绑定事件函数**		this指向的是函数调用者	btn这个按钮对象

```javascript
btn.onclick = function(){};//点击了按钮就调用
```

**5.定时器函数**			this 指向window

```javascript
setTimeout(function(){},1000);//这个函数是定时器自动一秒钟调用一次
window.setTimeout(function(){},1000);//完整调用方式
```

**6.立即执行函数**		指向window 相当于普通函数

```javascript
(function(){
    console.log('人生巅峰');
})();//自动立即执行
```

**7.函数特殊调用方式模板字符串**

使用模板字符串调用函数执行，第一个参数始终是字符串值数组，后续参数取值模板字符串中的表达式。

```javascript
var name = 'shiyue',
    age = 18;
function fn(){
    console.log(arguments);
}
fn `${name} is ${age} years old`;//模板字符串调用
//arguments--->[['','is','years old'],'shiyue',18]
```

## 2. 改变函数内部this指向

JavaScript为我们提供了一些函数方法来帮我们更优雅的处理函数内部this的指向问题，`call()，apply()，bind()`，三种方法：

### 2.1. call方法

```javascript
fun.call(context,arg1,arg2,...);
//context:当前fun函数调用期望this的指向对象
//arg1,arg2:传递的参数
```

**call 可以调用函数，修改函数内部的this指向，继承**

```javascript
function Father(uname,age,sex){
    this.uname = uname;
    this.age = age;
    this.sex = sex;
}
function Son(uname,age,sex){
    Father.call(this,uname,age,sex)	//调用Father构造函数同时修改this指向;继承
}
var son = new Son('刘德华',18,'男');
console.log(son);
```

### 2.2 apply方法，运用的意思

**apply**方法**调用一个函数，**简单理解为调用函数的方式，但是他可以修改函数的this指向

**传递参数必须是数组形式**

```javascript
fun.apply(context,[argsArray]);
//context:在fun运行时指定的this值
//argsArray:传递的值,必须包含在数组里面	//数组,数组,数组
//返回的值就是函数的返回值,因为它就是调用函数
```

```javascript
var o = {
    name:'andy';
}
function fn(){
    console.log(this);
}
fn.apply(o);//调用fn,this指向o对象
```

```javascript
//参数必须是数组形式
var o = {
    name:'andy';
}
function fn(arr){
    console.log(this);
    console.log(typeof arr);//string	//
}
fn.apply(o,['pink']);//调用fn,this指向o对象,参数必须是数组形式
```

**apply的主要运用**

比如说我们可以利用apply借助于Math对象求最大值

```javascript
var arr = [1,66,3,99,4];
var max = Math.max.apply(null,arr);//不需要修改this指向,传递null
console.log(max);//99
```

### 2.3 bind方法，绑定捆绑的意思

bind方法不会调用函数,但是能改变函数内部this指向

```javascript
fun.bind(thisArg,arg1,arg2,...);
//thisArg:当前调用函数this的指向对象
//arg1,arg2:传递的其他参数
//返回指定的this值和初始化参数改造的原函数拷贝
```

```javascript
var o = {
    name:'andy';
}
function fn(a,b){
	console.log(this);
	console.log(a + b);
}
var f = fn.bind(o , 1 ,2);
f();
//1.不会掉用原来的函数,可以改变原函数内部this指向
//2.返回的是原函数改变this之后产生的新函数
//3.若果有的函数不要立即调用,又想改变this指向
```

运用：一个按钮，点击之后就禁用这个按钮，3秒钟之后开启这个按钮

```javascript
btn.onclick = function(){
    this.disabled = true;//这个this指向的是btn按钮
    setTimeout(function(){
        this.disabled = false;
    }.bind(this),3000)//定时器函数bind修改this;这个this在定时器函数外面指向btn
}
//定时器函数里面的this指向window对象
```

### 2.4 call apply bind总结:

相同点:

都可以改变函数内部的this指向

区别点:

- 1.`call`和`apply`会调用函数,并且改变函数内部this指向。
- 2.`call`和`apply`传递的参数不一样，`call`传递参数`arg1,arg2,...`形式，`apply`必须数组形式[arg]。
- 3.`bind`不会调用函数,可以改变函数内部this指向。

## 3. 严格模式

### 3.1 什么是严格模式

JavaScript除了提供正常模式外，还提供了严格模式`(strict mode)`。**ES5的严格模式是采用具有限制性JavaScript变体的一种方式，**即在严格的条件下运行JS代码。

IE10以上支持

严格模式对正常JavaScript予以做了一些更改:

- 1.消除JavaScript语法的一些不合理，不严谨之处，减少了一些怪异行为。
- 2.消除代码运行的一些不安全之处，保证代码运行的安全。
- 3.提高编译器效率，增加运行速度。
- 4.禁用了在ECMAScript 的未来版本中可能会定义的一些语法，为未来新版本的JavaScript做好铺垫，比如一些保留字如:`class,enus,export,extends,import,super`不能做变量名。

### 3.2 开启严格模式

严格模式可以应用到整个脚本或个别函数中，因此在使用时，我们可以将严格模式分为**脚本开启模式**和**为函数开启严格模式**两种情况。

```javascript
//为整个脚本文件开启严格模式,需要在所有语句之前放一个特定语句
"use strict"；

(function(){
    'uae strict';
})()	//立即执行函数内写上'use strict'	也是为整个脚本开启严格模式
```

```javascript
//为某个函数开启严格模式
function fn(){
    'use strict';	//此时仅为fn函数开启了严格模式执行
}
function fun(){
    				//fun还是普通模式执行
}
```

### 3.3 严格模式中的变化

**变量规定**

- 1.在正常模式中,如果一个变量没有声明就赋值，默认是全局变量，严格模式禁止这种做法。变量都必须先var声明，然后再使用。
- 2.严禁删除已经声明的变量，例如,delete x，语法是错误的。

**严格模式下this指向问题**

- 1.以前在全局作用域函数中的this指向window对象，严格模式下全局作用域中函数中this是undefined。
- 2.严格模式下，如果构造函数不加new调用(相当于普通函数)，this指向的是undefined，如果给它赋值this会报错，必须new调用构造函数让this指向实例化对象。
- 3.定时器里面的this还是指向window。
- 4.事件,对象还是指向调用者。

**函数变化**

- 1.严格模式下，函数不能有重名的参数。
- 2.函数必须声明在顶层，新版本的JavaScript会引入"块级作用域"(ES6中已引入)，为了与新版接轨，不允许在非函数的代码块内(if,for都是非函数)声明函数。

```javascript
function fn(a,a){
    console.log(a + a);
}
fn(1,2);//4
//严格模式下直接报错,不允许两个同名参数
```

## 4. 高阶函数，闭包

### 4.1 高阶函数

高阶函数是对其他函数进行操作的函数，他**接收函数作为参数**或**将函数作为返回值输出**。

```javascript
//接收函数作为参数
function fn (callback){
    callback && callback();
}
fn(function(){alert('hi')});

//将函数作为返回值输出
function fn (){
    return function(){};
}
fn();
```

### 4.2 闭包

4.2.1 变量作用域

变量根据作用域的不同分为：全局变量和局部变量

- 1.函数内部可以使用全局变量。
- 2.函数外部不可以使用局部变量。
- 3.当函数执行完毕，本作用域内的局部变量会销毁。

4.2.2 什么是闭包

闭包(closure)指**有权访问另一个函数作用域中的变量的函数**。

简单理解就是：一个作用域可以访问另外一个函数内部的局部变量。

```javascript
//闭包:我们fun这个函数作用域 访问了另外一个函数fn 里面的局部变量 num
function fn(){
    var num = 10;
    function fun(){
        console.log(num);	//10
    }
    fun();
}
fn();
```

4.2.3 闭包的作用

主要作用**:延伸了变量的作用范围**

```javascript
//我们fn 外面的作用域可以访问 fn内部的局部变量
function fn(){
    var num = 10;
    function fun(){
        console.log(num);	//10
    }
    return fun;
}
var f = fn();
f();
```

### 闭包案例

1.循环注册点击事件

```javascript
<ul class='nav'>
	<li>龙卷</li>
	<li>King</li>
	<li>琦玉</li>
	<li>杰诺斯</li>
</ul>
//点击li输出当前li的索引号
//利用动态添加属性的方式
var lis = document.querySelector('.nav').querySelectorAll('li')
for (var i=0;i<lis.length;i++){
    lis[i].index = i;
    lis[i].onclick = function(){
        console.log(this.index)
    }
}
```

**利用闭包的方式得到当前li的索引号**:

**立即执行函数也称为小闭包，因为立即执行函数里面的任何一个函数都可以使用它的i这个变量**。

```javascript
for (var i=0;i<lis.length;i++){
//利用for循环创建了4个立即执行函数
    (function(i){
        //console.log(i);
        lis[i].onclick = function(){
            console.log(i);
        }
    })(i)
}
```

**3秒钟之后,打印所有li元素的内容**

```javascript
for (var i=0;i<lis.length;i++){
    (function(i){
        setTimeout(function(){
            console.log(lis[i].innerHTML);
        },3000)
    })(i)
}
```

**计算打车价格**

```javascript
//打车起步价13(3公里内),之后每多一公里增加5块钱.用户输入公里数就可以计算打车价格
//如果有拥堵情况,总价多收10块钱拥堵费
var car = (function(){
    var start = 13;//起步价	局部变量
    var total = 0;//总价		局部变量
    return{
        price:function(n){
            if(n<=3){
                total = start
            }else{
                total = start + (n-3)*5
            }
            return total;
        },
        //拥堵之后的费用
        yd:function(flag){
            retuan flag?total + 10 : total;
        }
    }
})()
console.log(car.price(5));//23
console.log(car,yd(true));//33

console.log(car.price(1));//13
console.log(car,yd(false));//13
```

### 思考

```javascript
var name = 'The Window';
var object = {
    name:'My Object',
    getNameFunc:function(){
        return function(){
            return this.name;
        }
    }
}
console.log(object.getNameFunc()())//the Window

//分析:
var f = object.getNameFunc();
//类似于
var f = function(){
    return this.name;
}
f();
```

```javascript
var name = 'The Window';
var object = {
    name:'My Object',
    getNameFunc:function(){
    	var that = this;
        return function(){
            return that.name;
        }
    }
}
console.log(object.getNameFunc()())//My Object
```

### 闭包总结

1.什么是闭包?

闭包是一个函数(一个作用域可以访问另外一个函数的局部变量).

2.闭包的作用是什么?

延长作用域链，延伸变量的作用范围。

## 5. 作用域

概念：

- 在函数中可以使用全局变量
- 在全局中不能够使用函数中的变量

在JS中，变量有两个存放的区域。

- 1.全局作用域
- 2.函数作用域

### 5.1 全局作作用域

全局变量会自动成为window对象的属性

window对象也可以叫做Global Object GO对象

打开浏览器 自动生成window对象

关闭浏览器  window对象就自动销毁了

```javascript
全局的预编译三步：
	1.创建GO对象	==> Global Object(GO对象)
	2.找到变量，把变量作为GO对象的属性名，值是undefined
	3.在全局中找到函数声明，把函数名作为GO对象的属性名，值是函数体
	预编译之后才能执行JS代码
         等到关闭浏览器的时候 GO对象就会被销毁了
```

### 5.2 函数作用域

```javascript
函数的预编译四步：
	1.创建AO对象	==> Activated Object(活动对象)
	2.找到形参和变量，把形参和变量作为AO对象的属性名，值是undefined
	3.实参把值赋给形参
	4.在函数中找到函数声明，把函数名作为AO对象的属性名，值是函数体
	预编译之后才能执行JS代码
        等到函数执行完成后(return)   AO对象就会被销毁了
```

特殊:

```javascript
c = 5;  
//一个变量  没有var关键词 直接赋值 则这个变量是全局的  叫做暗示全局变量
```

## 6. 递归

如果一个函数内部可以调用其本身,那么这个函数就是递归函数.

**简单理解:函数内部自己调用自己,这个函数就是递归函数.**

```javascript
function fn(){
    fn();
}
fn();
//找不到出口,一直反复运行,栈溢出死机
```

```javascript
var num = 1;
function fn(){
    console.log('我要打印6句话')
    if(num==6){
        return;//递归里面必须加退出条件;递归出口
    }
    num++;
    fn();
}
fn();
```

**利用递归求解数学计算**

1.求n的阶乘

```javascript
function fn(n){
	if(n==1){
    	return 1;
	}
    return n*fn(n-1);
}
fn(3)//6
```

2.斐波那契数列 1,1,2,3,5,8,13,21

```javascript
//用户输入一个数字n 就可以求出这个数字对应的兔子序列值
//我们只需要知道用户输入的n 的前面两项(n-1)项和(n-2)项就可以计算出n 对应的序列值
function fn(n){
	if(n===1||n===2){
		return 1;
	}
    return fn(n-1) + fn(n-2);
}
```

3.根据id返回对应的数据对象

```javascript
var data = [
	{
    	id:1,
    	name:'家电',
    	goods:[
            {
                id:11,
                gname:'冰箱',
            },
            {
                id:12,
                gname:'洗衣机',
            }
    	]
	},
	{
        id:2,
        name:'服饰',
	}
]
```

```javascript
//利用forEach去遍历里面的每一个对象
function getID(json,id){
    var o = {};
    json.forEach(function(item){
        if(item.id==id){
            //console.log(item);
            o = item;
            //我们想要得到里层的数据,可以利用递归函数
        }else if(item.goods){
            o = getID(item.goods,id)
        }
    })
    return o;
}
var result1 = getID(data,1);
var result2 = getID(data,12);
```

## 7. 函数关键词

### 3.1 arguments

arguments

- 存储了所有实参
- arguments是类数组
- arguments.length 存放的是 实参的个数

### 3.2 return

return 是函数里面的关键词  作用:

- 1.把JS的数据抛出，让这个JS数据可以在函数的外部使用
- 2.结束函数 不执行函数内部的代码了
- 3.函数在不写return的情况下  默认return undefined