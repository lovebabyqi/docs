## js综合

### 1. 定时器

定时器的**作用：每隔一段时间执行对应的代码**。

定时器的回调函数中  **this-->window**。

JS有两类定时器

- **setTimeout  延迟定时器(回调函数执行一次**
- **setInterval 循环定时器(回调函数执行无数次)**

```javascript
setTimeout(function(a){
    console.log('函数执行')
},3000,2)
setInterval(auto,1000,'我是回调函数执行时传递的实参',2)
function auto(a,b){
    // console.log(a,b);
    console.log(this);
    // console.log('函数执行')
}

// setTimeout('console.log([1,22])',1000)
```

**清除定时器**

**定时器的返回值，表示在JS代码中出现的第几个定时器**

- **clearInterval()	 清除循环定时器**；
	 **clearTimeout()	清除延迟定时器**

### 2. JS单线程

JS是单线程 只能同时做一件事情（任务），做完一件事情才能做下一件事情。

JS任务的分类

- 同步任务，放置在主线程中执行。
- 异步任务，放置在异步队列中等待。

​		定时器的回调函数，
		事件

JS处理任务的顺序：先做完同步任务，再做异步任务。

**线程阻塞**

概念:

**前面的任务死循环或者耗时过长导致后面代码不能被执行，这种情况叫做线程阻塞**

**示例**

**while死循环**

```javascript
while(true){
    console.log(1)
}
console.log(2);//while死循环,不能走到这里
```

分析:

1000ms后打印5次5----setTimeout()定时器异步执行,for循环每圈都向异步队列添加一个定时器,等到1000ms以后,for循环已经结束,这时候打印i,是5,这里for循环var i,i会被挂载到父级作用域,这里是window.

```javascript
for(var i=0;i<5;i++){
    setTimeout(()=>{
        console.log(i);//打印5次5
    },1000)
}
```

**修改上述代码,打印0,1,2,3,4**

1.var改为let，生成块级作用域，**保存变量，总觉得这里是闭包，无奈控制台并没有发现Closuer。**

```javascript
for(let i=0;i<5;i++){
    setTimeout(()=>{
        console.log(i);
    },1000)
}
```

2.定时器有三个参数(回调函数，时间，传递参数),

```javascript
for(var i=0;i<5;i++){
    setTimeout((i)=>{
        console.log(i);
    },1000,i)
}
```

3.立即执行函数

```javascript
for(var i=0;i<5;i++){
    (function(i){
        setTimeout(()=>{
            console.log(i);
        },1000)
    })(i)
}
```

**修改代码,每隔1000ms,依次打印0,1,2,3,4**

```javascript
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
    	console.log(i);
    }, 1000 * (i+1));   //第一次i是0+1
}
```

### 3. 闭包

#### 3.1 什么是闭包?

```
var local = '变量';
function foo(){
    console.log(local);
}    
```

假设，以上三行代码在一个立即执行函数中。好，立即执行函数中，有一个局部变量local，有一个函数foo，foo里面可以访问到local变量，这就是一个闭包。

**函数**和**函数内部能访问到的变量**(也叫环境)的**总和**，**就是一个闭包**。

再看一段代码:

```javascript
function foo(){
    var local = 1;
    function bar(){
	local++;
	return local;
    }
    return bar;
}
var func = foo();
func();
```

这里确实有闭包，local变量和函数组成了一个闭包(Closure)
**1.为什么要嵌套函数?**

因为需要**局部变量**，如果不把local放在一个函数里，local就是一个全局变量，达不到闭包的目的--隐藏变量。

**2.为什么要return bar?**

return才能在外部使用这个闭包，return bar 改为window.bar = bar，一样的，只要让外面可以访问到这个bar函数。
所以return bar只是为了bar能被使用，跟闭包无关。

#### 3.2 闭包理解

再次审视代码:

```javascript
var local = '变量';
function foo(){
    console.log(local)
}
//把这段代码放到立即执行函数中    
```

方应航老师说，第一句是声明变量，第二句函数声明，第三句console.log,

为什么大家都认识，都学过，看不出来是闭包?

根本不需要知道他是闭包。

闭包，是JS函数作用域的副产品，正是由于JS函数内部可以使用函数外部的变量，所以这段代码正好符合了闭包，而不是JS故意要使用闭包。

#### 闭包内存泄漏问题？

闭包造成的内存泄漏，这说法不对。
内存泄漏是指用不到的变量，依然占据着内存空间，不能被再次利用起来。

闭包造成内存泄漏这个说法来自于IE，
IE的BUG，IE在我们使用完闭包后，依然回收不了闭包里引用的变量，这是IE的问题，不是闭包的问题。
参考文章：by司徒正美[博文](博文)；博文中针对不同浏览器debugger观察变量回收情况，总结多种情况下回收机制结果。

**总结**

**编程界崇尚以简洁优雅为美，很多时候如果你觉得一个概念很复杂，那么很可能是你理解错了**。

### 4. 递归

概念：

**在函数内部，重复调用函数自身，这个情况叫做递归**

计算实例：

**1.求1-100之内所有能被3并且被5整除的数字之和**

```javascript
function fn(n){
    if(n==0){
      return 0
    }
    if(n%3==0&&n%5==0){    //能够被3 和 5整除的数字
      return n+fn(n-1)
    }
    return fn(n-1)
}
var result = fn(100);
```

**2.求n的阶乘**

```javascript
function fn(n){
	if(n==1){//递归出口
		return 1;
	}
	return n*fn(n-1)  
	//当n=5时 这个return 必须等到5*fn(4)的结果算出来之后
    //才能结束函数,由此类推当n=1时 fn(1)=1 找到递归出口
}

var result = fn(5);
console.log(result);
```

