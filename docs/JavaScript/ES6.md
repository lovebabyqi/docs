# ES5之后统称ES6

## 1. 解构赋值

拆解数据结构，来给变量赋值。

- 如果左边模式匹配到右边模式的所有，则这个解构是完全解构。
- 如果左边模式只匹配到右边模式的一部分，则这个解构是不完全解构。
- 如果左侧模式中的个别变量没有匹配到右边模式，则这个解构是不成功解构，该变量是`undefined` ,我们可以人为设置变量的默认值。

结论：在设置变量的默认值时，总是惰性求值的。

...(拓展运算符)

作用：

- 1.专门收集数据并放置在变量中
- 2.打散数组/字符串/类数组()，并且还需要放置在数组/对象中。

```javascript
//类数组
    document.getElementsByClassName()
    document.getElementsByTagName()
    arguments    //函数内部关键词
```

```javascript
//函数中
...args
//可以利用...收集数据的作用
//把实参收集到args中
```

### 1.1 数组的解构赋值

```javascript
var arr = [0,1,2];
let [a,...b] = [0,1,2];
console.log(a,b);//0,[1,2]

let [a,b,c=4] = [1,2];
console.log(a,b,c);//1,2,4
```

...变量

- 这个变量必须写在匹配模式的最后面。
- 这个变量会匹配到剩余的所有数据。

### 1.2 对象的解构

对象解构的完整写法：

```javascript
let {name:a,age:b} = {name:'heaven',age:28};
console.log(a,b);
```

对象解构的简洁写法：

```javascript
let {age,name} = {name:'heaven',age:28};
console.log(name,age);
```
### 1.3 原始值的解构赋值

1.字符串的解构赋值，类似于数组的解构。

```javascript
let [a,b,...c] = 'hello';
console.log(a, b,c);// h e ['l','l','o']
```

## 2. ES6，let，const

### 2.1 let

`var`指令创造的变量只有函数作用域，在控制流程内不会产生作用域，外面也可以访问到控制流程内部的变量。

```javascript
var a = 20;
var b = 10;
if(a>b){
    var c = 30;
}
console.log(c);//30

for(var i=0;i<10;i++){
    console.log('hello');
}
console.log(i);//i被挂载到全局作用域window上，for循环结束，i为10
```

#### let指令的块级作用域

使用let指令创造的变量，**存在块级作用域**，控制流程内部用`let`指令定义的变量，在控制流程外部无法获取。

```javascript
var a = 20;
var b = 10;
if(a>b){
    let c = 30;
}
console.log(c);////报错ReferenceError:c is not defined

for(let i=0;i<10;i++){
    console.log('hello')
}
console.log(i);////报错ReferenceError:i is not defined
```

#### let声明重复变量会报错

```javascript
var i = 10;
let i;//Identifier 'i' has already been declared
```

报错信息的意思为: 变量i已经被声明过。

#### let暂时性死区TDZ，无变量提升

因为let指令没有变量提升，所以在浏览器在执行到let指令之前，任何语句中都无法使用该let指令所定义的变量。

```javascript
console.log(b);//报错ReferenceError:Cannot access 'b' before initialization
let b = 10;
```

### 2.2 const

`const` 指令定义常量。

`const`声明和`let`非常类似，区别就是

- const定义好一个值之后，不允许修改变量值；
- 初始化的时候就要赋值；
- 常量变量名请大写(只是规范而已，小写也不会报错，但是大写了可以让程序员快速识别该变量是啥)；

### 2.3 经典案例

```javascript
<body>
    <button>按钮1</button>
    <button>按钮2</button>
    <button>按钮3</button>
    <button>按钮4</button>
    <button>按钮5</button>
    <script>
    	var aBtn = document.querySelectorAll('button');
        for(var i=0;i<5;i++){
            aBtn[i].onclick = function(){
                console.log(i);
            }
        }
    </script>
</body>
```

> 所有的函数内部的变量`i`指向的是全局作用域内的变量i的值，所以当函数执行的时候，就回去寻找此时此刻变量i的值，而变量i的值在经历完循环之后数字已经变成了5，所以每一个函数输出的值都是5。

`for`循环结束，`i`的值是5，无论点击那个按钮都是5。

```javascript
<body>
    <button>按钮1</button>
    <button>按钮2</button>
    <button>按钮3</button>
    <button>按钮4</button>
    <button>按钮5</button>
    <script>
    	var aBtn = document.querySelectorAll('button');
        for(let i=0;i<5;i++){
            aBtn[i].onclick = function(){
                console.log(i);
            }
        }
    </script>
</body>
```

将`for`循环的`i`用`let`声明，生成块级作用域，就能分别输出1~4。

> 所有的函数内部的变量i指向的是局部块级作用域内的变量i的值。
>
> 所以for循环执行一次就相当于新建了一个块级作用域, 每个块级作用域内都有一个i的值, 而且。
>
> 此值是完全独立的, 所以函数在执行时所用到的i的值都是函数在定义时的i的值。

## 3. 字符串，数组，对象新增方法

### 3.1 字符串新增方法

**1. 判断字符串中有没有指定字符**

```javascript
str.includes(指定字符,索引位置)
//从指定索引位置查看有没有指定字符，返回布尔值
```

**2. 判断str是否以指定字符串开头**

```javascript
str.startsWith(指定字符,索引位置)
//返回布尔值
```

**3. 判断str是否以指定字符串结尾**

```javascript
str.endsWith(指定字符,索引位置)
//返回布尔值
```

**4. 返回的是一个把str重复n次的新字符串**

```javascript
str.repeat(n)
```

**5. 用指定字符串从str前面把str填充到指定的length**

```javascript
str.padStart(length,指定字符串) 
```

**6. 用指定字符串从str后面把str填充到指定的length**

```javascript
str.padEnd(length,指定字符串)
```

### 3.2 数组的新增方法

**1. Array.from(类数组)**

​	传入类数组，返回纯数组。

**2. Array.of(实参1,实参2)**

​	传入若干形参，返回把这些形参整合后的新数组。

**3.arr.copyWithin(x,y,z)**   作用如下：

- 复制从索引y到索引z的数据。

- 把复制的数据从arr的索引x开始覆盖。

- 返回覆盖后的新数组。
- 会改变原数组。

**4. arr.fill(数据)**

​	用指定数据填满arr，arr中原来的数据会被覆盖。

```javascript
Array(6).fill(null);//[null, null, null, null, null, null]
```

**5. arr.includes(数据)**

​	判断arr里有没有指定数据，有返回true，反之false。

**6. arr.find(回调函数)**

​	该方法返回满足条件的数组成员。

​	只要回调函数的返回值是true 则满足条件，反之不满足条件。

**7. arr.findIndex(回调函数)**

​	该方法返回满足条件的数组成员对应的**索引**位置。

​	只要回调函数的返回值是true 则满足条件，反之不满足条件。

**8. arr.forEach(回调函数)**

​	只有遍历的作用。

**9. arr.map(回调函数)**

​	返回值是一个新的数组。

​	**回调函数的返回值作为新数组的成员**。

**10. arr.filter(回调函数)**

​	返回值是一个基于老数组过滤后的新数组。

​	回调函数的返回值为true，则对应数组成员保留。

​	反之不保留。

**11. arr.every(回调函数)**

​	返回值一个布尔值。

​	所有回调函数的返回值都是true，则every的返回值才是true。

​	只要一个回调函数的返回值是false，则every的返回值就是false。

**12. arr.some(回调函数)**

​	只要一个回调函数的返回值是true，则some的返回值就是true。

​	所有回调函数的返回值都是false，some的返回值才是false。

**13. arr.reduce(回调函数)** 

​	默认从**索引1**开始遍历的，从左向右。

​	**回调函数（pre,next,index）**

​	pre 保留了上一次回调函数的返回值。

​	next 本次遍历到的数组成员。

​	index  本次遍历到的数组成员的索引。

**14. arr.reduce(回调函数,初始值)**

​	会从**索引0**开始遍历。

**15. arr.reduceRight(回调函数)**

​	从右向左遍历。

### 3.3 对象的新增方法

**当对象的属性名和要使用的变量名完全一致，则可以简写**

```javascript
let value = '123';
data = {
    value
}
//等价于data = {value:value}
```

**1. Object.assign(实参1，实参2...)**

​	用来合并对象，并且把合并后的新对象赋值给`assign`的第一个实参。

**2. Object.keys(对象)**

​	获取对象键名组成的数组。

**3. Object.values(对象)**

​	获取对象键值组成的数组。

**4. Object.entries(对象)**

​	 获取对象键名键值组成的数组。

**5. Object.is**

​	解决两个数据一样就相等的问题。

### 3.4 数值的新增方法

- 2进制数字的写法   0b
- 8进制数字的写法   0
- 16进制数字的写法  0x
- `Infinity`这个关键词表示正无穷
- `-Infinity`表示负无穷
- `Number.isFinite(数字)`，判断数字是否是有限的  注：在判断其他数据类型时不会类型转换
- `Number.isNaN(数字)` ，判断数字是否是NaN，注：在判断其他数据类型时不会类型转换
- `Number.parseInt(数字)`，同`parseInt`方法一样。
- `Number.parseFloat(数字)`，同`parseFloat`方法一样。
- `Number.isInteger(数字)`，判断数字是不是整数，注：在判断其他数据类型时不会类型转换。

### 3.5 Math对象新增方法

```javascript
Math.trunc(数字)    用于去除数字中的小数，返回整数部分
~~数字               返回小数的整数部分
Math.sign(数字)     用于判断数字是否是正数，负数或者0
数字是正数     返回1
数字是负数     返回-1
数字是0      返回0
数字是-0     返回-0
其他数字      返回NaN

Math.cbrt(数字)        计算数字的立方根
Math.hypot(数字1,数字2,…)  计算每个实参的平方和的平方根
```

### 运用示例

1.求最大值最小值

```javascript
//ES5
Math.max.apply(null,[1,35,25,10]);
Math.min.apply(null,[1,35,25,10]);
```

```javascript
//ES6
Math.max(...[1,35,25,10]);
Math.min(...[1,35,25,10]);
```

2.合并数组

```javascript
arr.concat([1,2,3],[4,5,6]);//ES5
[...[1,2,3],...[4,5,6]];//ES6
```

3.克隆数组

```javascript
var arr = [1,2,3];
var arr1 = arr.concat();//slice();slice(0)皆可实现;ES5
var arr2 = [...arr]//ES6
```

## 4. 函数新增方法

### 4.1 ES5暗示全局变量的补充

当一个变量没有声明就赋值，会从父函数中查找该变量，如果有该变量，则这个变量就是父级函数的  -->  暗示父级变量。

函数的补充：

函数是一个对象{}，有Length属性，记录形参个数(没有设置默认值的形参)。

### 4.2 ES6新增的函数特点

es6新增的函数特点

- 1.函数在传参的时候，**可以使用解构赋值的方式来传递数据**。
-  **2.可以给接受不到数据的形参设置默认值**(默认值生效，()会生成一个独立块级作用域)。

```javascript
function auto([a,b,c,d=3]){
	console.log(a,b,c,d)
}
auto([1,2,3]
```

- 3.块级作用域示例

```javascript
var x = 1;
function foo(x=x){
    console.log(x)
}
foo();
//暂时性死区报错Cannot access 'x' before initialization
//foo执行时,x没有接收到实参默认undefined,生成块级作用域
//启用默认值x,'='右边的x,此时作用域中值是undefined,暂时性死区;
//'='右边的x还没有声明就使用
```

### 4.3 ES6新增箭头函数

```javascript
()=>{}
```

- 1.当箭头函数只有一个形参，则()可以去掉。
- 2.当箭头函数的代码块只有一句return时，则{}可以省略。
- 3.箭头函数的this指向了箭头函数所在的环境。
- 4.箭头函数内部没有arguments。

## 5. iterator

```javascript
for...of 循环可以遍历的数据  必须有Symbol.iterator属性
	数组
	字符串
	arguments
```

for...of循环的工作原理

1.查看遍历数据有没有`Symbol.iterator`这个属性

​	有就生成`iterator`对象

​	没有就报错

2.调用`iterator`对象的`next`函数

​	该函数返回一个对象 符合下面两种情况

​	**{value:数据,done:false}**

​	**{value:undefined,done:true}**

### 模拟iterator

```javascript
Array.prototype.myInterator = function(){
    var i = 0;
    //返回一个对象
    return {
        next:function(){
            var value = this[i];
            if(this[i++]!==undefined){
                done = false;
            }else{
                done = true;
            }
            return {
                value,
                done,
            }
        }.bind(this)
    }
}

var arr = [1,0,3];
var iterator = arr['myInterator']();
console.log(iterator.next());
```

## 6. 新增symblo数据类型

### 6.1 es6新增数据类型 symbol

本质上只要是不同`symbol`数据，`===`比较时就是`false`，为了人为区分长度一样的`symbol`数据，所以可以人为给symbol设置标识。

```javascript
var s1 = Symbol('name');
var s2 = Symbol.for('province');
```

### 6.2 使用Symbol()方法可以创建一个Symbol类型的值。

```javascript
let s = Symbol();
let one = Symbol("蚂蚁部落");
let two = Symbol("蚂蚁部落");
console.log(one == two);//false
```

即便是键值相同两个Symbol类型的值也是不相同的。

### 6.3 使用Symbol.for()方法也可以创建一个Symbol类型的值

但是此方法和Symbol()的一个重要**区别**是，**它不会重复创建具有相同键的值**，也就是说此方法在创建一个值之前，**首先会搜索是否已经具有指定键的Symbol类型的值，如果有则返回这个Symbol值，否则新创建一个Symbol值。**

```javascript
let one = Symbol.for("蚂蚁部落");
let two = Symbol.for("蚂蚁部落");
console.log(typeof one);//symbol
console.log(one == two);//true
```

第一次调用Symbol.for()方法会创建一个键值为"蚂蚁部落"的Symbol类型的值。

第二次调用的时候会搜索是否已经存在以"蚂蚁部落"为键的Symbol类型的值，如果存在就返回这个Symbol值。

```javascript
let one = Symbol.for();
let two = Symbol.for();
console.log(typeof one);//symbol
console.log(one == two);//true
```

不传递参数也是同样的道理。

```javascript
let one = Symbol("蚂蚁部落");
let two = Symbol.for("蚂蚁部落");
console.log(one == two);//false
```

Symbol.for()创建的值会被登记在全局环境中供搜索，而Symbol()创建的值不会，所以Symbol.for("蚂蚁部落")依然会新创建一个Symbol值，而不是返回Symbol("蚂蚁部落")创建的值。

## 7. map数据结构

### 1. 创建map结构以及map中的方法

方法:

- `set(属性名,属性值)`设置任意数据类型作为map结构的属性名
- `get(属性名)`获取指定属性名的属性值
- `has(属性名)`判断有没有指定属性名
- `delete(属性名)`删除指定属性名
	 `size`长度相当于`length`

```javascript
//创建
var m = new Map([
      ['name','heaven'],
      [{},'对象属性值'],
      [[1,2],'数组属性值']
    ]);
console.log(m.size)//3
var obj = {name:'heaven'};
var arr = [1,2];
var fn = function(){};
m.set(obj,'对象属性名');
m.set(arr,'数组属性名');
m.set(fn,'函数属性名');
console.log(m.get(obj));//对象属性名
console.log(m.has(fn));//true
console.log(m);
```

```javascript
//此时的数据m:
([
	['name','heaven'],
	[{},'对象属性值'],
	[[1,2],'数组属性值'],
    [{name:'heaven'}:'对象属性名'],
    [[1,2]:'数组属性名'],
    ['function':'函数属性名']
]);
```

## 8. set数据结构

### 8.1 set数据结构特点

- 1.数据不能够重复。
- 2.索引和数据是一致的。

### 8.2 set的操作方法

- `add(数据)`，向set结构中填充数据。
- `delete(数据)`，删除set结构中的指定数据。
- `has(数据)`，判断set结构中有没有指定数据。
- `clear()`，清空set结构中的所有数据。

**set的属性**

- `size`，存放set结构数据的长度。

**set的遍历方法**

- `forEach`

**new Set(参数)**

- 1.数组
- 2.字符串

**示例**

```javascript
//利用set结构 实现数组去重
var arr = [1,2,2,3,3];
var s1 = new Set(arr);
var newArr = [...s1];//[1,2,3]

//利用set结构 实现字符串去重
var str = 'hello';
var s2 = new Set(str);
var newStr = [...s2].join('');//'helo'
```

### WeakSet

WeakSet(必须是数组)，而且数组中必须全部都是引用值。

WeakSet这种数据格式没有`Symbol.iterator`，所有不能生成遍历器。

## 9. async await

`async`函数的返回结果是`promise`

- 状态默认是成功的
- 值是函数的返回值

`await`关键词后面一般都是跟着`promise`机器

- 等到该机器状态为`resolve`，才会执行`await`下面的代码。
- 如果该机器状态为`reject`就不会执行`await`后面的代码。
- 为了避免报错可以把可能出错的代码放到`try`代码块中。
- 则错误会被捕捉到`catch`代码块中。

示例:

```javascript
async function heaven (){
    console.log(2);
    try{
        await new Promise(function(res,rej){
            console.log(3);
            setTimeout(function () {
                console.log(4);
                rej('我是失败的机器')
            },20)
        })
    }catch(e){
        console.log(typeof e);
    }
    console.log(5);
}
heaven();
console.log(1);
//控制台输出:2,3,1.4.string,5
```

### 2.try catch

JS报错的分类

- 语法错误
- 非法的标识
- 引用错误
- 在顺着作用域链没找到该变量
- 类型错误
- 在顺着作用域链找到了该变量，但是却使用错误
- JS引擎最先找到语法错误
- 如果没有该变量直接判定为引用错误
- 如果有该变量就判断是否为类型错误

```javascript
try{
    console.log(a)
}catch(e){
    console.log(e.name+'    '+e.message)
}
```

### 3.promise

`promise`是为了解决**回调地狱**的
`promise`就是一个机器
	机器是有三种状态的
		待机  `pending`
		工作  `resolved`
		故障  `rejected`
**`resolved`状态的`promise`机器 会触发`then`的第一个回调函数
**`resolved`状态的的数据会作为参数传递到第一个回调函数中**。

then函数返回的结果也是一个promise机器

这个机器的状态取决于触发的回调函数的返回值，只有回调函数返回一个失败状态的promise，则then函数的返回结果才是失败状态的promise。否则，返回结果都是成功状态的promise;

```javascript
let p = new Promise(function(resolve,reject){
	// resolve('我成功了')
	reject('我失败了')
}).then( (data)=>{
	console.log(data);//res数据
},(data)=>{	//这个箭头函数是then的回调
	console.log(data);//'我失败了'
	return new Promise( function(resolve,reject){
		reject('我失败了')
	})
})
```

**res执行then,rej执行catch**

```javascript
let p = new Promise(function(resolve,reject){
    resolve('我成功了')
    // reject('我失败了')
}).then( (data)=>{
    console.log(data)
}).catch( (data)=>{
    console.log(data)
    return 2
})
```

**promise实现执行顺序，无论定时器如何，必须等机器状态res才能进入下一个回调**。

```javascript
new Promise(function(res,rej){
	setTimeout( ()=>{
		console.log('开始')
		res('第一台机器');
	} ,Math.random()*1000)
}).then( ()=>{
	return new Promise( (res,rej)=>{
		setTimeout( ()=>{
			console.log('执行')
			res('第二台机器');
		},Math.random()*1000 )
	})
}).then(()=>{
	setTimeout( ()=>{
		console.log('结束')
	},Math.random()*1000 )
})
```

### 3.promise的方法

```javascript
Promise.all([p1,p2,p3...])
//如果所有的promise机器状态都是resolved  则all函数的返回结果就是resolved
//如果有一个promise机器状态是rejected   则all函数的返回结果就是rejected
```

```javascript
Promise.race([p1,p2,p3...])
//返回的是最早有状态的promise机器
```

```javascript
Promise.resolve(参数)  //生成一个resolved状态的机器
Promise.reject(参数)  //生成一个rejected状态的机器
```

**示例**

```javascript
let p1 = new Promise(function (res,rej) {
    setTimeout(()=>{
        res('p1成功了');
    },1000)
})
let p2 = new Promise(function (res,rej) {
    setTimeout(()=>{
        res('p2成功了');
    },500)
})
let p3 = new Promise(function (res,rej) {
    setTimeout(()=>{
        res('p3成功了');
    },300)
})
let p = Promise.all([p1,p2,p3]);
console.log(p);

//如果不想promise机器报错  必须把错误信息catch
p.catch( (data)=>{
	console.log(data);
} )
```

## 10. class，extend

### 10.1 class创建类

使用class关键词可以定义一个类，类的数据类型是function，只要通过new启动了类，就会自动执行constructor这个函数。

```javascript
class Person{   //类  只能写函数
    // 而且这些函数(没有使用static关键词)会自动挂到Person.prototype上 这些方法成为动态方法
    //有static 关键词修饰的函数 会挂载到类上  这些方法叫做静态方法
    constructor(name,age){      //构造函数
        this.name = name;
        this.age = age
    }
    sayName(){
        console.log(this.name)
    }
    sayAge(){
        console.log(this.age)
    }
    static hello(){
        console.log('hello')
    }
}
var person = new Person('heaven',28)
```

### 10.2 extends继承

- 1.如果不在类中写constructor函数，系统会自动加上。
- 2.必须在一个继承父类的子类的constructor函数写上super()，这时super是一个函数。
- 3.super在子类的constructor中指的是，父类的constructor。
- 4.在除了constructor方法的所有方法中使用super，此时super表示父类的原型。

**super的指向**

- 1.在子类的所有方法中

		把`super`当做对象使用，则super表示父类的原型对象。

- 2.在子类的`constructor`中

		当做函数使用，则`super`就指向父类的`constructor`。

- 3.在子类的方法中

		把`super`当做对象使用，并且赋值，则`super`指向`this`。

```javascript
class Person{   //父类
	constructor(name){
		this.name = name;
	};
	sayName(){
		console.log(this.name);
	}
}
class Student extends Person{
	constructor(name){
		super(name);    //继承父类constructor函数中的属性
	}
	sayName(){      
		super.sayName();//在执行子类的方法的同时  还需要执行父类的同名方法
		console.log('子类的方法');
	}
}
```

```javascript
class A {       //父类
    constructor() {
        this.x = 1;
    }
    sayName(){
    }
    x(){           
    }
}
var a = new A()
class B extends A {     //子类
    constructor() {
        super();        //父类的构造函数  继承父类中constructor函数中的私有属性
        this.x = 2;
        super.x = 3;   //如果通过super对某个属性赋值，这时super就是this
        console.log(super.x);       //undefined
        console.log(this.x);        //3
    }
}
let b = new B();
```

## 11. ES6导入import导出export

```javascript
//a.js
import a,{b1 as a1,b2,b3,b4,b5} from './b.js'
//a接收了b.js的默认导出{name:'heaven'},bi导入命名为a1
import * as obj from './b.js'

//as 关键词的作用
//可以把b.js文件中的变量名  重命名
//接收默认导出的数据  是不需要{}
```

```javascript
//b.js
//一个export 关键词只能导出一个数据
export let b1 = '我是b文件的数据'
export let b2 = 2
export let b3 = function(){}

//这种方式一个export 可以导出多个数据
export {            
	变量1,变量2...
}

let b4 = [1,2]
let b5 = {
    name:'heaven'
}
export {
    b4,
    b5
}
//默认导出     在一个js文件中只能默认导出一次
export default {name:'heaven'};
```