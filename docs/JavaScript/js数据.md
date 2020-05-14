## JavaScript数据

## 1.1 js数据类型

### 原始值

- 数字`number`
- 字符串`string`
- 布尔类型`boolean`
- `undefined`类型，表示未定义
- `null`类型，表示空值，空指针

### 引用值

对象`Object`

`Object`又可分为

- 普通对象，用一组花括号包裹的数据，`{}`， `{name:'shiyue'}`
- 数组对象，用一组中括号包裹的数据，`[]`，`[1,2,'lala']`
- 函数对象，`function auto(){}`

## 1.2 数据类型判断

### 1.2.1 `typeof`操作符

```javascript
typeof JS数据
1.可以检测出JS数据的类型
2.检测出的结果是以字符串格式的

typeof	数字   -->     number

typeof	字符串 -->     string

typeof	布尔类型  -->  boolean

typeof	undefined类型  -->  undefined

typeof	null类型  -->   'object'

typeof	普通对象  -->  'object'

typeof	数组对象  -->  'object'

typeof	函数对象  --> 'function'

typeof	undefined类型  -->	'undefined'

console.log()  //在控制台中输出结果

//在控制台中  黑色表示字符串  蓝色表示数字
```

需要注意：

对基本包装类的实例调用`typeof`会返回`object`

```javascript
var obj = new Object('some text');
console.log(obj);//String{'some text'}
typeof obj;//'object'

var value = '25';
var number = Number(value);//转型函数
typeof number;//'number'

var obj2 = new Number(value);//构造函数，String构造函数也是同样的表现
typeof obj2;//'object'
```



### 1.2.2 `Object.prototype.toString.call()`

**判断数据类型更准确，包括日期对象，`null`**

```javascript
console.log(Object.prototype.toString.call(123)) //[object Number]
console.log(Object.prototype.toString.call('123')) //[object String]
console.log(Object.prototype.toString.call(undefined)) //[object Undefined]
console.log(Object.prototype.toString.call(true)) //[object Boolean]
console.log(Object.prototype.toString.call({})) //[object Object]
console.log(Object.prototype.toString.call([])) //[object Array]
console.log(Object.prototype.toString.call(function(){})) //[object Function]
```

### 1.2.3 `isNaN`

**这个函数可以判断一个数字是不是NaN如果是 则结果`true` 反之 `false`**

如果用isNaN函数来判断其他JS的数据，则会

- 先隐式转成数字
- 再把隐式转换好德1数字放到isNaN函数中

```javascript
isNaN(true) -->  isNaN(1)   -->false

isNaN(function(){})  -->  isNaN(NaN)  --> true

isNaN([1,2])  -->  isNaN(NaN)  --> true

isNaN([1])  -->  isNaN(1)  --> false

isNaN('12.5px')  -->  isNaN(NaN)  --> true

isNaN(null) -->  isNaN(0)  --> false

isNaN(undefined)   -->  isNaN(NaN)  --> true
```

### 1.2.4 Number.isNaN()

**Number.isNaN()** 方法确定传递的值是否为 NaN，并且检查其类型是否为 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)。它是原来的全局 `isNaN()` 的更稳妥的版本。 

示例：

```javascript
Number.isNaN(NaN);        // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0 / 0)       // true

// 下面这几个如果使用全局的 isNaN() 时，会返回 true。
Number.isNaN("NaN");      // false，字符串 "NaN" 不会被隐式转换成数字 NaN。
Number.isNaN(undefined);  // false
Number.isNaN({});         // false
Number.isNaN("blabla");   // false

// 下面的都返回 false
Number.isNaN(true);
Number.isNaN(null);
Number.isNaN(37);
Number.isNaN("37");
Number.isNaN("37.37");
Number.isNaN("");
Number.isNaN(" ");
```

`isNaN()` 和 `Number.isNaN()` 比较：

和全局函数 `isNaN()`相比，`Number.isNaN()` 不会自行将参数转换成数字，只有在参数是值为 `NaN` 的数字时，才会返回 `true`。 

```javascript
const name = 'shiyue xiao shuai ge';
const age = 19;
console.log(Number.isNaN(name));//false
console.log(Number.isNaN(name));//false
console.log(isNaN(name));//true
console.log(isNaN(name));//false
```



## 1.3 数据类型转换

### 1.3.1 转换为数字

#### **数字类型转换之`Number()`**

`Number(value)` 通过这个函数，我们可以把其他的数据类型转换成数字类型。

**原始值：**
字符串中只要含有非数字(除了数字，负号，和小数点之外的)在使用Number函数转成数字类型时都是NaN。

**字符串类型**使用Number函数转换为数字类型

如果是字符串，遵循下列规则： 

> **如果字符串中只包含数字（包括前面带正号或负号的情况），则将其转换为十进制数值，即"1"会变成1，"123"会变成123，而"011"会变成11（注意：前导的零被忽略了）；** 
>
> **如果字符串中包含有效的浮点格式，如"1.1"，则将其转换为对应的浮点数值（同样，也会忽略前导零）；** 
>
> **如果字符串中包含有效的十六进制格式，例如`"0xf"`，则将其转换为相同大小的十进制整数值；** 
>
> **如果字符串是空的（不包含任何字符），则将其转换为0；** 
>
> **如果字符串中包含除上述格式之外的字符，则将其转换为`NaN`。**

```javascript
Number('')  -->  0
Number(' ')  -->  0
Number('1.1')-->1.1
Number('0xb')-->11	//16进制字符
```

**布尔类型**使用Number函数转换成数字类型

```javascript
Number(true)  --> 1
Number(false) --> 0
```

**`null`类型**使用Number函数转换成数字类型

```javascript
Number(null)  ->  0
```

**`undefined`**类型使用Number函数转换成数字类型

```javascript
Number(undefined)  ->  NaN
```

**引用值：**
引用值使用`Number`函数转换成数字类型有两步

- 1.先把引用值隐式转换成字符串。

- 2.再把隐式转换好的字符串放到`Number`中。

普通对象使用`Number`函数转换成数字类型

```javascript
Number([1])  -->  Number('1')  -->  1
Number([1,2,3])  -->  Number('1,2,3')  --> NaN
Number(function(){}) --> Number('function(){}')  --> NaN
```

#### 转换数字类型之`parseInt()`

`Number()`函数在转换字符串时比较复杂而且不够合理，因此在处理整数的时候更常用的是`parseInt()`函数。`parseInt()`是`Number()`的一个分支, `int`是整数的意思。

> **它会忽略字符串前面的空格，直至找到第一个非空格字符如果第一个字符是数字字符，`parseInt()`会继续解析第二个字符，直到解析完所有后续字符或者遇到了一个非数字字符。**
>
> **如果第一个字符不是数字字符或者负号，`parseInt()`就会返回`NaN`。**
>
> **如果待解析的值是小数或是字符串打头的是小数的话, 那么`parseInt()`的结果只会截取整数部分, 无论小数部分是多少。**

#### 转换数字类型之parseFloat()

`parseFloat`与`parseInt`唯一的区别就是它可以分析出小数 

**Number.prototype.fixed()**

传入一个数值(0~20)，表示保留几位小数(字符串形式)

```javascript
var num = 10.0005;
num.toFixed(2);//'10.00'
num.toFixed(3);//'10.001'
```



### 1.3.2 转换字符串

万物皆对象!!!!!! 

几乎每个值都有的`toString()`方法,但是调用的方法不同 

**数字转化为字符串不能直接用数字`.toString()`来实现转化需要把数字存在一个变量中间, 然后用`变量.toString()`实现转化。**

原始值：

```javascript
数字类型转换成字符串类型  2  -->  '2'
布尔类型转换成字符串类型  true  -->  'true'
null/undefined不能直接使用toString函数 变成字符串
```

引用值：

```javascript
普通对象    {}  -->   '[object Object]'
数组对象   [1,2,3]  -->   '1,2,3'
函数对象   function(){}  -->  'function(){}'
```

toString()可以传递基数 radix，告诉他返回radix进制数值的字符串形式。

```javascript
var num = 10;
num.toString();//'10'
num.toString('2');//'1010'
num.toString('8');//'12'
num.toString('10');//'10'
num.toString('16');//'a'
```



### 1.3.3 转换为布尔值`Boolean`

**`Boolean`函数 能够把JS的其他数据类型转换成布尔值**
**只有  `0  NaN  undefined null false ''  `转成布尔值是`false`**
其他的所有JS数据转成布尔值时都是 `true`

**!  取反运算符  作用：对布尔值取反**

```javascript
!true  -->  false
!false -->  true
```

如果！后面跟的不是布尔值  则
   1.先把！后面的`JS`数据 转成布尔值
   2.再取反

```javascript
!0  -->  !false  --> true
```

**!! 双取反运算符**

!!的作用和`Boolean`函数的作用是一样的 都是把JS的数据转换成布尔值

```javascript
!!0  -->  !true --> false
```

## 1.4 js字符串方法API

**`String.prototype.anchor()`**

`anchor()`方法用于创建一个`<a>html`描元素

```javascript
const str = '我是html内容'.anchor('我是name属性值')
console.log(str) // "<a name="我是name属性值">我是html内容</a>"
```

**`String.prototype.bold()`**

`bold()`方法用于创建`<b>html`元素

```javascript
const str = 'aaa'.bold()
console.log(str) // "<b>aaa</b>"
```

**`String.prototype.charAt()`**

`charAt()`方法用于返回字符串指定位置的字符

```javascript
'amz'.charAt() // 'a'  不传索引则默认为0
'amz'.charAt(1) // 'm' 
```

**`String.prototype.charCodeAt()`**

`charCodeAt()`返回指定位置字符的字符编码

```javascript
'amz'.charCodeAt(1);//109
//借助charCodeAt（）得到字符编码数字，就能转换二进制字符
```

**`String.prototype.concat()`**

concat()将多个字符串拼接在一起

```javascript
const a = 'aaa'
const b = 'bbb'
const c = 'ccc'.concat(a, b, 'ddd')
console.log(c) // 'cccaaabbbddd' 
```

**`String.prototype.endsWith()`**

`endsWith()`方法用于判断当前字符串是否以另一个给定字符串结尾

```javascript
const name = 'my name is amz' 
name.endsWith('z') // true
name.endsWith('mz') // true
name.endsWith('amz') // true
name.endsWith('is') // false
```

**`String.prototype.startsWith()`**

`startsWith()`判断当前字符串是否是以另外一个给定的子字符串开头

```javascript
const amz = 'my name is amz'
amz.startsWith('my n') //true
amz.startsWith('amz', 11) // true  第二个参数是从哪里开始
```

**`String.prototype.includes()`**

`includes()`判断一个字符串是否包含在另一个字符串中

```javascript
const name = 'my name is amz' 
name.includes('amz') //true
name.includes('s amz') //true
name.includes('you') // false
```

**`String.prototype.indexOf()`**

`indexOf()`方法返回给定字符串在原字符串中首次出现的索引

```javascript
const name = 'my name is amz'
name.indexOf('my n') //0   字符串可以给字符串
name.indexOf('y') // 1
name.indexOf('m', 6) //12     //第二个参数是从第几位开始找
name.indexOf('l') // -1 没找到返回-1
```

indexOf应用：查找字符串中某个字符的所有索引

```javascript
var str = 'hello my name dj7mei';
var position = [];
var pos = str.indexOf('m');
while(pos>-1){
    position.push(pos);
    pos = str.indexOf('m',pos+1);
}
console.log(position);
```

**`String.prototype.lastIndexOf()`**

`lastIndexOf()`方法返回给定字符串在原字符串中最后一次出现的索引

```javascript
const name = 'my name is amz'
name.lastIndexOf('m') //12
name.lastIndexOf('m',7) //5 第二个参数是从第几位开始找，说白了 可以理解把name那个字符串从第七位截取，后面的不要了，
　　　　　　　　　　　　　　//然后在应用一下name.lastIndexOf('m') ，
　　　　　　　　　　　　　　//在理解一下，就是从第七位开始向前面找首次出现m的位置
```

**`String.prototype.link()`**

`link()`方法用于创建一个`<a>html`标签

```javascript
'my name is amz'.link('www.p8p7.com')  // <a href="www.p8p7.com">my name is amz</a>
```

**`String.prototype.padEnd()`**

`padEnd()`方法接受两个两个参数，第一个参数是目标字符串期望的长度，第二个参数是如果字符串长度没达到期望的长度就用第二个参数添加到目前字符串的尾部，使它达到期望的长度

```javascript
'abc'.padEnd(5) // 'abc  ' 如果第二个参数没有传，就会用空格代替
'abc'.padEnd(2, 'amz') // 'abc' 如果期望长度小于目标字符串长度 那么就对目标字符串什么也不做，按照原来的返回
'abc'.padEnd(6, '123456') // 'abc123'
```

**`String.prototype.padStart()`**

`padStart()`方法接受两个两个参数，第一个参数是目标字符串期望的长度，第二个参数是如果字符串长度没达到期望的长度就用第二个参数添加到目前字符串的前面，使它达到期望的长度

```javascript
'abc'.padStart(6, '123456') // '123abc'
```

**`String.prototype.repeat()`**

`repeat()`方法用于吧字符串重复n次 n就是传递进去的参数

```javascript
'amz'.repeat(3.5)  //'amzamzamz'  小说会转化成整数 向下取整
'amz'.repeat(0)  // ‘’ 重复0次就成了空字符串了
'amz'.repeat(1) // 'amz'  重复1次
'amz'.repeat(2) // 'amzamz'  重复2次
```

**`String.prototype.search()`**

`search()`返回字符串在指定字符串首次出现的位置，如果没找到就返回-1

```javascript
'my name is amz'.search('amz')  // 11
'my name is amz'.search('my') // 0
'my name is amz'.search(/amz/) // 11 也可以传正则表达式
```

**`String.prototype.slice()`**

`slice()`截取字符串的一部分，并返回这个新字符串

```javascript
'my name is amz'.slice(11) // "amz" 传递2个参数，第一个参数是从什么位置开始裁剪，第二个参数是 截取到什么地方，如果没传递第二个参数，就默认裁剪到最后一位
'my name is amz'.slice(0,2) // 'my' 从第1位裁剪到第三位
'my name is amz'.slice(0,-1) // "my name is am"  两个参数都可以是负数， 负数参数相加原字符串的长度  也就是上面的意思是说 从第1位裁剪到'my name is amz'.length + -1的位置
```

**`String.prototype.split()`**

`split()`方法把字符串分割成数组

```javascript
const amz = 'my name is amz'
amz.split()  //  ['my name is amz']
amz.split(' ')//以空格分割['my','name','is','amz']
amz.split('', 2)  // ['m', ''y']  第二个参数是获取字符串的几位，分割成数组
amz.split('name')  // ["my ", " is amz"]   第一个参数是 拿掉字符串匹配的字符段 然后分割数组
amz.split('m')  // ["", "y na", "e is a", "z"]   第一个参数可以是正则表达式
```

**`String.prototype.substr()`**

`substr()`方法返回从指定位置开始，到指定数量的字符串

```javascript
const amz = 'my name is amz'
amz.substr(3) // 'name is amz'
amz.substr(-3) // 字符串长度+ -3    ‘amz’
amz.substr(1, 2) // 'am'  第二个参数是几位
```

如果开始位置也就是第一个参数大于字符串长度，则返回一个空字符串 第二个位置超出了字符串剩余长度，则默认为字符串剩余长度。为负数则是字符串长度加负数，也就是说比如我第一个参数为-1，那么我剩余字符串长度是1了，最多只能复制一个长度为1的字符串，第二个值大于1都默认转化为1

**`String.prototype.substring()`**

`substring()`返回字符串从开始索引到结束索引之间的一个子集

也就是提取从`substring()`第一个参数到第二个参数的 子字符串，参数均为整数，小于0都会被转化为0 ，如果大于字符串长度都会被转化为字符串长度 如果第二个参数大于第一个参数，则会默认吧两个参数位置调换

```javascript
const amz = 'my name is amz'
amz.substring(1,4) // 'y n'  从第一位截取第四位
amz.substring(4,1) // 'y n'  因为第二个参数大于第一个参数，则默认调换她们的位置    所以还是从第一位截取第四位
```

**`substring() 和 substr()`**

- 相同点：如果只是写一个参数，两者的作用都一样：都是是截取字符串从当前下标以后直到字符串最后的字符串片段。

`substr(startIndex)`;
`substring(startIndex)`;

```javascript
var str = '123456789';
console.log(str.substr(2));    //  "3456789"
console.log(str.substring(2)) ;//  "3456789"
```

- 不同点：第二个参数

`substr（startIndex,length）`： 第二个参数是截取字符串的长度（从起始点截取某个长度的字符串）；
`substring（startIndex, endIndex）`： 第二个参数是截取字符串最终的下标 （截取2个位置之间的字符串,‘含头不含尾’）。

```javascript
console.log("123456789".substr(2,5));    //  "34567"
console.log("123456789".substring(2,5)) ;//  "345"
```



**`String.prototype.toLocaleLowerCase()`**

`toLocaleLowerCase()`转化字符串为小写

```javascript
const amz = 'my NAME is amz'
amz.toLocaleLowerCase()  //'my name is amz'
const amz1 = 'MY NAME IS AMZ' 
amz1.toLocaleLowerCase()  //my name is amz'
```

**`String.prototype.toLocaleUpperCase()`**

`toLocaleUpperCase()`将字符串转化为大写

```javascript
const amz = 'my name IS amz'
amz.toLocaleUpperCase() // ''MY NAME IS AMZ
```

**`String.prototype.toUpperCase()`**

`toUpperCase()`和`toLocaleUpperCase()`方法一样 

```javascript
const amz = 'my name IS amz'
amz.toUpperCase() // ''MY NAME IS AMZ
```

**`String.prototype.toString()`**

`toString()`反回指定对象的字符串形式 

```javascript
const amz = 'my name is amz'
amz.toString()  // 'my name is amz'
```

**`String.prototype.trim()`**

`trim()`清除字符串两端的空格

```javascript
const amz = '  my name is amz  '
amz.trim()  // 'my name is amz'
```

**`String.prototype.trimLeft()`**

`trimLeft()`方法清除字符串左边的空格



**`String.prototype.trimRight()`**

`trimRight()`方法清除字符串右边的空格



**`String.prototype.replace()`**

`replace()`方法返回一个由替换值 替换一些匹配到的新字符串，

```javascript
const amz = 'my name is amz‘
amz.replace(/amz/, '123') // 'my name is 123'
amz.replace('m', '123') //  '123y name is amz'
```

可以是正则表达式匹配 也可以是字符串匹配

## 1.5 js数组方法API

**`concat()`**

`concat()` 方法用于连接两个或多个数组。该方法不会改变现有的数组，仅会返回被连接数组的一个副本。

```JavaScript
var arr1 = [1,2,3];
var arr2 = [4,5];
var arr3 = arr1.concat(arr2,'6');//可以传递数组,对象,原始值都行
console.log(arr1); //[1, 2, 3]
console.log(arr3); //[1, 2, 3, 4, 5,'6']
```

**`join()`**

`join()` 方法用于把数组中的所有元素放入一个字符串。元素是通过指定的分隔符进行分隔的，默认使用','号分割，不改变原数组。

```JavaScript
var arr = [2,3,4];
console.log(arr.join());  //'2,3,4'
console.log(arr.join(''));//'234'
console.log(arr);  //[2, 3, 4]
```

**`push()`**

`push()` 方法可向数组的末尾添加一个或多个元素，**并返回新的长度**。末尾添加，返回的是长度，会改变原数组。

```JavaScript
var a = [2,3,4];
var b = a.push(5);
console.log(a);  //[2,3,4,5]
console.log(b);  //4
push方法可以一次添加多个元素push(data1,data2....)
```

**`pop()`**

`pop()` 方法用于删除并返回数组的最后一个元素。返回最后一个元素，会改变原数组。

```JavaScript
var arr = [2,3,4];
console.log(arr.pop()); //4
console.log(arr);  //[2,3]
```

**`shift()`**

`shift()` 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。返回第一个元素，改变原数组。

```JavaScript
var arr = [2,3,4];
console.log(arr.shift()); //2
console.log(arr);  //[3,4]
```

**`unshift()`**

`unshift()` 方法可向数组的开头添加一个或更多元素，并返回新的长度。返回新长度，改变原数组。

```JavaScript
var arr = [2,3,4,5];
console.log(arr.unshift(3,6)); //6
console.log(arr); //[3, 6, 2, 3, 4, 5]
```

tip:该方法可以不传参数,不传参数就是不增加元素。

**`slice()`**

返回一个新的数组，包含从 `start` 到 `end` （不包括该元素）的 `arrayObject` 中的元素。返回选定的元素，该方法不会修改原数组。

```JavaScript
var arr = [2,3,4,5];
console.log(arr.slice(1,3));  //[3,4]
console.log(arr);  //[2,3,4,5]
```

**`splice()`**

`splice()` 方法可删除从` index` 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。如果从 `arrayObject` 中删除了元素，则返回的是含有被删除的元素的数组。splice() 方法会直接对数组进行修改。

```JavaScript
var a = [5,6,7,8];
console.log(a.splice(1,0,9)); //[]
console.log(a);  // [5, 9, 6, 7, 8]
var b = [5,6,7,8];
console.log(b.splice(1,2,3));  //[6, 7]
console.log(b); //[5, 3, 8]
```

**`sort `排序**

按照 `Unicode code` 位置排序，默认升序，会改变原始数组。

```javascript
var fruit = ['cherries', 'apples', 'bananas'];
fruit.sort(); // ['apples', 'bananas', 'cherries']

var scores = [1, 10, 21, 2];
scores.sort(); // [1, 10, 2, 21]
```

**`reverse()`**

`reverse() `方法用于颠倒数组中元素的顺序。返回的是颠倒后的数组，会改变原数组。

```javascript
var arr = [2,3,4];
console.log(arr.reverse()); //[4, 3, 2]
console.log(arr);  //[4, 3, 2]
```

**`indexOf 和 lastIndexOf`**

都接受两个参数：查找的值、查找起始位置，不存在，返回 -1 ；存在，返回位置。`indexOf`是从前往后查找，` lastIndexOf `是从后往前查找。
**`indexOf`**

```javascript
var a = [2, 9, 9];
a.indexOf(2); // 0
a.indexOf(7); // -1

if (a.indexOf(7) === -1) {
  // element doesn't exist in array
}
```

**`lastIndexOf`**

```javascript
var numbers = [2, 5, 9, 2];
numbers.lastIndexOf(2);     // 3
numbers.lastIndexOf(7);     // -1
numbers.lastIndexOf(2, 3);  // 3
numbers.lastIndexOf(2, 2);  // 0
numbers.lastIndexOf(2, -2); // 0
numbers.lastIndexOf(2, -1); // 3
```

**`every`**

对数组的每一项都运行给定的函数，每一项都返回 `ture`,则返回 `true`。

```javascript
function isBigEnough(element, index, array) {
  return element < 10;
}    
[2, 5, 8, 3, 4].every(isBigEnough);   // true
```

**`some`**

对数组的每一项都运行给定的函数，任意一项返回 `ture`，则返回 `true`，一旦返回true，就停止后续查找。

```javascript
function compare(element, index, array) {
  return element > 10;
}    
[2, 5, 8, 1, 4].some(compare);  // false
[12, 5, 8, 1, 4].some(compare); // true
```

**`filter`**

对数组的每一项都运行给定的函数，返回结果为 ture 的项组成的数组。

```javascript
var words = ["spray", "limit", "elite", "exuberant", "destruction", "present", "happy"];

var longWords = words.filter(function(word){
  return word.length > 6;
});
// Filtered array longWords is ["exuberant", "destruction", "present"]
```

**`map`**

对数组的每一项都运行给定的函数，返回每次函数调用的结果组成一个新数组。

```javascript
var numbers = [1, 5, 10, 15];
var doubles = numbers.map(function(x) {
   return x * 2;
});
// doubles is now [2, 10, 20, 30]
// numbers is still [1, 5, 10, 15]
```

**`forEach` 数组遍历**

```javascript
const items = ['item1', 'item2', 'item3'];
const copy = [];    
items.forEach(function(item){
  copy.push(item)
});
```

`flat`

`flat()` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。运用：数组降维，移除空值。

```javascript
var arr1 = [1, 2, [3, 4]];
arr1.flat(); //深度默认为1
// [1, 2, 3, 4]
var arr2 = [1,2,3,[1,2,3,4, [2,3,4]]];
var arr3 = arr2.flat(Infinity);//[1,2,3,1,2,3,4,2,3,4]
```



#### ES6新增新操作数组的方法

**`find()`**

传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它，并且终止搜索。

```javascript
const arr = [1, "2", 3, 3, "2"]
console.log(arr.find(n => typeof n === "number")) // 1
```

**`findIndex()`**

传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它的下标，终止搜索。

```javascript
const arr = [1, "2", 3, 3, "2"]
console.log(arr.findIndex(n => typeof n === "number")) // 0
```

**`fill()`**

用新元素替换掉数组内的元素，可以指定替换下标范围，不包括end。

```javascript
arr.fill(value, start, end)
```

**`copyWithin()`**

选择数组的某个下标，从该位置开始复制数组元素，默认从0开始复制。也可以指定要复制的元素范围。

```javascript
arr.copyWithin(target, start, end)
const arr = [1, 2, 3, 4, 5]
console.log(arr.copyWithin(3))
 // [1,2,3,1,2] 从下标为3的元素开始，复制数组，所以4, 5被替换成1, 2
const arr1 = [1, 2, 3, 4, 5]
console.log(arr1.copyWithin(3, 1)) 
// [1,2,3,2,3] 从下标为3的元素开始，复制数组，指定复制的第一个元素下标为1，所以4, 5被替换成2, 3
const arr2 = [1, 2, 3, 4, 5]
console.log(arr2.copyWithin(3, 1, 2)) 
// [1,2,3,2,5] 从下标为3的元素开始，复制数组，指定复制的第一个元素下标为1，结束位置为2，所以4被替换成2
```

**`from`**

将类似数组的对象（array-like object）和可遍历（iterable）的对象转为真正的数组。

```javascript
const bar = ["a", "b", "c"];
Array.from(bar);
// ["a", "b", "c"]

Array.from('foo');
// ["f", "o", "o"]
```

**`of`**

用于将一组值，转换为数组。这个方法的主要目的，是弥补数组构造函数 Array() 的不足。因为参数个数的不同，会导致 Array() 的行为有差异。

```javascript
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```

**`entries()` 返回迭代器：返回键值对**

```javascript
//数组
const arr = ['a', 'b', 'c'];
for(let v of arr.entries()) {
  console.log(v)
}
// [0, 'a'] [1, 'b'] [2, 'c']

//Set
const arr = new Set(['a', 'b', 'c']);
for(let v of arr.entries()) {
  console.log(v)
}
// ['a', 'a'] ['b', 'b'] ['c', 'c']

//Map
const arr = new Map();
arr.set('a', 'a');
arr.set('b', 'b');
for(let v of arr.entries()) {
  console.log(v)
}
// ['a', 'a'] ['b', 'b']
```

**`values() `返回迭代器：返回键值对的value**

```javascript
//数组
const arr = ['a', 'b', 'c'];
for(let v of arr.values()) {
  console.log(v)
}
//'a' 'b' 'c'

//Set
const arr = new Set(['a', 'b', 'c']);
for(let v of arr.values()) {
  console.log(v)
}
// 'a' 'b' 'c'

//Map
const arr = new Map();
arr.set('a', 'a');
arr.set('b', 'b');
for(let v of arr.values()) {
  console.log(v)
}
// 'a' 'b'
```

**`keys()` 返回迭代器：返回键值对的`key`**

```javascript
//数组
const arr = ['a', 'b', 'c'];
for(let v of arr.keys()) {
  console.log(v)
}
// 0 1 2

//Set
const arr = new Set(['a', 'b', 'c']);
for(let v of arr.keys()) {
  console.log(v)
}
// 'a' 'b' 'c'

//Map
const arr = new Map();
arr.set('a', 'a');
arr.set('b', 'b');
for(let v of arr.keys()) {
  console.log(v)
}
// 'a' 'b'
```

**`includes`**

判断数组中是否存在该元素，参数：查找的值、起始位置，可以替换 `ES5` 时代的` indexOf` 判断方式。`indexOf` 判断元素是否为 `NaN`，会判断错误。

```javascript
var a = [1, 2, 3];
a.includes(2); // true
a.includes(4); // false
```
## 1.6 js对象方法API

**Object.assign()**

Object.assign()方法用于合并对象，只会合并可枚举的属性。

```javascript
const obj1= {a: 1}
const obj2 = Object.assign({}, obj1) // 将一个空对象和obj1合并在一起，相当于你复制对象
obj1.a = 2
console.log(obj2.a) // 1  两个对象是独立的。
```



```javascript
const obj3 = {a: {b: 1}}
const obj4 = Object.assign({}, obj3) // 将obj3和一个空对象合并在一起
obj3.a.b = 2
console.log(obj.4.a.b) // 2  两个对象又不是独立的了，，合并的对象属性里面如果还是对象，那么合并后就会存在这种情况。
const a = {a: 1} const b = {b: 2}
const c = Object.assgin(a, b, {c: 3})
console.log(c) // {a: 1, b: 2, c: 3}
```



如果合并的对象 都有某一个相同的属性名，则后面的覆盖掉前面的对象。

 

**Object.create()**

Object.create() 方法使指定的原型对象和属性去创建一个新对象

```javascript
const aa = Object.create(null)  
console.log(aa) // {}   以null为原型创建了一个对象，这个对象非常的干净，不继承任何东西
const bb = Object.create(Array.prototype)
bb 这个对象 将会拥有数组有的所有方法，因为是以数组的prototype为原型创建的对象。
```

 

**Object.defineProperties()**

Object.defineProperties()方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象



```javascript
const obj = {a: 1, b: 2}
Object.defineProperties(obj, {
    a: {value: ''hello, writable: false}, 
    c: {value: true, writable: true},
    d: {value: 'hello', writable: false}
})
// 上面value 是属性的值，writable属性是 是否可以修改属性值
console.log(obj) // {a: 'hello', b: 2, c: true, d: 'hello'}
obj.c = 3
console.log(c) // 3
obj.a = 4
console.log(a) // 'hello'
```

 

**Object.defineProperty()**

Object.defineProperty() 方法会直接在对象上定义一个新属性，或修改现有的属性，并返回这个对象

```javascript
const obj = {a: 1}
Object.defineProperty(obj, 'a', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: 'hello wrod'
})
console.log(obj) // {a: 'hello wrod'}
```

- enumerbale是否在对象的枚举属性中 默认false
- configurable 是否可修改或删除属性特性(属性特性就是这一堆值为false或则会true的东西)，默认false
- wrtable 是否可以修改属性的值 默认为false

如果你在对象中未使用 Object.defineProperty(), Object.defineProperties()或Objecr.create()函数的情况下添加对象属性，则enumerbale，configurable，wrtable 默认都是true

 

**Object.entries()**

Object.entries()方法你可以简单的理解为把对象可枚举的属性和值变成数组。

```javascript
const obj = {foo: 'bar', too: 22}
console.log(Object.entries(obj)) // [['foo', 'bar'], ['too', 22]]
```

 

**Object.getOwnpropertyDescriptor()**

Object.getOwnpropertyDescriptor()返回一个对象上的一个属性的 描述符，就是是否可枚举是否可修改等等。

```javascript
const obj = {a: 2}
const b = Object.getOwnpropertyDescriptor(obj, 'a')
console.log(b) //{value: 2, writable: true, enumerable: true, configurable: true}
```

 

**Object.getOwnPropertyDescriptors()**

Object.getOwnPropertyDescriptors()返回对象所有属性的描述符。

```javascript
const obj = {a: 1, b: 2}
const o = Object.getOwnPropertyDescriptors(obj)
console.log(o) 
// {{value: 1, writable: true, enumerable: true, configurable: true},
{value: 2, writable: true, enumerable: true, configurable: true}}
```

 

**Object.getOwnpropertyNames()**

Object.getOwnpropertyNames()返回对象自身所有的属性名组成的对象。

```javascript
const obj = {a: 1, b: 2, c: 3, d: 4}
const o = Object.getOwnpropertyNames(obj)
console.log(o) // ['a', 'b', 'c', 'b']
```

Object.getPrototypeOf()返回指定对象的原型。

```javascript
const proto = {}
const obj = Object.create(proto)
console.log(Object.getPrototypeOf(obj) === proto) // true
```



**Object.is()**

Object.is()方法传递两个参数，判断两个参数是否相等。  

Object.is()和 === 的区别是Object.is() 会让NaN和NaN相等+0和-0不相等。

===是+0和-0相等，NaN 和NaN 不想等。

```javascript
console.log(Object.is(+0, -0)) // false
```

+0 === -0

 

**Object.preventExtensions()**

Object.preventExtensions()让一个对象不可扩展(就是不让添加新属性)，并返回原对象，永远不能添加新属性，但可以删除已有的属性。

```javascript
const o ={}
Object.preventExtensions(o)
```

 

**Object.isExtensble()**

Object.isExtensble()方便判断一个对象是否可扩展。

```javascript
const obj = {}
Object.isExtensble(obj) // true  可以添加新属性
```

 

**Object.freeze()**

Object.freeze()方法 用于冻结对象，被冻结的对象，不可以添加新属性，不可以删除原有属性，也不可以修改原有属性，该对象永远不变。

```javascript
const obj = {a: 2}
Object.freeze(obj)
obj.a = 3
console.log(a) // 2 不可以修改
```

 

**Object.isFrozen()**

```javascript
Object.isFrozen() 判断一个对象是否被冻结
const obj = {}
Object.isFrozen(obj) // false  未冻结
```

 

**Object.seal()**

Object.seal()方法用于密封一个对象，密封只是不可以添加和删除对象的属性，不可以修改属性的可枚举可写可读配置，但是可以修改对象的已有属性的值。

 

**Object.isSealed()**

Object.isSealed()放啊判断一个对象是否被密封，是的话返回true  否 返回false。

 

**Object.keys()**

Object.keys()方法由对象的键 组成的一个数组，如果传入的值不是对象，则会转化为对象。

```javascript
Object.keys('abc') // ['0', '1', '2']  'abc'是一个字符串，转化为对象以后 他的键就是他的索引咯 所以 输出了['0', '1', '2'] 
Object.keys([1, 2, 3]) // ['0', '1', '2']   数组的元素的键就是数组元素的索引
Object.keys({a: 'aa', b: 'bb'}) // ['a', 'b']
```

 

**Object.prototype.hasOwnProperty()**

hasOwnProperty()方法用于判断对象（实例）里面是否有某属性，只判断自带的属性（实例属性）。对于构造函数的实例对象，只会访问实例上的属性，不会判断原型上的属性。

```javascript
const  o = {a: 1}  
o.hasOwnProperty('a') // true   
o.hasOwnProperty('toString') //false
```

 

**Object.prototype.isPrototypeOf()**

isPrototypeOf()方法用于判断一个对象是否在另一个对象的原型上。

```javascript
const a = {amz: 1}      
const b = Object.create(a)     
a.isPrototypeOf(b) //true
```

 

**Object.prototype.propertyIsEnumerable()**

propertyIsEnumerable()方法判断一个对象的自身属性在当前对象是否可枚举。

```javascript
const o = {a: 1}
o.propertyIsEnumerable('a') //true
Object.defineProperties(o, {b:{value:2,enumerbale:false}})
o.propertyIsEnumerbale('b') //false
```

 

**Object.prototype.toString()**

toString()方法返回一个对象的字符串表示。

```javascript
const  o = {a: 1}
o.toString()   //"[object Object]"
```

 

**Object.prototype.toLocaleString()**

toLocaleString()方法返回一个对象的字符串表示。

```javascript
const  o = {a: 1}
o.toLocaleString()   //"[object Object]"
```

toLocaleString() 方法在日期字符串对象数字数组都有，但是它们是有区别的。