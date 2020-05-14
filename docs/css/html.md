# html拨云见日

语义化：指的是根**据网页中内容的结构，选择适合的html标签进行编写。**

作用：

1. 在没有`CSS`的情况下，页面也能呈现出很好的页面结构。
2. 有利于`SEO`，让搜索引擎爬虫更好的理解网页。
3. 方便其他设备解析，如屏幕阅读器，盲人阅读器等。
4. 便于团队开发与维护。

[html标签含义元素周期表](http://www.html5star.com/manual/html5label-meaning/)

## 1. 标题

规范：页面中只能有一个h1标题。

```html
<h1>这是一个标题。</h1>
<h2>这是一个标题。</h2>
<h3>这是一个标题。</h3>
```

## 2. 段落，文本

段落`<p></p>`

文本修饰标签：

```html
<strong>加粗</strong>
<em>斜体</em>
<sub>下标</sub>
<sup>上标</sup>
```

示例：勾股定理a平方加b平方等于c平方。

```html
<p>
    a<sup>2</sup>+b<sup>2</sup>=c<sup>2</sup>
</p>
```

水H2O

```html
<p>
    H<sup>2</sup>O
</p>
```

## 3. 图片标签与图片属性

`img`单标签

属性：

- src：图片引用地址；可以是本地路径，网络链接。
- alt：图片出现问题时的提示文字。
- title：所有标签都具备`title`，提示信息，`hover`时显示。
- width，height：图片宽高；**图片若没有设置宽高，加载图片必定触发重排**。

## 4. a标签链接

属性：

- `href`：链接地址。
- `target`：打开位置，默认`_self`当前窗口打开，`_blank`新窗口打开。

可以使用`<base target='_blank'>`改变a标签的默认行为，一般将base标签写在`<head></head>`里面。

a标签锚点跳转：`href`的值#开头不会刷新页面，可以跳转至`id`，也可以跳转至`a`标签`name`对应的锚点。

实现一：

```html
<a href='#title_01'>跳转到h2标题</a>
<!--此处是其他内容-->
<h2 id='title_01'>
    h2_标题
</h2>
```

实现二：

```html
<a href='#001'>跳转</a>
<!--省略-->
<a name='001'></a>
```

应用：锚点跳转可以做返回顶部，轮播等功能。

## 5. 特殊符号

编写一些文本时，经常会遇到一些无法输入的字符或可能出问题的字符，例如©版权符，左右尖括号，多个空格页面并不会解析多个空格。这些特殊字符，html准备了相应代码。

```
		空格		&nbsp;
©		版权		&copy;
®		注册商标   &rog;
<		小于号		&lt;
>		大鱼号		&gt;
¥		人命币		&yen;
°		度		&deg;
```

## 6. 列表

组合使用，有规范，`ul`和`li`之间不应该有其他元素。

### 6.1 无序列表：

`ul li，type`属性可以设置`list-style`

- desc：实心小圆点。
- circle：空心圆。
- square：实心方块。

### 6.2 有序列表

ol li，有序列表和无序列表的区别，`list-style`显示序列数。

### 6.3 自定义列表

dl dt dd

`dt`相当于标题，`dd`为描述。

## 7. 表格属性

- `table`表格容器
- `tr`定义表格行
- `th`表头
- `td`表格单元
- `caption`表格标题

表格语义化标签（占位标签）

`tHead`

`tBody`

`tFood`

表格属性：

- border：表格边框
- cellpadding：单元格内边距
- cellspacing：单元格之间空隙
- rowspan：合并行
- colspan：合并列
- align：左右对齐方式
- valign：上下对齐方式



## 8. 表单标签

### 8.1 form，input

`input type`值：

- `text`：普通文本
- `password`：密码文本
- `checkbox`：复选框
- `radio`：单选框
- `file`：选择文件
- `submit`：提交
- `reset`：重置

### 8.2 textarea文本域

属性：

- `cols`：列数
- `rows`：行数

### 8.3 下拉框

`select` 属性：`multiple`多选，`size`

`option` 属性：`selected`选中，`disabled`禁止选中

### 8.4 label标签，辅助表单

通过`for`属性和`input`的`id`一一对应，非常有用，例如单选按钮时可以点击文字选中。