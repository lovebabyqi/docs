# js面向对象

## 1. 面向对象编程介绍

### 1.1 编程两大思想

​	**面向过程编程POP(Process-oriented programming)**

面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候再一个一个依次调用就可以了。

```javascript
//大象装进冰箱 面向过程
//1.打开冰箱门
//2.大象装进去
//3..关上冰箱门
```

​	**面向对象编程OOP(Object Oriented Programming)**

面向对象是把事务分解成一个个对象，然后由对象之间分工与合作。

面向对象是以对象功能来划分问题，而不是步骤。

```javascript
//大象装进冰箱,面向对象做法
//先找出对象
//1.大象对象
//	进去
//2.冰箱对象
//	打开
//	关闭
```

### 1.2 面向过程和面向对象的对比

**面向过程**

优点：性能比面向对象高，适合跟硬件联系很紧密，例如单片机。

缺点：没有面向对象易维护，易复用，易扩展。

**面向对象**

优点：易维护，易复用，易扩展，由于面向对象有封装，继承，多态性的特性，可设计出低耦合系统，使系统更加灵活更加易于维护。

缺点：性能比面向过程低。

## 2. 面向对象的思维特点:

1.抽取(抽象)对象共用的属性和行为组织(封装)成一个类(模板)。

2.对类进行实例化,获取类的对象。

面向对象编程我们考虑的是有哪些对象，按照面向对象的思维特点，不断的创建对象，使用对象,指挥对象做事情。

### 2.1 创建类

ES6引入了类的概念

```javascript
//创建类
class Star {
    constructor(uname,age){
        this.uname = uname;
        this.age = age;
    }
}
//类使用new实例化对象
var ldh = new Star ('刘德华',18);
```

constructor()方法是类的构造函数(默认方法)，**用于传递参数,返回实例化对象**，通过new生成对象实例时，自动调用该方法。如果没有显示定义，类内部会自动给我们创建一个constructor()。

### 2.2 类添加方法

```javascript
class Star {
    constructor(uname,age){
        this.uname = uname;
        this.age = age;
    }
    sing (song) {//方法可接收参数参数
        console.log(this.name + song);
    }
}
var ldh = new Star('刘德华',18);
ldh.sing('笨小孩');
```

### 2.3 类的继承 extends

```javascript
//语法
class Father {
    
}
class Son extends Father {//子类继承父类的一些属性和方法
    
}
```

### 2.4 super关键字

super用于访问和调用对象父类上的函数，可以**调用父类的构造函数**，也可以**调用父类的普通函数。**

```javascript
//调用构造函数
class Father {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    sum (){
        console.log(this.x + this.y);
    }
}
class Son extends Father {//子类继承父类的一些属和方法
    constructor(x,y){
        super(x,y);//调用了父类中的构造函数
    }
}
var son = new Son1(1,2);
son.sum();
//如果不用super调用,由于父类子类this指向不一样,父类接收不到son实例化的参数
```

```javascript
//调用父类的普通函数
class Father {
    say () {
        return '我是father'
    }
}
class Son extends Father{
    say () {
        //console.log('我是son')
        console.log(super.say() + '的son')
        //super.say() 就是调用父类的普通函数say()
    }
}
var son = new Son();
son.say();	
//继承中的属性或者方法查找原则:就近原则
//1.继承中,如果实例化子类输出一个方法,先看子类有没有这个方法,如果有就限制性子类的方法
//2.如果子类里面没有,就去查找父类有没有这个方法,如果有,就执行父类的方法(就近原则)
```

**注:子类在构造函数中使用super，必须放到前面(必须先调用父类的构造方法，再使用子类构造方法)**。

```javascript
class Father {	//父类
    constructor(uname){
        this.uname = uname;
    }
}
class Son extends Father {//子类继承父类
    constructor(uname,firstname){
    	super(uname);	//调用父类的constructor(uname)
    	this.firstname = firstname
    }
}
```

## 3. 构造函数

ES6之前，对象不是基于类创建的，而是一种称为构造函数的特殊函数来定义对象和它们的特征。

创建对象三中方式：

- 1.对象字面量
- 2.new Object()
- 3.自定义构造函数

```javascript
function Star (uname,age){
    this.uname = uname;
    this.age = age;
    this.sing = function(){
        console.log('singing');
    }
}
Star.sex = '男';//静态成员
var ldh = new Star('刘德华',18);
ldh.sing();
//构造函数用于创建某一类对象,其首字母大写
//通过new启动
```

**new 关键词**

new在执行时会做4件事

```javascript
//1.创建一个新的空对象
//2.this指向这个新的对象
//3.执行构造函数里面的代码,给这个新对象添加属性和方法
//4.返回这个新对象(所以构造函数里面不需要return)
```

#### 1.实例成员

构造函数内部通过this添加的成员 uname age sing 就是实例成员。

**实例成员只能通过实例化的对象来访问。**

#### 2.静态成员

在构造函数本身上添加的成员，"上面的sex就是静态成员"。

**静态成员只能通过构造函数访问**

### 3.1 构造函数问题

1.构造函数中存在的**问题**：每次实例化都会创建新的sing方法，存在浪费内存的问题。

```javascript
function Star (uname,age){
    this.uname = uname;
    this.age = age;
    this.sing = function(){
        console.log('singing')
    }
}
var ldh = new Star('刘德华',18)
var zxy = new Star('张学友',19)
console.log(ldh.sing === zxy.sing); //false
//每次实例化都会创建新的sing方法;存在浪费内存的问题
```

### 3.2 原型对象prototype

构造函数通过原型分配的函数是所有对象共享的，就不需要单独开辟内存空间了。

**JavaScript规定，每一个构造函数都有一个prototype属性，指向另一个对象，注意这个prototype就是一个对象，这个对象的所有属性和方法，都被构造函数所拥有。**

可以把那些不变的方法，直接定义在prototype对象上：

```javascript
function Star (uname,age){
    this.uname = uname;
    this.age = age;
}
Star.prototype.sing = function(){
	console.log('singing');
}
var ldh = new Star('刘德华',18);
var zxy = new Star('张学友',19);
console.log(ldh.sing === zxy.sing); //true
```

```javascript
//总结
1.原型是什么?
	一个对象,我们也称为prototype 原型对象
2.原型的作用是什么?
	共享方法
```

### 3.3 对象原型`__proto__`

对象都会有一个属性`__proto__`指向构造函数的`prototype`原型对象，之所以我们对象可以使用构造函数`prototype`原型对象的属性和方法，就是因为对象有`__proto__`原型的存在。

```javascript
function Star (uname,age){
    this.uname = uname;
    this.age = age;
}
Star.prototype.sing = function(){
	console.log('singing')；
}
var ldh = new Star('刘德华',18)；
var zxy = new Star('张学友',19)；
console.log(ldh);//系统给对象身上添加一个__proto__,指向我们构造函数的原型对象
console.log(ldh.__proto__ === Star.prototype); //true
```

```javascript
//方法的查找规则:首先看ldh对象身上是否有sing方法,如果有就执行这个对象上的sing方法
//如果没有,就去__proto__找,构造函数原型对象prototype身上去查找sing这个方法
```

### 3.4 constructor构造函数

对象原型(`__proto__`)和构造函数(`prototype`)原型对象里面都有一个`constructor`属性，`constructor`我们称为构造函数，因为它指回构造函数本身。

constructor主要**用于记录该对象引用于哪个构造函数,**他可以让原型对象重新指向原来的构造函数。

很多情况下需要手动使用constructor这个属性指回原来的构造函数

```javascript
function Star (uname,age){
    this.uname = uname;
    this.age = age;
}
//Star.prototype.sing = function(){
//	console.log('singing');
//}
Star.prototype = {	
    constructor:Star,//让constructor重新指回Star
    sing:function(){
        console.log('会唱歌');
    },
    movie:function(){
        console.log('会演电影');
    }
}
var ldh = new Star('刘德华',18);
var zxy = new Star('张学友',19);
//用对象的形式修改prototype,把原型对象prototype覆盖掉了,此时Star.prototype和ldh.__proto__
//就没有constructor属性了,需要手动让constructor属性指回原来的构造函数
```

```javascript
Star构造函数		--Star.prototype--> 		Star原型对象prototype
				<--Star.prototype.constructor--
		|										|
		\										/	ldh._proto-
						ldh对象实例
					ldh.proto.constructor
```

### 3.5 原型链

在对象上查找属性的步骤

先从自身查找属性，如果自身没有找到这个属性，那就从自身的`__proto__`上查找，如果还是没有找到这个属性，那就继续往沿着`__proto__`上查找，我们把这种查找规则称为原型链查找，如果在Object.prototype（原型链终端）上没有找到指定属性 则结果是`undefined`。
    **把由`__proto__`组成的链式结构称为原型链**

```javascript
Object.prototype.__proto__ === null;//true
```

### 3.6 原型对象的this指向问题

```javascript
function Star (uname,age){
    this.uname = uname;
    this.age = age;
}
var that;
Star.prototype.sing = function(){
	console.log('singing');
	that = this;
}
var ldh = new Star('刘德华',18);
//在构造函数中,里面this指向的是对象实例 ldh
ldh.sing();//ldh这个实例对象调用了sing方法,sing方法内的this就指向ldh实例对象
console.log(that === ldh);//true
//原型对象函数里面的this 指向的是 实例对象 ldh
```

### 3.7 利用原型对象扩展内置对象的方法

比如给数组增加自定义求和的功能

```javascript
Array.prototype.sum = function (){
    var sum = 0;
    for(var i=0;i<this.length;i++){
        sum += this[i];
    }
    return sum;
}
var arr = [1,2,3];
console.log(arr.sum());//6
console.log(Array.prototype);//此时就能在Array的原型对象上看到sum方法
```

- **只能用属性追加方法**	

- **数组和字符串内置对象不能给原型对象覆盖操作 Array.prototype = {},**
- **只能是Array.prototype.xxx = function(){}的方式**

### 3.7 继承

ES6之前并没有给我们提供extends继承，我们可以通过构造函数+原型对象模拟实现继承，被称为组合继承。

#### call()

**调用函数,并且修改函数运行时的this指向**

```javascript
fun.call(thisArg,arg1,arg2,...);
//thisArg:当前调用函数this的指向对象
//arg1,arg2:传递的其他参数
```

```javascript
function fn(){
    console.log('我要喝手磨咖啡')
    console.log(this);
}
var o = {
    name:'andy'
}
//fn();
//call()可以调用函数
fn.call();//此时fn 函数的this 指向window
//call()可以改变这个函数的this指向
fn.call(o);//此时fn 函数的this指向o这个对象
```

#### 借用父构造函数继承属性和方法

**利用原型对象实现属性和方法的继承**

属性:

```javascript
function Father(uname,age){
    //this 指向父构造函数的实例
    this.uname = uname;
    this.age = age;
}
function Son(uname,age){
    //this 指向子构造函数的实例
    Father.call(this,uname,age);//首先调用父构造函数,把this指向子构造函数的this
}
var son = new Son('刘德华',18)
```

方法:

```javascript
//错误的方法
function Father(uname,age){
    //this 指向父构造函数的实例
    this.uname = uname;
    this.age = age;
}
Father.prototype.money = function(){
 	console.log(1000000);
}
function Son(uname,age,score){
    //this 指向子构造函数的实例
    Father.call(this,uname,age);//首先调用父构造函数,把this指向子构造函数的this
    this.score = score;
}
Son.prototype = Father.prototype;//错误的用法
//这样直接赋值会有问题,如果修改了子原型对象,父原型对象也会跟着一起变化
Son.prototype.exam = function(){
    console.log('孩子要考试');
}
var son = new Son('刘德华',18,100);
console.log(son);
console.log(Father.prototype);//父原型对象上也有exam方法,是不对的
```

```javascript
//正确的方法
function Father(uname,age){
    //this 指向父构造函数的实例
    this.uname = uname;
    this.age = age;
}
Father.prototype.money = function(){
 	console.log(1000000);
}
function Son(uname,age,score){
    //this 指向子构造函数的实例
    Father.call(this,uname,age);//首先调用父构造函数,把this指向子构造函数的this
    this.score = score;
}
Son.prototype = new Father();
//相当于用Father的实例对象中转,Father实例对象能访问到Father原型对象
//Son也能访问到Father的money方法,就实现了模拟继承
Son.prototype.constructor = Son;
//如果利用对象的形式修改了原型对象,别忘了利用constructor指回原来的构造函数
Son.prototype.exam = function(){
    console.log('孩子要考试');
}
var son = new Son('刘德华',18,100);
console.log(son);
console.log(Father.prototype);//父原型对象上没有exam方法
```

### 3.8 ES6类的本质

ES6之前通过构造函数 + 原型实现面向对象编程。

构造函数的特点:

- 构造函数有原型对象`prototype`。
- 构造函数原型对象`prototype`里面有`constructor` 指向构造函数本身。
- 构造函数可以通过原型对象添加方法。
- 构造函数创建的实例对象有`__proto__`原型指向构造函数的原型对象。



ES6通过 类 实现面向对象编程

```javascript 
class Star {

}
console.log(typeof Star)//function
//1.类的本质其实还是一个函数 我们也可以简单地认为 类 就是构造函数的另外一种写法
//验证1.类有原型对象prototype
console.log(Star.prototype);
//2.类原型对象prototype 里面有constructor 指向类本身
console.log(Star.prototype.constructor);
//3.类可以通过原型对象添加方法
Star.prototype.sing = function(){
    console.log('冰雨')
}
//4.类创建的实例对象有__proto__ 原型指向 类的原型对象
var ldh = new Star()
console.log(ldh);
console.log(ldh.__proto__ === Star.prototype)//true
```

经过以上验证,得出

### 结论:

- **1.class本质上还是function。**
- **2.类的所有方法都定义在类的prototype属性上。**
- **3.类创建的实例,里面也有__proto_-指向类的prototype原型对象。**
- **4.所以ES6的类，他的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰，更像面向对象编程的语法而已。**
- **5.ES6的类其实就是语法糖。**

