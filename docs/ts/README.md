# TypeScript

## 1. 初识

TypeScript是JavaScript的，**带有类型**的**超集，**并且能够**编译**为普通的 JavaScript。

1.编译

`TypeScript` 本身是不能在浏览器环境、`node` 环境运行的，`deno` 除外。所以需要编译器编译为普通的 `JavaScript`。

2.带有类型

`JavaScript` 的变量类型是可以动态变化的的，只有在运行时确定值具体类型。而 `TypeScript` 则要求变量有确定的类型，并且在编写代码时就已经确定变量类型。

```javascript
let str: string = 'hello';
str = 10;// error 在TypeScript中变量一旦申明了明确类型，就不能使用其他类型
```

```javascript
let str = 'hello';
str = 10; //在javascript中是允许的
```

3.超集

`TypeScript`本身支持所有的 `JavaScript` 语法，并在此基础上添加了额外的功能和特性。这样就是的所有的 `JavaScript 能被 `TypeScript` 正确编译。

TypeScript优点:

- 类型检查
- 代码补全
- 易于维护
- 入门简单

## 2. TypeScript编译器

将 `TypeScriipt` 安装到全局

```nginx
yarn add typescript -g
```

编译指令

```javascript
tsc index.ts//ts编译器会将指定的ts编译, 创建js文件
```

`tsc` 默认会编译成 `ES3` 版本，`TypeScript` 提供了配置文件，用于修改编译配置

新建一个`tsconfig.json`

```json
{
	"compilerOptions":{
        "target":"ES2017"
	}
}
```

## 3. 基本类型

`boolean , number , string, undefined , null `

隐式类型注释

```javascript
let a = 10;//在typescript中这种写法属于 隐式类型 相当于给a指定了number类型
a = 'hello';//a 为 number 类型 赋值 string ts报错
```

显示类型注释

```javascript
let b: boolean = true;
```

任意类型注释

```javascript
let b: any = 10;
b = 'hello';//b 指定了任意类型, 这样就不会提示错误了
```

类型在函数参数及函数返回值中的运用

```javascript
function add(a: number, b: number):number{//返回值的类型定义在小括号后面, 
    //这里返回值类型number可以省略, typescript可以推断出返回值是number类型
    return a + b;
}
let res: string = add(1, 2);//会提示错误, 不能将number类型赋值给string类型

add("1", 2);//会提示参数类型必须为number
//并且在typeScript实参只能传递和新参相同数量的参数, 不像javascript可以传递任意个(js函数多传少传不影响)
//如果只传一个参数, 会提示没有给b传值
```

若函数没有返回值，可以用 `void` 类型，代表函数没有返回值

```javascript
function add(a: number, b: number): void {//表示函数没有返回值
    console.log(a + b);
}
```

如果一个变量有多种类型，又不想使用 `any` 破坏类型检查，那么可以使用组合类型.

```javascript
let a: number | string = 10;//表示a 既可以是number, 又可以是string
a = 'hello';//这种组合类型不太方便, 只能给a使用
```

使用`type`关键字让组合类型更易读

```javascript
type = NumStr = number | string;
let a: NumStr = 10;
a = 'hello';

let b: NumStr = 'hello';
```

确定变量可选值

```javascript
let c: 'on' | 'off' = 'on';//c 只能取 'on' 或 'off'
c = 'other'//会出错
```

## 4. 对象类型

`interface`定义接口关键字，用于检查对象是否符合规范

```javascript
interface Post {
    title: 'string',
    author: 'string'
}
let post: Post = {
    title: '标题',
    author: 'fn'
};//此时定义对象只能定义接口指定的两个字段, 无论多些少写, 还是字段不同, 都会报错
```

传参，参数接口检查

```javascript
interface Post {
    title: 'string',
    author: 'string'
}
function getTitle(post: Post){
    console.log(post.title);
}
let post = {
    title:'标题',
    author:'fh',
    publishDate:'2020-05-01'
}
getTitle(post);//这样使用, 接口并没有起到类型检查作用, 不会报错

//可以给函数传递对象字面量形式, 或者定义post对象时使用接口类型检查
```

## 5. 数组类型

给数组定义类型，可以保证数组元素都是统一的类型，以防在处理数组元素时，混进来其他类型的元素，导致异常。或者防止以外给数组元素赋值了其他类型的值。

```javascript
let arr: number[] = [1, 2, 3];
```

使用泛型

```javascript
let arr: Array<number> = [1, 2, 3];
```

## 6. 元祖`tup`

有限数量，三元组就是说数组有三个元素，然后规定每个元素类型。

```javascript
let tup: [number, string, boolean] = [1, 'fh', true];
```

