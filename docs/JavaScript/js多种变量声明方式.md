## 多种变量声明方式

### 1. var变量提升

var 指令的作用就是在当前作用域下声明了一个变量 。

作用域：就是按照名称查找变量的一套规则/一个空间。

```javascript
var a = 10;
console.log(a);//输出数字10
```

```javascript
console.log(a);//报错ReferenceError:a is not defined
```

```javascript
var a;
console.log(a);//输出undefined
a = 10;
console.log(a);//数字10
```

无论在那个作用域中，var指令都会被提前到该作用域代码的最前。（在预编译阶段完成，预编译结束开始执行代码，此时作用域内存储了变量，值为undefined，直到var声明的变量被赋值之前，使用都是undefined）

```javascript
console.log(a);//undefined
var a;
a = 10;
console.log(a);//10
```

### 2. 函数变量提升

无论在哪个作用域中，函数声明指令也都会被提前到该作用域代码的最前，**函数声明指令会被提前到var指令之前。**

```javascript
console.log(add);//f (){}
add();//9527
function add(){
    console.log(9527);
}
var add = 10;
console.log(add);//10
```

预编译结束，开始执行js代码，此时GO：

```javascript
{
    add:function(){}
}
```

执行到`add = 10`，作用域内add被赋值为10，此时GO：

```javascript
{
    add:10
}
```

<img src='/docs/js/zuoyongyu.png' alt='zuoyongyu.png'>

### 3. let

var指令创造的变量只有函数作用域，在控制流程内不会产生作用域，外面也可以访问到控制流程内部的变量。

```javascript
var a = 20;
var b = 10;
if(a>b){
    var c = 30;
}
console.log(c);//30

for(var i=0;i<10;i++){
    console.log('hello')
}
console.log(i);//i被挂载到全局作用域window上，for循环结束，i为10
```

#### 3.1 let指令的块级作用域

使用let指令创造的变量，**存在块级作用域**，控制流程内部用let指令定义的变量，在控制流程外部无法获取。

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

#### 3.2 let重复声明变量会报错。

```javascript
var i = 10;
let i;//Identifier 'i' has already been declared
```

报错信息的意思为: 变量i已经被声明过。

#### 3.3 let暂时性死区TDZ，无变量提升

因为let指令没有变量提升，所以在浏览器在执行到let指令之前，任何语句中都无法使用该let指令所定义的变量。

```javascript
console.log(b);//无变量提升，报错ReferenceError: Cannot access 'count' before initialization
let b;
console.log(b);//undefined
b = 10;
```

块级作用域内：

```javascript
function fn(){
    console.log(count);//ReferenceError: Cannot access 'count' before initialization
    let count;
}
fn();
```

> 当程序的控制流程在新的作用域（`module` `function` 或 `block` 作用域）进行实例化时，在此作用域中用let/const声明的变量会先在作用域中被创建出来，但因此时还未进行词法绑定，所以是不能被访问的，如果访问就会抛出错误。因此，在这运行流程进入作用域创建变量，到变量可以被访问之间的这一段时间，就称之为暂时死区。 

### 4. const

`const` 指令定义常量。

`const`声明和`let`非常类似，区别就是 

- const定义好一个值之后，不允许修改变量值; 
- 初始化的时候就要赋值; 
- 常量变量名请大写(只是规范而已，小写也不会报错，但是大写了可以让程序员快速识别该变量是啥);

### 5. 经典案例

```html
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

> 所有的函数内部的变量i指向的是全局作用域内的变量i的值，所以当函数执行的时候， 就回去寻找此时此刻变量i的值, 而变量i的值在经历完循环之后数字已经变成了5，所以每一个函数输出的值都是5。

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

### 6. JavaScript垃圾回收

#### 6.1 标记清除(mark-and-sweep)

JavaScript最常用的是标记清除：当变量进入环境(作用域)，则将变量标记为进入环境，当变量离开环境的时候，将其标记为离开环境。 

垃圾收集器在运行时会给存储在内存中所有变量标记，然后去掉环境变量与被环境变量引用的变量，剩下的就是环境无法访问的变量，这些变量以及其占用的内容空间将被清理回收。

#### 6.2 引用计数(reference counting)

不太常见的垃圾回收策略：引用计数。 

跟踪每一个值得引用次数。当声明一个引用并将一个引用类型赋值给这个变量得时候，这个值得引用计数加1，如果又把这个引用给了第三个变量，那么引用计数又加1，变成2。如果有变量得引用被指向了别的值，那么引用计数减1，直到等于0。意味着这个值已经不会被变量引用，垃圾收集器下次运行得时候就会清理引用 

为0得值所占据得内存。 

如果一个值得引用出现闭环得话，这个值得引用不会变为0，循环引用使得值得内存永远得不到回收。意味着永远占用内存。

**所以：对于不需要得值，或者使用完的值，请手动将变量得指向指向清除。**

### 7. 函数闭包原理

函数内部的变量在函数外部是无法获取的，但是如果我们要获得函数内部的某个参数或是变量的值的话，我们可以用`return`的方法来实现。

```javascript
function foo(){
    var a = 'foo里的a'
    return a;
}
let b = foo();
console.log(b);
```

**函数可以通过作用域链互相关联起来，函数体内部的变量都可以保存在函数作用域内，这种特性被称为闭包。**

```javascript
function foo(c){
    var num = c;
    return function A(){
        num++;
        return num;
    }
}
var b = foo(5);
console.log(b());//6
console.log(b());//7
```

> **函数执行后, 垃圾回收因为参数num被函数A引用了,所以 num的数据不会被回收,下一次,b函 数执行时还能访问到变量num 。**

