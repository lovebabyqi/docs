## 正则表达式

## 1. 初识

```javascript
表达式		  表示的是字符区间
[acde]		表示acde中的任何一个数据
[^acde]      表示除了acde中的任何一个数据
[a-z]        表示a-z中的任何一个数据
[A-Z]        表示A-Z中的任何一个数据
[A-z]        表示A-z中的任何一个数据
[0-9]        表示0-9中的任何一个数据
```

**作用:专用来匹配字符串**

**正则是一个引用数据类型**

```javascript
str.match(正则)
    按照指定的正则规则 匹配出str中的符合规则的字符
    如果没有匹配出来 则返回null
reg.test(字符串)
    检验字符串中有没有reg对应的规则
    如果有 则返回true
    如果没有 则返回false
```

## 2. 元字符

**元字符 实质也是表达式  也只能匹配到一个字符**

```javascript
\w  	[0-9A-z_]
\W  	[^\w]

\d  	[0-9]
\D  	[^\d]

\s  	匹配能够使字符串产生间隙的字符
\S 		[^\s]

.   	[^\n]
```

## 3. 修饰符

### 3.1 修饰符

```javascript
	i	忽略大小写  ingorecase
	g	全局匹配    global
	m	换行匹配
	n	形容词
```

### 3.2 形容词

**形容词:修饰字符n  （断言）**

```javascript
n$			匹配到在结尾位置的字符n
^n			匹配到在开头位置的字符n

x(?=n)		匹配到后面紧跟着字符n的x
x(?!n)		匹配到后面没有紧跟着字符n的x

(?<=n)x		匹配到前面紧跟着字符n的x
(?<!n)x		匹配到前面没有紧跟着字符n的x
```

**\1  \2 \3  反向引用 表示匹配出的值的复制品**

```javascript
// var str = 'abaabbeeff';
// var reg = /(\w)\1(\w)\2(\w)\3/g;
// console.log(str.match(reg))	-->[aabbee]
```

**str.replace(字符串1/正则,字符串2/回调函数)  用字符串2替换字符串1**

```javascript
var str = 'get-element-by-id'; 
var reg = /-[a-z]/g;
var newStr = str.replace(reg,function(){
    return arguments[0][1].toUpperCase()
});
console.log(newStr);// getElementById
```

### 3.3 量词

**无论是表达式还是元字符 都只能匹配一个字符**
量词：表示数量  尽可能多匹配字符 （贪婪匹配）
	**在量词后面加上 ? 就能够取消贪婪匹配**

```javascript
		{x}     匹配x个字符
		{x,y}   匹配[x,y]个字符
		{x,}    匹配至少x个字符
		x+      匹配至少一个字符
		x*      匹配至少0个字符
		x?      匹配[0,1]个字符
```

## 4. 示例

```javascript
	var x = 'fkhsafh';
	var reg1 = /x/gi;//  字面量形式
	var newReg = new RegExp(x,'gi');

//1.检测一个数据是否是数字     数字中有整数，小数，负数等
	var str = '-10.25';  //  25 
	var reg = /^-?\d+(\.\d+|)$/
	//console.log(str.match(reg))

//2.检测是否是本地电话    000-12345678    0000-12345678
	var str2 = '0000-12345678';
	var reg2 = /^\d{3,4}-\d{8}$/;
	//console.log(str2.match(reg2))

//3. get-element-by-id			转换成  getElementById
	var str3 = 'get-element-by-id';
	var reg3 = /-[a-z]/g;
	console.log(str3.replace(reg3,function(){
    	return arguments[0][1].toUpperCase()
	}))

//4.  aaabbbccc		cccbbbaaa			转换成  CCCBBBAAA  
	var str4 = 'aaabbbccc';
	var reg4 = /(\w)\1\1(\w)\2\2(\w)\3\3/;
	//console.log(str4.replace(reg4,'$3$3$3$2$2$2$1$1$1').toUpperCase())

//5.把www.tain.com				转换成  www.tanzhou.com
	var str5 = 'www.tianmao.com';
	var reg5 = /.[a-z]+./;
	//console.log(str5.replace(reg5,'.tanzhou.'))


//6 封装函数 用'Batman'替换'ABC'	"ABC is an great man, which means ABC is great"
	var str6 = 'ABC is an great man, which means ABC is great';
	function heaven(s,origin,target){
    	//var reg6 = /origin/g;
    	var reg = new RegExp(origin,'g');
		return s.replace(reg,target)
	}
	console.log(heaven(str6,'great','heaven'))
	//console.log(str6.replace(reg6,'Batman'))

//7  "<p class='on'>我是海文</p>"		转换成   '我是海文'
	var str7  = '<p class="on">heaven</p>';
	//var reg7 = /<[^>]+>/g;
	var reg7 = /(?<=>).+(?=<)/
	//console.log(str7.replace(reg7,''))
	//console.log(str7.match(reg7)[0]) 

//8  把'div#heaven.on'		转换成    "<div id='heaven' class='on'></div>"
	var str8 = 'div#heaven.heaven';
	var reg8 = /(\w+)#(\w+).(\w+)/;
	str8.replace(reg8,'<1 id="2" class="3"></1>')
	//str8.replace(/#(\w+)/,' id="1"').replace(/.(\w+)/,' class="1"').replace(/(\w+)(.+)/,'<12></$1>');


//9  检测密码 密码必须包含大小写字母数字特殊符号 
	var str9 = 'cdVb1231a!!'
	//var reg9 = /[0-9][A-z][\$\~\(\)\*\@\&\%\#\!]/
	//console.log(/[0-9]{3,5}/.test(str9)&&/[A-Z]+/.test(str9)&&/[a-z]+/.test(str9)&&/[\$\~\(\)\*\@\&\%\#\!]/.test(str9))

//10  8888888888   转换成		8,888,888,888
	var str10 = '888888888888';
	var reg10 = /(?=\B(\d{3})+$)/g;//后面紧跟着3个数字的空串
```

​	