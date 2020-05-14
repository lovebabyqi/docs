## js控制流

### 1. for循环

**for循环  可以让在for循环中的代码重复执行**

```javascript
for(var i=0;i<10;i++){
    if(i==1){
        continue;
        // break;
    }
    console.log(i)
}
for(循环起点;循环条件;累加器){
	循环体（重复执行的代码）
}
1. 循环起点
2. 循环条件
3. 执行循环体
4. 执行累加器
```

#### **continue**

1.跳过本次（1次）for循环
2.不执行continue下面的代码

#### **break**

1.跳过所有的for循环
2.不执行break下面的代码

### 2. 双层for循环

需要注意多层for循环的优化，取值效率问题，和内外层循环圈数问题。

示例1

```javascript
for(var i=0;i<5;i++){
	for(var j=0;j<6;j++){
            console.log(1);
	}
}
```

示例2

```javascript
for(var j=0;j<10;j++){
	for(var i=0;i<8;i++){
		document.write('●');
	}
	document.write('<br>')
}

//document.write(字符串)
//这个函数可以把字符串解析成标签
```

### 3. if else条件

```javascript
if(0){
	console.log('条件是真 我走进来了');
}else{
	console.log('条件是假 我走进来了')
}
```

### 4. switch条件

```javascript
switch( 变量 ){
	case 数据1:
		条件成立,执行的JS代码;
		break;
	case 数据2:
		条件成立,执行的JS代码;
		break;
	case 数据3:
		条件成立,执行的JS代码;
		break;
	default:
		上述条件不成立,执行的JS代码
}
//变量和 数据  在判断时  是全等 ===
//break 在switch中的作用是 让程序终止
```

switch条件判断,**由于变量和数据在判断时是全等===判断**,因此,变量直接为true,当条件为true就能走进case,(可以是大于小于等或其他条件)

```javascript
switch( true ){
	case 条件1:	
		条件成立,执行的JS代码;
		break;
	case 条件2:
		条件成立,执行的JS代码;
		break;
	case 条件3:
		条件成立,执行的JS代码;
		break;
	default:
		上述条件不成立,执行的JS代码
}
//变量和 数据  在判断时  是全等 ===
//break 在switch中的作用是 让程序终止
```

### 5. 三目运算符

**条件?条件为真执行的JS代码:条件为假执行的JS代码;**

三目运算符 是简化 if else语句

条件?条件为真 执行的JS代码:条件为假 执行的JS代码;

### 6. continue break

### 7. while do while

```javascript
var i=0;
while(i<6){
    console.log(i);
    i++;
}
//for循环的变种写法
循环起点；
while(循环条件){
    循环体（重复执行的代码）
    累加器；
}
```