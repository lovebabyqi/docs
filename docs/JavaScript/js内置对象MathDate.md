# js内置对象

[MDN文档地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

## 1. Math

**随机数**

```javascript
Math.random()   //获取随机数字 [0,1)
```

**取整Math.floor（）  Math.ceil（）**

```javascript
Math.ceil(2.234342)     ==>  //3  向上取整
Math.floor(2.234342)    ==>  //2  向下取整
```

**最大值 最小值**

```javascript
Math.min(实参1,实参2...)
//获取实参集合中最小的数字
Math.max(实参1,实参2...)
//获取实参集合中最大的数字
```

**四舍五入**

```javascript
Math.round(2.234342)    ==>  //2  
```

**绝对值**

```javascript
Math.abs(数字) 
```

**其他方法**

```javascript
Math.PI         //圆周率/π --> 180°
数学中 sin(π/6) ==>  1/2

JS中
   Math.sin(x)  //计算x的正弦值
   Math.cos(x)  //计算x的余弦值
   Math.tan(x)  //计算x的正切值
Math.pow(x,y)       //求x的y次方
Math.sqrt(x)        //求x的平方根
```

## 2. Date日期对象

[MDN文档地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

`Date` 对象则基于` Unix Time Stamp`，即自1970年1月1日（UTC）起经过的毫秒数。 

**在调用Date构造函数而不传递参数的情况下，新创建的对象自动获得当前日期和时间。如果需要根据特定日期和时间创建日期对象，必须传入该日期的毫秒数。**

如果直接将表示日期的字符串传递给Date构造函数，会隐式调用Date.parse();

```javascript
var date1 = new Date(Date.parse('May 25,2004'));
var date2 = new Date('May 25,2004');
//以上两步操作是等价的；
```

### 2.1 Date.parse()

`Date.parse()`接受一个表示日期的字符串参数，尝试根据这个字符串返回相应日期的毫秒数。

通常能接受下列日期格式：

- ‘月/日/年’，如6/13/2006；
- '英文月 日，年'，如January 12,2004；
- '英文星期几 英文月 日 年 时：分：秒 时区'，如 Tue May 25 2004 00:00:00 GMT-0700；

例如要为2004年5月25日创建一个日期对象：

```javascript
var date = new Date(Date.parse('May 25,2004'));
```

### 2.2 Date.UTC()

`Date.UTC()`方法也是返回表示日期的毫秒数，Date.UTC()的参数：

- 年份
- 基于0的月份，0~11
- 月中哪一天，1~31
- 小时数，0~23
- 分钟
- 秒
- 毫秒数

示例：

```javascript
//GMT时间 2000年1月1日 午夜零时	//GMT格林尼治时间
var y2k = new Date(Date.UTC(2000,0));//Sat Jan 01 2000 08:00:00 GMT+0800 (中国标准时间)
//GMT时间2005年5月5日下午5:55:55
var time = new Date(Date.UTC(2005,4,5,17,55,55));
```

同样，使用Date构造函数，会隐式调用Date.UTC()，有一点不同：返回的日期和时间都基于本地时区，而非GMT来创建。

```javascript
var time = new Date(2005,4,5,17,55,55);//Thu May 05 2005 17:55:55 GMT+0800 (中国标准时间)
```

### 2.3 Date.now()

Date.now()，返回表示调用这个方法时的日期和时间的毫秒数。

```javascript
var start = Date.now();
dosomething();
var end = Date.now();
var result = end - start;
```

IE8等低版本浏览器中不支持Date.now()，可以使用+操作符获取时间戳。

```javascript
var start = + new Date();
```

### 2.4 Date其他方法

```javascript
var date1 = new Date();
var date2 = Date.now();//1581316206693
date1.toLocaleString('chinese', { hour12: false })//传入配置参数,获取24小时制
```

```javascript
date.toLocaleString()//获取本地日期字符串
date.toLocaleDateString()//获取本地(年/月/日)形式的字符串
date.toLocaleTimeString()//获取本地(时/分/秒)形式的字符串
date.getFullYear()     //获取年份
date.getMonth()        //获取月份  0-11
date.getDate()         //获取日期
date.getHours()        //获取小时
date.getMinutes()      //获取分钟
date.getSeconds()      //获取秒钟
date.getMilliseconds	//获取毫秒
date.getDay()		//获取星期几 (0-6)星期天是0
date.getTime()		//获取当前时间到1970年1月1日午夜的毫秒数
date.getTimezoneOffset()//获取当前时区的偏移时间  东8区是-480 单位是分钟
date.setFullYear()      //设置年份
date.setMonth()         //设置月份
date.setDate()          //设置日期
date.setHours()         //设置小时
date.setMinutes()       //设置分钟
date.setSeconds()       //设置秒钟
```

> `moment.js`	日期处理类库很方便地处理时间格式问题。

## 3. JSON对象

[MDN文档地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

**JSON** 是一种语法，用来序列化对象、数组、数值、字符串、布尔值和 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null) 。它基于 JavaScript 语法，但与之不同：**JavaScript不是JSON，JSON也不是JavaScript**。 

**JSON**对象包含两个方法: 用于解析 [JavaScript Object Notation](http://json.org/)  ([JSON](https://developer.mozilla.org/zh-CN/docs/Glossary/JSON)) 的 `parse()` 方法，以及将对象/值转换为 JSON字符串的 `stringify()` 方法。除了这两个方法, JSON这个对象本身并没有其他作用，也不能被调用或者作为构造函数调用。

### 3.1 `JSON.parse`

```javascript
JSON.parse(text[, reviver]);
```

`JSON.parse()` 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。提供可选的 **reviver** 函数用以在返回之前对所得到的对象执行变换(操作)。 

```javascript
JSON.parse('{"p": 5}', function (k, v) {
    if(k === '') return v;     // 如果到了最顶层，则直接返回属性值，
    return v * 2;              // 否则将属性值变为原来的 2 倍。
});                            // { p: 10 }

JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}', function (k, v) {
    console.log(k); // 输出当前的属性名，从而得知遍历顺序是从内向外的，
                    // 最后一个属性名会是个空字符串。
    return v;       // 返回原始属性值，相当于没有传递 reviver 参数。
});
```

### 3.2 `JSON.stringify `

```javascript
JSON.stringify(value[, replacer [, space]])
```

`JSON.stringify()` 方法将一个 JavaScript 值（对象或者数组）转换为一个 JSON 字符串，如果指定了 **replacer** 是一个**函数**，则可以选择性地替换值，或者如果指定了 replacer 是一个**数组**，则可选择性地仅包含数组指定的属性。

```javascript
const person = {
    name:'shiyue',
    age:19,
    hobby:'beautiful girl'
}
const data = JSON.stringify(person,['age','hobby']);//replacer是数组，数组的值代表被序列化成JSON字符串的属性名，起到过滤保留作用
console.log(data);//"{"age":19,"hobby":"beautiful girl"}"
```

```javascript
function replacer(key, value) {
  if (typeof value === "string") {
    return undefined;//返回undefined，则该属性不会再JSON字符串中输出
  }
  return value;
}

const foo = {
    foundation: "Mozilla",
    model: "box", 
    week: 45, 
    transport: "car",
    month: 7};
const jsonString = JSON.stringify(foo, replacer);
console.log(jsonString);//"{"week":45,"month":7}"
```

这样一来可以借助JSON序列化，反序列化，过滤对象属性。

第三个参数 space 控制结果字符串中的间距。如果是一个数字, 则在字符串化时每一级别会比上一级别缩进多这个数字值的空格（最多10个空格）；如果是一个字符串，则每一级别会比上一级别多缩进该字符串（或该字符串的前10个字符）。 

```javascript
JSON.stringify({ uno: 1, dos : 2 }, null, '\t')
// '{            
//     "uno": 1, 
//     "dos": 2
// }' 
```

**特殊**：如果一个被序列化的对象拥有 `toJSON` 方法，那么该 `toJSON` 方法就会覆盖该对象默认的序列化行为：不是该对象被序列化，而是调用 `toJSON` 方法后的返回值会被序列化，例如： 

```javascript
var obj = {
  foo: 'foo',
  age:18
  toJSON: function () {
    return 'bar';
  }
};
JSON.stringify(obj);      // '"bar"'
JSON.stringify({x: obj}); // '{"x":"bar"}'
```

### 3.3 使用 JSON.stringify 结合 localStorage 的例子

一些时候，你想存储用户创建的一个对象，并且，即使在浏览器被关闭后仍能恢复该对象。下面的例子是 `JSON.stringify` 适用于这种情形的一个样板：

```javascript
// 创建一个示例数据
var session = {
    'screens' : [],
    'state' : true
};
session.screens.push({"name":"screenA", "width":450, "height":250});
session.screens.push({"name":"screenB", "width":650, "height":350});
session.screens.push({"name":"screenC", "width":750, "height":120});
session.screens.push({"name":"screenD", "width":250, "height":60});
session.screens.push({"name":"screenE", "width":390, "height":120});
session.screens.push({"name":"screenF", "width":1240, "height":650});

// 使用 JSON.stringify 转换为 JSON 字符串
// 然后使用 localStorage 保存在 session 名称里
localStorage.setItem('session', JSON.stringify(session));

// 然后是如何转换通过 JSON.stringify 生成的字符串，该字符串以 JSON 格式保存在 localStorage 里
var restoredSession = JSON.parse(localStorage.getItem('session'));

// 现在 restoredSession 包含了保存在 localStorage 里的对象
console.log(restoredSession);
```

